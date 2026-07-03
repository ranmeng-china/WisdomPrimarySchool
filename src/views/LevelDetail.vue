<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { levelsList, modulesList, getQuestionsByLevel } from '../data/questions';
import GameButton from '../components/common/GameButton.vue';
import StarRating from '../components/common/StarRating.vue';

const route = useRoute();
const router = useRouter();
const progressStore = useProgressStore();

const levelId = computed(() => String(route.params.id));

const levelInfo = computed(() => {
  return levelsList.find(l => l.id === levelId.value);
});

const moduleInfo = computed(() => {
  if (!levelInfo.value) return null;
  return modulesList.find(m => m.id === levelInfo.value!.moduleId);
});

const levelQuestions = computed(() => {
  return getQuestionsByLevel(levelId.value);
});

const stars = computed(() => {
  return progressStore.progress.starsByLevel[levelId.value] || 0;
});

const difficultyLabel = computed(() => {
  if (levelQuestions.value.length === 0) return '中等';
  const diff = levelQuestions.value[0].difficulty;
  if (diff === 'basic') return '简单';
  if (diff === 'medium') return '中等';
  return '困难';
});

onMounted(() => {
  progressStore.loadFromStorage();
});

const goBack = () => {
  router.push('/map');
};

const startPlay = () => {
  router.push(`/play/${levelId.value}`);
};
</script>

<template>
  <div class="level-detail-container game-container">
    <div v-if="levelInfo" class="detail-card card animate-pop-in">
      <div class="module-tag" v-if="moduleInfo">
        <span class="module-icon">{{ moduleInfo.icon }}</span>
        <span>{{ moduleInfo.name }}</span>
      </div>

      <h1 class="level-title">
        <div class="pinyin">{{ levelInfo.pinyin }}</div>
        <div class="name">{{ levelInfo.name }}</div>
      </h1>

      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-label">题量</div>
          <div class="stat-value">{{ levelQuestions.length }} 题</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">难度</div>
          <div class="stat-value">{{ difficultyLabel }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">最高星级</div>
          <div class="stat-value">
            <StarRating :rating="stars" :max-stars="3" />
          </div>
        </div>
      </div>

      <div class="knowledge-points">
        <h3>💡 知识点</h3>
        <p>掌握 {{ levelInfo.name }} 相关的基础概念，完成即时答题练习，为下一阶段的学习打好坚实基础！</p>
      </div>

      <div class="actions-row">
        <GameButton type="default" size="lg" @click="goBack">返回地图</GameButton>
        <GameButton type="success" size="lg" @click="startPlay">开始闯关 🎮</GameButton>
      </div>
    </div>
    <div v-else class="error-card card animate-pop-in">
      <p>找不到该关卡信息！</p>
      <GameButton type="default" size="md" @click="goBack">返回地图</GameButton>
    </div>
  </div>
</template>

<style scoped>
.level-detail-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.detail-card {
  width: 100%;
  max-width: 600px;
  padding: 40px 30px;
  border-width: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.module-tag {
  background-color: hsl(198, 90%, 92%);
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 6px 16px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.level-title {
  text-align: center;
  margin-bottom: 30px;
}

.level-title .pinyin {
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.2;
}

.level-title .name {
  font-size: 32px;
  font-weight: 900;
  color: var(--color-text);
}

.stats-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-top: 3px dashed var(--color-text);
  border-bottom: 3px dashed var(--color-text);
  padding: 20px 0;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-light);
  font-weight: bold;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
}

.knowledge-points {
  width: 100%;
  background-color: hsl(35, 40%, 96%);
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 16px 20px;
  margin-bottom: 30px;
}

.knowledge-points h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--color-text);
}

.knowledge-points p {
  font-size: 16px;
  line-height: 1.5;
  color: hsl(210, 30%, 35%);
}

.actions-row {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
}

.actions-row button {
  flex: 1;
  max-width: 200px;
}

.error-card {
  text-align: center;
  padding: 30px;
  border-width: 4px;
}
</style>
