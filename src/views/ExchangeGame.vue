<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePetStore } from '../stores/pet';
import { useWalletStore } from '../stores/wallet';
import GameButton from '../components/common/GameButton.vue';

const router = useRouter();
const petStore = usePetStore();
const walletStore = useWalletStore();

const depositedFen = ref(0);
const depositedJiao = ref(0);
const animateBank = ref(false);

onMounted(() => {
  petStore.loadFromStorage();
  walletStore.syncFromPetStore();
});

// Click coin to send into piggy bank directly
const depositFen = () => {
  if (walletStore.wallet.fen > 0) {
    walletStore.wallet.fen -= 1;
    depositedFen.value += 1;
    walletStore.syncToPetStore();
    checkSynthesis();
  }
};

const depositJiao = () => {
  if (walletStore.wallet.jiao > 0) {
    walletStore.wallet.jiao -= 1;
    depositedJiao.value += 1;
    walletStore.syncToPetStore();
    checkSynthesis();
  }
};

const checkSynthesis = () => {
  if (depositedFen.value >= 10) {
    depositedFen.value -= 10;
    // Synthesize 1 Jiao
    walletStore.wallet.jiao += 1;
    walletStore.syncToPetStore();
    triggerAnimate();
  }
  
  if (depositedJiao.value >= 10) {
    depositedJiao.value -= 10;
    // Synthesize 1 Yuan
    walletStore.wallet.yuan += 1;
    walletStore.syncToPetStore();
    triggerAnimate();
  }
};

const triggerAnimate = () => {
  animateBank.value = true;
  setTimeout(() => {
    animateBank.value = false;
  }, 1000);
};

// Drag and drop APIs
const onDragStart = (evt: DragEvent, type: 'fen' | 'jiao') => {
  if (evt.dataTransfer) {
    evt.dataTransfer.setData('text/plain', type);
  }
};

const onDrop = (evt: DragEvent) => {
  const type = evt.dataTransfer?.getData('text/plain');
  if (type === 'fen') {
    depositFen();
  } else if (type === 'jiao') {
    depositJiao();
  }
};

const refundAll = () => {
  walletStore.wallet.fen += depositedFen.value;
  walletStore.wallet.jiao += depositedJiao.value;
  depositedFen.value = 0;
  depositedJiao.value = 0;
  walletStore.syncToPetStore();
};
</script>

<template>
  <div class="exchange-container game-container">
    <header class="exchange-header">
      <GameButton type="default" size="sm" @click="router.push('/pet')">返回小屋</GameButton>
      <h1 class="exchange-title">🪙 人民币换算小游戏</h1>
      <div style="width: 80px"></div>
    </header>

    <main class="exchange-main">
      <p class="exchange-tip">
        提示：拖拽硬币，或者点击它们把硬币放进“存钱罐”。集满 10 个会自动兑换哦！
      </p>

      <div class="exchange-workspace">
        <!-- Coin Bag -->
        <div class="coin-bag card animate-pop-in">
          <h3>💰 零钱包</h3>
          <div class="coin-bag-grid">
            <!-- 1 Fen Coin -->
            <div 
              class="coin-item fen-coin"
              :class="{ 'is-empty': walletStore.wallet.fen === 0 }"
              draggable="true"
              @dragstart="onDragStart($event, 'fen')"
              @click="depositFen"
            >
              <div class="coin-shape">1分</div>
              <span class="coin-count">x {{ walletStore.wallet.fen }}</span>
            </div>

            <!-- 1 Jiao Coin -->
            <div 
              class="coin-item jiao-coin"
              :class="{ 'is-empty': walletStore.wallet.jiao === 0 }"
              draggable="true"
              @dragstart="onDragStart($event, 'jiao')"
              @click="depositJiao"
            >
              <div class="coin-shape">1角</div>
              <span class="coin-count">x {{ walletStore.wallet.jiao }}</span>
            </div>
            
            <!-- 1 Yuan Paper Note (display only) -->
            <div class="paper-item yuan-paper">
              <div class="paper-shape">1元</div>
              <span class="coin-count">x {{ walletStore.wallet.yuan }}</span>
            </div>
          </div>
        </div>

        <!-- Piggy Bank Dropzone -->
        <div 
          class="piggy-bank-box card animate-pop-in"
          :class="{ 'is-flashing': animateBank }"
          @dragover.prevent
          @drop="onDrop"
        >
          <div class="bank-animation-wrapper">
            <span class="bank-emoji">🏺</span>
            <div v-if="animateBank" class="sparkles animate-pop-in">✨ 合成成功！ 🪙</div>
          </div>

          <div class="deposit-counter-status">
            <h4>存钱罐里有：</h4>
            <p>1分硬币: <strong>{{ depositedFen }} / 10</strong></p>
            <p>1角硬币: <strong>{{ depositedJiao }} / 10</strong></p>
          </div>

          <GameButton 
            v-if="depositedFen > 0 || depositedJiao > 0"
            type="warning" 
            size="sm" 
            class="refund-btn"
            @click="refundAll"
          >
            拿回零钱
          </GameButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.exchange-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.exchange-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.exchange-title {
  font-size: 26px;
  font-weight: bold;
  color: var(--color-text);
}

.exchange-main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exchange-tip {
  font-size: 15px;
  color: var(--color-text-light);
  text-align: center;
  font-weight: bold;
}

.exchange-workspace {
  display: flex;
  gap: 24px;
}

@media (max-width: 768px) {
  .exchange-workspace {
    flex-direction: column;
  }
}

.coin-bag, .piggy-bank-box {
  flex: 1;
  padding: 24px;
  border-width: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coin-bag h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--color-text);
}

.coin-bag-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.coin-item, .paper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: grab;
  user-select: none;
}

.coin-item.is-empty {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.coin-shape {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 4px solid var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 4px 0 rgba(0,0,0,0.15);
  transition: transform 0.1s;
}

.coin-shape:active {
  cursor: grabbing;
}

.fen-coin .coin-shape {
  background-color: hsl(38, 70%, 65%); /* copper bronze */
  color: white;
}

.jiao-coin .coin-shape {
  background-color: hsl(0, 0%, 85%); /* silver */
  color: var(--color-text);
}

.paper-item {
  cursor: default;
}

.paper-shape {
  width: 96px;
  height: 60px;
  border: 4px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  background-color: hsl(145, 60%, 75%); /* green banknote */
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 4px 0 rgba(0,0,0,0.15);
}

.coin-count {
  font-size: 14px;
  font-weight: bold;
}

.piggy-bank-box {
  background-color: hsl(35, 30%, 96%);
  transition: background-color 0.2s, transform 0.2s;
}

.piggy-bank-box.is-flashing {
  background-color: hsl(38, 98%, 85%);
  transform: scale(1.03);
}

.bank-animation-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.bank-emoji {
  font-size: 100px;
}

.sparkles {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-success);
  color: white;
  padding: 6px 12px;
  border-radius: var(--border-radius-sm);
  font-weight: bold;
  font-size: 16px;
  border: 3px solid var(--color-text);
  box-shadow: 0 4px 0 var(--color-success-dark);
  white-space: nowrap;
}

.deposit-counter-status {
  width: 100%;
  background-color: white;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 12px 20px;
  margin-bottom: 16px;
}

.deposit-counter-status h4 {
  margin-bottom: 8px;
  border-bottom: 2px dashed var(--color-text-light);
  padding-bottom: 4px;
}

.deposit-counter-status p {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.refund-btn {
  width: 120px;
  height: 38px;
  font-size: 14px;
  border-width: 2.5px;
}
</style>
