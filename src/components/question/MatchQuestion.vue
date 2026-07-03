<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { Question } from '../../types';
import GameButton from '../common/GameButton.vue';

const props = defineProps<{
  question: Question;
  modelValue: Record<string, string> | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, string> | null): void;
}>();

const leftItems = computed(() => props.question.assets?.options || []);
const rightItems = computed(() => props.question.assets?.targets || []);

const selectedLeft = ref<string | null>(null);
const selectedRight = ref<string | null>(null);

const mappings = computed({
  get: () => props.modelValue || {},
  set: (val) => emit('update:modelValue', val)
});

const containerRef = ref<HTMLElement | null>(null);
const leftItemRefs = ref<Record<string, HTMLElement>>({});
const rightItemRefs = ref<Record<string, HTMLElement>>({});

const resizeObserver = ref<ResizeObserver | null>(null);
const forceUpdateVal = ref(0);

const triggerRedraw = () => {
  forceUpdateVal.value += 1;
};

onMounted(() => {
  nextTick(() => {
    triggerRedraw();
  });
  if (typeof window !== 'undefined' && containerRef.value) {
    resizeObserver.value = new ResizeObserver(() => {
      triggerRedraw();
    });
    resizeObserver.value.observe(containerRef.value);
    window.addEventListener('resize', triggerRedraw);
  }
});

onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', triggerRedraw);
  }
});

const selectLeft = (item: string) => {
  selectedLeft.value = item;
  checkAndMatch();
};

const selectRight = (item: string) => {
  selectedRight.value = item;
  checkAndMatch();
};

const checkAndMatch = () => {
  if (selectedLeft.value && selectedRight.value) {
    const updated = { ...mappings.value };
    Object.entries(updated).forEach(([k, v]) => {
      if (v === selectedRight.value) {
        delete updated[k];
      }
    });
    updated[selectedLeft.value] = selectedRight.value;
    mappings.value = updated;

    selectedLeft.value = null;
    selectedRight.value = null;
    nextTick(() => triggerRedraw());
  }
};

const removeMapping = (left: string) => {
  const updated = { ...mappings.value };
  delete updated[left];
  mappings.value = Object.keys(updated).length > 0 ? updated : null;
  nextTick(() => triggerRedraw());
};

const getLineCoordinates = computed(() => {
  const _ = forceUpdateVal.value;

  if (!containerRef.value) return [];

  const containerRect = containerRef.value.getBoundingClientRect();
  const lines: Array<{ fromX: number; fromY: number; toX: number; toY: number; leftKey: string }> = [];

  Object.entries(mappings.value).forEach(([leftVal, rightVal]) => {
    const leftEl = leftItemRefs.value[leftVal];
    const rightEl = rightItemRefs.value[rightVal];

    if (leftEl && rightEl) {
      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      const fromX = leftRect.right - containerRect.left;
      const fromY = leftRect.top + leftRect.height / 2 - containerRect.top;

      const toX = rightRect.left - containerRect.left;
      const toY = rightRect.top + rightRect.height / 2 - containerRect.top;

      lines.push({ fromX, fromY, toX, toY, leftKey: leftVal });
    }
  });

  return lines;
});

const setLeftRef = (el: any, key: string) => {
  if (el) leftItemRefs.value[key] = el.$el || el;
};

const setRightRef = (el: any, key: string) => {
  if (el) rightItemRefs.value[key] = el.$el || el;
};

const isEmojiOnly = (str: string): boolean => {
  const emojiRegex = /^[\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff\uFE0F\s]+$/;
  const cleanStr = str.replace(/<[^>]+>/g, '').trim();
  return cleanStr !== '' && emojiRegex.test(cleanStr);
};
</script>

<template>
  <div class="match-question">
    <div class="question-stem" v-html="question.stem"></div>
    <p class="match-tip">提示：点击左边一张卡片，再点击右边一张卡片进行连线。</p>

    <div ref="containerRef" class="match-columns-container">
      <svg class="connections-svg">
        <line
          v-for="line in getLineCoordinates"
          :key="line.leftKey"
          :x1="line.fromX"
          :y1="line.fromY"
          :x2="line.toX"
          :y2="line.toY"
          class="connection-line"
          @click="removeMapping(line.leftKey)"
        />
      </svg>

      <div class="match-column left-column">
        <GameButton
          v-for="item in leftItems"
          :key="item"
          :ref="(el) => setLeftRef(el, item)"
          :type="selectedLeft === item ? 'success' : mappings[item] ? 'primary' : 'default'"
          class="match-card"
          @click="selectLeft(item)"
        >
          <span :class="{ 'is-emoji': isEmojiOnly(item) }" v-html="item"></span>
        </GameButton>
      </div>

      <div class="match-column right-column">
        <GameButton
          v-for="item in rightItems"
          :key="item"
          :ref="(el) => setRightRef(el, item)"
          :type="selectedRight === item ? 'success' : Object.values(mappings).includes(item) ? 'primary' : 'default'"
          class="match-card"
          @click="selectRight(item)"
        >
          <span :class="{ 'is-emoji': isEmojiOnly(item) }" v-html="item"></span>
        </GameButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-question {
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

.match-tip {
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.match-columns-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  position: relative;
  gap: 80px;
  padding: 10px 0;
}

.connections-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 1;
}

.connection-line {
  stroke: var(--color-purple);
  stroke-width: 6;
  stroke-linecap: round;
  cursor: pointer;
  transition: stroke 0.2s, stroke-width 0.2s;
}

.connection-line:hover {
  stroke: var(--color-danger);
  stroke-width: 8;
}

.match-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  z-index: 2;
}

.match-card {
  width: 100%;
  min-height: 64px;
  font-size: 18px;
  border-width: 3px;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.is-emoji {
  font-size: 38px;
  line-height: 1;
}

:deep(ruby) {
  ruby-position: over;
  font-size: 18px;
}

:deep(rt) {
  font-size: 11px;
  color: var(--color-text-light);
}
</style>
