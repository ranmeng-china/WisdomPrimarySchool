<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'default';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  }>(),
  {
    type: 'primary',
    size: 'md',
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const isPressed = ref(false);

const colorClass = computed(() => `btn-${props.type}`);
const sizeClass = computed(() => `btn-${props.size}`);

const handleStart = () => {
  if (props.disabled) return;
  isPressed.value = true;
};

const handleEnd = () => {
  if (props.disabled) return;
  isPressed.value = false;
};

const handleLeave = () => {
  isPressed.value = false;
};

const handleClick = (e: Event) => {
  if (props.disabled) return;
  emit('click', e);
};
</script>

<template>
  <button
    class="game-button"
    :class="[colorClass, sizeClass, { 'is-pressed': isPressed, 'is-disabled': disabled }]"
    :disabled="disabled"
    @touchstart="handleStart"
    @touchend="handleEnd"
    @mousedown="handleStart"
    @mouseup="handleEnd"
    @mouseleave="handleLeave"
    @click="handleClick"
  >
    <span class="btn-inner">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.game-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: transform 0.1s ease;
  position: relative;
  font-weight: bold;
}

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 14px;
}

.btn-md {
  padding: 10px 20px;
  font-size: 18px;
  border-radius: var(--border-radius-sm);
}

.btn-lg {
  padding: 14px 28px;
  font-size: 24px;
  border-radius: var(--border-radius-md);
  border-width: 4px;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 0 var(--color-primary-dark);
}

.btn-success {
  background-color: var(--color-success);
  color: white;
  box-shadow: 0 4px 0 var(--color-success-dark);
}

.btn-warning {
  background-color: var(--color-warning);
  color: var(--color-text);
  box-shadow: 0 4px 0 var(--color-warning-dark);
}

.btn-danger {
  background-color: var(--color-danger);
  color: white;
  box-shadow: 0 4px 0 var(--color-danger-dark);
}

.btn-purple {
  background-color: var(--color-purple);
  color: white;
  box-shadow: 0 4px 0 var(--color-purple-dark);
}

.btn-default {
  background-color: white;
  color: var(--color-text);
  box-shadow: 0 4px 0 hsl(0, 0%, 80%);
}

.game-button:not(.is-disabled):active,
.game-button.is-pressed:not(.is-disabled) {
  transform: translateY(4px);
  box-shadow: none;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
</style>
