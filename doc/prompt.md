# Vibe Coding 起始指令：实现「小学趣味数学」游戏系统

你是一个高级 AI 开发智能体。你的目标是在**完全无人干预**的情况下，基于当前项目的文档和现有的代码骨架，完整实现并测试「小学趣味数学」游戏的剩余所有模块。

---

## 1. 项目当前状态与工作空间上下文

本系统基于 **Vue 3 (Composition API, `<script setup lang="ts">`) + Vite + TypeScript + Pinia + Vue Router** 开发。

### 1.1 已完成与已验证的部分：
1. **基础脚手架与全局样式**：
   - 全局样式：[main.css](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/assets/main.css) (配置了 HSL 配色方案及弹跳、渐入、脉冲等动画)
   - 基础组件：[GameButton.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/common/GameButton.vue) (按压和触控优化的儿童风格按钮), [ProgressBar.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/common/ProgressBar.vue), [StarRating.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/common/StarRating.vue), [DialogModal.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/common/DialogModal.vue)
   - 路由框架：`src/router/index.ts`
2. **核心工具与算法**：
   - 判题引擎：[judgeHelper.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/utils/judgeHelper.ts) 及单元测试 [judge.test.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/tests/judge.test.ts)
   - 离线衰减计算：`calculateOfflineDecay` 函数及单元测试 [pet.test.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/tests/pet.test.ts)
   - 货币进率与钱包计算：[currencyHelper.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/utils/currencyHelper.ts) 及单元测试 [wallet.test.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/tests/wallet.test.ts)
   - Canvas 平滑算法：[canvasHelper.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/utils/canvasHelper.ts)

### 1.2 待实现的任务列表：
你必须依次实现并测试以下模块，全部完成后才能结束任务：
1. **状态管理与数据持久化** (参考：`doc/tasks/state-management.md`)
2. **初始关卡与题库数据** (参考：`doc/tasks/question-database.md`)
3. **关卡地图与答题闯关主流程** (参考：`doc/tasks/level-gameplay.md`)
4. **连线、看图列式与写字题型** (参考：`doc/tasks/special-questions.md`)
5. **错题本、家长端与设置** (参考：`doc/tasks/mistakes-parents.md`)
6. **宠物成长与人民币兑换游戏** (参考：`doc/tasks/pet-system.md`)

---

## 2. 自动化执行规范 (必须严格遵守)

1. **分模块原子化执行**：
   按照下方第 3 节中定义的六大步骤依次开发。每完成一个步骤，必须：
   - 编写或扩充相应的单元测试文件（位于 `tests/`）。
   - 运行单元测试 `npm run test`，并运行类型检查 `npm run build` 确保 **0 Error 0 Warning** 且测试全部通过。
   - 打开对应的 `doc/tasks/<module>.md` 任务文件，将已完成的任务项标记为 `[x]`。
   - 打开进度总表 [progress.md](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/doc/tasks/progress.md)，同步更新开发状态。
2. **不引入非必要依赖**：
   优先使用原生 CSS (结合 `main.css` 变量)、SVG 或 Canvas 来做各种图形渲染和物理动画（例如硬币拖拽、家长端饼图、宠物状态等），避免引入外部图表库或物理引擎。
3. **追求极致的视觉与体验**：
   - 目标用户是 6-7 岁一年级学生，界面必须充满童趣、大字号（字号不小于 16px，答题区不小于 20px）、大按钮（点击区域不小于 44px）、色彩丰富和谐（使用 HSL 变量）。
   - 交互必须带有微动效（如 hover 缩放、按钮点击按压反馈、金币落入存钱罐动画等）。
   - 识字量有限，所有复杂文本必须加注汉语拼音（如使用 HTML 的 `<ruby>` 标签，如 `<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt></ruby>`）。

---

## 3. 分步开发与实现细则

### 第一步：状态管理与数据持久化

1. **实现数据类型**：
   在 [types/index.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/types/index.ts) 中补充完整的数据类型定义（见 `doc/detailed-design.md` 第二节）。
2. **实现进度与错题 Store** (`src/stores/progress.ts`)：
   - 初始化时从 `localStorage` 中加载数据。
   - 提供 `recordLevelCompletion(levelId, stars)` 记录通关与获得的最高星星数。
   - 提供 `recordAnswer(moduleId, questionId, levelId, isCorrect, wrongAns, correctAns)` 记录答题结果：
     - 若答对：更新正确率统计，如果错题本中存在该题，累加 `masteredCount`，若累加至 2 次及以上则从错题本移出该错题。
     - 若答错：加入或更新错题本中对应的 `MistakeRecord`，并将 `masteredCount` 重置为 0。
     - 每次写入都会持久化保存至 `localStorage`。
3. **实现宠物状态 Store** (`src/stores/pet.ts`)：
   - 实现离线属性自然衰减：初始化时根据 `lastUpdateTime` 与当前时间的差值，计算离线时间内的饱食度和清洁度自然扣减（饱食度每小时 -5，清洁度每小时 -3），并保存最新时间。
   - 提供 `addExp(amount)`：经验值累加，若达到升级阈值（当前等级 * 100）则等级 `+1`。
   - 提供 `deductExp(amount)`：若 `shieldCount > 0`（每日免错盾牌），则优先消耗 1 次盾牌，不扣减经验值；否则扣减经验值，若经验值扣到 0 以下且当前等级大于 1，则降级并重新计算剩余经验。
   - 提供 `feedPet(itemId, recoveryAmount)` 喂食（消耗背包物品）和 `cleanPet(recoveryAmount)` 洗澡。
4. **实现货币钱包 Store** (`src/stores/wallet.ts`)：
   - 同步宠物的 `wallet` 属性。
   - 提供 `addEarnings(fenAmount)` 赚取货币（自动按 100分=10角=1元 规范化）。
   - 提供 `purchaseItem(price, itemId)` 扣减货币并增加背包物品。
   - 提供 `exchangeCoins(fromUnit, amount)` 辅助手动换算。
5. **编写测试并运行**：
   - 在 `tests/pet.test.ts` 和 `tests/wallet.test.ts` 中补充完整的 Store 逻辑测试。
   - 运行测试并通过。

---

### 第二步：初始关卡与题库数据

1. **静态题库配置** (`src/data/questions.ts`)：
   - 按照 `Question` 结构编写 MVP 阶段 20 个关卡的题目数据。
   - 包含的章节模块：数一数与比一比、0到10的认识、10以内加减法、认识位置与图形、11到20的认识、20以内进位加法。
   - 每关设计 8 至 10 道题目，合计约 200 题。题型必须合理混合选择题、填空题、拖拽题、连线题、看图列式等。
2. **实现校验脚本** (`tests/dbValidate.test.ts`)：
   - 编写自动化脚本，检查所有题目 ID 是否唯一、题干/选项是否完整、答案类型是否与题型匹配。
3. **实现按章节懒加载**：
   - 提供题库查询接口，支持按 `moduleId` 和 `levelId` 异步拉取并返回题目。

---

### 第三步：关卡地图与答题闯关主流程

1. **首页设计** (`src/views/Home.vue`)：
   - 卡通风格。展示当前宠物简易状态挂件。
   - 提供「继续闯关」大按钮（一键导航至当前进度推荐的未解锁关卡），以及「关卡地图」「练写本」「错题本」「宠物小屋」「家长端」大入口。
2. **关卡地图** (`src/views/LevelMap.vue`)：
   - 按启航岛、数字岛、运算岛、图形岛、生活岛等模块画出可爱的关卡节点路径。
   - 未解锁的关卡显示灰色锁定；已通关的显示星星评分（0~3 颗黄星）。
3. **关卡详情弹窗** (`src/views/LevelDetail.vue`)：
   - 点击地图关卡节点弹出。展示关卡名称、知识点、题量、难度与历史最高星级。
   - 提供「开始闯关」和「再练一次」按钮。
4. **答题核心页面** (`src/views/Play.vue`)：
   - 顶部显示：可爱的进度条（当前题号/总题数）、金币和宠物状态挂件。
   - 中间区域：动态引入对应的题型组件（`ChoiceQuestion.vue` / `FillQuestion.vue` / `DragQuestion.vue`）。
   - 交互规则：用户作答后，点击「检查」或自动判定：
     - 答对：播放炫酷星星/金币动画，弹出可爱的肯定提示（如“真棒！”、“太厉害了！”），延时 1.5 秒自动切换下一题。
     - 答错：若有免错盾牌，则显示“盾牌保护生效，免除经验扣减！”，否则扣减经验并可能触发降级；不直接切题，给出提示引导，允许用户修改答案并再次提交，直到答对才能进入下一题。
5. **关卡结算**：
   - 答完本关所有题目后弹出结算弹窗，展示所获星星数、获得的金币（分）、获得的经验值，并提供「返回地图」「下一关」按钮。

---

### 第四步：连线、看图列式与写字题型

1. **连线题组件** (`src/components/question/MatchQuestion.vue`)：
   - 渲染左侧项与右侧项列表。
   - 支持触控拖拽或点击左右项连线。使用 SVG `<path>` 或 HTML Canvas 实时渲染连接线条。
   - 连线结果保存至 userAnswer 中，格式为 `Record<string, string>`，供 `judgeAnswer` 判定。
2. **看图列式组件** (`src/components/question/DiagramQuestion.vue`)：
   - 渲染图片（例如左边 3 个苹果，右边 2 个苹果）和算式填空槽位，如：`[ ] [ ] [ ] = [ ]`。
   - 让孩子依次填入数字或运算符（`+`、`-`），生成最终表达式如 `3+2=5`，供判题引擎校验。
3. **练写题组件与画板** (`src/components/question/WriteQuestion.vue`)：
   - 双层 Canvas 设计：底层渲染灰色半透明虚线模板（要写的数字/算式），上层捕获鼠标/触控轨迹，调用 `canvasHelper.ts` 的平滑渲染函数进行黑色圆润描红。
   - 提供「清除」「撤销一笔」按钮。
4. **独立练写本页面** (`src/views/WriteBook.vue`)：
   - 类似字帖。提供数字（0-100）、加减法算式、单位元角分时的模板选择。
   - 允许孩子在模板上练写，支持笔迹撤销和重来，并可将最近写得最好的字以 Base64 图像保存到本地练写历史中展示。

---

### 第五步：错题本、家长端与设置

1. **错题本页面** (`src/views/Mistakes.vue`)：
   - 列出所有已记录的错题，支持按知识模块筛选。
   - 提供「错题重练」模式：每次练习从错题中抽取 5 题，只有连续 2 次答对该错题，才会将该题从错题本中移除。
2. **家长端页面** (`src/views/Parents.vue`)：
   - 引入一个防小孩子误触的家长锁（如“请滑动拼图”或“计算 15 - 8 = ?”）。
   - 进入后展示孩子学习概览：已学天数、做题总数、正确率（用纯 CSS / SVG 绘制饼图）、星星总数。
   - 列出最近经常出错的薄弱关卡（如“20以内退位减法”正确率低于60%），并输出建议复习提示。
3. **系统设置页面** (`src/views/Settings.vue`)：
   - 音效/动效开关。
   - 题量选择：设置每次关卡练习的题目数量（默认 5/10/15 题）。
   - 「重置所有数据」按钮：带二次警告弹窗，确认后清空本地 localStorage 并刷新页面。

---

### 第六步：宠物成长与人民币兑换游戏

1. **宠物小屋页面** (`src/views/PetHouse.vue`)：
   - 展示选中的宠物（猫或狗）。宠物的大小和进化形态与数学岛章节通关进度强绑定（共 4 个形态：蛋/幼崽/成长体/成熟体）。
   - 展示宠物的 2D 拟真动作（如眨眼、呼吸，用 CSS keyframes 制作）、当前等级、当前经验/升级阈值、饱食度条和清洁度条。
   - **特权提醒**：在等级变化时，展示并更新当前解锁的能力特权（幸运双倍、免错盾牌、提示助手、商店优惠）。
   - **日常互动**：提供「抚摸」按钮（触发宠物开心跳跃动画）；提供「洗澡」按钮（拖拽肥皂刷子在宠物身上移动，增加清洁度，到 100 停止）。
   - **投喂机制**：提供「投喂」按钮，展示背包中的苹果/鱼骨等物品及剩余数量，点击消耗道具增加对应饱食度。
2. **人民币商店**：
   - 货架上陈列宠物食物道具，价格标签严格写为“X元Y角Z分”形式。
   - 购买时若触发“6级特权”，则享受 8 折优惠。调用 `walletStore.purchaseItem` 完成扣款并放入背包。
3. **人民币兑换小游戏** (`src/views/ExchangeGame.vue`)：
   - 纯前端趣味兑换交互。
   - 界面一侧有零钱袋（装有大量的 1分、1角 硬币），另一侧有“存钱罐”。
   - 学生可以通过鼠标拖拽或触控拖拽将 10 个「1分硬币」拖入存钱罐。当集满 10 个时，存钱罐闪烁并播放音效，自动生成一个「1角硬币」弹回到零钱袋，并更新 `walletStore` 状态。
   - 同样支持将 10 个「1角硬币」拖入兑换为「1元纸币」，以此建立直观的人民币换算认知。

---

## 4. 验证与产出要求

当上述所有模块编码完成后，请执行以下校验步骤：
1. 运行 `npm run test`，确保所有测试用例（包括新增的 Store、判题逻辑、数据校验）全部通过。
2. 运行 `npm run build`，确保整个项目能够顺利打包，没有 TypeScript 类型报错。
3. 在 `walkthrough.md` 中记录你实现的模块、运行的测试命令和通过结果。

请立即开始！先从「第一步：状态管理与数据持久化」开始，先分析需求与代码，然后动手实现。
