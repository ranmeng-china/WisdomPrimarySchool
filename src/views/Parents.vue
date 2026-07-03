<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { levelsList, modulesList } from '../data/questions';
import GameButton from '../components/common/GameButton.vue';

const router = useRouter();
const progressStore = useProgressStore();

// Parent security lock
const isLocked = ref(true);
const mathQuestion = ref({ text: '15 - 7 = ?', answer: 8 });
const lockInput = ref('');
const lockError = ref(false);

const generateLockQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 10; // 10-19
  const num2 = Math.floor(Math.random() * 8) + 2;   // 2-9
  mathQuestion.value = {
    text: `${num1} - ${num2} = ?`,
    answer: num1 - num2
  };
  lockInput.value = '';
  lockError.value = false;
};

onMounted(() => {
  progressStore.loadFromStorage();
  generateLockQuestion();
});

const unlock = () => {
  const ans = parseInt(lockInput.value.trim());
  if (ans === mathQuestion.value.answer) {
    isLocked.value = false;
  } else {
    lockError.value = true;
    lockInput.value = '';
  }
};

// Study Statistics
const totalAnswered = computed(() => progressStore.progress.totalAnswered);
const totalCorrect = computed(() => progressStore.progress.totalCorrect);
const accuracy = computed(() => {
  if (totalAnswered.value === 0) return 0;
  return Math.round((totalCorrect.value / totalAnswered.value) * 100);
});

const studyDaysCount = computed(() => progressStore.progress.studyDays.length);
const completedCount = computed(() => progressStore.progress.completedLevelIds.length);

// SVG Pie chart values
const pieStrokeDashArray = computed(() => {
  const percent = accuracy.value;
  // SVG circle circumference is 2 * PI * r = 2 * 3.14159 * 40 = 251.3
  const filled = (percent / 100) * 251.3;
  const empty = 251.3 - filled;
  return `${filled} ${empty}`;
});

// Weakest modules and levels (accuracy < 60% or mistake records list)
const weakLevels = computed(() => {
  const list: Array<{ levelId: string; name: string; accuracy: number; count: number; suggestion: string }> = [];

  // Group mistake records by levelId
  const mistakeCountsByLevel: Record<string, { count: number; wrongCount: number }> = {};
  progressStore.mistakes.forEach(rec => {
    if (!mistakeCountsByLevel[rec.levelId]) {
      mistakeCountsByLevel[rec.levelId] = { count: 0, wrongCount: 0 };
    }
    mistakeCountsByLevel[rec.levelId].count += 1;
    mistakeCountsByLevel[rec.levelId].wrongCount += rec.mistakeCount;
  });

  Object.entries(mistakeCountsByLevel).forEach(([lvlId, meta]) => {
    const lvl = levelsList.find(l => l.id === lvlId);
    if (lvl) {
      // Calculate a pseudo accuracy or just report mistake details
      let lvlAccuracy = 100;
      const progressStat = progressStore.progress.moduleStats[lvl.moduleId];
      if (progressStat) {
        lvlAccuracy = progressStat.accuracy;
      }
      
      // If there are mistake records or accuracy is low, list it
      if (lvlAccuracy < 70 || meta.wrongCount >= 2) {
        let suggestion = '建议家长陪伴孩子，多使用练写本，巩固基础概念的实物对应。';
        if (lvlId.includes('m3')) {
          suggestion = '建议重点进行“凑十法”或“破十法”卡片小互动，从生活实例入手理解算理。';
        } else if (lvlId.includes('m5')) {
          suggestion = '建议让孩子接触真实的一角、一分硬币，在模拟买单小游戏中学习元角分换算。';
        }
        list.push({
          levelId: lvlId,
          name: lvl.name,
          accuracy: lvlAccuracy,
          count: meta.wrongCount,
          suggestion
        });
      }
    }
  });

  return list;
});
</script>

<template>
  <div class="parents-container game-container">
    <header class="parents-header">
      <GameButton type="default" size="sm" @click="router.push('/')">返回</GameButton>
      <h1 class="parents-title">🛡️ 家长管理端</h1>
      <div style="width: 80px"></div>
    </header>

    <main class="parents-main">
      <!-- Security Lock Panel -->
      <div v-if="isLocked" class="parent-lock-card card animate-pop-in">
        <h3>🔒 家长防误触锁</h3>
        <p class="lock-tip">为了防止小孩子误入，请回答下面的算术题：</p>
        <div class="lock-question">{{ mathQuestion.text }}</div>
        <div class="lock-input-row">
          <input
            v-model="lockInput"
            type="number"
            class="lock-input"
            placeholder="输入答案"
            @keyup.enter="unlock"
          />
          <GameButton type="primary" size="md" @click="unlock">验证进入</GameButton>
        </div>
        <p v-if="lockError" class="lock-error-msg">❌ 答案不对哦，请重新计算或 <span class="refresh-lock" @click="generateLockQuestion">换一题</span>。</p>
      </div>

      <!-- Dashboard View -->
      <div v-else class="parents-dashboard-wrapper animate-pop-in">
        <!-- Overview Grid -->
        <div class="stats-overview-grid">
          <div class="overview-card card">
            <span class="ov-icon">📅</span>
            <div class="ov-details">
              <span class="ov-val">{{ studyDaysCount }} 天</span>
              <span class="ov-label">累计学习天数</span>
            </div>
          </div>
          <div class="overview-card card">
            <span class="ov-icon">📚</span>
            <div class="ov-details">
              <span class="ov-val">{{ completedCount }} 关</span>
              <span class="ov-label">已通关数量</span>
            </div>
          </div>
          <div class="overview-card card">
            <span class="ov-icon">✏️</span>
            <div class="ov-details">
              <span class="ov-val">{{ totalAnswered }} 题</span>
              <span class="ov-label">累计答题总数</span>
            </div>
          </div>
        </div>

        <!-- Charts and Breakdown -->
        <div class="charts-row">
          <!-- Accuracy Pie Chart (Pure SVG) -->
          <div class="chart-box card">
            <h3 class="box-title">📊 答题正确率</h3>
            <div class="svg-chart-container">
              <svg width="150" height="150" viewBox="0 0 100 100" class="pie-svg">
                <!-- Background circle -->
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" stroke-width="12" />
                <!-- Filled percentage circle -->
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="var(--color-success)"
                  stroke-width="12"
                  :stroke-dasharray="pieStrokeDashArray"
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
                <!-- Center text -->
                <text x="50" y="55" font-size="16" font-weight="bold" fill="var(--color-text)" text-anchor="middle">
                  {{ accuracy }}%
                </text>
              </svg>
            </div>
            <div class="accuracy-summary">
              <p>答对：<strong class="color-success">{{ totalCorrect }} 题</strong></p>
              <p>答错：<strong class="color-danger">{{ totalAnswered - totalCorrect }} 题</strong></p>
            </div>
          </div>

          <!-- Quick suggestions -->
          <div class="suggestions-box card">
            <h3 class="box-title">🍀 学习分析与建议</h3>
            <div class="suggestion-content">
              <p v-if="totalAnswered === 0">孩子刚刚开启学习之旅，请鼓励他们去地图里挑战第一关！</p>
              <template v-else>
                <p v-if="accuracy >= 85">🌟 孩子的正确率非常高（{{ accuracy }}%），数学思维敏捷！建议引导孩子尝试高难度的挑战题目，以及在宠物小屋中解锁更高的特权特技。</p>
                <p v-else-if="accuracy >= 60">👍 孩子表现不错（{{ accuracy }}%），但存在部分细微知识漏洞。建议家长每天陪伴练习10分钟，利用错题本重点进行针对性温习。</p>
                <p v-else>⚠️ 孩子当前正确率较低（{{ accuracy }}%），在运算或认数概念中存在盲区。请放慢进度，不要强求解锁新关卡，以错题重练和描红练字为主。</p>
              </template>
            </div>
          </div>
        </div>

        <!-- Weak levels list -->
        <div class="weak-points-section card">
          <h3 class="box-title">⚠️ 薄弱关卡与学习预警</h3>
          <div v-if="weakLevels.length === 0" class="empty-weak-msg">
            ✨ 暂无明显薄弱关卡，孩子的掌握程度非常扎实！
          </div>
          <div v-else class="weak-levels-list">
            <div v-for="item in weakLevels" :key="item.levelId" class="weak-level-item">
              <div class="weak-lvl-meta">
                <span class="weak-lvl-name">{{ item.name }}</span>
                <span class="weak-lvl-badge">做错 {{ item.count }} 次</span>
              </div>
              <div class="weak-lvl-desc">
                <strong>辅导建议：</strong>{{ item.suggestion }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.parents-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.parents-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.parents-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-text);
}

.parents-main {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.parent-lock-card {
  width: 100%;
  max-width: 450px;
  padding: 30px;
  text-align: center;
  border-width: 4px;
}

.parent-lock-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
}

.lock-tip {
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 20px;
}

.lock-question {
  font-size: 36px;
  font-weight: 900;
  color: var(--color-purple-dark);
  margin-bottom: 24px;
  background-color: hsl(35, 40%, 96%);
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 12px;
}

.lock-input-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.lock-input {
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 10px;
  font-size: 20px;
  width: 130px;
  text-align: center;
  outline: none;
}

.lock-error-msg {
  color: var(--color-danger-dark);
  font-size: 14px;
  font-weight: bold;
  margin-top: 12px;
}

.refresh-lock {
  text-decoration: underline;
  cursor: pointer;
  color: var(--color-primary);
}

/* Dashboard styling */
.parents-dashboard-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 600px) {
  .stats-overview-grid {
    grid-template-columns: 1fr;
  }
}

.overview-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-width: 3px;
}

.ov-icon {
  font-size: 36px;
}

.ov-details {
  display: flex;
  flex-direction: column;
}

.ov-val {
  font-size: 22px;
  font-weight: 900;
  color: var(--color-text);
}

.ov-label {
  font-size: 12px;
  color: var(--color-text-light);
  font-weight: bold;
}

.charts-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .charts-row {
    flex-direction: column;
  }
}

.chart-box {
  flex: 1;
  border-width: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-title {
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  border-bottom: 2px dashed var(--color-text);
  padding-bottom: 8px;
  margin-bottom: 16px;
  color: var(--color-text);
}

.svg-chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.pie-svg {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.06));
}

.accuracy-summary {
  display: flex;
  gap: 16px;
  font-weight: bold;
  font-size: 14px;
}

.color-success {
  color: var(--color-success-dark);
}

.color-danger {
  color: var(--color-danger-dark);
}

.suggestions-box {
  flex: 1.2;
  border-width: 3px;
}

.suggestion-content {
  font-size: 16px;
  line-height: 1.6;
  color: hsl(210, 20%, 30%);
}

.weak-points-section {
  border-width: 3px;
}

.empty-weak-msg {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-success-dark);
  text-align: center;
  padding: 16px;
}

.weak-levels-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weak-level-item {
  border-left: 5px solid var(--color-danger);
  background-color: hsl(354, 80%, 98%);
  padding: 12px 16px;
  border-radius: var(--border-radius-sm);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.weak-lvl-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weak-lvl-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text);
}

.weak-lvl-badge {
  font-size: 12px;
  font-weight: bold;
  background-color: hsl(354, 90%, 90%);
  color: var(--color-danger-dark);
  border: 2px solid var(--color-danger-dark);
  border-radius: 6px;
  padding: 1px 6px;
}

.weak-lvl-desc {
  font-size: 14px;
  color: hsl(210, 20%, 35%);
  line-height: 1.4;
}

@media (max-width: 600px) {
  .parents-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .parents-title {
    font-size: 20px;
    width: 100%;
    order: 3;
    text-align: center;
    margin-top: 4px;
  }
  .parent-lock-card {
    padding: 20px 16px;
  }
  .lock-question {
    font-size: 28px;
    padding: 8px;
    margin-bottom: 16px;
  }
  .lock-input-row {
    flex-direction: column;
    align-items: center;
  }
  .lock-input {
    width: 100%;
    max-width: 200px;
  }
}
</style>
