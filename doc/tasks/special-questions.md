# 连线、看图列式与写字题型任务列表 (Special Question Types & Writing)

- [x] 开发连线题组件 [MatchQuestion.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/question/MatchQuestion.vue) (支持点击配对或触控拉线，在 Canvas/SVG 上绘制连接轨迹)
- [x] 开发看图列式组件 [DiagramQuestion.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/question/DiagramQuestion.vue) (渲染图形图片与运算符槽位，生成算式字符串进行校验)
- [x] 开发练写题画板组件 [WriteQuestion.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/components/question/WriteQuestion.vue) (双层 Canvas，底图为灰色描红数字/算式/单位，上层进行平滑书写，支持撤销一笔、清空)
- [x] 实现独立练写本视图 [WriteBook.vue](file:///Users/xudeping/Documents/MyProjects/小学趣味数学/src/views/WriteBook.vue) (数字 0-100、基础算式如 `8+5=13`、单位元角分时描写，保存用户最近的书写笔迹图像到本地)
