<script setup lang="ts">
import { ref, computed } from 'vue';
import { Question } from '../../types';
import GameButton from '../common/GameButton.vue';

const props = defineProps<{
  question: Question;
  modelValue: Record<string, string> | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, string> | null): void;
}>();

const selectedOption = ref<string | null>(null);

const mappings = computed({
  get: () => props.modelValue || {},
  set: (val) => emit('update:modelValue', val)
});

// Click-to-move interaction helper
const selectOption = (opt: string) => {
  if (selectedOption.value === opt) {
    selectedOption.value = null; // deselect
  } else {
    selectedOption.value = opt;
  }
};

const assignToTarget = (targetName: string) => {
  if (selectedOption.value) {
    const updated = { ...mappings.value };
    updated[selectedOption.value] = targetName;
    mappings.value = updated;
    selectedOption.value = null; // reset
  }
};

const removeMapping = (opt: string) => {
  const updated = { ...mappings.value };
  delete updated[opt];
  mappings.value = Object.keys(updated).length > 0 ? updated : null;
};

// Drag and drop HTML5 APIs
const onDragStart = (evt: DragEvent, opt: string) => {
  if (evt.dataTransfer) {
    evt.dataTransfer.setData('text/plain', opt);
    selectedOption.value = opt;
  }
};

const onDrop = (evt: DragEvent, targetName: string) => {
  const opt = evt.dataTransfer?.getData('text/plain') || selectedOption.value;
  if (opt) {
    const updated = { ...mappings.value };
    updated[opt] = targetName;
    mappings.value = updated;
    selectedOption.value = null;
  }
};

const getItemsInTarget = (targetName: string) => {
  return Object.entries(mappings.value)
    .filter(([_, t]) => t === targetName)
    .map(([opt, _]) => opt);
};

const unassignedOptions = computed(() => {
  const allOpts = props.question.assets?.options || [];
  const assigned = Object.keys(mappings.value);
  return allOpts.filter(o => !assigned.includes(o));
});
</script>

<template>
  <div class="drag-question">
    <div class="question-stem" v-html="question.stem"></div>
    <p class="drag-tip">提示：点选下方卡片，再点击分类框；或者直接拖拽卡片。</p>

    <!-- Targets dropzones -->
    <div class="targets-container">
      <div
        v-for="target in question.assets?.targets || []"
        :key="target"
        class="target-box"
        @dragover.prevent
        @drop="onDrop($event, target)"
        @click="assignToTarget(target)"
      >
        <h3 class="target-title">{{ target }}</h3>
        <div class="target-slot">
          <div
            v-for="item in getItemsInTarget(target)"
            :key="item"
            class="placed-card animate-pop-in"
            @click.stop="removeMapping(item)"
          >
            {{ item }}
            <span class="remove-icon">×</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Options pool -->
    <div class="options-pool">
      <div
        v-for="opt in unassignedOptions"
        :key="opt"
        draggable="true"
        class="draggable-card"
        :class="{ 'is-selected': selectedOption === opt }"
        @dragstart="onDragStart($event, opt)"
        @click="selectOption(opt)"
      >
        {{ opt }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.drag-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.question-stem {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  line-height: 1.8;
  color: var(--color-text);
}

.drag-tip {
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.targets-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
}

.target-box {
  flex: 1;
  min-width: 250px;
  min-height: 180px;
  background-color: hsl(35, 30%, 94%);
  border: 4px dashed var(--color-text);
  border-radius: var(--border-radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.target-box:hover {
  background-color: hsl(35, 30%, 90%);
}

.target-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-text);
  padding-bottom: 6px;
}

.target-slot {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  padding: 8px;
}

.options-pool {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  min-height: 80px;
  background-color: white;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.draggable-card, .placed-card {
  padding: 12px 20px;
  background-color: var(--color-warning);
  color: var(--color-text);
  font-size: 20px;
  font-weight: bold;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  cursor: grab;
  box-shadow: 0 4px 0 var(--color-warning-dark);
  transition: transform 0.1s;
  user-select: none;
}

.draggable-card:active {
  cursor: grabbing;
}

.draggable-card.is-selected {
  transform: scale(1.05) translateY(-4px);
  border-color: var(--color-primary-dark);
  box-shadow: 0 4px 0 var(--color-primary-dark);
  background-color: hsl(38, 98%, 70%);
}

.placed-card {
  cursor: pointer;
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 0 var(--color-primary-dark);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  padding: 6px 12px;
}

.remove-icon {
  font-weight: bold;
  font-size: 16px;
  color: white;
}
</style>
