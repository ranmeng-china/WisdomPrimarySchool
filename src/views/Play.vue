<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { usePetStore } from '../stores/pet';
import { useWalletStore } from '../stores/wallet';
import { getQuestionsByLevel, levelsList } from '../data/questions';
import { judgeAnswer } from '../utils/judgeHelper';
import { speakText } from '../utils/speechHelper';
import ProgressBar from '../components/common/ProgressBar.vue';
import GameButton from '../components/common/GameButton.vue';
import StarRating from '../components/common/StarRating.vue';
import DialogModal from '../components/common/DialogModal.vue';

import ChoiceQuestion from '../components/question/ChoiceQuestion.vue';
import FillQuestion from '../components/question/FillQuestion.vue';
import DragQuestion from '../components/question/DragQuestion.vue';
import MatchQuestion from '../components/question/MatchQuestion.vue';
import DiagramQuestion from '../components/question/DiagramQuestion.vue';
import WriteQuestion from '../components/question/WriteQuestion.vue';

import { useSettingsStore } from '../stores/settings';

const route = useRoute();
const router = useRouter();

const progressStore = useProgressStore();
const petStore = usePetStore();
const walletStore = useWalletStore();
const settingsStore = useSettingsStore();

const levelId = computed(() => String(route.params.levelId));

const levelQuestions = ref<any[]>([]);
const currentIndex = ref(0);
const userAnswer = ref<any>(null);
const checked = ref(false);
const isCorrect = ref(false);
const errorCount = ref(0);
const levelMistakesMap = ref<Record<string, boolean>>({});

const showQuitDialog = ref(false);
const showResultDialog = ref(false);
const earnedCoins = ref(0);
const earnedExp = ref(0);
const calculatedStars = ref(0);

const shieldTriggered = ref(false);

const updatePet = (mood: 'idle' | 'happy' | 'sad' | 'cheer', text: string) => {};

const currentQuestion = computed(() => {
  return levelQuestions.value[currentIndex.value] || null;
});

const speakCurrentQuestion = () => {
  if (currentQuestion.value) {
    speakText(currentQuestion.value.stem);
  }
};

const loadLevel = () => {
  const allQs = getQuestionsByLevel(levelId.value);
  levelQuestions.value = allQs.slice(0, settingsStore.questionLimit);
  currentIndex.value = 0;
  userAnswer.value = null;
  checked.value = false;
  isCorrect.value = false;
  errorCount.value = 0;
  levelMistakesMap.value = {};
  
  updatePet('cheer', '<ruby>小<rt>xiǎo</rt>主<rt>zhǔ</rt>人<rt>rén</rt></ruby>，<ruby>我<rt>wǒ</rt>们<rt>men</rt>一<rt>yī</rt>起<rt>qǐ</rt>加<rt>jiā</rt>油<rt>yóu</rt>闯<rt>chuǎng</rt>关<rt>guān</rt>吧<rt>ba</rt></ruby>！🐾');
  setTimeout(() => {
    speakCurrentQuestion();
  }, 200);
};

onMounted(() => {
  progressStore.loadFromStorage();
  petStore.loadFromStorage();
  walletStore.syncFromPetStore();
  settingsStore.loadSettings();
  loadLevel();
});

onUnmounted(() => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});

const handleQuit = () => {
  showQuitDialog.value = true;
};

const confirmQuit = () => {
  router.push('/map');
};

const checkAnswer = () => {
  if (!currentQuestion.value || checked.value) return;

  const correct = judgeAnswer(currentQuestion.value, userAnswer.value);
  checked.value = true;
  isCorrect.value = correct;

  if (correct) {
    progressStore.recordAnswer(
      currentQuestion.value.moduleId,
      currentQuestion.value.id,
      levelId.value,
      true
    );

    if (!levelMistakesMap.value[currentQuestion.value.id]) {
      earnedCoins.value += 10;
      earnedExp.value += 10;
      petStore.addExp(10);
      walletStore.addEarnings(10);
    }

    updatePet('happy', '<ruby>太<rt>tài</rt>棒<rt>bàng</rt>啦<rt>la</rt></ruby>！<ruby>答<rt>dá</rt>对<rt>duì</rt>啦<rt>la</rt></ruby>！🎉');

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  } else {
    errorCount.value += 1;
    levelMistakesMap.value[currentQuestion.value.id] = true;
    
    progressStore.recordAnswer(
      currentQuestion.value.moduleId,
      currentQuestion.value.id,
      levelId.value,
      false,
      userAnswer.value,
      currentQuestion.value.answer
    );

    const currentShields = petStore.pet.shieldCount;
    petStore.deductExp(5);
    if (currentShields > 0 && petStore.pet.shieldCount < currentShields) {
      shieldTriggered.value = true;
    }

    updatePet('sad', '<ruby>没<rt>méi</rt>关<rt>guān</rt>系<rt>xi</rt></ruby>，<ruby>再<rt>zài</rt>想<rt>xiǎng</rt>一<rt>yī</rt>想<rt>xiǎng</rt>哦<rt>o</rt></ruby>！💡');
  }
};

const nextQuestion = () => {
  checked.value = false;
  isCorrect.value = false;
  shieldTriggered.value = false;
  userAnswer.value = null;

  if (currentIndex.value < levelQuestions.value.length - 1) {
    currentIndex.value += 1;
    updatePet('cheer', '<ruby>加<rt>jiā</rt>油<rt>yóu</rt></ruby>！<ruby>下<rt>xià</rt>一<rt>yī</rt>题<rt>tí</rt>来<rt>lái</rt>啦<rt>la</rt></ruby>！✨');
    setTimeout(() => {
      speakCurrentQuestion();
    }, 200);
  } else {
    finishLevel();
  }
};

const finishLevel = () => {
  let stars = 3;
  if (errorCount.value >= 3) {
    stars = 1;
  } else if (errorCount.value > 0) {
    stars = 2;
  }
  calculatedStars.value = stars;

  progressStore.recordLevelCompletion(levelId.value, stars);
  showResultDialog.value = true;
  updatePet('happy', '<ruby>太<rt>tài</rt>厉<rt>lì</rt>害<rt>hai</rt>啦<rt>la</rt></ruby>，<ruby>我<rt>wǒ</rt>们<rt>men</rt>通<rt>tōng</rt>关<rt>guān</rt>了<rt>le</rt></ruby>！🏆');
};

const retryLevel = () => {
  showResultDialog.value = false;
  earnedCoins.value = 0;
  earnedExp.value = 0;
  loadLevel();
};

const nextLevel = () => {
  const currentIdx = levelsList.findIndex(l => l.id === levelId.value);
  const nextLvl = levelsList[currentIdx + 1];
  if (nextLvl) {
    router.push(`/play/${nextLvl.id}`).then(() => {
      loadLevel();
    });
  } else {
    router.push('/map');
  }
  showResultDialog.value = false;
};

const goBackToMap = () => {
  router.push('/map');
};

const tryAgainOnCurrent = () => {
  checked.value = false;
  isCorrect.value = false;
  shieldTriggered.value = false;
  userAnswer.value = null;
  updatePet('cheer', '<ruby>加<rt>jiā</rt>油<rt>yóu</rt></ruby>！<ruby>再<rt>zài</rt>试<rt>shì</rt>一<rt>yī</rt>次<rt>cì</rt></ruby>！🐾');
};
</script>

<template>
  <div class="play-container game-container" v-if="currentQuestion">
    <header class="play-header">
      <GameButton type="danger" size="sm" @click="handleQuit">退出</GameButton>
      <div class="progress-wrapper">
        <ProgressBar :value="currentIndex + 1" :max="levelQuestions.length" />
        <span class="progress-text">{{ currentIndex + 1 }} / {{ levelQuestions.length }}</span>
      </div>
      <div class="play-widgets">
        <span class="widget-item">🪙 {{ walletStore.wallet.yuan }}元{{ walletStore.wallet.jiao }}角{{ walletStore.wallet.fen }}分</span>
        <span class="widget-item" title="每日免错盾牌">🛡️ {{ petStore.pet.shieldCount }}</span>
      </div>
    </header>

    <main class="play-main card animate-pop-in">
      <div class="speak-btn-container">
        <GameButton type="success" size="sm" class="speak-btn" @click="speakCurrentQuestion">
          🔊 <ruby>听<rt>tīng</rt>题<rt>tí</rt></ruby>
        </GameButton>
      </div>

      <component
        :is="
          currentQuestion.type === 'choice' ? ChoiceQuestion :
          currentQuestion.type === 'fill' ? FillQuestion :
          currentQuestion.type === 'drag' ? DragQuestion :
          currentQuestion.type === 'match' ? MatchQuestion :
          currentQuestion.type === 'diagram' ? DiagramQuestion : WriteQuestion
        "
        :question="currentQuestion"
        v-model="userAnswer"
      />
    </main>

    <footer class="play-footer">
      <div v-if="checked && isCorrect" class="feedback-toast is-success animate-pop-in">
        <span class="toast-icon">✨</span>
        <span class="toast-message">太棒了！答对啦！</span>
      </div>

      <div v-if="checked && !isCorrect" class="feedback-toast is-danger animate-pop-in">
        <span class="toast-icon">💡</span>
        <div class="toast-details">
          <span class="toast-message">再想一想，你可以的！</span>
          <span v-if="shieldTriggered" class="shield-alert">🛡️ 盾牌保护生效，免除经验扣减！</span>
        </div>
        <GameButton type="warning" size="sm" @click="tryAgainOnCurrent">修改答案</GameButton>
      </div>

      <GameButton
        v-if="!checked"
        type="primary"
        size="lg"
        class="check-btn"
        :disabled="userAnswer === null || userAnswer === undefined"
        @click="checkAnswer"
      >
        检查答案 🔍
      </GameButton>
    </footer>

    <DialogModal :show="showQuitDialog" title="退出确认">
      <p class="dialog-body-text">确认要退出本次闯关吗？进度不会被保存哦。</p>
      <template #footer>
        <GameButton type="default" size="md" @click="showQuitDialog = false">继续答题</GameButton>
        <GameButton type="danger" size="md" @click="confirmQuit">确认退出</GameButton>
      </template>
    </DialogModal>

    <DialogModal :show="showResultDialog" title="闯关成功！" class="result-dialog">
      <div class="result-dialog-content">
        <div class="stars-earned-wrapper">
          <StarRating :rating="calculatedStars" :max-stars="3" size="lg" />
        </div>
        <div class="earnings-summary">
          <div class="earning-row">
            <span class="earning-icon">🪙</span>
            <span class="earning-val">+{{ earnedCoins }} 分</span>
          </div>
          <div class="earning-row">
            <span class="earning-icon">✨</span>
            <span class="earning-val">+{{ earnedExp }} 经验</span>
          </div>
        </div>
      </div>
      <template #footer>
        <GameButton type="default" size="md" @click="goBackToMap">返回地图</GameButton>
        <GameButton type="warning" size="md" @click="retryLevel">再练一次</GameButton>
        <GameButton type="success" size="md" @click="nextLevel">下一关 🚀</GameButton>
      </template>
    </DialogModal>
  </div>
</template>

<style scoped>
.play-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  min-height: 100vh;
  padding-bottom: 120px;
}

.play-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.progress-wrapper {
  flex: 1;
  margin: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-text {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.play-widgets {
  display: flex;
  gap: 12px;
}

.widget-item {
  font-size: 15px;
  font-weight: bold;
  background-color: white;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 4px 10px;
}

.play-main {
  width: 100%;
  max-width: 800px;
  min-height: 380px;
  padding: 30px;
  border-width: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.speak-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: -10px;
}

.speak-btn {
  border-width: 3px !important;
  font-size: 14px;
}

.play-footer {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80px;
}

.check-btn {
  width: 100%;
  max-width: 300px;
  border-width: 4px;
  border-radius: var(--border-radius-md);
}

.feedback-toast {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
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
  font-size: 32px;
}

.toast-message {
  font-size: 20px;
  font-weight: bold;
}

.toast-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.shield-alert {
  font-size: 14px;
  margin-top: 4px;
  color: hsl(38, 98%, 85%);
  font-weight: bold;
}

.dialog-body-text {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
}

.result-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
}

.stars-earned-wrapper {
  transform: scale(1.3);
  margin: 15px 0;
}

.earnings-summary {
  display: flex;
  gap: 30px;
  background-color: hsl(35, 40%, 96%);
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 12px 24px;
  width: 100%;
  max-width: 320px;
  justify-content: center;
}

.earning-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text);
}

@media (max-width: 600px) {
  .play-container {
    padding-bottom: 100px;
    gap: 12px;
  }
  .play-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .progress-wrapper {
    order: 3;
    width: 100%;
    margin: 4px 0 0 0;
  }
  .play-widgets {
    gap: 6px;
  }
  .widget-item {
    font-size: 13px;
    padding: 2px 6px;
    border-width: 2px;
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
    font-size: 16px;
  }
  .toast-icon {
    font-size: 24px;
  }
  .earnings-summary {
    gap: 16px;
    padding: 8px 16px;
  }
  .earning-row {
    font-size: 15px;
  }
}
</style>
