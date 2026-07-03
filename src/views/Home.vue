<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { usePetStore } from '../stores/pet';
import { questions } from '../data/questions';
import GameButton from '../components/common/GameButton.vue';

const router = useRouter();
const progressStore = useProgressStore();
const petStore = usePetStore();

const petNameInput = ref('');
const petTypeSelect = ref<'cat' | 'dog'>('cat');

onMounted(() => {
  progressStore.loadFromStorage();
  petStore.loadFromStorage();
});

const isPetChosen = computed(() => !!petStore.pet.chosenPet);

const handleChoosePet = () => {
  const name = petNameInput.value.trim() || (petTypeSelect.value === 'cat' ? '小花猫' : '大黄狗');
  petStore.choosePet(petTypeSelect.value, name);
};

// Calculate next level to play
const nextLevelId = computed(() => {
  const completed = progressStore.progress.completedLevelIds;
  // Get all unique levelIds from questions list in order of declaration
  const allLevels = Array.from(new Set(questions.map(q => q.levelId)));
  const unfinished = allLevels.find(l => !completed.includes(l));
  return unfinished || allLevels[allLevels.length - 1] || 'm1_l1';
});

const startNextLevel = () => {
  router.push(`/play/${nextLevelId.value}`);
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="home-container game-container">
    <header class="home-header">
      <h1 class="game-title animate-bounce">
        <ruby>小<rt>xiǎo</rt>学<rt>xué</rt>趣<rt>qù</rt>味<rt>wèi</rt>数<rt>shù</rt>学<rt>xué</rt></ruby>
      </h1>
      
      <!-- Pet mini panel -->
      <div v-if="isPetChosen" class="pet-mini-card card animate-pop-in" @click="navigateTo('/pet')">
        <div class="pet-avatar-wrapper">
          <span class="pet-avatar-icon">{{ petStore.pet.chosenPet === 'cat' ? '🐱' : '🐶' }}</span>
        </div>
        <div class="pet-mini-details">
          <div class="pet-header-line">
            <span class="pet-name">{{ petStore.pet.name }}</span>
            <span class="pet-level">等级 {{ petStore.pet.level }}</span>
          </div>
          <div class="mini-status-bars">
            <div class="mini-bar-group">
              <span class="mini-bar-label">饱食</span>
              <div class="mini-progress-track">
                <div class="mini-progress-fill satiety-fill" :style="{ width: petStore.pet.satiety + '%' }"></div>
              </div>
            </div>
            <div class="mini-bar-group">
              <span class="mini-bar-label">清洁</span>
              <div class="mini-progress-track">
                <div class="mini-progress-fill cleanliness-fill" :style="{ width: petStore.pet.cleanliness + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="home-main">
      <!-- Pet Selection Section -->
      <div v-if="!isPetChosen" class="pet-choose-section card animate-pop-in">
        <h2>
          <ruby>选<rt>xuǎn</rt>择<rt>zé</rt>你<rt>nǐ</rt>的<rt>de</rt>宠<rt>chǒng</rt>物<rt>wù</rt></ruby>
        </h2>
        <div class="pet-selector">
          <div 
            class="pet-option-card" 
            :class="{ 'is-active': petTypeSelect === 'cat' }" 
            @click="petTypeSelect = 'cat'"
          >
            <div class="pet-big-avatar">🐱</div>
            <span>小花猫</span>
          </div>
          <div 
            class="pet-option-card" 
            :class="{ 'is-active': petTypeSelect === 'dog' }" 
            @click="petTypeSelect = 'dog'"
          >
            <div class="pet-big-avatar">🐶</div>
            <span>大黄狗</span>
          </div>
        </div>
        <div class="pet-name-section">
          <label for="pet-name-input">给宠物取个名字：</label>
          <input 
            id="pet-name-input"
            v-model="petNameInput" 
            type="text" 
            placeholder="例如：咪咪、豆豆..." 
            class="kids-input"
          />
        </div>
        <GameButton type="success" size="lg" class="choose-confirm-btn" @click="handleChoosePet">
          开启数学之旅
        </GameButton>
      </div>

      <!-- Action Panel -->
      <div v-else class="action-section">
        <div class="primary-btn-wrapper animate-pulse">
          <GameButton type="warning" size="lg" class="continue-btn" @click="startNextLevel">
            <span class="btn-large-text">继续闯关 🚀</span>
          </GameButton>
        </div>

        <div class="menu-grid">
          <div class="menu-item card" @click="navigateTo('/map')">
            <div class="menu-icon">🗺️</div>
            <span class="menu-label">关卡地图</span>
          </div>
          <div class="menu-item card" @click="navigateTo('/write')">
            <div class="menu-icon">✍️</div>
            <span class="menu-label">练写本</span>
          </div>
          <div class="menu-item card" @click="navigateTo('/mistakes')">
            <div class="menu-icon">📖</div>
            <span class="menu-label">错题本</span>
          </div>
          <div class="menu-item card" @click="navigateTo('/pet')">
            <div class="menu-icon">🏠</div>
            <span class="menu-label">宠物小屋</span>
          </div>
          <div class="menu-item card" @click="navigateTo('/parents')">
            <div class="menu-icon">🛡️</div>
            <span class="menu-label">家长端</span>
          </div>
          <div class="menu-item card" @click="navigateTo('/settings')">
            <div class="menu-icon">⚙️</div>
            <span class="menu-label">系统设置</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}

.home-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.game-title {
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  color: var(--color-purple-dark);
  text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.pet-mini-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  background-color: var(--color-card-bg);
  border-width: 3px;
}

.pet-avatar-wrapper {
  background-color: hsl(198, 90%, 92%);
  border: 3px solid var(--color-text);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.pet-mini-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pet-header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pet-name {
  font-weight: bold;
  font-size: 16px;
}

.pet-level {
  font-size: 12px;
  background-color: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
}

.mini-status-bars {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mini-bar-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-bar-label {
  font-size: 12px;
  width: 30px;
  color: var(--color-text-light);
}

.mini-progress-track {
  flex: 1;
  height: 8px;
  background-color: hsl(0, 0%, 90%);
  border-radius: 4px;
  overflow: hidden;
}

.mini-progress-fill {
  height: 100%;
  border-radius: 4px;
}

.satiety-fill {
  background-color: var(--color-success);
}

.cleanliness-fill {
  background-color: var(--color-primary);
}

.home-main {
  width: 100%;
  max-width: 800px;
}

.pet-choose-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
  border-width: 4px;
}

.pet-choose-section h2 {
  margin-bottom: 24px;
}

.pet-selector {
  display: flex;
  gap: 30px;
  margin-bottom: 24px;
}

.pet-option-card {
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s, background-color 0.2s;
  min-width: 120px;
}

.pet-option-card:hover {
  transform: scale(1.05);
}

.pet-option-card.is-active {
  background-color: var(--color-warning);
  transform: scale(1.08);
}

.pet-big-avatar {
  font-size: 64px;
}

.pet-name-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 24px;
  text-align: left;
}

.kids-input {
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 8px 16px;
  font-size: 18px;
  width: 100%;
  outline: none;
}

.choose-confirm-btn {
  width: 100%;
  max-width: 250px;
}

.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.primary-btn-wrapper {
  width: 100%;
  max-width: 360px;
}

.continue-btn {
  width: 100%;
  min-height: 80px;
  border-radius: var(--border-radius-lg);
  border-width: 4px;
}

.btn-large-text {
  font-size: 28px;
  font-weight: 900;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

@media (max-width: 600px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 1.1;
  cursor: pointer;
  border-width: 3px;
  transition: transform 0.2s;
}

.menu-item:hover {
  transform: scale(1.05) translateY(-4px);
}

.menu-icon {
  font-size: 40px;
}

.menu-label {
  font-size: 18px;
  font-weight: bold;
}
</style>
