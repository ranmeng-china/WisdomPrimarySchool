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

const textVal = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val)
});

const pressKey = (key: string) => {
  textVal.value = textVal.value + key;
};

const backspace = () => {
  if (textVal.value.length > 0) {
    textVal.value = textVal.value.slice(0, -1);
  }
};

const clearAll = () => {
  textVal.value = '';
};

// Check if keyboard is helpful (usually all questions except pure text Chinese answers)
const isNumericOrMath = computed(() => {
  const ans = String(props.question.answer).trim();
  return /^[0-9+\-=.元角分及和或两个只只朵根本书岁]*$/.test(ans);
});
</script>

<template>
  <div class="fill-question">
    <div class="question-stem" v-html="question.stem"></div>

    <div v-if="question.assets?.emojis && question.assets.emojis.length > 0" class="question-emojis animate-pop-in">
      <div v-for="(emoji, idx) in question.assets.emojis" :key="idx" class="emoji-item-card">
        {{ emoji }}
      </div>
    </div>

    <div class="answer-display-box">
      <input
        v-model="textVal"
        type="text"
        class="kids-input"
        placeholder="点击输入答案"
        readonly
      />
      <GameButton type="danger" size="sm" class="clear-btn" @click="clearAll">清空</GameButton>
    </div>

    <div v-if="isNumericOrMath" class="custom-keyboard animate-pop-in">
      <div class="keyboard-row">
        <GameButton v-for="n in ['1', '2', '3']" :key="n" type="default" class="key-btn" @click="pressKey(n)">{{ n }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton v-for="n in ['4', '5', '6']" :key="n" type="default" class="key-btn" @click="pressKey(n)">{{ n }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton v-for="n in ['7', '8', '9']" :key="n" type="default" class="key-btn" @click="pressKey(n)">{{ n }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton type="default" class="key-btn" @click="pressKey('0')">0</GameButton>
        <GameButton type="default" class="key-btn" @click="pressKey('+')">+</GameButton>
        <GameButton type="default" class="key-btn" @click="pressKey('-')">-</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton v-for="char in ['元', '角', '分', '和']" :key="char" type="default" class="key-btn char-btn" @click="pressKey(char)">{{ char }}</GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton type="warning" class="key-btn action-btn" @click="backspace">退格</GameButton>
      </div>
    </div>
    
    <div v-else class="text-options">
      <!-- For questions like '大/小', '苹果/香蕉/橘子', etc. we can present quick selection buttons to make it easy -->
      <div class="keyboard-row flex-wrap">
        <GameButton
          v-for="word in ['大', '小', '同样多', '元', '角', '分', '西瓜', '苹果', '气球', '石头', '长颈鹿', '兔子', '小明', '小红']"
          :key="word"
          type="default"
          class="word-btn"
          @click="pressKey(word)"
        >
          {{ word }}
        </GameButton>
      </div>
      <div class="keyboard-row">
        <GameButton type="warning" class="key-btn action-btn" @click="backspace">退格</GameButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fill-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.question-stem {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.8;
  color: var(--color-text);
}

.question-emojis {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  background-color: #fef9e7;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  padding: 16px 24px;
  min-height: 80px;
  max-width: 600px;
}

.emoji-item-card {
  font-size: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.answer-display-box {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
}

.kids-input {
  flex: 1;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 12px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  outline: none;
  background-color: white;
}

.clear-btn {
  height: 52px;
  font-size: 16px;
  border-width: 3px;
}

.custom-keyboard, .text-options {
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

.flex-wrap {
  flex-wrap: wrap;
}

.key-btn {
  flex: 1;
  height: 56px;
  font-size: 20px;
  border-radius: var(--border-radius-sm);
}

.char-btn {
  font-size: 16px;
}

.word-btn {
  padding: 8px 12px;
  font-size: 16px;
  margin: 2px;
}

.action-btn {
  flex: 2;
  font-size: 18px;
}
</style>
