import type { Philosopher, EasterEggDialogue } from '@/types';

const socratesDeathEasterEgg: {
  title: string;
  description: string;
  unlockBadgeId: string;
  dialogues: EasterEggDialogue[];
} = {
  title: '苏格拉底之死',
  description: '公元前399年，雅典监狱。苏格拉底被判处死刑，罪名是"不敬神"和"败坏青年"。临刑前的清晨，他的学生和朋友们来劝他逃跑，但他选择了留下。',
  unlockBadgeId: 'badge-maieutic-master',
  dialogues: [
    { speaker: '克里同', text: '苏格拉底，天快亮了。船就要到了，留给我们的时间不多了。请你听我的话，快点逃跑吧！' },
    { speaker: '苏格拉底', text: '亲爱的克里同，你对我的情谊是宝贵的，如果它合乎正道的话。如果不合乎正道，越是深切，就越难处理。我们必须考虑，这件事我们该不该做。' },
    { speaker: '克里同', text: '该做！只要逃跑，你就能活下来，你的朋友们也不用背负骂名，你的孩子们也能得到父亲的抚养。' },
    { speaker: '苏格拉底', text: '克里同，请告诉我，对于一个人来说，最重要的是活着，还是活得好？' },
    { speaker: '克里同', text: '...活得好。' },
    { speaker: '苏格拉底', text: '那么，活得好是否意味着活得正义和光荣？' },
    { speaker: '克里同', text: '是的。' },
    { speaker: '苏格拉底', text: '那我们来看：如果我们不经过城邦的同意就离开这里，我们是不是在伤害我们最不该伤害的东西？' },
    { speaker: '克里同', text: '...你是说法律？' },
    { speaker: '苏格拉底', text: '想象一下，当我们准备逃跑时，雅典的法律和宪法出现在我们面前，问我们："苏格拉底，你想做什么？你想做的这件事，除了推翻我们法律，推翻整个城邦之外，还能是什么呢？一个城邦如果法律的判决没有效力，被私人取消和破坏，这个城邦还能存在吗？"' },
    { speaker: '克里同', text: '可是苏格拉底，是城邦冤枉了你！法律对你不公！' },
    { speaker: '苏格拉底', text: '"那你当初和我们订立的协议呢？我们规定，凡年满二十岁、熟悉城邦政治和法律的人，如果对我们不满，可以带着他的财产去任何他想去的地方。你有七十年的时间可以离开，但你比任何雅典人都更爱这个城邦——你几乎从不离开，除了从军。你在雅典结婚生子。你在这里接受审判，选择了死刑而非流放。现在，你要违背你和我们的协议吗？"' },
    { speaker: '克里同', text: '...（沉默不语）' },
    { speaker: '苏格拉底', text: '"不，不要怪克里同，怪那些判我死刑的人。但我们法律的话，苏格拉底，你要听。如果你逃跑了，你在别的城邦会是什么样的人？一个被放逐的罪人。你的朋友们会被流放、没收财产。你的孩子们呢？如果你带他们去了忒萨利，他们会在异乡人中间长大。如果你留他们在这里，你的朋友们会好好照顾他们——就像你活着时一样，不是吗？"' },
    { speaker: '苏格拉底', text: '所以，克里同，我亲爱的朋友。我仿佛真的听见了这些话，就像听见了西布莉的笛声。它们在我心中回响，让我听不见别的声音。这件事就这样办吧，因为这是神指引的道路。' },
    { speaker: '克里同', text: '...苏格拉底，我无话可说了。' },
    { speaker: '旁白', text: '太阳升起时，狱卒端来了毒酒。苏格拉底平静地举杯，一饮而尽。他的朋友们开始哭泣，他却说："安静些，朋友们。我之所以把女人送走，就是怕她们这样哭。我告诉你们，一个人临死时应该保持安宁。请坚强，安静吧。"他在狱中来回踱步，双腿开始感到沉重。他躺下，用手盖住自己的脸。最后一刻，他掀开盖在脸上的布，说：' },
    { speaker: '苏格拉底', text: '克里同，我还欠阿斯克勒庇俄斯一只公鸡。别忘了替我还了。' },
    { speaker: '旁白', text: '这是他留下的最后一句话。他，这个最正直的人，这个让雅典人既爱又恨的"牛虻"，就这样死了。但他的追问，从未停止。它们从公元前399年的雅典监狱，一路追问到今天——追问每一个自以为知道的人。' },
  ],
};

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
    specialBadge: {
      id: 'badge-maieutic-master',
      name: '真理助产士',
      description: '完整走完苏格拉底助产术追问链的荣耀证明。你不仅回答了问题，更经历了追问的淬炼。就像苏格拉底一样，你开始理解——真正的智慧，不在答案里，而在追问中。',
      icon: '🤰',
      rarity: 'legendary',
      unlockCondition: '在苏格拉底模式下，完整答对一条追问链的全部问题。',
    },
    easterEgg: {
      id: 'socrates-death',
      title: '苏格拉底之死',
      description: '公元前399年，雅典监狱。苏格拉底被判处死刑。临刑前的清晨，他的学生克里同来劝他逃跑...',
      unlockBadgeId: 'badge-maieutic-master',
      dialogues: socratesDeathEasterEgg.dialogues,
    },
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
