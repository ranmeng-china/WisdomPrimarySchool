import { Question } from '../types';

export const questions: Question[] = [];

function addQ(q: Omit<Question, 'grade' | 'semester' | 'tags'> & { tags?: string[] }) {
  questions.push({
    ...q,
    grade: '1',
    semester: q.moduleId === 'm1' || q.moduleId === 'm2' || q.moduleId === 'm3' ? 'up' : 'down',
    tags: q.tags || []
  });
}

addQ({
  id: 'q_m1_l1_1',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>图<rt>tú</rt>中<rt>zhōng</rt>有<rt>yǒu</rt>几<rt>jǐ</rt>只<rt>zhī</rt>猫<rt>māo</rt></ruby>？',
  assets: {
    emojis: ['🐱', '🐱', '🐱'],
    options: ['3', '4', '5']
  },
  answer: '3',
  explanation: '图中有3只小猫。'
});

addQ({
  id: 'q_m1_l1_2',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt>，<rt></rt>写<rt>xiě</rt>出<rt>chū</rt>苹<rt>píng</rt>果<rt>guǒ</rt>的<rt>de</rt>数<rt>shù</rt>量<rt>liàng</rt></ruby>：',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍎']
  },
  answer: '5',
  explanation: '一共有5个苹果。'
});

addQ({
  id: 'q_m1_l1_3',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>图<rt>tú</rt>中<rt>zhōng</rt>有<rt>yǒu</rt>几<rt>jǐ</rt>个<rt>gè</rt>圆<rt>yuán</rt>点<rt>diǎn</rt></ruby>？',
  assets: {
    emojis: ['🟢', '🟢'],
    options: ['1', '2', '3']
  },
  answer: '2',
  explanation: '图中有2个圆点。'
});

addQ({
  id: 'q_m1_l1_4',
  moduleId: 'm1',
  levelId: 'm1_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>有<rt>yǒu</rt>几<rt>jǐ</rt>只<rt>zhī</rt>兔<rt>tù</rt>子<rt>zi</rt></ruby>？',
  assets: {
    emojis: ['🐰', '🐰', '🐰', '🐰']
  },
  answer: '4',
  explanation: '一共有4只兔子。'
});

addQ({
  id: 'q_m1_l2_1',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>最<rt>zuì</rt>多<rt>duō</rt></ruby>？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍎', '🍌', '🍌', '🍌'],
    options: ['🍎', '🍌']
  },
  answer: '🍎',
  explanation: '苹果有4个，香蕉有3个，苹果最多。'
});

addQ({
  id: 'q_m1_l2_2',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>最<rt>zuì</rt>少<rt>shǎo</rt></ruby>？',
  assets: {
    emojis: ['🐱', '🐱', '🐶', '🐶', '🐶', '🐶', '🐰', '🐰', '🐰'],
    options: ['🐱', '🐶', '🐰']
  },
  answer: '🐱',
  explanation: '猫有2只，狗有4只，兔有3只，猫最少。'
});

addQ({
  id: 'q_m1_l2_3',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>比<rt>bǐ</rt>一<rt>yǐ</rt>比<rt>bǐ</rt>，<rt></rt>哪<rt>nǎ</rt>边<rt>biān</rt>多<rt>duō</rt></ruby>？',
  assets: {
    emojis: ['🍎', '🍎', '🍎', '🍌', '🍌', '🍌', '🍌'],
    options: ['🍎', '🍌']
  },
  answer: '🍌',
  explanation: '香蕉是4个，苹果是3个，香蕉更多。'
});

addQ({
  id: 'q_m1_l2_4',
  moduleId: 'm1',
  levelId: 'm1_l2',
  type: 'match',
  difficulty: 'medium',
  stem: '<ruby>连<rt>lián</rt>一<rt>yī</rt>连<rt>lián</rt>：<rt></rt>多<rt>duō</rt>和<rt>hé</rt>少<rt>shǎo</rt></ruby>',
  assets: {
    options: ['🔵🔵🔵🔵', '🔴🔴'],
    targets: ['<ruby>多<rt>duō</rt></ruby>', '<ruby>少<rt>shǎo</rt></ruby>']
  },
  answer: { '🔵🔵🔵🔵': '<ruby>多<rt>duō</rt></ruby>', '🔴🔴': '<ruby>少<rt>shǎo</rt></ruby>' },
  explanation: '🔵多，🔴少。'
});

addQ({
  id: 'q_m1_l3_1',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>谁<rt>shéi</rt>更<rt>gèng</rt>重<rt>zhòng</rt></ruby>？',
  assets: {
    options: ['🐘', '🐱']
  },
  answer: '🐘',
  explanation: '大象比猫重得多。'
});

addQ({
  id: 'q_m1_l3_2',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>谁<rt>shéi</rt>更<rt>gèng</rt>高<rt>gāo</rt></ruby>？',
  assets: {
    options: ['🦒', '🐰']
  },
  answer: '🦒',
  explanation: '长颈鹿比兔子高。'
});

addQ({
  id: 'q_m1_l3_3',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>谁<rt>shéi</rt>更<rt>gèng</rt>轻<rt>qīng</rt></ruby>？',
  assets: {
    options: ['🎈', '🪨']
  },
  answer: '🎈',
  explanation: '气球比石头轻。'
});

addQ({
  id: 'q_m1_l3_4',
  moduleId: 'm1',
  levelId: 'm1_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>更<rt>gèng</rt>长<rt>cháng</rt></ruby>？',
  assets: {
    emojis: ['✏️✏️✏️', '🖍️🖍️'],
    options: ['✏️', '🖍️']
  },
  answer: '✏️',
  explanation: '铅笔更长。'
});

addQ({
  id: 'q_m2_l1_1',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>比<rt>bǐ</rt>7<rt></rt>大<rt>dà</rt>，<rt></rt>比<rt>bǐ</rt>9<rt></rt>小<rt>xiǎo</rt>的<rt>de</rt>数<rt>shù</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['6', '8', '10']
  },
  answer: '8',
  explanation: '在7和9中间的数是8。'
});

addQ({
  id: 'q_m2_l1_2',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt>，<rt></rt>一<rt>yī</rt>共<rt>gòng</rt>有<rt>yǒu</rt>几<rt>jǐ</rt>个<rt>gè</rt>星<rt>xīng</rt>星<rt>xīng</rt></ruby>？',
  assets: {
    emojis: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐']
  },
  answer: '8',
  explanation: '一共有8个星星。'
});

addQ({
  id: 'q_m2_l1_3',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'write',
  difficulty: 'medium',
  stem: '<ruby>请<rt>qǐng</rt>写<rt>xiě</rt>出<rt>chū</rt>数<rt>shù</rt>字<rt>zì</rt> 8</ruby>',
  assets: {},
  answer: '8',
  explanation: '书写数字 8。'
});

addQ({
  id: 'q_m2_l1_4',
  moduleId: 'm2',
  levelId: 'm2_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>比<rt>bǐ</rt>5<rt></rt>多<rt>duō</rt>1<rt></rt>的<rt>de</rt>数<rt>shù</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '6',
  explanation: '5 + 1 = 6。'
});

addQ({
  id: 'q_m2_l2_1',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>5<rt></rt>可<rt>kě</rt>以<rt>yǐ</rt>分<rt>fēn</rt>成<rt>chéng</rt>2<rt></rt>和<rt>hé</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['2', '3', '4']
  },
  answer: '3',
  explanation: '5可以分成2和3。'
});

addQ({
  id: 'q_m2_l2_2',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>4<rt></rt>和<rt>hé</rt>3<rt></rt>合<rt>hé</rt>起<rt>qǐ</rt>来<rt>lái</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '7',
  explanation: '4 + 3 = 7。'
});

addQ({
  id: 'q_m2_l2_3',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>10<rt></rt>可<rt>kě</rt>以<rt>yǐ</rt>分<rt>fēn</rt>成<rt>chéng</rt>3<rt></rt>和<rt>hé</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '10可以分成3和7。'
});

addQ({
  id: 'q_m2_l2_4',
  moduleId: 'm2',
  levelId: 'm2_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>8<rt></rt>可<rt>kě</rt>以<rt>yǐ</rt>分<rt>fēn</rt>成<rt>chéng</rt>4<rt></rt>和<rt>hé</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '4',
  explanation: '8可以分成4和4。'
});

addQ({
  id: 'q_m2_l3_1',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>比<rt>bǐ</rt>11<rt></rt>大<rt>dà</rt>，<rt></rt>比<rt>bǐ</rt>13<rt></rt>小<rt>xiǎo</rt>的<rt>de</rt>数<rt>shù</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['10', '12', '14']
  },
  answer: '12',
  explanation: '在11和13中间的数是12。'
});

addQ({
  id: 'q_m2_l3_2',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>写<rt>xiě</rt>出<rt>chū</rt>数<rt>shù</rt>字<rt>zì</rt>十<rt>shí</rt>五<rt>wǔ</rt></ruby>：',
  assets: {},
  answer: '15',
  explanation: '十五写为15。'
});

addQ({
  id: 'q_m2_l3_3',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>1<rt></rt>个<rt>gè</rt>十<rt>shí</rt>和<rt>hé</rt>7<rt></rt>个<rt>gè</rt>一<rt>yī</rt>合<rt>hé</rt>起<rt>qǐ</rt>来<rt>lái</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['17', '71', '8']
  },
  answer: '17',
  explanation: '1个十和7个一是17。'
});

addQ({
  id: 'q_m2_l3_4',
  moduleId: 'm2',
  levelId: 'm2_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>2<rt></rt>个<rt>gè</rt>十<rt>shí</rt>合<rt>hé</rt>起<rt>qǐ</rt>来<rt>lái</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '20',
  explanation: '2个十是20。'
});

addQ({
  id: 'q_m2_l4_1',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>在<rt>zài</rt>数<rt>shù</rt>字<rt>zì</rt>14<rt></rt>中<rt>zhōng</rt>，<rt></rt>十<rt>shí</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['1', '4', '14']
  },
  answer: '1',
  explanation: '14中十位上的数是1。'
});

addQ({
  id: 'q_m2_l4_2',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>在<rt>zài</rt>数<rt>shù</rt>字<rt>zì</rt>18<rt></rt>中<rt>zhōng</rt>，<rt></rt>个<rt>gè</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '8',
  explanation: '18中个位上的数是8。'
});

addQ({
  id: 'q_m2_l4_3',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>十<rt>shí</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>2<rt></rt>，<rt></rt>个<rt>gè</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>0<rt></rt>，<rt></rt>这<rt>zhè</rt>个<rt>gè</rt>数<rt>shù</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {
    options: ['2', '20']
  },
  answer: '20',
  explanation: '十位2个位0是20。'
});

addQ({
  id: 'q_m2_l4_4',
  moduleId: 'm2',
  levelId: 'm2_l4',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>十<rt>shí</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>1<rt></rt>，<rt></rt>个<rt>gè</rt>位<rt>wèi</rt>上<rt>shàng</rt>是<rt>shì</rt>9<rt></rt>，<rt></rt>这<rt>zhè</rt>个<rt>gè</rt>数<rt>shù</rt>是<rt>shì</rt>几<rt>jǐ</rt></ruby>？',
  assets: {},
  answer: '19',
  explanation: '十位1个位9是19。'
});

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
  explanation: '1 + 2 = 3。'
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
  explanation: '3 - 1 = 2。'
});

addQ({
  id: 'q_m3_l1_3',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'diagram',
  difficulty: 'medium',
  stem: '<ruby>看<rt>kàn</rt>图<rt>tú</rt>写<rt>xiě</rt>出<rt>chū</rt>加<rt>jiā</rt>法<rt>fǎ</rt>算<rt>suàn</rt>式<rt>shì</rt></ruby>：',
  assets: {
    emojis: ['🔴', '🔴', '➕', '🔴', '🔴', '🔴']
  },
  answer: '2+3=5',
  explanation: '左边2个加右边3个是5。'
});

addQ({
  id: 'q_m3_l1_4',
  moduleId: 'm3',
  levelId: 'm3_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '5 - 4 = ？',
  assets: {},
  answer: '1',
  explanation: '5 - 4 = 1。'
});

addQ({
  id: 'q_m3_l2_1',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '5 + 3 = ？',
  assets: {
    options: ['7', '8', '9']
  },
  answer: '8',
  explanation: '5加3等于8。'
});

addQ({
  id: 'q_m3_l2_2',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'fill',
  difficulty: 'basic',
  stem: '6 + 4 = ？',
  assets: {},
  answer: '10',
  explanation: '6加4等于10。'
});

addQ({
  id: 'q_m3_l2_3',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '7 + 2 = ？',
  assets: {
    options: ['8', '9', '10']
  },
  answer: '9',
  explanation: '7加2等于9。'
});

addQ({
  id: 'q_m3_l2_4',
  moduleId: 'm3',
  levelId: 'm3_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '4 + 5 = ？',
  assets: {},
  answer: '9',
  explanation: '4加5等于9。'
});

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
  stem: '10 - 4 = ？',
  assets: {},
  answer: '6',
  explanation: '10减4等于6。'
});

addQ({
  id: 'q_m3_l3_3',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '9 - 5 = ？',
  assets: {
    options: ['3', '4', '5']
  },
  answer: '4',
  explanation: '9减5等于4。'
});

addQ({
  id: 'q_m3_l3_4',
  moduleId: 'm3',
  levelId: 'm3_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '7 - 2 = ？',
  assets: {},
  answer: '5',
  explanation: '7减2等于5。'
});

addQ({
  id: 'q_m3_l4_1',
  moduleId: 'm3',
  levelId: 'm3_l4',
  type: 'choice',
  difficulty: 'basic',
  stem: '9 + 4 = ？',
  assets: {
    options: ['12', '13', '14']
  },
  answer: '13',
  explanation: '9加4等于13。'
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
  explanation: '8加5等于13。'
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
  explanation: '7加6等于13。'
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
  explanation: '9加6等于15。'
});

addQ({
  id: 'q_m3_l5_1',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'basic',
  stem: '12 - 5 = ？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '12减5等于7。'
});

addQ({
  id: 'q_m3_l5_2',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'fill',
  difficulty: 'basic',
  stem: '15 - 8 = ？',
  assets: {},
  answer: '7',
  explanation: '15减8等于7。'
});

addQ({
  id: 'q_m3_l5_3',
  moduleId: 'm3',
  levelId: 'm3_l5',
  type: 'choice',
  difficulty: 'medium',
  stem: '11 - 4 = ？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '11减4等于7。'
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
  explanation: '13减6等于7。'
});

addQ({
  id: 'q_m4_l1_1',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>是<rt>shì</rt>球<rt>qiú</rt></ruby>？',
  assets: {
    options: ['🏀', '📦', '🥫']
  },
  answer: '🏀',
  explanation: '篮球是球体。'
});

addQ({
  id: 'q_m4_l1_2',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>是<rt>shì</rt>长<rt>cháng</rt>方<rt>fāng</rt>体<rt>tǐ</rt></ruby>？',
  assets: {
    options: ['📦', '🏀', '🥫']
  },
  answer: '📦',
  explanation: '纸箱是长方体。'
});

addQ({
  id: 'q_m4_l1_3',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>是<rt>shì</rt>圆<rt>yuán</rt>柱<rt>zhù</rt></ruby>？',
  assets: {
    options: ['🥫', '🏀', '📦']
  },
  answer: '🥫',
  explanation: '易拉罐是圆柱。'
});

addQ({
  id: 'q_m4_l1_4',
  moduleId: 'm4',
  levelId: 'm4_l1',
  type: 'drag',
  difficulty: 'medium',
  stem: '<ruby>拖<rt>tuō</rt>拽<rt>zhuài</rt>分<rt>fēn</rt>类<rt>lèi</rt></ruby>',
  assets: {
    options: ['🏀', '📦', '🏐', '💼'],
    targets: ['<ruby>球<rt>qiú</rt></ruby>', '<ruby>长<rt>cháng</rt>方<rt>fāng</rt>体<rt>tǐ</rt></ruby>']
  },
  answer: { '🏀': '<ruby>球<rt>qiú</rt></ruby>', '🏐': '<ruby>球<rt>qiú</rt></ruby>', '📦': '<ruby>长<rt>cháng</rt>方<rt>fāng</rt>体<rt>tǐ</rt></ruby>', '💼': '<ruby>长<rt>cháng</rt>方<rt>fāng</rt>体<rt>tǐ</rt></ruby>' },
  explanation: '🏀和🏐是球，📦和💼是长方体。'
});

addQ({
  id: 'q_m4_l2_1',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>三<rt>sān</rt>角<rt>jiǎo</rt>形<rt>xíng</rt>是<rt>shì</rt>哪<rt>nǎ</rt>个<rt>gè</rt></ruby>？',
  assets: {
    options: ['🔺', '🟡', '🟩']
  },
  answer: '🔺',
  explanation: '红三角是三角形。'
});

addQ({
  id: 'q_m4_l2_2',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>圆<rt>yuán</rt>形<rt>xíng</rt>是<rt>shì</rt>哪<rt>nǎ</rt>个<rt>gè</rt></ruby>？',
  assets: {
    options: ['🟡', '🔺', '🟩']
  },
  answer: '🟡',
  explanation: '黄圆圈是圆形。'
});

addQ({
  id: 'q_m4_l2_3',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>正<rt>zhèng</rt>方<rt>fāng</rt>形<rt>xíng</rt>是<rt>shì</rt>哪<rt>nǎ</rt>个<rt>gè</rt></ruby>？',
  assets: {
    options: ['🟩', '🔺', '🟡']
  },
  answer: '🟩',
  explanation: '绿方块是正方形。'
});

addQ({
  id: 'q_m4_l2_4',
  moduleId: 'm4',
  levelId: 'm4_l2',
  type: 'match',
  difficulty: 'medium',
  stem: '<ruby>连<rt>lián</rt>一<rt>yī</rt>连<rt>lián</rt></ruby>',
  assets: {
    options: ['🔺', '🟡'],
    targets: ['<ruby>三<rt>sān</rt>角<rt>jiǎo</rt>形<rt>xíng</rt></ruby>', '<ruby>圆<rt>yuán</rt>形<rt>xíng</rt></ruby>']
  },
  answer: { '🔺': '<ruby>三<rt>sān</rt>角<rt>jiǎo</rt>形<rt>xíng</rt></ruby>', '🟡': '<ruby>圆<rt>yuán</rt>形<rt>xíng</rt></ruby>' },
  explanation: '🔺对应三角形，🟡对应圆形。'
});

addQ({
  id: 'q_m4_l3_1',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>图<rt>tú</rt>中<rt>zhōng</rt>有<rt>yǒu</rt>几<rt>jǐ</rt>个<rt>gè</rt>三<rt>sān</rt>角<rt>jiǎo</rt>形<rt>xíng</rt></ruby>？',
  assets: {
    emojis: ['🔺', '🔺', '🔺', '🟡'],
    options: ['2', '3', '4']
  },
  answer: '3',
  explanation: '图中有3个三角形。'
});

addQ({
  id: 'q_m4_l3_2',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt>，<rt></rt>有<rt>yǒu</rt>几<rt>jǐ</rt>个<rt>gè</rt>正<rt>zhèng</rt>方<rt>fāng</rt>形<rt>xíng</rt></ruby>？',
  assets: {
    emojis: ['🟩', '🟩', '🔺']
  },
  answer: '2',
  explanation: '图中有2个正方形。'
});

addQ({
  id: 'q_m4_l3_3',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>图<rt>tú</rt>中<rt>zhōng</rt>哪<rt>nǎ</rt>个<rt>gè</rt>图<rt>tú</rt>形<rt>xíng</rt>最<rt>zuì</rt>多<rt>duō</rt></ruby>？',
  assets: {
    emojis: ['🔺', '🔺', '🔺', '🟡', '🟡'],
    options: ['🔺', '🟡']
  },
  answer: '🔺',
  explanation: '三角形有3个，圆形有2个，三角形最多。'
});

addQ({
  id: 'q_m4_l3_4',
  moduleId: 'm4',
  levelId: 'm4_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>数<rt>shǔ</rt>一<rt>yī</rt>数<rt>shǔ</rt>，<rt></rt>有<rt>yǒu</rt>几<rt>jǐ</rt>个<rt>gè</rt>圆<rt>yuán</rt>形<rt>xíng</rt></ruby>？',
  assets: {
    emojis: ['🟡', '🟡', '🟡', '🟡', '🟩']
  },
  answer: '4',
  explanation: '图中有4个圆形。'
});

addQ({
  id: 'q_m5_l1_1',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>1<rt></rt>元<rt>yuán</rt>等<rt>děng</rt>于<rt>yú</rt>几<rt>jǐ</rt>角<rt>jiǎo</rt></ruby>？',
  assets: {
    options: ['5<ruby>角<rt>jiǎo</rt></ruby>', '10<ruby>角<rt>jiǎo</rt></ruby>', '20<ruby>角<rt>jiǎo</rt></ruby>']
  },
  answer: '10<ruby>角<rt>jiǎo</rt></ruby>',
  explanation: '1元 = 10角。'
});

addQ({
  id: 'q_m5_l1_2',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>1<rt></rt>角<rt>jiǎo</rt>等<rt>děng</rt>于<rt>yú</rt>几<rt>jǐ</rt>分<rt>fēn</rt></ruby>？',
  assets: {},
  answer: '10',
  explanation: '1角 = 10分。'
});

addQ({
  id: 'q_m5_l1_3',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>5<rt></rt>角<rt>jiǎo</rt>和<rt>hé</rt>5<rt></rt>角<rt>jiǎo</rt>是<rt>shì</rt>几<rt>jǐ</rt>元<rt>yuán</rt></ruby>？',
  assets: {
    options: ['1<ruby>元<rt>yuán</rt></ruby>', '2<ruby>元<rt>yuán</rt></ruby>', '5<ruby>元<rt>yuán</rt></ruby>']
  },
  answer: '1<ruby>元<rt>yuán</rt></ruby>',
  explanation: '5角+5角是10角，即1元。'
});

addQ({
  id: 'q_m5_l1_4',
  moduleId: 'm5',
  levelId: 'm5_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>1<rt></rt>元<rt>yuán</rt>是<rt>shì</rt>几<rt>jǐ</rt>个<rt>gè</rt>5<rt></rt>角<rt>jiǎo</rt></ruby>？',
  assets: {},
  answer: '2',
  explanation: '1元可以换2个5角。'
});

addQ({
  id: 'q_m5_l2_1',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'basic',
  stem: '3角 + 2角 = ？',
  assets: {
    options: ['4<ruby>角<rt>jiǎo</rt></ruby>', '5<ruby>角<rt>jiǎo</rt></ruby>', '6<ruby>角<rt>jiǎo</rt></ruby>']
  },
  answer: '5<ruby>角<rt>jiǎo</rt></ruby>',
  explanation: '3 + 2 = 5，所以是5角。'
});

addQ({
  id: 'q_m5_l2_2',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'basic',
  stem: '1元 - 2角 = 几角？',
  assets: {},
  answer: '8',
  explanation: '1元等于10角，10 - 2 = 8角。'
});

addQ({
  id: 'q_m5_l2_3',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '5元 + 2元 = ？',
  assets: {
    options: ['6<ruby>元<rt>yuán</rt></ruby>', '7<ruby>元<rt>yuán</rt></ruby>', '8<ruby>元<rt>yuán</rt></ruby>']
  },
  answer: '7<ruby>元<rt>yuán</rt></ruby>',
  explanation: '5 + 2 = 7元。'
});

addQ({
  id: 'q_m5_l2_4',
  moduleId: 'm5',
  levelId: 'm5_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '10元 - 3元 = 几元？',
  assets: {},
  answer: '7',
  explanation: '10 - 3 = 7元。'
});

addQ({
  id: 'q_m5_l3_1',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'basic',
  stem: '<ruby>分<rt>fēn</rt>针<rt>zhēn</rt>指<rt>zhǐ</rt>向<rt>xiàng</rt>12<rt></rt>，<rt></rt>时<rt>shí</rt>针<rt>zhǐ</rt>指<rt>zhǐ</rt>向<rt>xiàng</rt>3<rt></rt>，<rt></rt>是<rt>shì</rt>几<rt>jǐ</rt>点<rt>diǎn</rt></ruby>？',
  assets: {
    emojis: ['🕒'],
    options: ['3<ruby>点<rt>diǎn</rt></ruby>', '6<ruby>点<rt>diǎn</rt></ruby>', '12<ruby>点<rt>diǎn</rt></ruby>']
  },
  answer: '3<ruby>点<rt>diǎn</rt></ruby>',
  explanation: '时针指向3，分针指向12，是3点整。'
});

addQ({
  id: 'q_m5_l3_2',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'basic',
  stem: '<ruby>分<rt>fēn</rt>针<rt>zhēn</rt>指<rt>zhǐ</rt>向<rt>xiàng</rt>12<rt></rt>，<rt></rt>时<rt>shí</rt>针<rt>zhǐ</rt>指<rt>zhǐ</rt>向<rt>8<rt></rt>，<rt></rt>是<rt>shì</rt>几<rt>jǐ</rt>点<rt>diǎn</rt></ruby>？',
  assets: {
    emojis: ['🕗']
  },
  answer: '8',
  explanation: '时针指向8，分针指向12，是8点整。'
});

addQ({
  id: 'q_m5_l3_3',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'choice',
  difficulty: 'medium',
  stem: '<ruby>分<rt>fēn</rt>针<rt>zhēn</rt>指<rt>zhǐ</rt>向<rt>xiàng</rt>6<rt></rt>，<rt></rt>时<rt>shí</rt>针<rt>zhǐ</rt>在<rt>zài</rt>1<rt></rt>和<rt>hé</rt>2<rt></rt>中<rt>zhōng</rt>间<rt>jiān</rt>，<rt></rt>是<rt>shì</rt>几<rt>jǐ</rt>点<rt>diǎn</rt>半<rt>bàn</rt></ruby>？',
  assets: {
    options: ['1<ruby>点<rt>diǎn</rt></ruby><ruby>半<rt>bàn</rt></ruby>', '2<ruby>点<rt>diǎn</rt></ruby><ruby>半<rt>bàn</rt></ruby>']
  },
  answer: '1<ruby>点<rt>diǎn</rt></ruby><ruby>半<rt>bàn</rt></ruby>',
  explanation: '分针指向6，时针在1和2之间，是1点半。'
});

addQ({
  id: 'q_m5_l3_4',
  moduleId: 'm5',
  levelId: 'm5_l3',
  type: 'fill',
  difficulty: 'medium',
  stem: '<ruby>分<rt>fēn</rt>针<rt>zhēn</rt>指<rt>zhǐ</rt>向<rt>xiàng</rt>12<rt></rt>，<rt></rt>时<rt>shí</rt>针<rt>zhǐ</rt>指<rt>zhǐ</rt>向<rt>12<rt></rt>，<rt></rt>是<rt>shì</rt>几<rt>jǐ</rt>点<rt>diǎn</rt></ruby>？',
  assets: {
    emojis: ['🕛']
  },
  answer: '12',
  explanation: '时针和分针都指向12，是12点整。'
});

addQ({
  id: 'q_m6_l1_1',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'medium',
  stem: '3 + 4 = ？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '3 + 4 = 7。'
});

addQ({
  id: 'q_m6_l1_2',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'medium',
  stem: '9 - 5 = ？',
  assets: {},
  answer: '4',
  explanation: '9 - 5 = 4。'
});

addQ({
  id: 'q_m6_l1_3',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'choice',
  difficulty: 'hard',
  stem: '<ruby>哪<rt>nǎ</rt>个<rt>gè</rt>最<rt>zuì</rt>重<rt>zhòng</rt></ruby>？',
  assets: {
    options: ['🐘', '🐕', '🐱']
  },
  answer: '🐘',
  explanation: '大象在动物中最重。'
});

addQ({
  id: 'q_m6_l1_4',
  moduleId: 'm6',
  levelId: 'm6_l1',
  type: 'fill',
  difficulty: 'hard',
  stem: '12 - 7 = ？',
  assets: {},
  answer: '5',
  explanation: '12 - 7 = 5。'
});

addQ({
  id: 'q_m6_l2_1',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'medium',
  stem: '10 - 3 = ？',
  assets: {
    options: ['6', '7', '8']
  },
  answer: '7',
  explanation: '10 - 3 = 7。'
});

addQ({
  id: 'q_m6_l2_2',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'medium',
  stem: '8 + 4 = ？',
  assets: {},
  answer: '12',
  explanation: '8 + 4 = 12。'
});

addQ({
  id: 'q_m6_l2_3',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'choice',
  difficulty: 'hard',
  stem: '15 - 9 = ？',
  assets: {
    options: ['5', '6', '7']
  },
  answer: '6',
  explanation: '15 - 9 = 6。'
});

addQ({
  id: 'q_m6_l2_4',
  moduleId: 'm6',
  levelId: 'm6_l2',
  type: 'fill',
  difficulty: 'hard',
  stem: '7 + 7 = ？',
  assets: {},
  answer: '14',
  explanation: '7 + 7 = 14。'
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
