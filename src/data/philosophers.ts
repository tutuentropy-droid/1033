import type { Philosopher } from '@/types';

export const philosophers: Philosopher[] = [
  {
    id: 'socrates',
    name: '苏格拉底',
    coreIdea: '无知之知',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ancient%20Greek%20philosopher%20Socrates%20head%20portrait%20classical%20style%20warm%20lighting&image_size=square',
    color: '#2E7D32',
    description: '雅典的哲人，以不断追问著称。他承认自己的无知，却因此比任何人都更接近智慧。',
    quote: '"我知道自己一无所知"',
    taunts: [
      '你以为你知道，但你其实不知道。',
      '请先定义你说的这个词是什么意思。',
      '你是否愿意跟随论证，无论它走向何方？',
      '未经审视的回答不值得一听。',
      '你的观点建立在什么样的前提之上？',
      '你能区分知识和意见吗？',
    ],
    praises: [
      '你开始问正确的问题了。',
      '这才是真正的思考！',
      '你对智慧的热爱令我欣慰。',
      '继续追问，不要停下。',
      '你正在认识你自己。',
      '很好，你理解了追问的力量。',
    ],
  },
  {
    id: 'nietzsche',
    name: '尼采',
    coreIdea: '上帝已死',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Friedrich%20Nietzsche%20philosopher%20portrait%20dramatic%20lighting%20intense%20gaze&image_size=square',
    color: '#4A148C',
    description: '疯狂的先知，重估一切价值的勇者。他宣告上帝的死亡，呼唤超人的诞生。',
    quote: '"那些杀不死我的，终将使我更强大"',
    taunts: [
      '奴隶道德！你这是群氓的偏见。',
      '你不过是在为你的软弱找借口。',
      '上帝已经死了，而你还在祈祷。',
      '你的价值判断是谁教会你的？',
      '你在逃避成为你自己。',
      '羊群的舒适，就是你的牢笼。',
    ],
    praises: [
      '你有成为超人的潜质。',
      '这才是主人道德！',
      '你敢于直面生命的深渊。',
      '你的权力意志在燃烧！',
      '重估价值，做得好！',
      '你明白了——人是应该被超越的。',
    ],
  },
  {
    id: 'beauvoir',
    name: '波伏娃',
    coreIdea: '第二性',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Simone%20de%20Beauvoir%20philosopher%20portrait%20elegant%20intelligent%20feminist&image_size=square',
    color: '#C2185B',
    description: '存在主义女性主义的奠基者，她揭示了女人不是天生的，而是被塑造的。',
    quote: '"女人不是天生的，而是变成的"',
    taunts: [
      '这是天性，还是社会规训的结果？',
      '你考虑过性别视角吗？',
      '你在不知不觉中维护着父权秩序。',
      '所谓"自然"，往往是历史的产物。',
      '他者的处境，你真的理解吗？',
      '你以为的选择，其实是被塑造的。',
    ],
    praises: [
      '你看穿了表象，触及了本质。',
      '存在主义的思维方式，你掌握了。',
      '你在为自由而思考。',
      '是的，处境塑造了我们，但我们也能超越处境。',
      '真正的平等，需要真正的理解。',
      '你正在打破枷锁，继续。',
    ],
  },
];

export const getPhilosopherById = (id: string): Philosopher | undefined => {
  return philosophers.find(p => p.id === id);
};

export const getRandomTaunt = (philosopher: Philosopher): string => {
  return philosopher.taunts[Math.floor(Math.random() * philosopher.taunts.length)];
};

export const getRandomPraise = (philosopher: Philosopher): string => {
  return philosopher.praises[Math.floor(Math.random() * philosopher.praises.length)];
};
