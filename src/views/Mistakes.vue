<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { usePetStore } from '../stores/pet';
import { questions, modulesList } from '../data/questions';
import { judgeAnswer } from '../utils/judgeHelper';
import { speakText } from '../utils/speechHelper';
import GameButton from '../components/common/GameButton.vue';

// Import components
import ChoiceQuestion from '../components/question/ChoiceQuestion.vue';
import FillQuestion from '../components/question/FillQuestion.vue';
import DragQuestion from '../components/question/DragQuestion.vue';
import MatchQuestion from '../components/question/MatchQuestion.vue';
import DiagramQuestion from '../components/question/DiagramQuestion.vue';
import WriteQuestion from '../components/question/WriteQuestion.vue';

const router = useRouter();
const progressStore = useProgressStore();
const petStore = usePetStore();

const filterModule = ref<string>('all');

// Practice Mode states
const isPracticeMode = ref(false);
const practiceQueue = ref<any[]>([]);
const currentPracticeIndex = ref(0);
const practiceAnswer = ref<any>(null);
const practiceChecked = ref(false);
const practiceIsCorrect = ref(false);

const updatePet = (mood: 'idle' | 'happy' | 'sad' | 'cheer', text: string) => {};

onMounted(() => {
  progressStore.loadFromStorage();
  petStore.loadFromStorage();
});

onUnmounted(() => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});

const getQuestionObj = (qId: string) => {
  return questions.find(q => q.id === qId);
};

const filteredMistakes = computed(() => {
  const records = progressStore.mistakes;
  if (filterModule.value === 'all') {
    return records;
  }
  return records.filter(r => r.moduleId === filterModule.value);
});

const speakPracticeQuestion = () => {
  const q = practiceQueue.value[currentPracticeIndex.value];
  if (q) {
    speakText(q.stem);
  }
};

const startPractice = () => {
  if (filteredMistakes.value.length === 0) return;

  const list = [...filteredMistakes.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(r => getQuestionObj(r.questionId))
    .filter(Boolean);

  if (list.length > 0) {
    practiceQueue.value = list;
    currentPracticeIndex.value = 0;
    practiceAnswer.value = null;
    practiceChecked.value = false;
    practiceIsCorrect.value = false;
    isPracticeMode.value = true;
    updatePet('cheer', '<ruby>小<rt>xiǎo</rt>主<rt>zhǔ</rt>人<rt>rén</rt></ruby>，<ruby>我<rt>wǒ</rt>们<rt>men</rt>来<rt>lái</rt>消<rt>xiāo</rt>灭<rt>miè</rt>错<rt>cuò</rt>题<rt>tí</rt>吧<rt>ba</rt></ruby>！🐾');
    setTimeout(() => {
      speakPracticeQuestion();
    }, 200);
  }
};

const checkPracticeAnswer = () => {
  const q = practiceQueue.value[currentPracticeIndex.value];
  if (!q || practiceChecked.value) return;

  const correct = judgeAnswer(q, practiceAnswer.value);
  practiceChecked.value = true;
  practiceIsCorrect.value = correct;

  progressStore.recordAnswer(q.moduleId, q.id, q.levelId, correct, practiceAnswer.value, q.answer);

  if (correct) {
    petStore.addExp(5);
    updatePet('happy', '<ruby>消<rt>xiāo</rt>灭<rt>miè</rt></ruby>了<ruby>一<rt>yī</rt>道<rt>dào</rt>错<rt>cuò</rt>题<rt>tí</rt></ruby>！🎉');
    setTimeout(() => {
      nextPracticeQuestion();
    }, 2000);
  } else {
    petStore.deductExp(2);
    updatePet('sad', '<ruby>没<rt>méi</rt>关<rt>guān</rt>系<rt>xi</rt></ruby>，<ruby>再<rt>zài</rt>练<rt>liàn</rt>习<rt>xí</rt>一<rt>yī</rt>次<rt>cì</rt></ruby>！💡');
  }
};

const nextPracticeQuestion = () => {
  practiceChecked.value = false;
  practiceIsCorrect.value = false;
  practiceAnswer.value = null;

  if (currentPracticeIndex.value < practiceQueue.value.length - 1) {
    currentPracticeIndex.value += 1;
    updatePet('cheer', '<ruby>下<rt>xià</rt>一<rt>yī</rt>题<rt>tí</rt>来<rt>lái</rt>啦<rt>la</rt></ruby>！✨');
    setTimeout(() => {
      speakPracticeQuestion();
    }, 200);
  } else {
    isPracticeMode.value = false;
    progressStore.loadFromStorage();
  }
};

const quitPractice = () => {
  isPracticeMode.value = false;
  progressStore.loadFromStorage();
};

const tryAgainPractice = () => {
  practiceChecked.value = false;
  practiceIsCorrect.value = false;
  practiceAnswer.value = null;
  updatePet('cheer', '<ruby>加<rt>jiā</rt>油<rt>yóu</rt></ruby>！<ruby>再<rt>zài</rt>试<rt>shì</rt>一<rt>yī</rt>次<rt>cì</rt></ruby>！🐾');
};
</script>

<template>
  <div class="mistakes-container game-container">
    <header class="mistakes-header">
      <GameButton type="default" size="sm" @click="isPracticeMode ? quitPractice() : router.push('/')">
        返回
      </GameButton>
      <h1 class="mistakes-title">
        <ruby>错<rt>cuò</rt>题<rt>tí</rt>本<rt>běn</rt></ruby>
      </h1>
      <div style="width: 80px"></div>
    </header>

    <main class="mistakes-main">
      <div v-if="isPracticeMode && practiceQueue[currentPracticeIndex]" class="practice-session-wrapper">
        <div class="practice-progress-bar">
          练习中: {{ currentPracticeIndex + 1 }} / {{ practiceQueue.length }}
        </div>

        <div class="play-main card animate-pop-in">
          <div class="speak-btn-container" style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 10px; margin-top: -10px;">
            <GameButton type="success" size="sm" class="speak-btn" style="border-width: 3px !important; font-size: 14px;" @click="speakPracticeQuestion">
              🔊 <ruby>听<rt>tīng</rt>题<rt>tí</rt></ruby>
            </GameButton>
          </div>

          <component
            :is="
              practiceQueue[currentPracticeIndex].type === 'choice' ? ChoiceQuestion :
              practiceQueue[currentPracticeIndex].type === 'fill' ? FillQuestion :
              practiceQueue[currentPracticeIndex].type === 'drag' ? DragQuestion :
              practiceQueue[currentPracticeIndex].type === 'match' ? MatchQuestion :
              practiceQueue[currentPracticeIndex].type === 'diagram' ? DiagramQuestion : WriteQuestion
            "
            :question="practiceQueue[currentPracticeIndex]"
            v-model="practiceAnswer"
          />
        </div>

        <div class="play-footer">
          <div v-if="practiceChecked && practiceIsCorrect" class="feedback-toast is-success animate-pop-in">
            <span class="toast-icon">✨</span>
            <span class="toast-message">答对啦！离掌握更近一步！</span>
          </div>

          <div v-if="practiceChecked && !practiceIsCorrect" class="feedback-toast is-danger animate-pop-in">
            <span class="toast-icon">💡</span>
            <div class="toast-details">
              <span class="toast-message">再试一次吧，你可以的！</span>
            </div>
            <GameButton type="warning" size="sm" @click="tryAgainPractice">重试</GameButton>
          </div>

          <GameButton
            v-if="!practiceChecked"
            type="primary"
            size="lg"
            class="check-btn"
            :disabled="practiceAnswer === null || practiceAnswer === undefined"
            @click="checkPracticeAnswer"
          >
            检查答案 🔍
          </GameButton>
        </div>
      </div>

      <div v-else class="mistakes-list-wrapper">
        <div class="filter-controls card">
          <div class="filter-group">
            <label for="module-select">章节筛选：</label>
            <select id="module-select" v-model="filterModule" class="kids-select">
              <option value="all">全部章节</option>
              <option v-for="m in modulesList" :key="m.id" :value="m.id">
                {{ m.name }}
              </option>
            </select>
          </div>
          <GameButton
            type="warning"
            size="md"
            :disabled="filteredMistakes.length === 0"
            @click="startPractice"
          >
            错题重练 📖 (抽5题)
          </GameButton>
        </div>

        <div v-if="filteredMistakes.length === 0" class="empty-mistakes card animate-pop-in">
          <div class="empty-icon">🎉</div>
          <h2>太棒了！你的错题本是空的！</h2>
          <p>继续加油，保持零错题的好成绩吧！</p>
        </div>

        <div v-else class="mistakes-grid">
          <div
            v-for="rec in filteredMistakes"
            :key="rec.questionId"
            class="mistake-item-card card animate-pop-in"
          >
            <div class="mistake-meta">
              <span class="meta-tag">{{ getQuestionObj(rec.questionId)?.type === 'choice' ? '选择题' : '填空题' }}</span>
              <span class="meta-tag times-tag">做错 {{ rec.mistakeCount }} 次</span>
              <span class="meta-tag master-tag">掌握进度 {{ rec.masteredCount }}/2</span>
              <GameButton 
                type="success" 
                size="sm" 
                style="margin-left: auto; height: 28px; padding: 2px 8px; border-width: 2px !important; font-size: 13px;" 
                @click="getQuestionObj(rec.questionId) && speakText(getQuestionObj(rec.questionId)!.stem)"
              >
                🔊 听题
              </GameButton>
            </div>
            
            <div class="mistake-question-stem" v-html="getQuestionObj(rec.questionId)?.stem"></div>

            <div class="mistake-answers">
              <div class="answer-row is-wrong">
                <span class="ans-label">你的回答:</span>
                <span class="ans-val">{{ JSON.stringify(rec.wrongAnswer) }}</span>
              </div>
              <div class="answer-row is-correct">
                <span class="ans-label">正确答案:</span>
                <span class="ans-val">{{ JSON.stringify(rec.correctAnswer) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.mistakes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.mistakes-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.mistakes-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-purple-dark);
}

.mistakes-main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-width: 3px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.kids-select {
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 6px 12px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  background-color: white;
  cursor: pointer;
}

.empty-mistakes {
  text-align: center;
  padding: 50px 30px;
  border-width: 4px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.mistakes-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mistake-item-card {
  border-width: 3px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: white;
}

.mistake-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.meta-tag {
  font-size: 12px;
  font-weight: bold;
  background-color: hsl(198, 90%, 92%);
  border: 2px solid var(--color-text);
  border-radius: 6px;
  padding: 2px 8px;
}

.times-tag {
  background-color: hsl(354, 90%, 92%);
}

.master-tag {
  background-color: hsl(145, 75%, 90%);
}

.mistake-question-stem {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text);
  line-height: 1.6;
}

.mistake-answers {
  background-color: hsl(35, 30%, 97%);
  border: 2.5px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.answer-row {
  display: flex;
  font-size: 15px;
  font-weight: bold;
}

.answer-row.is-wrong {
  color: var(--color-danger-dark);
}

.answer-row.is-correct {
  color: var(--color-success-dark);
}

.ans-label {
  width: 80px;
}

.ans-val {
  flex: 1;
}

/* Practice styling */
.practice-session-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.practice-progress-bar {
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 6px 16px;
}

.play-main {
  width: 100%;
  min-height: 300px;
  padding: 30px;
  border-width: 4px;
  position: relative;
}

.play-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.check-btn {
  width: 100%;
  max-width: 300px;
  border-width: 4px;
}

.feedback-toast {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  margin-bottom: 12px;
}

.feedback-toast.is-success {
  background-color: var(--color-success);
  color: white;
}

.feedback-toast.is-danger {
  background-color: var(--color-danger);
  color: white;
}

.toast-icon {
  font-size: 28px;
}

.toast-message {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 600px) {
  .mistakes-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .mistakes-title {
    font-size: 20px;
    width: 100%;
    order: 3;
    text-align: center;
    margin-top: 4px;
  }
  .filter-controls {
    padding: 12px;
    justify-content: center;
    gap: 12px;
  }
  .play-main {
    padding: 20px 12px;
    min-height: 280px;
  }
  .feedback-toast {
    padding: 10px 16px;
    gap: 10px;
  }
  .toast-message {
    font-size: 15px;
  }
  .toast-icon {
    font-size: 24px;
  }
}
</style>
