import { defineStore } from 'pinia';
import { LearningProgress, MistakeRecord } from '../types';

const CURRENT_DATA_VERSION = 1;

export function migrateProgressData(rawData: string | null): any {
  if (!rawData) {
    return null;
  }
  try {
    const parsed = JSON.parse(rawData);
    if (!parsed.version) {
      parsed.version = CURRENT_DATA_VERSION;
      parsed.badges = parsed.badges || [];
      parsed.moduleStats = parsed.moduleStats || {};
      parsed.completedLevelIds = parsed.completedLevelIds || [];
      parsed.starsByLevel = parsed.starsByLevel || {};
      parsed.totalAnswered = parsed.totalAnswered || 0;
      parsed.totalCorrect = parsed.totalCorrect || 0;
      parsed.studyDays = parsed.studyDays || [];
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: {
      completedLevelIds: [],
      starsByLevel: {},
      badges: [],
      moduleStats: {},
      totalAnswered: 0,
      totalCorrect: 0,
      studyDays: [],
      updatedAt: new Date().toISOString()
    } as LearningProgress,
    mistakes: [] as MistakeRecord[]
  }),
  actions: {
    loadFromStorage() {
      const data = localStorage.getItem('math_game_progress');
      const mistakeData = localStorage.getItem('math_game_mistakes');
      if (data) {
        const migrated = migrateProgressData(data);
        if (migrated) {
          this.progress = migrated;
        }
      }
      if (mistakeData) {
        try {
          this.mistakes = JSON.parse(mistakeData);
        } catch (e) {
          this.mistakes = [];
        }
      }
    },
    saveToStorage() {
      this.progress.updatedAt = new Date().toISOString();
      localStorage.setItem('math_game_progress', JSON.stringify(this.progress));
      localStorage.setItem('math_game_mistakes', JSON.stringify(this.mistakes));
    },
    recordLevelCompletion(levelId: string, stars: number) {
      if (!this.progress.completedLevelIds.includes(levelId)) {
        this.progress.completedLevelIds.push(levelId);
      }
      const existingStars = this.progress.starsByLevel[levelId] || 0;
      if (stars > existingStars) {
        this.progress.starsByLevel[levelId] = stars;
      }
      this.saveToStorage();
    },
    recordAnswer(
      moduleId: string,
      questionId: string,
      levelId: string,
      isCorrect: boolean,
      wrongAns?: unknown,
      correctAns?: unknown
    ) {
      this.progress.totalAnswered += 1;
      if (isCorrect) {
        this.progress.totalCorrect += 1;
      }

      if (!this.progress.moduleStats[moduleId]) {
        this.progress.moduleStats[moduleId] = {
          moduleId,
          totalAnswered: 0,
          totalCorrect: 0,
          accuracy: 0
        };
      }

      const stat = this.progress.moduleStats[moduleId];
      stat.totalAnswered += 1;
      if (isCorrect) {
        stat.totalCorrect += 1;
      }
      stat.accuracy = Math.round((stat.totalCorrect / stat.totalAnswered) * 100);

      const today = new Date().toISOString().split('T')[0];
      if (!this.progress.studyDays.includes(today)) {
        this.progress.studyDays.push(today);
      }

      if (!isCorrect) {
        const existing = this.mistakes.find(m => m.questionId === questionId);
        if (existing) {
          existing.mistakeCount += 1;
          existing.wrongAnswer = wrongAns;
          existing.lastWrongAt = new Date().toISOString();
          existing.masteredCount = 0;
        } else {
          this.mistakes.push({
            questionId,
            moduleId,
            levelId,
            wrongAnswer: wrongAns,
            correctAnswer: correctAns,
            mistakeCount: 1,
            masteredCount: 0,
            lastWrongAt: new Date().toISOString()
          });
        }
      } else {
        const existing = this.mistakes.find(m => m.questionId === questionId);
        if (existing) {
          existing.masteredCount += 1;
          if (existing.masteredCount >= 2) {
            this.mistakes = this.mistakes.filter(m => m.questionId !== questionId);
          }
        }
      }
      this.saveToStorage();
    }
  }
});
