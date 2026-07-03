<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'purple';
    height?: string;
  }>(),
  {
    max: 100,
    color: 'primary',
    height: '24px',
  }
);

const percentage = computed(() => {
  const val = Math.max(0, Math.min(props.max, props.value));
  return props.max > 0 ? (val / props.max) * 100 : 0;
});

const progressColor = computed(() => `bg-${props.color}`);
</script>

<template>
  <div class="progress-container" :style="{ height: height }">
    <div
      class="progress-bar"
      :class="progressColor"
      :style="{ width: `${percentage}%` }"
    >
      <div class="progress-shine" />
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  background-color: hsl(0, 0%, 90%);
  border: 3px solid var(--color-text);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative;
}

.progress-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 35%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 999px;
}

.bg-primary {
  background-color: var(--color-primary);
}

.bg-success {
  background-color: var(--color-success);
}

.bg-warning {
  background-color: var(--color-warning);
}

.bg-danger {
  background-color: var(--color-danger);
}

.bg-purple {
  background-color: var(--color-purple);
}
</style>
