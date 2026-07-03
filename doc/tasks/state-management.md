# 状态管理与数据持久化任务列表 (State Stores & Persistence)

- [x] 创建全局 TS 类型声明文件 [types/index.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/types/index.ts)
- [x] 创建学习进度 Store [stores/progress.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/stores/progress.ts) (定义 LearningProgress, 记录关卡及答题历史)
- [x] 创建宠物状态 Store [stores/pet.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/stores/pet.ts) (定义 PetData, 处理经验、等级、饱食度、清洁度及背包状态)
- [x] 创建货币钱包 Store [stores/wallet.ts](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/stores/wallet.ts) (同步宠物钱包属性, 实现赚取分、购买扣费、单位合成)
- [x] 实现 LocalStorage 数据统一持久化加载、保存与防错异常回滚机制
- [x] 实现本地数据版本迁移机制 (migrateProgressData)
