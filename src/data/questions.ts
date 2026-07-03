import { Question } from '../types';

export const questions: Question[] = [];

// Helper to add questions
function addQ(q: Omit<Question, 'grade' | 'semester' | 'tags'> & { tags?: string[] }) {
  questions.push({
    ...q,
    grade: '1',
    semester: q.moduleId === 'm1' || q.moduleId === 'm2' || q.moduleId === 'm3' ? 'up' : 'down',
    tags: q.tags || []
  });
}

// Module 1: 数一数与比一比 (启航岛)
// Level 1: 数一数 1 到 5
addQ({
  id: 'q_m1_l1_1',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt></ruby>，<ruby>图<rt>tú</rt></ruby>中共有几只小猫？',
  assets: {
    emojis: ['🐱', '🐱', '🐱'],
    options: ['1只', '3只', '5只']
  },
  answer: '3只',
  explanation: '图中有三只猫。'
});
addQ({
  id: 'q_m1_l1_2',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '数一数，写出苹果的数量。',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎']
  },
  answer: '5',
  explanation: '图中有五个苹果。'
});
addQ({
  id: 'q_m1_l1_3',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'write',
  difficulty: 'basic',
  stem: '请在画板上写数字 3。',
  assets: {},
  answer: '3',
  explanation: '在模板上书写数字3。'
});
addQ({
  id: 'q_m1_l1_4',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '数一数，图中有几朵小花？',
  assets: {
    emojis: ['🌸', '🌸', '🌸', '🌸'],
    options: ['2朵', '4朵', '5朵']
  },
  answer: '4朵',
  explanation: '有四朵小花。'
});
addQ({
  id: 'q_m1_l1_5',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '数一数，小狗有几只？',
  assets: {
    emojis: ['🐶', '🐶']
  },
  answer: '2',
  explanation: '有两只小狗。'
});
addQ({
  id: 'q_m1_l1_6',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'drag',
  difficulty: 'medium',
  stem: '把数字和对应的圆点连起来（拖拽分类）。',
  assets: {
    options: ['3', '5'],
    targets: ['●●●', '●●●●●']
  },
  answer: { '3': '●●●', '5': '●●●●●' },
  explanation: '3对应三个圆点，5对应五个圆点。'
});
addQ({
  id: 'q_m1_l1_7',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '数一数，红星和黄星一共有几个？',
  assets: {
    emojis: ['⭐', '⭐', '⭐', '🌟', '🌟', '🌟'],
    options: ['5个', '6个', '7个']
  },
  answer: '6个',
  explanation: '数一数一共有六个。'
});
addQ({
  id: 'q_m1_l1_8',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '桌子上有4个杯子，拿走1个，还剩几个？',
  assets: {},
  answer: '3',
  explanation: '4 - 1 = 3。'
});

// Level 2: 比一比多少
addQ({
  id: 'q_m1_l2_1',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '哪种水果最多？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍌', '🍌', '🍌', '🍑', '🍑', '🍑', '🍑'],
    options: ['苹果（5个）', '香蕉（3个）', '桃子（4个）']
  },
  answer: '苹果（5个）',
  explanation: '5比3和4都大。'
});
addQ({
  id: 'q_m1_l2_2',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '哪种动物最少？',
  assets: {
    emojis: ['🐱', '🐱', '🐶', '🐶', '🐶', '🐶', '🐰', '🐰', '🐰'],
    options: ['小猫（2只）', '小狗（4只）', '小兔（3只）']
  },
  answer: '小猫（2只）',
  explanation: '2最少。'
});
addQ({
  id: 'q_m1_l2_3',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '5比3大还是小？填入“大”或“小”。',
  assets: {},
  answer: '大',
  explanation: '5比3大。'
});
addQ({
  id: 'q_m1_l2_4',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '2和4哪个数更小？',
  assets: {},
  answer: '2',
  explanation: '2比4小。'
});
addQ({
  id: 'q_m1_l2_5',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'drag',
  difficulty: 'medium',
  stem: '拖拽分一分：将数量等于3和4的组分类。',
  assets: {
    options: ['▲▲▲', '■■■■', '★★★', '●●●●'],
    targets: ['数量为3', '数量为4']
  },
  answer: { '▲▲▲': '数量为3', '★★★': '数量为3', '■■■■': '数量为4', '●●●●': '数量为4' },
  explanation: '分类数量。'
});
addQ({
  id: 'q_m1_l2_6',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '如果小明有3个苹果，小红有5个，谁的苹果多？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎'],
    options: ['小明', '小红', '同样多']
  },
  answer: '小红',
  explanation: '5个大于3个。'
});
addQ({
  id: 'q_m1_l2_7',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '比5少2的数是多少？',
  assets: {},
  answer: '3',
  explanation: '5 - 2 = 3。'
});
addQ({
  id: 'q_m1_l2_8',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'match',
  difficulty: 'hard',
  stem: '将大小关系对应连接。',
  assets: {
    options: ['5和3', '1和4'],
    targets: ['前者大', '前者小']
  },
  answer: { '5和3': '前者大', '1和4': '前者小' },
  explanation: '5 > 3，1 < 4。'
});

// Level 3: 高矮与轻重
addQ({
  id: 'q_m1_l3_1',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '大象和小猫比，谁更重？',
  assets: {
    emojis: ['🐘', '🐱'],
    options: ['大象', '小猫', '一样重']
  },
  answer: '大象',
  explanation: '大象体积大很多。'
});
addQ({
  id: 'q_m1_l3_2',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '长颈鹿和兔子比，谁更高？',
  assets: {
    emojis: ['🦒', '🐰'],
    options: ['长颈鹿', '兔子']
  },
  answer: '长颈鹿',
  explanation: '长颈鹿个子很高。'
});
addQ({
  id: 'q_m1_l3_3',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '气球和石头比，哪个更轻？',
  assets: {
    emojis: ['🎈', '🪨']
  },
  answer: '气球',
  explanation: '气球充满气体更轻。'
});
addQ({
  id: 'q_m1_l3_4',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '小明比小红高，小红比小强高，谁最高？',
  assets: {},
  answer: '小明',
  explanation: '小明最高。'
});
addQ({
  id: 'q_m1_l3_5',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'match',
  difficulty: 'medium',
  stem: '连线：请连接正确的高度关系。',
  assets: {
    options: ['长颈鹿', '小仓鼠'],
    targets: ['高高的', '矮矮的']
  },
  answer: { '长颈鹿': '高高的', '小仓鼠': '矮矮的' },
  explanation: '配对高度。'
});
addQ({
  id: 'q_m1_l3_6',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '两杯一样多的水，放入一块大石头和一块小石头，哪杯水溢出得更多？',
  assets: {
    options: ['放了大石头的杯子', '放了小石头的杯子', '溢出一样多']
  },
  answer: '放了大石头的杯子',
  explanation: '大石头体积大排开水多。'
});
addQ({
  id: 'q_m1_l3_7',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '一个苹果和一个西瓜，哪一个更重？',
  assets: {
    emojis: ['🍎', '🍉']
  },
  answer: '西瓜',
  explanation: '西瓜更重。'
});
addQ({
  id: 'q_m1_l3_8',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '折叠后，哪张纸条拉直了最长？',
  assets: {
    options: ['折了2折的', '折了5折的', '没折的']
  },
  answer: '折了5折的',
  explanation: '折数多代表展开后更长。'
});


// Module 2: 数字岛 (0到10与11到20的认识)
// Let's generate level 1 to 4 for m2
// Level 1: 0到10的认识
addQ({
  id: 'q_m2_l1_1',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '比7大比9小的数是谁？',
  assets: {
    options: ['6', '8', '10']
  },
  answer: '8',
  explanation: '7、8、9顺序排列。'
});
addQ({
  id: 'q_m2_l1_2',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '把以下数字按从小到大排序，中间的数字是几？ 3, 7, 5',
  assets: {},
  answer: '5',
  explanation: '排完是 3, 5, 7。'
});
addQ({
  id: 'q_m2_l1_3',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'write',
  difficulty: 'basic',
  stem: '请写下数字 8。',
  assets: {},
  answer: '8',
  explanation: '书写数字 8。'
});
addQ({
  id: 'q_m2_l1_4',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '一共有几根手指？',
  assets: {
    emojis: ['🖐️', '🖐️'],
    options: ['8根', '10根', '12根']
  },
  answer: '10根',
  explanation: '正常人双手有10根手指。'
});
addQ({
  id: 'q_m2_l1_5',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '0和1比，哪个大？',
  assets: {},
  answer: '1',
  explanation: '1比0大。'
});
addQ({
  id: 'q_m2_l1_6',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '在 1 到 10 之间，双数一共有几个？',
  assets: {
    options: ['4个', '5个', '6个']
  },
  answer: '5个',
  explanation: '双数是 2, 4, 6, 8, 10，共 5 个。'
});
addQ({
  id: 'q_m2_l1_7',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '比6大且比10小的最大的数是几？',
  assets: {},
  answer: '9',
  explanation: '在7, 8, 9中，最大的数是9。'
});
addQ({
  id: 'q_m2_l1_8',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'write',
  difficulty: 'hard',
  stem: '请练写数字 0。',
  assets: {},
  answer: '0',
  explanation: '练写0。'
});

// Level 2: 数的分与合
addQ({
  id: 'q_m2_l2_1',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '5可以分成2和几？',
  assets: {
    options: ['2', '3', '4']
  },
  answer: '3',
  explanation: '5 = 2 + 3。'
});
addQ({
  id: 'q_m2_l2_2',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'fill',
  difficulty: 'basic',
  stem: '4和3合起来是多少？',
  assets: {},
  answer: '7',
  explanation: '4 + 3 = 7。'
});
addQ({
  id: 'q_m2_l2_3',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'diagram',
  difficulty: 'medium',
  stem: '根据苹果的分组，填入算式（例如 3 + 1 = 4）。',
  assets: {},
  answer: '3+1=4',
  explanation: '3个苹果和1个苹果合起来是4。'
});
addQ({
  id: 'q_m2_l2_4',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '8可以分成4和几？',
  assets: {},
  answer: '4',
  explanation: '8可以分成4和4。'
});
addQ({
  id: 'q_m2_l2_5',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '10可以分成哪两个数？',
  assets: {
    options: ['3和7', '4和5', '2 reward']
  },
  answer: '3和7',
  explanation: '3+7=10。'
});
addQ({
  id: 'q_m2_l2_6',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '几和几可以合起来组成 6？（写出一组，如3和3）',
  assets: {},
  answer: '3和3',
  explanation: '3和3可以组成6。'
});
addQ({
  id: 'q_m2_l2_7',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'diagram',
  difficulty: 'hard',
  stem: '看图列式：5个三角形分成2个和3个，可以写成 5-2=3。请写出来。',
  assets: {},
  answer: '5-2=3',
  explanation: '减法算式。'
});
addQ({
  id: 'q_m2_l2_8',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '9可以分成哪组数？',
  assets: {
    options: ['1和8', '2和6', '3和5']
  },
  answer: '1和8',
  explanation: '1+8=9。'
});

// Level 3: 11 到 20 的认识
addQ({
  id: 'q_m2_l3_1',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '比11大比13小的数是谁？',
  assets: {
    options: ['10', '12', '14']
  },
  answer: '12',
  explanation: '11后面的数是12。'
});
addQ({
  id: 'q_m2_l3_2',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'basic',
  stem: '写出“十五”的阿拉伯数字。',
  assets: {},
  answer: '15',
  explanation: '十五写作15。'
});
addQ({
  id: 'q_m2_l3_3',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '1个十和7个一合起来是多少？',
  assets: {
    options: ['17', '71', '8']
  },
  answer: '17',
  explanation: '1个十是10，7个一是7，合起来是17。'
});
addQ({
  id: 'q_m2_l3_4',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '2个十是多少？',
  assets: {},
  answer: '20',
  explanation: '2个十是20。'
});
addQ({
  id: 'q_m2_l3_5',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '13和18相比，哪个数更小？',
  assets: {
    options: ['13', '18']
  },
  answer: '13',
  explanation: '13小于18。'
});
addQ({
  id: 'q_m2_l3_6',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '18里面有几个一？',
  assets: {},
  answer: '18',
  explanation: '18里面有18个一。'
});
addQ({
  id: 'q_m2_l3_7',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '比16大比19小的数有哪几个？',
  assets: {
    options: ['17和18', '15和16', '19和20']
  },
  answer: '17和18',
  explanation: '在16和19之间的数是17和18。'
});
addQ({
  id: 'q_m2_l3_8',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '写出比19多1的数。',
  assets: {},
  answer: '20',
  explanation: '19 + 1 = 20。'
});

// Level 4: 十位和个位
addQ({
  id: 'q_m2_l4_1',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'basic',
  stem: '在数字 14 中，十位上的数是几？',
  assets: {
    options: ['1', '4', '14']
  },
  answer: '1',
  explanation: '十位在左边，个位在右边。'
});
addQ({
  id: 'q_m2_l4_2',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'basic',
  stem: '在数字 18 中，个位上的数是几？',
  assets: {},
  answer: '8',
  explanation: '个位是 8。'
});
addQ({
  id: 'q_m2_l4_3',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'medium',
  stem: '十位上是2，个位上是0，这个数是几？',
  assets: {
    options: ['2', '20', '200']
  },
  answer: '20',
  explanation: '十位2，个位0即是20。'
});
addQ({
  id: 'q_m2_l4_4',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'medium',
  stem: '十位上是1，个位上的数比十位上的数大5，这个数是几？',
  assets: {},
  answer: '16',
  explanation: '个位是1+5=6，这个数是16。'
});
addQ({
  id: 'q_m2_l4_5',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'medium',
  stem: '个位上是9，十位上是1，这个数是几？',
  assets: {
    options: ['19', '91', '10']
  },
  answer: '19',
  explanation: '十位是1，个位是9，这个数是19。'
});
addQ({
  id: 'q_m2_l4_6',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'hard',
  stem: '一个两位数，个位上是0，这个数最小是几？',
  assets: {},
  answer: '10',
  explanation: '最小的两位数是个位为0，十位为1，所以是10。'
});
addQ({
  id: 'q_m2_l4_7',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'hard',
  stem: '12里的“1”代表什么意思？',
  assets: {
    options: ['1个十', '1个一', '没有意义']
  },
  answer: '1个十',
  explanation: '十位上的1代表一个十。'
});
addQ({
  id: 'q_m2_l4_8',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'hard',
  stem: '在 11 到 20 中，十位和个位数相同的数是几？',
  assets: {},
  answer: '11',
  explanation: '只有 11 这一位十位和个位相同。'
});


// Module 3: 运算岛 (20以内加减法)
// Level 1: 5以内的加减法
addQ({
  id: 'q_m3_l1_1',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '1 + 2 = ？',
  assets: {
    options: ['2', '3', '4']
  },
  answer: '3',
  explanation: '1加2等于3。'
});
addQ({
  id: 'q_m3_l1_2',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '3 - 1 = ？',
  assets: {},
  answer: '2',
  explanation: '3减1等于2。'
});
addQ({
  id: 'q_m3_l1_3',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'diagram',
  difficulty: 'medium',
  stem: '看图列式：两个笑脸加三个笑脸，一共有五个。请写出加法算式。',
  assets: {},
  answer: '2+3=5',
  explanation: '两部分合起来是 2+3=5。'
});
addQ({
  id: 'q_m3_l1_4',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '4 - 2 = ？',
  assets: {},
  answer: '2',
  explanation: '4 - 2 = 2。'
});
addQ({
  id: 'q_m3_l1_5',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '5 - 3 = ？',
  assets: {
    options: ['1', '2', '3']
  },
  answer: '2',
  explanation: '5 - 3 = 2。'
});
addQ({
  id: 'q_m3_l1_6',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '比2多2的数是多少？',
  assets: {},
  answer: '4',
  explanation: '2 + 2 = 4。'
});
addQ({
  id: 'q_m3_l1_7',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'diagram',
  difficulty: 'hard',
  stem: '看图列式：原有4个球，划掉3个，还剩1个。请写出减法算式。',
  assets: {},
  answer: '4-3=1',
  explanation: '4 - 3 = 1。'
});
addQ({
  id: 'q_m3_l1_8',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪道算式得数等于5？',
  assets: {
    options: ['1 + 3', '2 + 3', '4 - 1']
  },
  answer: '2 + 3',
  explanation: '2+3=5。'
});

// Level 2: 10以内的加法
addQ({
  id: 'q_m3_l2_1',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '4 + 4 = ？',
  assets: {
    options: ['7', '8', '9']
  },
  answer: '8',
  explanation: '4加4等于8。'
});
addQ({
  id: 'q_m3_l2_2',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'fill',
  difficulty: 'basic',
  stem: '6 + 3 = ？',
  assets: {},
  answer: '9',
  explanation: '6+3=9。'
});
addQ({
  id: 'q_m3_l2_3',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'match',
  difficulty: 'medium',
  stem: '将算式与正确的得数连起来。',
  assets: {
    options: ['5+3', '7+2'],
    targets: ['8', '9']
  },
  answer: { '5+3': '8', '7+2': '9' },
  explanation: '5+3=8，7+2=9。'
});
addQ({
  id: 'q_m3_l2_4',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '7 + 3 = ？',
  assets: {},
  answer: '10',
  explanation: '7加3等于10。'
});
addQ({
  id: 'q_m3_l2_5',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '5 + 2 = ？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '5+2=7。'
});
addQ({
  id: 'q_m3_l2_6',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '有一棵苹果树，左边挂了5个苹果，右边挂了4个，一共有几个？',
  assets: {
    emojis: ['🌳', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎']
  },
  answer: '9',
  explanation: '5 + 4 = 9。'
});
addQ({
  id: 'q_m3_l2_7',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '比6大3的数是多少？',
  assets: {
    options: ['8', '9', '10']
  },
  answer: '9',
  explanation: '6 + 3 = 9。'
});
addQ({
  id: 'q_m3_l2_8',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'match',
  difficulty: 'hard',
  stem: '连接和为10的配对。',
  assets: {
    options: ['4+6', '2+8'],
    targets: ['10', '10']
  },
  answer: { '4+6': '10', '2+8': '10' },
  explanation: '两组和都为10。'
});

// Level 3: 10以内的减法
addQ({
  id: 'q_m3_l3_1',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '8 - 3 = ？',
  assets: {
    options: ['4', '5', '6']
  },
  answer: '5',
  explanation: '8减3等于5。'
});
addQ({
  id: 'q_m3_l3_2',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'fill',
  difficulty: 'basic',
  stem: '9 - 4 = ？',
  assets: {},
  answer: '5',
  explanation: '9-4=5。'
});
addQ({
  id: 'q_m3_l3_3',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'diagram',
  difficulty: 'medium',
  stem: '看图列式：原有7个，划掉4个，还剩3个。请写出算式。',
  assets: {},
  answer: '7-4=3',
  explanation: '7 - 4 = 3。'
});
addQ({
  id: 'q_m3_l3_4',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '10 - 6 = ？',
  assets: {},
  answer: '4',
  explanation: '10 - 6 = 4。'
});
addQ({
  id: 'q_m3_l3_5',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '7 - 5 = ？',
  assets: {
    options: ['1', '2', '3']
  },
  answer: '2',
  explanation: '7 - 5 = 2。'
});
addQ({
  id: 'q_m3_l3_6',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '小明有10支铅笔，用掉了3支，还剩几支？',
  assets: {},
  answer: '7',
  explanation: '10 - 3 = 7。'
});
addQ({
  id: 'q_m3_l3_7',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '得数最少的是哪一道？',
  assets: {
    options: ['8-2', '9-5', '10-3']
  },
  answer: '9-5',
  explanation: '8-2=6，9-5=4，10-3=7。4最少。'
});
addQ({
  id: 'q_m3_l3_8',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'diagram',
  difficulty: 'hard',
  stem: '看图写算式：从8里面拿走5还剩3，写出减法算式。',
  assets: {},
  answer: '8-5=3',
  explanation: '8 - 5 = 3。'
});

// Level 4: 20以内进位加法
addQ({
  id: 'q_m3_l4_1',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'choice',
  difficulty: 'basic',
  stem: '9 + 2 = ？',
  assets: {
    options: ['10', '11', '12']
  },
  answer: '11',
  explanation: '9凑十法加1，剩下1，合起来是11。'
});
addQ({
  id: 'q_m3_l4_2',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'fill',
  difficulty: 'basic',
  stem: '8 + 5 = ？',
  assets: {},
  answer: '13',
  explanation: '8凑十需要2，剩下3，合起来是13。'
});
addQ({
  id: 'q_m3_l4_3',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'choice',
  difficulty: 'medium',
  stem: '7 + 6 = ？',
  assets: {
    options: ['12', '13', '14']
  },
  answer: '13',
  explanation: '7+6=13。'
});
addQ({
  id: 'q_m3_l4_4',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'fill',
  difficulty: 'medium',
  stem: '9 + 6 = ？',
  assets: {},
  answer: '15',
  explanation: '9+6=15。'
});
addQ({
  id: 'q_m3_l4_5',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'choice',
  difficulty: 'medium',
  stem: '8 + 8 = ？',
  assets: {
    options: ['15', '16', '17']
  },
  answer: '16',
  explanation: '8+8=16。'
});
addQ({
  id: 'q_m3_l4_6',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'fill',
  difficulty: 'hard',
  stem: '操场上有8个小朋友在跑步，又有7个加入，一共有几个？',
  assets: {},
  answer: '15',
  explanation: '8 + 7 = 15。'
});
addQ({
  id: 'q_m3_l4_7',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪个算式的结果和 9 + 4 相同？',
  assets: {
    options: ['8 + 5', '7 + 5', '9 + 3']
  },
  answer: '8 + 5',
  explanation: '9+4=13，8+5=13。'
});
addQ({
  id: 'q_m3_l4_8',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'fill',
  difficulty: 'hard',
  stem: '比9多8的数是多少？',
  assets: {},
  answer: '17',
  explanation: '9 + 8 = 17。'
});

// Level 5: 20以内退位减法
addQ({
  id: 'q_m3_l5_1',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'basic',
  stem: '11 - 2 = ？',
  assets: {
    options: ['8', '9', '10']
  },
  answer: '9',
  explanation: '破十法：10-2=8，8+1=9。'
});
addQ({
  id: 'q_m3_l5_2',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'fill',
  difficulty: 'basic',
  stem: '12 - 4 = ？',
  assets: {},
  answer: '8',
  explanation: '12-4=8。'
});
addQ({
  id: 'q_m3_l5_3',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'medium',
  stem: '15 - 7 = ？',
  assets: {
    options: ['7', '8', '9']
  },
  answer: '8',
  explanation: '15-7=8。'
});
addQ({
  id: 'q_m3_l5_4',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'fill',
  difficulty: 'medium',
  stem: '13 - 6 = ？',
  assets: {},
  answer: '7',
  explanation: '13-6=7。'
});
addQ({
  id: 'q_m3_l5_5',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'medium',
  stem: '14 - 8 = ？',
  assets: {
    options: ['5', '6', '7']
  },
  answer: '6',
  explanation: '14-8=6。'
});
addQ({
  id: 'q_m3_l5_6',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'fill',
  difficulty: 'hard',
  stem: '花店有16朵玫瑰，卖掉了9朵，还剩几朵？',
  assets: {},
  answer: '7',
  explanation: '16 - 9 = 7。'
});
addQ({
  id: 'q_m3_l5_7',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪个算式的结果最大？',
  assets: {
    options: ['12 - 3', '15 - 8', '11 - 5']
  },
  answer: '12 - 3',
  explanation: '12-3=9，15-8=7，11-5=6。9最大。'
});
addQ({
  id: 'q_m3_l5_8',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'fill',
  difficulty: 'hard',
  stem: '比 18 少 9 的数是多少？',
  assets: {},
  answer: '9',
  explanation: '18 - 9 = 9。'
});


// Module 4: 图形岛 (立体与平面图形)
// Level 1: 认识立体图形
addQ({
  id: 'q_m4_l1_1',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '足球是什么形状的？',
  assets: {
    emojis: ['⚽'],
    options: ['球体', '长方体', '圆柱']
  },
  answer: '球体',
  explanation: '足球是圆滚滚的球体。'
});
addQ({
  id: 'q_m4_l1_2',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '魔方是什么形状的？',
  assets: {
    emojis: ['🎲'],
    options: ['正方体', '长方体', '圆柱']
  },
  answer: '正方体',
  explanation: '魔方每个面都是相同的正方形。'
});
addQ({
  id: 'q_m4_l1_3',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '易拉罐是什么形状的？',
  assets: {
    emojis: ['🥫']
  },
  answer: '圆柱',
  explanation: '易拉罐呈上下两个圆形、中间直立的圆柱形。'
});
addQ({
  id: 'q_m4_l1_4',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '数学书是什么形状的？',
  assets: {
    emojis: ['📖']
  },
  answer: '长方体',
  explanation: '数学书是扁扁的长方体。'
});
addQ({
  id: 'q_m4_l1_5',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'match',
  difficulty: 'medium',
  stem: '连线：请将物品与它们对应的立体图形连接。',
  assets: {
    options: ['乒乓球', '粉笔盒'],
    targets: ['球体', '正方体']
  },
  answer: { '乒乓球': '球体', '粉笔盒': '正方体' },
  explanation: '配对立体图形。'
});
addQ({
  id: 'q_m4_l1_6',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪个图形最容易滚动？',
  assets: {
    emojis: ['🔮', '📦', '🧱'],
    options: ['球体', '正方体', '长方体']
  },
  answer: '球体',
  explanation: '球体没有任何棱角，最容易在各个方向滚动。'
});
addQ({
  id: 'q_m4_l1_7',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '一个正方体一共有几个面？',
  assets: {},
  answer: '6',
  explanation: '正方体有6个面。'
});
addQ({
  id: 'q_m4_l1_8',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'match',
  difficulty: 'hard',
  stem: '连线：连接图形与物品。',
  assets: {
    options: ['长方体', '圆柱'],
    targets: ['文具盒', '水杯']
  },
  answer: { '长方体': '文具盒', '圆柱': '水杯' },
  explanation: '正确配对。'
});

// Level 2: 认识平面图形
addQ({
  id: 'q_m4_l2_1',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '红领巾是什么形状的？',
  assets: {
    emojis: ['🧣'],
    options: ['三角形', '正方形', '圆形']
  },
  answer: '三角形',
  explanation: '红领巾有三个角 and 三条边。'
});
addQ({
  id: 'q_m4_l2_2',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '镜子（一般的）大多是什么形状的？',
  assets: {
    emojis: ['🪞'],
    options: ['圆形', '三角形', '无法确定']
  },
  answer: '圆形',
  explanation: '多为圆形。'
});
addQ({
  id: 'q_m4_l2_3',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '地砖（四边相等）是什么形状的？',
  assets: {
    emojis: ['🟩']
  },
  answer: '正方形',
  explanation: '四条边相等且是直角。'
});
addQ({
  id: 'q_m4_l2_4',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '黑板的面是什么形状的？',
  assets: {
    emojis: ['📋']
  },
  answer: '长方形',
  explanation: '黑板有两个长边和两个短边。'
});
addQ({
  id: 'q_m4_l2_5',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'match',
  difficulty: 'medium',
  stem: '连线：请连接正确平面图形名称。',
  assets: {
    options: ['三条边', '四条边一样长'],
    targets: ['三角形', '正方形']
  },
  answer: { '三条边': '三角形', '四条边一样长': '正方形' },
  explanation: '几何特征。'
});
addQ({
  id: 'q_m4_l2_6',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '用一个圆柱可以在纸上画出什么图形？',
  assets: {
    emojis: ['🥫', '➡️', '📝'],
    options: ['圆形', '正方形', '三角形']
  },
  answer: '圆形',
  explanation: '圆柱的底面是圆形。'
});
addQ({
  id: 'q_m4_l2_7',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '一个正方形折一次，最可能变成两个什么图形？',
  assets: {
    emojis: ['⬜', '➡️', '✂️']
  },
  answer: '三角形',
  explanation: '沿着对角线折会变成两个三角形，也可以是长方形。写三角形为标准。'
});
addQ({
  id: 'q_m4_l2_8',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'match',
  difficulty: 'hard',
  stem: '连接面与立体图形。',
  assets: {
    options: ['正方体的面', '长方体的面'],
    targets: ['正方形', '长方形']
  },
  answer: { '正方体的面': '正方形', '长方体的面': '长方形' },
  explanation: '面与体。'
});

// Level 3: 图形分类整理
addQ({
  id: 'q_m4_l3_1',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '把苹果、西瓜、铅笔、桃子分类，哪一个不属于水果？',
  assets: {
    emojis: ['🍎', '🍉', '✏️', '🍑'],
    options: ['铅笔', '桃子', '西瓜']
  },
  answer: '铅笔',
  explanation: '铅笔是文具。'
});
addQ({
  id: 'q_m4_l3_2',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '以下哪一个是平面图形？',
  assets: {
    options: ['三角形', '正方体', '圆柱']
  },
  answer: '三角形',
  explanation: '三角形是扁平的平面图形。'
});
addQ({
  id: 'q_m4_l3_3',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '把正方形、长方形、球、三角形归类，哪一个是立体图形？',
  assets: {},
  answer: '球',
  explanation: '球是立体的。'
});
addQ({
  id: 'q_m4_l3_4',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '分类：红花、黄花、绿叶、蓝花中，哪个不是花？',
  assets: {
    emojis: ['🌺', '🌼', '🍃', '🌸']
  },
  answer: '绿叶',
  explanation: '绿叶属于叶子。'
});
addQ({
  id: 'q_m4_l3_5',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'drag',
  difficulty: 'medium',
  stem: '拖拽归类：将平面图形和立体图形分类。',
  assets: {
    options: ['正方形', '圆柱体', '三角形', '球体'],
    targets: ['平面图形', '立体图形']
  },
  answer: { '正方形': '平面图形', '三角形': '平面图形', '圆柱体': '立体图形', '球体': '立体图形' },
  explanation: '分类几何体。'
});
addQ({
  id: 'q_m4_l3_6',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '按颜色分类，红三角形、蓝圆形、红正方形、蓝三角形中，蓝色图形有几个？',
  assets: {
    emojis: ['🔺', '🔵', '🟥', '🔷'],
    options: ['1个', '2个', '3个']
  },
  answer: '2个',
  explanation: '蓝圆形和蓝三角形，共2个。'
});
addQ({
  id: 'q_m4_l3_7',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '正方体和长方体都有几个顶点？',
  assets: {},
  answer: '8',
  explanation: '它们都各有8个顶点。'
});
addQ({
  id: 'q_m4_l3_8',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'drag',
  difficulty: 'hard',
  stem: '将下列物品分类：苹果、香蕉、白菜、萝卜。',
  assets: {
    options: ['苹果', '香蕉', '白菜', '萝卜'],
    targets: ['水果', '蔬菜']
  },
  answer: { '苹果': '水果', '香蕉': '水果', '白菜': '蔬菜', '萝卜': '蔬菜' },
  explanation: '食物分类。'
});


// Module 5: 生活岛 (人民币与时间)
// Level 1: 认识人民币
addQ({
  id: 'q_m5_l1_1',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '中国使用的货币叫什么？',
  assets: {
    options: ['人民币', '美元', '欧元']
  },
  answer: '人民币',
  explanation: '我国的货币是人民币。'
});
addQ({
  id: 'q_m5_l1_2',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '人民币最小的单位是几？',
  assets: {
    options: ['元', '角', '分']
  },
  answer: '分',
  explanation: '分最小，元最大。'
});
addQ({
  id: 'q_m5_l1_3',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '1元等于几角？',
  assets: {},
  answer: '10',
  explanation: '1元 = 10角。'
});
addQ({
  id: 'q_m5_l1_4',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '1角等于几分？',
  assets: {},
  answer: '10',
  explanation: '1角 = 10分。'
});
addQ({
  id: 'q_m5_l1_5',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '2张5角合起来是多少？',
  assets: {
    emojis: ['🪙', '🪙'],
    options: ['1元', '5角', '10元']
  },
  answer: '1元',
  explanation: '5角+5角 = 10角 = 1元。'
});
addQ({
  id: 'q_m5_l1_6',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '5元等于几角？',
  assets: {},
  answer: '50',
  explanation: '5 * 10 = 50角。'
});
addQ({
  id: 'q_m5_l1_7',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪种面额最大？',
  assets: {
    options: ['5角', '1元', '10分']
  },
  answer: '1元',
  explanation: '1元 = 10角。'
});
addQ({
  id: 'q_m5_l1_8',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '100分等于多少元？',
  assets: {},
  answer: '1',
  explanation: '100分 = 10角 = 1元。'
});

// Level 2: 人民币简单计算
addQ({
  id: 'q_m5_l2_1',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '买一支2角的铅笔，付给售货员5角，应该找回多少？',
  assets: {
    options: ['3角', '2角', '7角']
  },
  answer: '3角',
  explanation: '5 - 2 = 3角。'
});
addQ({
  id: 'q_m5_l2_2',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '买一个5元的本子和一盒3元的蜡笔，一共要花多少钱？',
  assets: {
    options: ['8元', '2元', '15元']
  },
  answer: '8元',
  explanation: '5 + 3 = 8元。'
});
addQ({
  id: 'q_m5_l2_3',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '小红有1元钱，买了一颗8角的糖，还剩几角？',
  assets: {},
  answer: '2',
  explanation: '1元=10角，10-8=2角。'
});
addQ({
  id: 'q_m5_l2_4',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '买一块橡皮需要6分钱，买两块需要几分？',
  assets: {},
  answer: '12',
  explanation: '6 + 6 = 12分。'
});
addQ({
  id: 'q_m5_l2_5',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '用10元买一瓶4元的饮料，应找回多少元？',
  assets: {
    options: ['4元', '6元', '14元']
  },
  answer: '6元',
  explanation: '10 - 4 = 6元。'
});
addQ({
  id: 'q_m5_l2_6',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '一本书要 12元5角，付了一张20元，应找回几元几角？（写出格式如“7元5角”）',
  assets: {},
  answer: '7元5角',
  explanation: '20元 - 12元5角 = 7元5角。'
});
addQ({
  id: 'q_m5_l2_7',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '5元钱最多可以买几支8角的冰棒？',
  assets: {
    options: ['5支', '6支', '7支']
  },
  answer: '6支',
  explanation: '6 * 8角 = 4元8角，剩2角不够买第7支。'
});
addQ({
  id: 'q_m5_l2_8',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '买一个3元的水杯，付一张5元，找回的钱能买几支1元的铅笔？',
  assets: {},
  answer: '2',
  explanation: '找回2元，2 / 1 = 2支。'
});

// Level 3: 认识钟表
addQ({
  id: 'q_m5_l3_1',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '钟面上最长最细走得最快的是什么针？',
  assets: {
    options: ['秒针', '分针', '时针']
  },
  answer: '秒针',
  explanation: '秒针最快最细。'
});
addQ({
  id: 'q_m5_l3_2',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '分针指向12，时针指向6，此时是几点？',
  assets: {
    emojis: ['🕕'],
    options: ['6点整', '12点整', '6点半']
  },
  answer: '6点整',
  explanation: '分针指向12代表整点。'
});
addQ({
  id: 'q_m5_l3_3',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '分针指向6，时针指向8和9的中间，此时是几点半？',
  assets: {
    emojis: ['🕣']
  },
  answer: '8',
  explanation: '分针指6是半点，8和9中间是8点半。'
});
addQ({
  id: 'q_m5_l3_4',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '1小时等于多少分钟？',
  assets: {},
  answer: '60',
  explanation: '1小时 = 60分钟。'
});
addQ({
  id: 'q_m5_l3_5',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '时针从1走到3，经过了几个小时？',
  assets: {
    emojis: ['🕐', '➡️', '🕒'],
    options: ['1小时', '2小时', '3小时']
  },
  answer: '2小时',
  explanation: '3 - 1 = 2。'
});
addQ({
  id: 'q_m5_l3_6',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '现在是4点整，过1小时是几点？',
  assets: {
    emojis: ['🕓', '➡️', '🕐', '❓']
  },
  answer: '5',
  explanation: '4 + 1 = 5点。'
});
addQ({
  id: 'q_m5_l3_7',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'hard',
  stem: '小明早上7点半起床，小红早上8点起床，谁起得早？',
  assets: {
    options: ['小明', '小红', '一样早']
  },
  answer: '小明',
  explanation: '7点半早于8点。'
});
addQ({
  id: 'q_m5_l3_8',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'hard',
  stem: '现在是10点整，分针还要走半圈才是半点。那时候是几点半？',
  assets: {
    emojis: ['🕙']
  },
  answer: '10',
  explanation: '10点过半圈就是10点半。'
});


// Module 6: 复习岛 (综合挑战与错题复习)
// Let's generate level 1 to 2 for m6
// Level 1: 综合练习一
addQ({
  id: 'q_m6_l1_1',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '9和15哪个数大？',
  assets: {
    options: ['9', '15']
  },
  answer: '15',
  explanation: '15大于9。'
});
addQ({
  id: 'q_m6_l1_2',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '计算：3 + 5 - 2 = ？',
  assets: {},
  answer: '6',
  explanation: '3+5=8，8-2=6。'
});
addQ({
  id: 'q_m6_l1_3',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '一个星期有几天？',
  assets: {
    options: ['5天', '7天', '10天']
  },
  answer: '7天',
  explanation: '一星期有7天。'
});
addQ({
  id: 'q_m6_l1_4',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '12-8 = ？',
  assets: {},
  answer: '4',
  explanation: '12-8=4。'
});
addQ({
  id: 'q_m6_l1_5',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '时针指在12，分针也指在12，是几点整？',
  assets: {
    emojis: ['🕛'],
    options: ['12点整', '6点整', '1点整']
  },
  answer: '12点整',
  explanation: '重合代表12点。'
});
addQ({
  id: 'q_m6_l1_6',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '小明有5个苹果，小红比他多3个，他们一共有几个？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎', '➕', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎']
  },
  answer: '13',
  explanation: '小红有5+3=8个，合起来是5+8=13个。'
});
addQ({
  id: 'q_m6_l1_7',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '哪个图形面数最多？',
  assets: {
    options: ['长方体', '球体', '圆柱']
  },
  answer: '长方体',
  explanation: '长方体有6个面，圆柱3个，球体1个。'
});
addQ({
  id: 'q_m6_l1_8',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '在 10, 15, 20, 25 这一串数中，下一个数应该是几？',
  assets: {},
  answer: '30',
  explanation: '每次递增5。'
});

// Level 2: 综合练习二
addQ({
  id: 'q_m6_l2_1',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '比15少5的数是多少？',
  assets: {
    options: ['10', '15', '20']
  },
  answer: '10',
  explanation: '15 - 5 = 10。'
});
addQ({
  id: 'q_m6_l2_2',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '计算：10 + 4 - 6 = ？',
  assets: {},
  answer: '8',
  explanation: '10+4=14，14-6=8。'
});
addQ({
  id: 'q_m6_l2_3',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '个位上是5，十位上是1，这个数是几？',
  assets: {
    options: ['15', '51', '5']
  },
  answer: '15',
  explanation: '这个数是15。'
});
addQ({
  id: 'q_m6_l2_4',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '6个十是几？',
  assets: {},
  answer: '60',
  explanation: '6个十是60。'
});
addQ({
  id: 'q_m6_l2_5',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '一元钱可以换几个一分钱？',
  assets: {
    options: ['10个', '100个', '1000个']
  },
  answer: '100个',
  explanation: '1元 = 100分。'
});
addQ({
  id: 'q_m6_l2_6',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '时针指向3，分针指向12，此时是几点？',
  assets: {
    emojis: ['🕒']
  },
  answer: '3',
  explanation: '3点整。'
});
addQ({
  id: 'q_m6_l2_7',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '把12个苹果平均分给2个小朋友，每个小朋友分几个？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎'],
    options: ['5个', '6个', '7个']
  },
  answer: '6个',
  explanation: '12可以分为两个6。'
});
addQ({
  id: 'q_m6_l2_8',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '小明付了5元买了一个3元5角的玩具，应找回几元几角？（写如“1元5角”）',
  assets: {},
  answer: '1元5角',
  explanation: '5元 - 3元5角 = 1元5角。'
});

export function getQuestionsByLevel(levelId: string): Question[] {
  return questions.filter(q => q.levelId === levelId);
}

export function getQuestionsByModule(moduleId: string): Question[] {
  return questions.filter(q => q.moduleId === moduleId);
}

export interface ModuleInfo {
  id: string;
  name: string;
  pinyin: string;
  icon: string;
}

export interface LevelInfo {
  id: string;
  name: string;
  pinyin: string;
  moduleId: string;
}

export const modulesList: ModuleInfo[] = [
  { id: 'm1', name: '启航岛', pinyin: 'qǐ háng dǎo', icon: '⛵' },
  { id: 'm2', name: '数字岛', pinyin: 'shù zì dǎo', icon: '🏝️' },
  { id: 'm3', name: '运算岛', pinyin: 'yùn suàn dǎo', icon: '🧮' },
  { id: 'm4', name: '图形岛', pinyin: 'tú xíng dǎo', icon: '🎨' },
  { id: 'm5', name: '生活岛', pinyin: 'shēng huó dǎo', icon: '🛍️' },
  { id: 'm6', name: '复习岛', pinyin: 'fù xí dǎo', icon: '🏆' }
];

export const levelsList: LevelInfo[] = [
  { id: 'm1_l1', name: '数一数 1 到 5', pinyin: 'shǔ yī shǔ 1 dào 5', moduleId: 'm1' },
  { id: 'm1_l2', name: '比一比多少', pinyin: 'bǐ yī bǐ duō shǎo', moduleId: 'm1' },
  { id: 'm1_l3', name: '高矮与轻重', pinyin: 'gāo ǎi yǔ qīng zhòng', moduleId: 'm1' },
  { id: 'm2_l1', name: '0到10的认识', pinyin: '0 dào 10 de rèn shi', moduleId: 'm2' },
  { id: 'm2_l2', name: '数的分与合', pinyin: 'shù de fēn yǔ hé', moduleId: 'm2' },
  { id: 'm2_l3', name: '11到20的认识', pinyin: '11 dào 20 de rèn shi', moduleId: 'm2' },
  { id: 'm2_l4', name: '十位和个位', pinyin: 'shí wèi hé gè wèi', moduleId: 'm2' },
  { id: 'm3_l1', name: '5以内加减法', pinyin: '5 yǐ nèi jiā jiǎn fǎ', moduleId: 'm3' },
  { id: 'm3_l2', name: '10以内加法', pinyin: '10  yǐ nèi jiā fǎ', moduleId: 'm3' },
  { id: 'm3_l3', name: '10以内减法', pinyin: '10  yǐ nèi jiǎn fǎ', moduleId: 'm3' },
  { id: 'm3_l4', name: '20进位加法', pinyin: '20 jìn wèi jiā fǎ', moduleId: 'm3' },
  { id: 'm3_l5', name: '20退位减法', pinyin: '20 tuì wèi jiǎn fǎ', moduleId: 'm3' },
  { id: 'm4_l1', name: '认识立体图形', pinyin: 'rèn shi lì tǐ tú xíng', moduleId: 'm4' },
  { id: 'm4_l2', name: '认识平面图形', pinyin: 'rèn shi píng miàn tú xíng', moduleId: 'm4' },
  { id: 'm4_l3', name: '图形分类整理', pinyin: 'tú xíng fēn lèi zhěng lǐ', moduleId: 'm4' },
  { id: 'm5_l1', name: '认识人民币', pinyin: 'rèn shi rén mín bì', moduleId: 'm5' },
  { id: 'm5_l2', name: '人民币计算', pinyin: 'rén mín bì jì suàn', moduleId: 'm5' },
  { id: 'm5_l3', name: '认识钟表', pinyin: 'rèn shi zhōng biǎo', moduleId: 'm5' },
  { id: 'm6_l1', name: '综合练习一', pinyin: 'zōng hé liàn xí yī', moduleId: 'm6' },
  { id: 'm6_l2', name: '综合练习二', pinyin: 'zōng hé liàn xí èr', moduleId: 'm6' }
];
