<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progress';
import { usePetStore } from '../stores/pet';
import { useWalletStore } from '../stores/wallet';
import GameButton from '../components/common/GameButton.vue';
import ProgressBar from '../components/common/ProgressBar.vue';

const router = useRouter();
const progressStore = useProgressStore();
const petStore = usePetStore();
const walletStore = useWalletStore();

// Animations
const petAnimation = ref<'idle' | 'happy' | 'bath'>('idle');

// Shop modal & Backpack feeding
const showShop = ref(false);
const showFeedSelector = ref(false);

// Bathing action
const isBathing = ref(false);

const shopItems = [
  { id: 'apple', name: '🍎 红苹果', satiety: 15, priceFen: 50, priceText: '5角' },
  { id: 'bone', name: '🍖 大骨头', satiety: 25, priceFen: 80, priceText: '8角' },
  { id: 'cookie', name: '🍪 魔法饼干', satiety: 40, priceFen: 150, priceText: '1元5角' }
];

onMounted(() => {
  progressStore.loadFromStorage();
  petStore.loadFromStorage();
  walletStore.syncFromPetStore();
});

// Evolution based on level map completed levels
const evolutionStage = computed(() => {
  const completed = progressStore.progress.completedLevelIds.length;
  if (completed >= 16) return { name: '完全体', icon: '👑', desc: '已经成长为威风的超级大宠物啦！' };
  if (completed >= 11) return { name: '成熟体', icon: '🦁', desc: '是个强壮帅气的成熟伙伴！' };
  if (completed >= 6) return { name: '成长体', icon: '🦊', desc: '活泼好动，成长飞快！' };
  return { name: '幼崽期', icon: '🍼', desc: '萌萌的小宝宝，需要你细心呵护。' };
});

// Unlockable Privileges based on level
const activePrivilege = computed(() => {
  const lvl = petStore.pet.level;
  if (lvl >= 8) return '商店 7 折优惠 + 幸运双倍金币';
  if (lvl >= 6) return '商店 8 折优惠';
  if (lvl >= 3) return '提示助手特权';
  return '免错盾牌保护';
});

// Purchase discount factor
const purchaseDiscount = computed(() => {
  const lvl = petStore.pet.level;
  if (lvl >= 8) return 0.7;
  if (lvl >= 6) return 0.8;
  return 1.0;
});

const getDiscountPrice = (priceFen: number) => {
  return Math.round(priceFen * purchaseDiscount.value);
};

const getDiscountPriceText = (priceFen: number) => {
  const discounted = getDiscountPrice(priceFen);
  const yuan = Math.floor(discounted / 100);
  const remaining = discounted % 100;
  const jiao = Math.floor(remaining / 10);
  const fen = remaining % 10;

  const parts = [];
  if (yuan > 0) parts.push(`${yuan}元`);
  if (jiao > 0) parts.push(`${jiao}角`);
  if (fen > 0) parts.push(`${fen}分`);
  return parts.join('') || '0分';
};

const handlePetClick = () => {
  if (petAnimation.value !== 'idle') return;
  petAnimation.value = 'happy';
  setTimeout(() => {
    petAnimation.value = 'idle';
  }, 1200);
};

const startBath = () => {
  if (petStore.pet.cleanliness >= 100) return;
  isBathing.value = true;
  petAnimation.value = 'bath';
  
  // Simulated brushing
  const timer = setInterval(() => {
    if (petStore.pet.cleanliness < 100) {
      petStore.cleanPet(10);
    } else {
      clearInterval(timer);
      isBathing.value = false;
      petAnimation.value = 'idle';
    }
  }, 300);
};

const feedPetFromBackpack = (itemId: string, recovery: number) => {
  if (petStore.pet.satiety >= 100) return;
  petStore.feedPet(itemId, recovery);
  petAnimation.value = 'happy';
  setTimeout(() => {
    petAnimation.value = 'idle';
  }, 1200);
};

const buyShopItem = (item: typeof shopItems[0]) => {
  const discountedFen = getDiscountPrice(item.priceFen);
  const priceYuan = Math.floor(discountedFen / 100);
  const remaining = discountedFen % 100;
  const priceJiao = Math.floor(remaining / 10);
  const priceFen = remaining % 10;

  const priceWallet = { yuan: priceYuan, jiao: priceJiao, fen: priceFen };

  const success = walletStore.purchaseItem(priceWallet, item.id);
  if (success) {
    // Buy success
  } else {
    alert('金币不够哦，快去答题赚钱吧！');
  }
};
</script>

<template>
  <div class="pet-house-container game-container" v-if="petStore.pet.chosenPet">
    <!-- Header panel -->
    <header class="house-header">
      <GameButton type="default" size="sm" @click="router.push('/')">返回首页</GameButton>
      <h1 class="house-title">🐱 {{ petStore.pet.name }} 的温馨小屋</h1>
      <div class="house-currency">
        🪙 {{ walletStore.wallet.yuan }}元{{ walletStore.wallet.jiao }}角{{ walletStore.wallet.fen }}分
      </div>
    </header>

    <main class="house-main">
      <!-- Pet animation display box -->
      <div class="pet-display-box card">
        <div class="evolution-badge" title="章节进度解锁的形态">
          <span class="evo-icon">{{ evolutionStage.icon }}</span>
          <span class="evo-name">{{ evolutionStage.name }}</span>
        </div>

        <!-- Animated pet wrapper -->
        <div 
          class="pet-avatar-character animate-bounce" 
          :class="[petAnimation, petStore.pet.chosenPet]" 
          @click="handlePetClick"
        >
          <!-- Cartoon Face / CSS shapes -->
          <div class="character-inner">
            <span class="character-emoji">{{ petStore.pet.chosenPet === 'cat' ? '🐱' : '🐶' }}</span>
            <div v-if="petAnimation === 'bath'" class="soap-bubbles">🧼🫧💧</div>
          </div>
        </div>

        <div class="pet-speech-bubble" v-if="petAnimation === 'bath'">正在洗香香中... 🛀</div>
        <div class="pet-speech-bubble" v-else-if="petAnimation === 'happy'">喵呜~ 好舒服！(exp+2)</div>
        <div class="pet-speech-bubble" v-else-if="petStore.pet.satiety < 40">肚子咕噜噜，想吃苹果啦 🍎</div>
        <div class="pet-speech-bubble" v-else>你好呀，我们今天一起学数学吧！</div>
      </div>

      <!-- Gauges & Privileges -->
      <div class="pet-details-panel card">
        <div class="gauge-grid">
          <!-- Level and exp -->
          <div class="gauge-group full-width">
            <div class="gauge-header">
              <span class="gauge-title">等级 {{ petStore.pet.level }}</span>
              <span class="gauge-text">{{ petStore.pet.exp }} / {{ petStore.pet.level * 100 }}</span>
            </div>
            <ProgressBar :value="petStore.pet.exp" :max="petStore.pet.level * 100" />
          </div>

          <!-- Satiety -->
          <div class="gauge-group">
            <div class="gauge-header">
              <span class="gauge-title">🍖 饱食度</span>
              <span class="gauge-text">{{ petStore.pet.satiety }}/100</span>
            </div>
            <ProgressBar :value="petStore.pet.satiety" :max="100" />
          </div>

          <!-- Cleanliness -->
          <div class="gauge-group">
            <div class="gauge-header">
              <span class="gauge-title">🧼 清洁度</span>
              <span class="gauge-text">{{ petStore.pet.cleanliness }}/100</span>
            </div>
            <ProgressBar :value="petStore.pet.cleanliness" :max="100" />
          </div>
        </div>

        <div class="privilege-box">
          <span class="privilege-label">🌟 当前等级解锁特权:</span>
          <span class="privilege-value">{{ activePrivilege }}</span>
        </div>
      </div>

      <!-- Interaction controls -->
      <div class="interaction-bar">
        <GameButton type="success" size="lg" @click="handlePetClick">撫摸 👋</GameButton>
        <GameButton type="primary" size="lg" :disabled="petStore.pet.cleanliness >= 100 || isBathing" @click="startBath">洗澡 🛀</GameButton>
        <GameButton type="warning" size="lg" @click="showFeedSelector = true">投喂 🍎</GameButton>
        <GameButton type="purple" size="lg" @click="showShop = true">金币商店 🛒</GameButton>
        <GameButton type="default" size="lg" @click="router.push('/exchange')">人民币游戏 🪙</GameButton>
      </div>

      <!-- Feed Selector Modal -->
      <div v-if="showFeedSelector" class="modal-overlay" @click.self="showFeedSelector = false">
        <div class="backpack-modal card animate-pop-in">
          <h2>🎒 我的背包物品</h2>
          <div class="backpack-list">
            <template v-if="Object.keys(petStore.pet.backpack).length === 0">
              <p class="empty-backpack-msg">背包空空的，快去商店买点好吃的吧！</p>
            </template>
            <template v-else>
              <div 
                v-for="(count, itemId) in petStore.pet.backpack" 
                :key="itemId"
                class="backpack-item"
              >
                <div class="item-details">
                  <span class="item-name">
                    {{ itemId === 'apple' ? '🍎 红苹果' : itemId === 'bone' ? '🍖 大骨头' : '🍪 魔法饼干' }}
                  </span>
                  <span class="item-count">× {{ count }}</span>
                </div>
                <GameButton 
                  type="success" 
                  size="sm" 
                  :disabled="petStore.pet.satiety >= 100"
                  @click="feedPetFromBackpack(itemId, itemId === 'apple' ? 15 : itemId === 'bone' ? 25 : 40)"
                >
                  投喂
                </GameButton>
              </div>
            </template>
          </div>
          <GameButton type="default" size="md" class="close-modal-btn" @click="showFeedSelector = false">关闭</GameButton>
        </div>
      </div>

      <!-- RMB Shop Modal -->
      <div v-if="showShop" class="modal-overlay" @click.self="showShop = false">
        <div class="shop-modal card animate-pop-in">
          <h2>🛒 人民币体验商店</h2>
          <p class="shop-privilege-hint">提示：当前享受等级折扣（{{ getDiscountPriceText(100) }} 折）</p>
          <div class="shop-shelves">
            <div v-for="item in shopItems" :key="item.id" class="shop-shelf-item">
              <div class="item-info">
                <span class="item-icon-name">{{ item.name }}</span>
                <span class="item-restore-label">回复饱食 {{ item.satiety }}</span>
              </div>
              <div class="item-buy-action">
                <div class="price-tags">
                  <span class="original-price" v-if="purchaseDiscount < 1.0">{{ item.priceText }}</span>
                  <span class="current-price">{{ getDiscountPriceText(item.priceFen) }}</span>
                </div>
                <GameButton type="purple" size="sm" @click="buyShopItem(item)">购买</GameButton>
              </div>
            </div>
          </div>
          <GameButton type="default" size="md" class="close-modal-btn" @click="showShop = false">离开商店</GameButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.pet-house-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.house-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.house-title {
  font-size: 26px;
  font-weight: bold;
  color: var(--color-text);
}

.house-currency {
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 6px 12px;
}

.house-main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pet-display-box {
  width: 100%;
  aspect-ratio: 1.8;
  border-width: 4px;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .pet-display-box {
    aspect-ratio: 1.3;
  }
}

.evolution-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: hsl(198, 90%, 92%);
  border: 2.5px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
}

.evo-icon {
  font-size: 20px;
}

.evo-name {
  font-size: 14px;
}

.pet-avatar-character {
  cursor: pointer;
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.character-inner {
  position: relative;
}

.character-emoji {
  font-size: 96px;
}

.soap-bubbles {
  position: absolute;
  top: -30px;
  left: -20px;
  font-size: 24px;
  animation: bounce 1s infinite alternate;
}

.pet-speech-bubble {
  position: absolute;
  bottom: 16px;
  background-color: var(--color-text);
  color: white;
  padding: 8px 16px;
  border-radius: var(--border-radius-sm);
  font-weight: bold;
  font-size: 16px;
}

.pet-details-panel {
  border-width: 3px;
  padding: 20px 24px;
}

.gauge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.gauge-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gauge-group.full-width {
  grid-column: span 2;
}

.gauge-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
}

.gauge-title {
  color: var(--color-text);
}

.gauge-text {
  color: var(--color-text-light);
}

.privilege-box {
  border-top: 2px dashed var(--color-text-light);
  padding-top: 12px;
  font-weight: bold;
  font-size: 14px;
}

.privilege-label {
  color: var(--color-text-light);
  margin-right: 8px;
}

.privilege-value {
  color: var(--color-purple-dark);
}

.interaction-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

.interaction-bar button {
  flex: 1;
  min-width: 120px;
  font-size: 16px;
}

/* Modals styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.backpack-modal, .shop-modal {
  width: 100%;
  max-width: 420px;
  background-color: white;
  padding: 24px;
  border-width: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.backpack-list, .shop-shelves {
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.backpack-item, .shop-shelf-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 3px solid var(--color-text);
  border-radius: var(--border-radius-sm);
  padding: 10px 16px;
  background-color: hsl(35, 40%, 97%);
}

.item-details, .item-info {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.item-name, .item-icon-name {
  font-size: 16px;
  color: var(--color-text);
}

.item-count {
  font-size: 13px;
  color: var(--color-text-light);
}

.item-restore-label {
  font-size: 13px;
  color: var(--color-text-light);
}

.item-buy-action {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: bold;
}

.original-price {
  font-size: 12px;
  text-decoration: line-through;
  color: var(--color-text-light);
}

.current-price {
  font-size: 16px;
  color: var(--color-danger-dark);
}

.empty-backpack-msg {
  text-align: center;
  color: var(--color-text-light);
  font-weight: bold;
  padding: 20px 0;
}

.shop-privilege-hint {
  font-size: 13px;
  color: var(--color-success-dark);
  font-weight: bold;
  background-color: hsl(145, 75%, 93%);
  padding: 6px 12px;
  border-radius: var(--border-radius-sm);
  width: 100%;
  text-align: center;
}

.close-modal-btn {
  width: 100%;
  max-width: 150px;
}
</style>
