<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { modulesList, levelsList, getQuestionsByLevel } from '../data/questions';
import GameButton from '../components/common/GameButton.vue';
import StarRating from '../components/common/StarRating.vue';

const router = useRouter();
const progressStore = useProgressStore();

onMounted(() => {
  progressStore.loadFromStorage();
});

const isUnlocked = (levelId: string) => {
  const idx = levelsList.findIndex(l => l.id === levelId);
  if (idx === 0) return true; // first level is always unlocked
  const prevLevel = levelsList[idx - 1];
  return progressStore.progress.completedLevelIds.includes(prevLevel.id);
};

const getStars = (levelId: string) => {
  return progressStore.progress.starsByLevel[levelId] || 0;
};

const goBack = () => {
  router.push('/');
};

const selectLevel = (levelId: string) => {
  if (isUnlocked(levelId)) {
    router.push(`/level/${levelId}`);
  }
};

const getLevelsByModule = (moduleId: string) => {
  return levelsList.filter(l => l.moduleId === moduleId);
};
</script>

<template>
  <div class="level-map-container game-container">
    <header class="map-header">
      <GameButton type="default" size="sm" @click="goBack">返回首页</GameButton>
      <h1 class="map-title">
        <ruby>关<rt>guān</rt>卡<rt>qiǎ</rt>地<rt>dì</rt>图<rt>tú</rt></ruby>
      </h1>
      <div class="header-stars">
        🌟 {{ progressStore.progress.completedLevelIds.length }} / {{ levelsList.length }} 关已通关
      </div>
    </header>

    <main class="map-main">
      <div v-for="mod in modulesList" :key="mod.id" class="module-island card animate-pop-in">
        <div class="island-header">
          <span class="island-icon">{{ mod.icon }}</span>
          <div class="island-title-group">
            <h2 class="island-name">
              <ruby>{{ mod.name.slice(0, 2) }}<rt>{{ mod.pinyin.split(' ').slice(0, 2).join('') }}</rt>{{ mod.name.slice(2) }}<rt>{{ mod.pinyin.split(' ').slice(2).join('') }}</rt></ruby>
            </h2>
          </div>
        </div>

        <div class="levels-path">
          <div
            v-for="lvl in getLevelsByModule(mod.id)"
            :key="lvl.id"
            class="level-node"
            :class="{ 'is-locked': !isUnlocked(lvl.id), 'is-completed': progressStore.progress.completedLevelIds.includes(lvl.id) }"
            @click="selectLevel(lvl.id)"
          >
            <div class="node-circle animate-pulse">
              <span v-if="!isUnlocked(lvl.id)" class="lock-icon">🔒</span>
              <span v-else class="node-number">{{ levelsList.findIndex(l => l.id === lvl.id) + 1 }}</span>
            </div>
            <div class="node-details">
              <div class="level-pinyin">{{ lvl.pinyin }}</div>
              <div class="level-name">{{ lvl.name }}</div>
              <div v-if="isUnlocked(lvl.id)" class="node-stars">
                <StarRating :rating="getStars(lvl.id)" :max-stars="3" class="mini-stars" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.level-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.map-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.map-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-purple-dark);
}

.header-stars {
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 6px 12px;
}

.map-main {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.module-island {
  border-width: 4px;
  background-color: var(--color-card-bg);
}

.island-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  border-bottom: 3px dashed var(--color-text);
  padding-bottom: 12px;
}

.island-icon {
  font-size: 40px;
}

.island-name {
  font-size: 26px;
  font-weight: bold;
  color: var(--color-text);
}

.levels-path {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  justify-items: center;
}

.level-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 150px;
  padding: 10px;
  border-radius: var(--border-radius-md);
  border: 3px solid transparent;
  transition: transform 0.2s, border-color 0.2s;
}

.level-node:not(.is-locked):hover {
  transform: scale(1.05) translateY(-4px);
  border-color: var(--color-primary);
  background-color: hsl(198, 90%, 97%);
}

.node-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid var(--color-text);
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}

.is-locked .node-circle {
  background-color: hsl(0, 0%, 80%);
  color: hsl(0, 0%, 50%);
  cursor: not-allowed;
  box-shadow: none;
}

.is-completed .node-circle {
  background-color: var(--color-success);
}

.level-pinyin {
  font-size: 11px;
  color: var(--color-text-light);
  line-height: 1.1;
  margin-bottom: 2px;
}

.level-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 6px;
}

.mini-stars {
  transform: scale(0.85);
}

.is-locked {
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 600px) {
  .map-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .map-title {
    font-size: 20px;
    width: 100%;
    order: 3;
    text-align: center;
    margin-top: 4px;
  }
  .header-stars {
    font-size: 13px;
    padding: 4px 8px;
    border-width: 2px;
  }
  .island-name {
    font-size: 20px;
  }
  .levels-path {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
  .level-node {
    width: 120px;
    padding: 6px;
  }
  .node-circle {
    width: 52px;
    height: 52px;
    font-size: 18px;
    border-width: 3px;
  }
  .level-name {
    font-size: 14px;
  }
  .level-pinyin {
    font-size: 9px;
  }
}
</style>
