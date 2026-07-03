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

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const selectOption = (opt: string) => {
  selected.value = opt;
};

const isEmojiOnly = (str: string): boolean => {
  const emojiRegex = /^[\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff\uFE0F\s]+$/;
  const cleanStr = str.replace(/<[^>]+>/g, '').trim();
  return cleanStr !== '' && emojiRegex.test(cleanStr);
};
</script>

<template>
  <div class="choice-question">
    <div class="question-stem" v-html="question.stem"></div>
    
    <div v-if="question.assets?.images && question.assets.images.length > 0" class="question-images">
      <img 
        v-for="(img, idx) in question.assets.images" 
        :key="idx" 
        :src="img" 
        class="stem-img" 
        alt="question illustration"
      />
    </div>
    <div v-else-if="question.assets?.emojis && question.assets.emojis.length > 0" class="question-emojis animate-pop-in">
      <div v-for="(emoji, idx) in question.assets.emojis" :key="idx" class="emoji-item-card">
        {{ emoji }}
      </div>
    </div>

    <div class="options-container">
      <GameButton
        v-for="opt in question.assets?.options || []"
        :key="opt"
        :type="selected === opt ? 'success' : 'default'"
        size="lg"
        class="option-card"
        @click="selectOption(opt)"
      >
        <span class="option-text" :class="{ 'is-emoji': isEmojiOnly(opt) }" v-html="opt"></span>
      </GameButton>
    </div>
  </div>
</template>

<style scoped>
.choice-question {
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

.question-images {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
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

.stem-img {
  max-width: 200px;
  max-height: 200px;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  object-fit: contain;
  background: white;
}

.options-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 600px;
}

.option-card {
  width: 100%;
  min-height: 70px;
  border-radius: var(--border-radius-md);
  border-width: 4px;
}

.option-text {
  font-size: 22px;
}

.option-text.is-emoji {
  font-size: 42px;
  line-height: 1;
}
</style>
