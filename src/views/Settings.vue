<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingsStore } from '../stores/settings';
import GameButton from '../components/common/GameButton.vue';
import DialogModal from '../components/common/DialogModal.vue';

const router = useRouter();
const settingsStore = useSettingsStore();

const showResetWarning = ref(false);
const showResetDoubleWarning = ref(false);

onMounted(() => {
  settingsStore.loadSettings();
});

const saveSettings = () => {
  settingsStore.saveSettings();
  router.push('/');
};

const triggerReset = () => {
  showResetWarning.value = true;
};

const confirmFirstWarning = () => {
  showResetWarning.value = false;
  showResetDoubleWarning.value = true;
};

const performFullReset = () => {
  localStorage.clear();
  showResetDoubleWarning.value = false;
  window.location.reload();
};
</script>

<template>
  <div class="settings-container game-container">
    <header class="settings-header">
      <GameButton type="default" size="sm" @click="router.push('/')">返回首页</GameButton>
      <h1 class="settings-title">⚙️ 系统设置</h1>
      <div style="width: 80px"></div>
    </header>

    <main class="settings-main card animate-pop-in">
      <div class="setting-item">
        <span class="setting-label">🔊 游戏音效</span>
        <div class="toggle-wrapper">
          <GameButton
            :type="settingsStore.soundEnabled ? 'success' : 'default'"
            size="sm"
            @click="settingsStore.setSound(true)"
          >
            开启
          </GameButton>
          <GameButton
            :type="!settingsStore.soundEnabled ? 'danger' : 'default'"
            size="sm"
            @click="settingsStore.setSound(false)"
          >
            关闭
          </GameButton>
        </div>
      </div>

      <div class="setting-item">
        <span class="setting-label">✨ 动效与动画</span>
        <div class="toggle-wrapper">
          <GameButton
            :type="settingsStore.animationEnabled ? 'success' : 'default'"
            size="sm"
            @click="settingsStore.setAnimation(true)"
          >
            开启
          </GameButton>
          <GameButton
            :type="!settingsStore.animationEnabled ? 'danger' : 'default'"
            size="sm"
            @click="settingsStore.setAnimation(false)"
          >
            关闭
          </GameButton>
        </div>
      </div>

      <div class="setting-item">
        <span class="setting-label">📝 单关练习题量</span>
        <div class="limit-selector">
          <GameButton
            v-for="limit in [5, 10, 15]"
            :key="limit"
            :type="settingsStore.questionLimit === limit ? 'primary' : 'default'"
            size="sm"
            class="limit-btn"
            @click="settingsStore.setQuestionLimit(limit)"
          >
            {{ limit }} 题
          </GameButton>
        </div>
      </div>

      <div class="reset-section">
        <GameButton type="danger" size="lg" class="reset-danger-btn" @click="triggerReset">
          💥 重置所有游戏进度
        </GameButton>
        <p class="reset-hint">警告：这会清空你所有的通关记录、金币和宠物状态，且无法撤销！</p>
      </div>

      <div class="save-actions">
        <GameButton type="success" size="lg" class="save-btn" @click="saveSettings">
          保存并返回 💾
        </GameButton>
      </div>
    </main>

    <!-- First Warning Dialog -->
    <DialogModal :show="showResetWarning" title="⚠️ 确认重置进度吗？">
      <p class="warning-dialog-text">你确定要重置所有的数据吗？通关记录和辛苦赚的金币都会消失！</p>
      <template #footer>
        <GameButton type="default" size="md" @click="showResetWarning = false">点错了，取消</GameButton>
        <GameButton type="danger" size="md" @click="confirmFirstWarning">确认重置</GameButton>
      </template>
    </DialogModal>

    <!-- Double Warning Dialog -->
    <DialogModal :show="showResetDoubleWarning" title="🚨 绝对确定要重置吗？">
      <p class="warning-dialog-text">这是最后的警告！所有数据将被彻底删除，重新开始数学之旅。确认删除吗？</p>
      <template #footer>
        <GameButton type="default" size="md" @click="showResetDoubleWarning = false">悬崖勒马，取消</GameButton>
        <GameButton type="danger" size="md" @click="performFullReset">彻底删除并刷新</GameButton>
      </template>
    </DialogModal>
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.settings-header {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.settings-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-text);
}

.settings-main {
  width: 100%;
  max-width: 600px;
  padding: 30px;
  border-width: 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--color-text-light);
  padding-bottom: 16px;
}

.setting-label {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text);
}

.toggle-wrapper {
  display: flex;
  gap: 12px;
}

.toggle-wrapper button {
  width: 70px;
  height: 40px;
  font-size: 14px;
}

.limit-selector {
  display: flex;
  gap: 8px;
}

.limit-btn {
  width: 70px;
  height: 40px;
  font-size: 14px;
}

.reset-section {
  text-align: center;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 3px solid var(--color-text);
}

.reset-danger-btn {
  width: 100%;
  max-width: 320px;
  font-size: 18px;
  border-width: 3.5px;
}

.reset-hint {
  font-size: 12px;
  color: var(--color-text-light);
  margin-top: 10px;
  font-weight: bold;
}

.save-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.save-btn {
  width: 100%;
  max-width: 250px;
  border-width: 4px;
}

.warning-dialog-text {
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
}

@media (max-width: 600px) {
  .settings-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .settings-title {
    font-size: 20px;
    width: 100%;
    order: 3;
    text-align: center;
    margin-top: 4px;
  }
  .settings-main {
    padding: 20px 16px;
    gap: 16px;
  }
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-bottom: 12px;
  }
  .toggle-wrapper button, .limit-btn {
    height: 36px;
    font-size: 13px;
  }
  .reset-danger-btn {
    font-size: 16px;
  }
}
</style>
