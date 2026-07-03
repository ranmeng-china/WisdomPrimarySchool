<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { Question, StrokePoint } from '../../types';
import { drawSmoothStrokes } from '../../utils/canvasHelper';
import GameButton from '../common/GameButton.vue';

const props = defineProps<{
  question: Question;
  modelValue: boolean | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean | null): void;
}>();

const targetText = computed(() => {
  return String(props.question.answer || '3');
});

const templateCanvas = ref<HTMLCanvasElement | null>(null);
const drawCanvas = ref<HTMLCanvasElement | null>(null);

const strokes = ref<StrokePoint[][]>([]);
const currentStroke = ref<StrokePoint[]>([]);
const isDrawing = ref(false);

const initCanvases = () => {
  if (!templateCanvas.value || !drawCanvas.value) return;

  const ctxTemplate = templateCanvas.value.getContext('2d');
  const ctxDraw = drawCanvas.value.getContext('2d');
  if (!ctxTemplate || !ctxDraw) return;

  // Clear templates
  ctxTemplate.clearRect(0, 0, 300, 300);
  ctxDraw.clearRect(0, 0, 300, 300);

  // Draw grid background on template
  ctxTemplate.strokeStyle = 'rgba(230, 100, 100, 0.3)';
  ctxTemplate.lineWidth = 2;
  
  // Outer border
  ctxTemplate.strokeRect(0, 0, 300, 300);

  // Dashed cross lines
  ctxTemplate.beginPath();
  ctxTemplate.setLineDash([6, 6]);
  ctxTemplate.moveTo(150, 0);
  ctxTemplate.lineTo(150, 300);
  ctxTemplate.moveTo(0, 150);
  ctxTemplate.lineTo(300, 150);
  ctxTemplate.stroke();
  ctxTemplate.setLineDash([]);

  // Draw semi-transparent gray target text
  ctxTemplate.fillStyle = 'rgba(180, 180, 180, 0.35)';
  ctxTemplate.font = 'bold 200px sans-serif';
  ctxTemplate.textAlign = 'center';
  ctxTemplate.textBaseline = 'middle';
  ctxTemplate.fillText(targetText.value, 150, 150);
};

onMounted(() => {
  initCanvases();
});

watch(() => props.question.id, () => {
  strokes.value = [];
  emit('update:modelValue', null);
  initCanvases();
});

const redrawDrawings = () => {
  if (!drawCanvas.value) return;
  const ctx = drawCanvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, 300, 300);
  strokes.value.forEach(stroke => {
    drawSmoothStrokes(ctx, stroke, '#2c3e50', 8);
  });
};

const getEventCoords = (e: MouseEvent | TouchEvent): StrokePoint => {
  if (!drawCanvas.value) return { x: 0, y: 0, timestamp: 0 };
  const rect = drawCanvas.value.getBoundingClientRect();
  let clientX = 0;
  let clientY = 0;

  if (window.TouchEvent && e instanceof TouchEvent) {
    if (e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
  } else {
    clientX = (e as MouseEvent).clientX;
    clientY = (e as MouseEvent).clientY;
  }

  // Calculate coordinates relative to canvas
  const x = ((clientX - rect.left) / rect.width) * 300;
  const y = ((clientY - rect.top) / rect.height) * 300;

  return { x, y, timestamp: Date.now() };
};

const startDrawing = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  isDrawing.value = true;
  const pt = getEventCoords(e);
  currentStroke.value = [pt];
};

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !drawCanvas.value) return;
  e.preventDefault();
  const pt = getEventCoords(e);
  currentStroke.value.push(pt);

  const ctx = drawCanvas.value.getContext('2d');
  if (!ctx) return;

  // Real-time smooth render
  redrawDrawings();
  drawSmoothStrokes(ctx, currentStroke.value, '#2c3e50', 8);
};

const stopDrawing = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return;
  e.preventDefault();
  isDrawing.value = false;

  if (currentStroke.value.length > 1) {
    strokes.value.push([...currentStroke.value]);
    emit('update:modelValue', true);
  }
  currentStroke.value = [];
  redrawDrawings();
};

const undo = () => {
  strokes.value.pop();
  if (strokes.value.length === 0) {
    emit('update:modelValue', null);
  }
  redrawDrawings();
};

const clearDrawing = () => {
  strokes.value = [];
  emit('update:modelValue', null);
  redrawDrawings();
};
</script>

<template>
  <div class="write-question">
    <div class="question-stem" v-html="question.stem"></div>
    <p class="write-tip">提示：用鼠标或手指在红田字格内描红书写。</p>

    <div class="canvas-wrapper">
      <!-- Bottom Layer Canvas (Template text + grid lines) -->
      <canvas
        ref="templateCanvas"
        width="300"
        height="300"
        class="canvas-layer template-layer"
      ></canvas>

      <!-- Top Layer Canvas (User handwriting capture) -->
      <canvas
        ref="drawCanvas"
        width="300"
        height="300"
        class="canvas-layer drawing-layer"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart="startDrawing"
        @touchmove="draw"
        @touchend="stopDrawing"
      ></canvas>
    </div>

    <div class="canvas-controls">
      <GameButton type="warning" size="sm" :disabled="strokes.length === 0" @click="undo">
        撤销一笔 ↩️
      </GameButton>
      <GameButton type="danger" size="sm" :disabled="strokes.length === 0" @click="clearDrawing">
        清除全部 🗑️
      </GameButton>
    </div>
  </div>
</template>

<style scoped>
.write-question {
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

.write-tip {
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 24px;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
  border: 5px solid var(--color-text);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  background-color: white;
  margin-bottom: 24px;
  overflow: hidden;
}

.canvas-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.template-layer {
  z-index: 1;
}

.drawing-layer {
  z-index: 2;
  cursor: crosshair;
  touch-action: none; /* Prevent scroll while writing */
}

.canvas-controls {
  display: flex;
  gap: 16px;
}

.canvas-controls button {
  min-width: 120px;
}

@media (max-width: 600px) {
  .question-stem {
    font-size: 20px;
  }
  .canvas-controls {
    gap: 8px;
  }
  .canvas-controls button {
    min-width: 100px;
    font-size: 13px;
  }
}
</style>
