<script setup lang="ts">
import { computed } from 'vue';
import { Question } from '../../types';
import GameButton from '../common/GameButton.vue';

const props = defineProps<{
  question: Question;
  modelValue: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | null): void;
}>();

const formula = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val)
});

const pressKey = (key: string) => {
  formula.value = formula.value + key;
};

const backspace = () => {
  if (formula.value.length > 0) {
    formula.value = formula.value.slice(0, -1);
  }
};

const clearFormula = () => {
  formula.value = '';
};

// Cute visual generator based on question IDs/stems
const visualFruits = computed(() => {
  const qId = props.question.id;
  if (qId === 'q_m3_l1_3') {
    return {
      left: Array(2).fill('😊'),
      right: Array(3).fill('😊'),
      type: 'add'
    };
  }
  if (qId === 'q_m3_l1_7') {
    return {
      left: Array(4).fill('⚽'),
      right: [],
      type: 'sub',
      subCount: 3
    };
  }
  if (qId === 'q_m3_l3_3') {
    return {
      left: Array(7).fill('🌸'),
      right: [],
      type: 'sub',
      subCount: 4
    };
  }
  if (qId === 'q_m3_l3_8') {
    return {
      left: Array(8).fill('🍎'),
      right: [],
      type: 'sub',
      subCount: 5
    };
  }
  if (qId === 'q_m2_l2_3') {
    return {
      left: Array(3).fill('🍎'),
      right: Array(1).fill('🍎'),
      type: 'add'
    };
  }
  if (qId === 'q_m2_l2_7') {
    return {
      left: Array(5).fill('▲'),
      right: [],
      type: 'sub',
      subCount: 2
    };
  }
  return null;
});
</script>

<template>
  <div class="diagram-question">
    <div class="question-stem" v-html="question.stem"></div>

    <!-- Cute visual graphics representation -->
    <div v-if="visualFruits" class="diagram-visual-board animate-pop-in">
      <div class="visual-container">
        <div class="visual-group left-group">
          <div
            v-for="(emoji, idx) in visualFruits.left"
            :key="'left-' + idx"
            class="emoji-item"
            :class="{ 'is-crossed': visualFruits.type === 'sub' && idx >= (visualFruits.left.length - (visualFruits.subCount || 0)) }"
          >
            {{ emoji }}
            <span v-if="visualFruits.type === 'sub' && idx >= (visualFruits.left.length - (visualFruits.subCount || 0))" class="cross-line">❌</span>
          </div>
        </div>

        <div v-if="visualFruits.right.length > 0" class="visual-plus-sign">➕</div>

        <div v-if="visualFruits.right.length > 0" class="visual-group right-group">
          <div v-for="(emoji, idx) in visualFruits.right" :key="'right-' + idx" class="emoji-item">
            {{ emoji }}
          </div>
        </div>
      </div>
    </div>

    <!-- Input display box -->
    <div class="formula-box-wrapper">
      <div class="formula-display-slots">
        <template v-if="formula.length === 0">
          <span class="slot-placeholder">点击下方键盘列出算式</span>
        </template>
        <template v-else>
          <span v-for="(char, idx) in formula" :key="idx" class="formula-char animate-pop-in">
            {{ char }}
          </span>
        </template>
      </div>
      <GameButton type="danger" size="sm" class="clear-btn" @click="clearFormula">清空</GameButton>
    </div>

    <!-- Arithmetic keyboard -->
    <div class="diagram-keyboard">
      <div class="keyboard-row">
        <GameButton v-for="n in ['1', '2', '3', '4', '5']" :key="n" type="default" class="key-btn" @click="pressKey(n)">{{ n }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton v-for="n in ['6', '7', '8', '9', '0']" :key="n" type="default" class="key-btn" @click="pressKey(n)">{{ n }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton v-for="op in ['+', '-', '=']" :key="op" type="primary" class="key-btn op-btn" @click="pressKey(op)">{{ op }}</GameButton>
        <GameButton type="warning" class="key-btn action-btn" @click="backspace">退格</GameButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagram-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.question-stem {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.8;
  color: var(--color-text);
}

.diagram-visual-board {
  background-color: white;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  padding: 16px 30px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.visual-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.visual-group {
  display: flex;
  gap: 12px;
}

.emoji-item {
  font-size: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-item.is-crossed {
  opacity: 0.7;
}

.cross-line {
  position: absolute;
  font-size: 32px;
  color: red;
  pointer-events: none;
}

.visual-plus-sign {
  font-size: 28px;
  font-weight: bold;
  color: var(--color-text-light);
}

.formula-box-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
}

.formula-display-slots {
  flex: 1;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  background-color: white;
  min-height: 60px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  overflow-x: auto;
}

.slot-placeholder {
  font-size: 16px;
  color: var(--color-text-light);
  font-weight: bold;
}

.formula-char {
  font-size: 28px;
  font-weight: 900;
  color: var(--color-text);
  background-color: hsl(198, 90%, 95%);
  border: 2px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0 var(--color-text);
}

.clear-btn {
  height: 52px;
  font-size: 16px;
  border-width: 3px;
  white-space: nowrap;
}

.diagram-keyboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 360px;
  background: hsl(0, 0%, 94%);
  padding: 16px;
  border-radius: var(--border-radius-md);
  border: 4px solid var(--color-text);
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.key-btn {
  flex: 1;
  height: 56px;
  font-size: 22px;
  font-weight: bold;
  border-radius: var(--border-radius-sm);
}

.op-btn {
  background-color: var(--color-primary);
  color: white;
}

.action-btn {
  flex: 2;
  font-size: 18px;
}
</style>
