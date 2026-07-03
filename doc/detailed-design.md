# 小学趣味数学详细设计文档

## 1. 目录结构设计

项目基于 Vue 3 + Vite + TypeScript + Pinia 开发，整体目录结构如下：

```
/
├── doc/                        # 文档目录
│   ├── [proposal.md](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/doc/proposal.md)             # 需求文档
│   ├── [high-level-design.md](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/doc/high-level-design.md)    # 概要设计文档
│   └── [detailed-design.md](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/doc/detailed-design.md)      # 详细设计文档
├── public/                     # 静态资源 (音频、图片模板等)
├── src/
│   ├── assets/                 # 静态样式、全局变动效果
│   │   └── main.css            # 全局样式与设计系统变量
│   ├── components/             # 公共与原子组件
│   │   ├── common/             # 通用UI组件
│   │   │   ├── GameButton.vue  # 自定义触控优化按钮
│   │   │   ├── ProgressBar.vue # 进度条组件
│   │   │   ├── StarRating.vue  # 星星展示组件
│   │   │   └── DialogModal.vue # 通用弹窗组件
│   │   └── question/           # 题型渲染器组件
│   │       ├── ChoiceQuestion.vue  # 选择题渲染器
│   │       ├── FillQuestion.vue    # 填空题渲染器
│   │       ├── DragQuestion.vue    # 拖拽题渲染器
│   │       ├── MatchQuestion.vue   # 连线题渲染器
│   │       ├── DiagramQuestion.vue # 看图列式渲染器
│   │       └── WriteQuestion.vue   # 练写题画板渲染器
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── stores/                 # 状态管理
│   │   ├── progress.ts         # 学习进度与错题 Store
│   │   ├── pet.ts              # 宠物属性与成长 Store
│   │   └── wallet.ts           # 货币与兑换 Store
│   ├── types/                  # 全局TS类型声明
│   │   └── index.ts
│   ├── utils/                  # 工具类与辅助算法
│   │   ├── canvasHelper.ts     # 画布笔迹平滑处理
│   │   ├── currencyHelper.ts   # 货币面额换算辅助
│   │   └── judgeHelper.ts      # 判题核心算法
│   ├── views/                  # 页面级视图组件
│   │   ├── Home.vue            # 首页
│   │   ├── LevelMap.vue        # 关卡地图
│   │   ├── LevelDetail.vue     # 关卡详情弹窗/页面
│   │   ├── Play.vue            # 闯关答题主页面
│   │   ├── WriteBook.vue       # 练写本页面
│   │   ├── Mistakes.vue        # 错题本页面
│   │   ├── Parents.vue         # 家长查看页面
│   │   ├── Settings.vue        # 系统设置页面
│   │   ├── PetHouse.vue        # 宠物小屋
│   │   └── ExchangeGame.vue    # 人民币兑换小游戏
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── tests/                      # 单元测试目录
│   ├── judge.test.ts           # 判题逻辑测试
│   ├── pet.test.ts             # 宠物成长及属性衰减测试
│   └── wallet.test.ts          # 钱包及兑换测试
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 2. 数据模型与类型定义

### 2.1 基础类型定义 (`src/types/index.ts`)

```typescript
export type QuestionType = 'choice' | 'fill' | 'drag' | 'match' | 'diagram' | 'write';
export type DifficultyLevel = 'basic' | 'medium' | 'hard';
export type PetType = 'cat' | 'dog';

export interface Question {
  id: string;
  grade: '1';
  semester: 'up' | 'down';
  moduleId: string;
  levelId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stem: string;
  assets: {
    images?: string[];
    options?: string[];
    targets?: string[];
  };
  answer: unknown;
  explanation: string;
  tags: string[];
}

export interface ModuleStat {
  moduleId: string;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
}

export interface LearningProgress {
  completedLevelIds: string[];
  starsByLevel: Record<string, number>;
  badges: string[];
  moduleStats: Record<string, ModuleStat>;
  totalAnswered: number;
  totalCorrect: number;
  studyDays: string[];
  updatedAt: string;
}

export interface MistakeRecord {
  questionId: string;
  moduleId: string;
  levelId: string;
  wrongAnswer: unknown;
  correctAnswer: unknown;
  mistakeCount: number;
  masteredCount: number;
  lastWrongAt: string;
}

export interface StrokePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface WritingRecord {
  id: string;
  targetText: string;
  strokes: StrokePoint[][];
  createdAt: string;
}

export interface Wallet {
  yuan: number;
  jiao: number;
  fen: number;
}

export interface PetData {
  chosenPet: PetType | null;
  name: string;
  level: number;
  exp: number;
  satiety: number;
  cleanliness: number;
  shieldCount: number;
  wallet: Wallet;
  backpack: Record<string, number>;
  lastUpdateTime: string;
}
```

## 3. 核心模块与算法设计

### 3.1 判题引擎 (`src/utils/judgeHelper.ts`)

不同题型的判定算法实现：

```typescript
import { Question } from '../types';

export function judgeAnswer(question: Question, userAnswer: unknown): boolean {
  if (userAnswer === undefined || userAnswer === null) {
    return false;
  }

  switch (question.type) {
    case 'choice': {
      return String(question.answer) === String(userAnswer);
    }
    case 'fill': {
      const standard = String(question.answer).trim().toLowerCase();
      const user = String(userAnswer).trim().toLowerCase();
      return standard === user;
    }
    case 'drag': {
      return JSON.stringify(question.answer) === JSON.stringify(userAnswer);
    }
    case 'match': {
      const standardMap = question.answer as Record<string, string>;
      const userMap = userAnswer as Record<string, string>;
      const standardKeys = Object.keys(standardMap);
      const userKeys = Object.keys(userMap);
      if (standardKeys.length !== userKeys.length) {
        return false;
      }
      return standardKeys.every(key => standardMap[key] === userMap[key]);
    }
    case 'diagram': {
      const standardExprs = Array.isArray(question.answer) 
        ? question.answer.map(v => String(v).replace(/\s+/g, '')) 
        : [String(question.answer).replace(/\s+/g, '')];
      const userExpr = String(userAnswer).replace(/\s+/g, '');
      return standardExprs.includes(userExpr);
    }
    case 'write': {
      return true;
    }
    default: {
      return false;
    }
  }
}
```

### 3.2 宠物属性自然衰减与成长算法 (`src/stores/pet.ts`)

宠物离线及时间推移导致的状态衰减计算：

饱食度每小时减少 5 点：
$$Satiety_{decay} = \text{hours} \times 5$$

清洁度每小时减少 3 点：
$$Cleanliness_{decay} = \text{hours} \times 3$$

```typescript
export function calculateOfflineDecay(
  lastTimeStr: string,
  currentTimeStr: string,
  currentSatiety: number,
  currentCleanliness: number
): { satiety: number; cleanliness: number } {
  const lastTime = new Date(lastTimeStr).getTime();
  const currentTime = new Date(currentTimeStr).getTime();
  const elapsedMs = currentTime - lastTime;
  if (elapsedMs <= 0) {
    return { satiety: currentSatiety, cleanliness: currentCleanliness };
  }

  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  const satietyDecay = Math.floor(elapsedHours * 5);
  const cleanlinessDecay = Math.floor(elapsedHours * 3);

  return {
    satiety: Math.max(0, currentSatiety - satietyDecay),
    cleanliness: Math.max(0, currentCleanliness - cleanlinessDecay)
  };
}
```

### 3.4 货币进率换算算法 (`src/utils/currencyHelper.ts`)

进率规则：1 元 = 10 角 = 100 分。

```typescript
import { Wallet } from '../types';

export function normalizeWallet(wallet: Wallet): Wallet {
  let totalFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  if (totalFen < 0) {
    totalFen = 0;
  }
  const yuan = Math.floor(totalFen / 100);
  const remaining = totalFen % 100;
  const jiao = Math.floor(remaining / 10);
  const fen = remaining % 10;
  return { yuan, jiao, fen };
}

export function addCurrency(w1: Wallet, w2: Wallet): Wallet {
  return normalizeWallet({
    yuan: w1.yuan + w2.yuan,
    jiao: w1.jiao + w2.jiao,
    fen: w1.fen + w2.fen
  });
}

export function hasEnoughCurrency(wallet: Wallet, price: Wallet): boolean {
  const totalWalletFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  const totalPriceFen = price.yuan * 100 + price.jiao * 10 + price.fen;
  return totalWalletFen >= totalPriceFen;
}

export function deductCurrency(wallet: Wallet, price: Wallet): Wallet {
  const totalWalletFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  const totalPriceFen = price.yuan * 100 + price.jiao * 10 + price.fen;
  const remainingFen = Math.max(0, totalWalletFen - totalPriceFen);
  return normalizeWallet({ yuan: 0, jiao: 0, fen: remainingFen });
}
```

### 3.5 练写画布平滑算法 (`src/utils/canvasHelper.ts`)

为了适应低龄儿童触控笔迹抖动，采用二次贝塞尔曲线进行笔迹平滑处理：

```typescript
import { StrokePoint } from '../types';

export function drawSmoothStrokes(
  ctx: CanvasRenderingContext2D,
  points: StrokePoint[],
  color: string = '#2c3e50',
  lineWidth: number = 6
) {
  if (points.length < 2) {
    return;
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
}
```

---

## 4. 状态管理设计 (Pinia Stores)

### 4.1 进度与错题 Store (`src/stores/progress.ts`)

```typescript
import { defineStore } from 'pinia';
import { LearningProgress, MistakeRecord } from '../types';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: {
      completedLevelIds: [],
      starsByLevel: {},
      badges: [],
      moduleStats: {},
      totalAnswered: 0,
      totalCorrect: 0,
      studyDays: [],
      updatedAt: new Date().toISOString()
    } as LearningProgress,
    mistakes: [] as MistakeRecord[]
  }),
  actions: {
    loadFromStorage() {
      const data = localStorage.getItem('math_game_progress');
      const mistakeData = localStorage.getItem('math_game_mistakes');
      if (data) {
        this.progress = JSON.parse(data);
      }
      if (mistakeData) {
        this.mistakes = JSON.parse(mistakeData);
      }
    },
    saveToStorage() {
      this.progress.updatedAt = new Date().toISOString();
      localStorage.setItem('math_game_progress', JSON.stringify(this.progress));
      localStorage.setItem('math_game_mistakes', JSON.stringify(this.mistakes));
    },
    recordLevelCompletion(levelId: string, stars: number) {
      if (!this.progress.completedLevelIds.includes(levelId)) {
        this.progress.completedLevelIds.push(levelId);
      }
      const existingStars = this.progress.starsByLevel[levelId] || 0;
      if (stars > existingStars) {
        this.progress.starsByLevel[levelId] = stars;
      }
      this.saveToStorage();
    },
    recordAnswer(moduleId: string, questionId: string, levelId: string, isCorrect: boolean, wrongAns?: unknown, correctAns?: unknown) {
      this.progress.totalAnswered += 1;
      if (isCorrect) {
        this.progress.totalCorrect += 1;
      }

      if (!this.progress.moduleStats[moduleId]) {
        this.progress.moduleStats[moduleId] = {
          moduleId,
          totalAnswered: 0,
          totalCorrect: 0,
          accuracy: 0
        };
      }

      const stat = this.progress.moduleStats[moduleId];
      stat.totalAnswered += 1;
      if (isCorrect) {
        stat.totalCorrect += 1;
      }
      stat.accuracy = Math.round((stat.totalCorrect / stat.totalAnswered) * 100);

      const today = new Date().toISOString().split('T')[0];
      if (!this.progress.studyDays.includes(today)) {
        this.progress.studyDays.push(today);
      }

      if (!isCorrect) {
        const existing = this.mistakes.find(m => m.questionId === questionId);
        if (existing) {
          existing.mistakeCount += 1;
          existing.wrongAnswer = wrongAns;
          existing.lastWrongAt = new Date().toISOString();
          existing.masteredCount = 0;
        } else {
          this.mistakes.push({
            questionId,
            moduleId,
            levelId,
            wrongAnswer: wrongAns,
            correctAnswer: correctAns,
            mistakeCount: 1,
            masteredCount: 0,
            lastWrongAt: new Date().toISOString()
          });
        }
      } else {
        const existing = this.mistakes.find(m => m.questionId === questionId);
        if (existing) {
          existing.masteredCount += 1;
          if (existing.masteredCount >= 2) {
            this.mistakes = this.mistakes.filter(m => m.questionId !== questionId);
          }
        }
      }
      this.saveToStorage();
    }
  }
});
```

### 4.2 宠物成长 Store (`src/stores/pet.ts`)

```typescript
import { defineStore } from 'pinia';
import { PetData, PetType } from '../types';
import { calculateOfflineDecay } from './pet';

export const usePetStore = defineStore('pet', {
  state: () => ({
    pet: {
      chosenPet: null,
      name: '',
      level: 1,
      exp: 0,
      satiety: 100,
      cleanliness: 100,
      shieldCount: 1,
      wallet: { yuan: 0, jiao: 0, fen: 0 },
      backpack: {},
      lastUpdateTime: new Date().toISOString()
    } as PetData
  }),
  getters: {
    getUpgradeLimit(): number {
      return this.pet.level * 100;
    }
  },
  actions: {
    loadFromStorage() {
      const data = localStorage.getItem('math_game_pet');
      if (data) {
        const parsed = JSON.parse(data) as PetData;
        const now = new Date().toISOString();
        const decayed = calculateOfflineDecay(
          parsed.lastUpdateTime,
          now,
          parsed.satiety,
          parsed.cleanliness
        );
        parsed.satiety = decayed.satiety;
        parsed.cleanliness = decayed.cleanliness;
        parsed.lastUpdateTime = now;
        this.pet = parsed;
      }
    },
    saveToStorage() {
      this.pet.lastUpdateTime = new Date().toISOString();
      localStorage.setItem('math_game_pet', JSON.stringify(this.pet));
    },
    choosePet(type: PetType, name: string) {
      this.pet.chosenPet = type;
      this.pet.name = name;
      this.saveToStorage();
    },
    resetDailyShield() {
      this.pet.shieldCount = 1;
      this.saveToStorage();
    },
    addExp(amount: number) {
      this.pet.exp += amount;
      let limit = this.getUpgradeLimit;
      while (this.pet.exp >= limit) {
        this.pet.exp -= limit;
        this.pet.level += 1;
        limit = this.getUpgradeLimit;
      }
      this.saveToStorage();
    },
    deductExp(amount: number) {
      if (this.pet.shieldCount > 0) {
        this.pet.shieldCount -= 1;
        this.saveToStorage();
        return;
      }

      this.pet.exp -= amount;
      if (this.pet.exp < 0) {
        if (this.pet.level > 1) {
          this.pet.level -= 1;
          this.pet.exp = this.getUpgradeLimit - amount;
        } else {
          this.pet.exp = 0;
        }
      }
      this.saveToStorage();
    },
    feedPet(itemId: string, recoveryAmount: number) {
      if (this.pet.backpack[itemId] && this.pet.backpack[itemId] > 0) {
        this.pet.backpack[itemId] -= 1;
        if (this.pet.backpack[itemId] === 0) {
          delete this.pet.backpack[itemId];
        }
        this.pet.satiety = Math.min(100, this.pet.satiety + recoveryAmount);
        this.saveToStorage();
      }
    },
    cleanPet(recoveryAmount: number) {
      this.pet.cleanliness = Math.min(100, this.pet.cleanliness + recoveryAmount);
      this.saveToStorage();
    }
  }
});
```

### 4.3 货币与兑换 Store (`src/stores/wallet.ts`)

```typescript
import { defineStore } from 'pinia';
import { Wallet } from '../types';
import { normalizeWallet, hasEnoughCurrency, deductCurrency, addCurrency } from '../utils/currencyHelper';
import { usePetStore } from './pet';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: {
      yuan: 0,
      jiao: 0,
      fen: 0
    } as Wallet
  }),
  actions: {
    syncFromPetStore() {
      const petStore = usePetStore();
      this.wallet = petStore.pet.wallet;
    },
    syncToPetStore() {
      const petStore = usePetStore();
      petStore.pet.wallet = this.wallet;
      petStore.saveToStorage();
    },
    addEarnings(fenAmount: number) {
      this.syncFromPetStore();
      this.wallet = addCurrency(this.wallet, { yuan: 0, jiao: 0, fen: fenAmount });
      this.syncToPetStore();
    },
    purchaseItem(price: Wallet, itemId: string) {
      this.syncFromPetStore();
      if (hasEnoughCurrency(this.wallet, price)) {
        this.wallet = deductCurrency(this.wallet, price);
        this.syncToPetStore();

        const petStore = usePetStore();
        if (!petStore.pet.backpack[itemId]) {
          petStore.pet.backpack[itemId] = 0;
        }
        petStore.pet.backpack[itemId] += 1;
        petStore.saveToStorage();
        return true;
      }
      return false;
    },
    exchangeCoins(fromUnit: 'fen' | 'jiao', amount: number) {
      this.syncFromPetStore();
      if (fromUnit === 'fen') {
        if (this.wallet.fen >= amount && amount % 10 === 0) {
          this.wallet.fen -= amount;
          this.wallet.jiao += Math.floor(amount / 10);
        }
      } else if (fromUnit === 'jiao') {
        if (this.wallet.jiao >= amount && amount % 10 === 0) {
          this.wallet.jiao -= amount;
          this.wallet.yuan += Math.floor(amount / 10);
        }
      }
      this.wallet = normalizeWallet(this.wallet);
      this.syncToPetStore();
    }
  }
});
```

---

## 5. 组件与页面详细设计

### 5.1 页面组件接口与核心交互

#### 5.1.1 闯关答题页面 (`src/views/Play.vue`)

负责题目的加载与答题流转。

##### 页面状态 (State)
```typescript
interface PlayState {
  questions: Question[];
  currentIndex: number;
  userAnswer: unknown;
  showFeedback: boolean;
  isAnswerCorrect: boolean;
  score: number;
  consecutiveWrongCount: number;
}
```

##### 交互与转场逻辑
1. 初始化：进入页面，从路由参数获取 `levelId`。题库筛选引擎提取对应关卡的题目集合 `Question[]`。
2. 渲染：根据 `questions[currentIndex].type` 分发到对应的题型渲染器组件。
3. 答题：用户提交答案，触发 `judgeAnswer` 校验：
   - 答对：更新 `ProgressStore` 与 `PetStore` 增加对应经验、货币值。播放动效。延时 1.5 秒进入下一题。
   - 答错：保存当前错题，扣减经验值（检查并触发每日盾牌逻辑），展示对应鼓励说明与分步提示。不直接跳题，用户修改并答对后方可继续。
4. 结算：完成关卡所有题目后，依据答题情况评定 1 至 3 颗星星，解锁关卡地图中下一关。

#### 5.1.2 练写本页面 (`src/views/WriteBook.vue`)

利用 Canvas 元素供学生自由描写或根据模版书写。

##### 画布交互设计
- 支持 `touchstart` / `touchmove` / `touchend` 以及 `mousedown` / `mousemove` / `mouseup` 组合事件。
- 坐标记录：在 `touchmove` 期间记录点 `StrokePoint` 构成的数组，构成单一笔画。
- 撤销机制：将多笔画存入一个三维数组结构中。点击撤销则弹出最后一笔。
- 模版底图：Canvas 背景采用半透明的数字、符号模版文字，层叠书写层。

#### 5.1.3 人民币兑换小游戏 (`src/views/ExchangeGame.vue`)

支持硬币拖拽的实物进率兑换练习。

##### 拖拽引擎设计
- 界面划分“硬币包”和“存钱罐”。
- 当 `1分` 硬币被拖入存钱罐达到 10 次，调用 `useWalletStore().exchangeCoins('fen', 10)`，并播放存钱罐发光与金币合成 `1角` 音效，合成的硬币弹回钱包区。

---

## 6. 本地持久化存储详细方案

数据统一保存在浏览器的 `localStorage` 中。

### 6.1 存储命名空间
- 进度数据：`math_game_progress`
- 宠物数据：`math_game_pet`
- 系统配置：`math_game_settings`

### 6.2 异常容错与版本迁移机制

```typescript
const CURRENT_DATA_VERSION = 1;

export function migrateProgressData(rawData: string | null): any {
  if (!rawData) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawData);
    if (!parsed.version) {
      parsed.version = CURRENT_DATA_VERSION;
      parsed.badges = parsed.badges || [];
      parsed.moduleStats = parsed.moduleStats || {};
    }
    return parsed;
  } catch (e) {
    return null;
  }
}
```

---

## 7. 独立单元测试规范

模块与模块之间保持高内聚低耦合，可以独立进行测试。测试集采用 `Vitest` 框架运行。

### 7.1 判题引擎测试 (`tests/judge.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { judgeAnswer } from '../src/utils/judgeHelper';
import { Question } from '../src/types';

describe('Judge Engine Tests', () => {
  it('should judge choice questions correctly', () => {
    const question = {
      type: 'choice',
      answer: '2'
    } as Question;
    expect(judgeAnswer(question, '2')).toBe(true);
    expect(judgeAnswer(question, '3')).toBe(false);
  });

  it('should judge fill questions correctly', () => {
    const question = {
      type: 'fill',
      answer: ' 15 '
    } as Question;
    expect(judgeAnswer(question, '15')).toBe(true);
    expect(judgeAnswer(question, ' 15')).toBe(true);
    expect(judgeAnswer(question, '16')).toBe(false);
  });

  it('should judge match questions correctly', () => {
    const question = {
      type: 'match',
      answer: { '1': 'cat', '2': 'dog' }
    } as Question;
    expect(judgeAnswer(question, { '1': 'cat', '2': 'dog' })).toBe(true);
    expect(judgeAnswer(question, { '1': 'cat', '2': 'bird' })).toBe(false);
  });
});
```

### 7.2 宠物成长测试 (`tests/pet.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { calculateOfflineDecay } from '../src/stores/pet';

describe('Pet Offline Decay Tests', () => {
  it('should decay satiety and cleanliness based on hours elapsed', () => {
    const start = '2026-07-03T10:00:00.000Z';
    const end = '2026-07-03T12:00:00.000Z';
    const result = calculateOfflineDecay(start, end, 100, 100);
    expect(result.satiety).toBe(90);
    expect(result.cleanliness).toBe(94);
  });
});
```

### 7.3 货币系统测试 (`tests/wallet.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { normalizeWallet, hasEnoughCurrency } from '../src/utils/currencyHelper';

describe('Wallet Currency Conversion Tests', () => {
  it('should normalize wallet amounts correctly', () => {
    const w = { yuan: 1, jiao: 12, fen: 25 };
    const normalized = normalizeWallet(w);
    expect(normalized.yuan).toBe(2);
    expect(normalized.jiao).toBe(4);
    expect(normalized.fen).toBe(5);
  });

  it('should check affordability accurately', () => {
    const wallet = { yuan: 1, jiao: 2, fen: 5 };
    const price = { yuan: 0, jiao: 15, fen: 0 };
    expect(hasEnoughCurrency(wallet, price)).toBe(false);
  });
});
```
