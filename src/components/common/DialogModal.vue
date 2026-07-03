<script setup lang="ts">
import { watch } from 'vue';

const props = withDefaults(
  defineProps<{
    show: boolean;
    title?: string;
    closeOnOverlay?: boolean;
  }>(),
  {
    closeOnOverlay: true,
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close();
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-card card animate-pop-in" @click.stop>
      <div class="modal-header">
        <h2 v-if="title" class="modal-title">{{ title }}</h2>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 24px;
  color: var(--color-text);
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-text);
  line-height: 1;
  padding: 0 4px;
  transition: transform 0.1s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.close-btn:active {
  transform: scale(0.9);
}

.modal-body {
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
