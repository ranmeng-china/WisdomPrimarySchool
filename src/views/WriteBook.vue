<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { StrokePoint } from '../types';
import { drawSmoothStrokes } from '../utils/canvasHelper';
import GameButton from '../components/common/GameButton.vue';

const router = useRouter();

const currentTab = ref<'digits' | 'formulas' | 'units'>('digits');
const selectedTemplate = ref('3');

const tabs = [
  { id: 'digits', label: '写数字' },
  { id: 'formulas', label: '写算式' },
  { id: 'units', label: '写单位' }
] as const;

const templates = {
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  formulas: ['3+2=5', '8-3=5', '8+5=13', '10-6=4', '15-7=8'],
  units: ['元', '角', '分', '点', '分', '时']
};

const templateList = computed(() => templates[currentTab.value]);

// Canvas states
const templateCanvasRef = ref<HTMLCanvasElement | null>(null);
const drawCanvasRef = ref<HTMLCanvasElement | null>(null);
const strokes = ref<StrokePoint[][]>([]);
const currentStroke = ref<StrokePoint[]>([]);
const isDrawing = ref(false);

// Gallery state
const gallery = ref<string[]>([]);

onMounted(() => {
  loadGallery();
  initCanvas();
});

watch([selectedTemplate, currentTab], () => {
  strokes.value = [];
  initCanvas();
});

const initCanvas = () => {
  if (!templateCanvasRef.value || !drawCanvasRef.value) return;

  const ctxTemplate = templateCanvasRef.value.getContext('2d');
  const ctxDraw = drawCanvasRef.value.getContext('2d');
  if (!ctxTemplate || !ctxDraw) return;

  ctxTemplate.clearRect(0, 0, 320, 320);
  ctxDraw.clearRect(0, 0, 320, 320);

  // Red grid background
  ctxTemplate.strokeStyle = 'rgba(230, 80, 80, 0.4)';
  ctxTemplate.lineWidth = 3;
  ctxTemplate.strokeRect(0, 0, 320, 320);

  ctxTemplate.lineWidth = 1.5;
  ctxTemplate.beginPath();
  ctxTemplate.setLineDash([8, 6]);
  ctxTemplate.moveTo(160, 0);
  ctxTemplate.lineTo(160, 320);
  ctxTemplate.moveTo(0, 160);
  ctxTemplate.lineTo(320, 160);
  ctxTemplate.stroke();

  // Diagonal dash lines
  ctxTemplate.beginPath();
  ctxTemplate.moveTo(0, 0);
  ctxTemplate.lineTo(320, 320);
  ctxTemplate.moveTo(320, 0);
  ctxTemplate.lineTo(0, 320);
  ctxTemplate.stroke();
  ctxTemplate.setLineDash([]);

  // Render template text
  ctxTemplate.fillStyle = 'rgba(160, 160, 160, 0.3)';
  const len = selectedTemplate.value.length;
  const fontSize = len > 5 ? '44px' : len > 3 ? '64px' : '200px';
  ctxTemplate.font = `bold ${fontSize} sans-serif`;
  ctxTemplate.textAlign = 'center';
  ctxTemplate.textBaseline = 'middle';
  ctxTemplate.fillText(selectedTemplate.value, 160, 160);
};

const redrawHandwriting = () => {
  if (!drawCanvasRef.value) return;
  const ctx = drawCanvasRef.value.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, 320, 320);
  strokes.value.forEach(stroke => {
    drawSmoothStrokes(ctx, stroke, '#2c3e50', 10);
  });
};

const getEventCoords = (e: MouseEvent | TouchEvent): StrokePoint => {
  if (!drawCanvasRef.value) return { x: 0, y: 0, timestamp: 0 };
  const rect = drawCanvasRef.value.getBoundingClientRect();
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

  const x = ((clientX - rect.left) / rect.width) * 320;
  const y = ((clientY - rect.top) / rect.height) * 320;
  return { x, y, timestamp: Date.now() };
};

const startDrawing = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  isDrawing.value = true;
  const pt = getEventCoords(e);
  currentStroke.value = [pt];
};

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !drawCanvasRef.value) return;
  e.preventDefault();
  const pt = getEventCoords(e);
  currentStroke.value.push(pt);

  const ctx = drawCanvasRef.value.getContext('2d');
  if (!ctx) return;

  redrawHandwriting();
  drawSmoothStrokes(ctx, currentStroke.value, '#2c3e50', 10);
};

const stopDrawing = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return;
  e.preventDefault();
  isDrawing.value = false;

  if (currentStroke.value.length > 1) {
    strokes.value.push([...currentStroke.value]);
  }
  currentStroke.value = [];
  redrawHandwriting();
};

const undo = () => {
  strokes.value.pop();
  redrawHandwriting();
};

const clearCanvas = () => {
  strokes.value = [];
  redrawHandwriting();
};

const loadGallery = () => {
  const data = localStorage.getItem('math_game_writings');
  if (data) {
    try {
      gallery.value = JSON.parse(data);
    } catch (e) {
      gallery.value = [];
    }
  }
};

const saveBestWriting = () => {
  if (strokes.value.length === 0) return;

  // Create combined canvas to export image with background grid + user writing
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 320;
  tempCanvas.height = 320;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;

  // Fill white background
  tempCtx.fillStyle = '#ffffff';
  tempCtx.fillRect(0, 0, 320, 320);

  // Copy template layout
  if (templateCanvasRef.value) {
    tempCtx.drawImage(templateCanvasRef.value, 0, 0);
  }
  // Copy handwriting layout
  if (drawCanvasRef.value) {
    tempCtx.drawImage(drawCanvasRef.value, 0, 0);
  }

  const base64 = tempCanvas.toDataURL('image/png');
  gallery.value.unshift(base64);
  if (gallery.value.length > 6) {
    gallery.value.pop(); // keep top 6 best works
  }
  localStorage.setItem('math_game_writings', JSON.stringify(gallery.value));
  clearCanvas();
};

const deleteGalleryItem = (idx: number) => {
  gallery.value.splice(idx, 1);
  localStorage.setItem('math_game_writings', JSON.stringify(gallery.value));
};

const selectTemplate = (tmpl: string) => {
  selectedTemplate.value = tmpl;
};

const selectTab = (tabId: 'digits' | 'formulas' | 'units') => {
  currentTab.value = tabId;
  selectedTemplate.value = templates[tabId][0];
};
</script>

<template>
  <div class="write-book-container game-container">
    <header class="book-header">
      <GameButton type="default" size="sm" @click="router.push('/')">返回首页</GameButton>
      <h1 class="book-title">
        <ruby>数<rt>shù</rt>学<rt>xué</rt>练<rt>liàn</rt>写<rt>xiě</rt>本<rt>běn</rt></ruby>
      </h1>
      <div style="width: 80px"></div>
    </header>

    <main class="book-main">
      <!-- Tabs Selector -->
      <div class="tabs-bar">
        <GameButton
          v-for="tab in tabs"
          :key="tab.id"
          :type="currentTab === tab.id ? 'primary' : 'default'"
          size="sm"
          class="tab-btn"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </GameButton>
      </div>

      <!-- Templates Pool -->
      <div class="templates-pool card">
        <div class="templates-scroll-box">
          <GameButton
            v-for="tmpl in templateList"
            :key="tmpl"
            :type="selectedTemplate === tmpl ? 'warning' : 'default'"
            size="sm"
            class="tmpl-item-btn"
            @click="selectTemplate(tmpl)"
          >
            {{ tmpl }}
          </GameButton>
        </div>
      </div>

      <!-- Calligraphy Canvas Panel -->
      <div class="canvas-workspace card animate-pop-in">
        <div class="calligraphy-canvas-wrapper">
          <canvas
            ref="templateCanvasRef"
            width="320"
            height="320"
            class="c-layer t-layer"
          ></canvas>
          <canvas
            ref="drawCanvasRef"
            width="320"
            height="320"
            class="c-layer d-layer"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            @touchstart="startDrawing"
            @touchmove="draw"
            @touchend="stopDrawing"
          ></canvas>
        </div>

        <div class="controls-panel">
          <GameButton type="default" size="md" :disabled="strokes.length === 0" @click="undo">撤销 ↩️</GameButton>
          <GameButton type="danger" size="md" :disabled="strokes.length === 0" @click="clearCanvas">清空 🗑️</GameButton>
          <GameButton type="success" size="md" :disabled="strokes.length === 0" @click="saveBestWriting">保存佳作 📸</GameButton>
        </div>
      </div>

      <!-- Gallery of Best Writings -->
      <div v-if="gallery.length > 0" class="gallery-section card animate-pop-in">
        <h3 class="gallery-title">💖 我的最佳作品展示墙</h3>
        <div class="gallery-grid">
          <div v-for="(img, idx) in gallery" :key="idx" class="gallery-item-card">
            <img :src="img" class="gallery-thumb" alt="Handwriting achievement" />
            <button class="delete-gallery-btn" @click="deleteGalleryItem(idx)">×</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.write-book-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.book-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.book-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-purple-dark);
}

.book-main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tabs-bar {
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.tab-btn {
  flex: 1;
  max-width: 150px;
  font-size: 16px;
  border-width: 3px;
}

.templates-pool {
  padding: 16px;
  border-width: 3px;
}

.templates-scroll-box {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  width: 100%;
}

.tmpl-item-btn {
  flex-shrink: 0;
  min-width: 60px;
  height: 48px;
  font-size: 18px;
  border-width: 2.5px;
}

.canvas-workspace {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-width: 4px;
}

.calligraphy-canvas-wrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
  overflow: hidden;
  background-color: white;
}

.c-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.t-layer {
  z-index: 1;
}

.d-layer {
  z-index: 2;
  cursor: crosshair;
  touch-action: none;
}

.controls-panel {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 450px;
}

.controls-panel button {
  flex: 1;
  font-size: 16px;
}

.gallery-section {
  padding: 20px;
  border-width: 3px;
}

.gallery-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--color-text);
  border-bottom: 2px dashed var(--color-text);
  padding-bottom: 8px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 16px;
  justify-items: center;
}

.gallery-item-card {
  position: relative;
  width: 110px;
  height: 110px;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  background-color: white;
  transition: transform 0.2s;
}

.gallery-item-card:hover {
  transform: scale(1.05);
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.delete-gallery-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  background-color: var(--color-danger);
  color: white;
  border: 2px solid var(--color-text);
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

@media (max-width: 600px) {
  .book-header {
    flex-wrap: wrap;
    gap: 8px;
  }
  .book-title {
    font-size: 20px;
    width: 100%;
    order: 3;
    text-align: center;
    margin-top: 4px;
  }
  .tab-btn {
    font-size: 14px;
    padding: 6px 12px;
  }
  .controls-panel {
    gap: 8px;
  }
  .controls-panel button {
    font-size: 13px;
    padding: 8px 4px;
  }
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 12px;
  }
  .gallery-item-card {
    width: 90px;
    height: 90px;
  }
}
</style>
