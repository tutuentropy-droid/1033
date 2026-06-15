import type { Question, PhilosopherId } from '@/types';

export const questions: Question[] = [
  {
    id: 'q1',
    philosopherId: 'socrates',
    scene: '你的朋友说："我知道什么是正义，正义就是遵守法律。"',
    options: [
      { id: 'q1a', text: '"请告诉我，法律本身是正义的吗？如果法律不正义，遵守它还是正义吗？"', isCorrect: true, philosopherId: 'socrates' },
      { id: 'q1b', text: '"法律是奴隶道德的产物，真正的正义由强者定义。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q1c', text: '"你有没有想过，所谓的正义概念可能带有性别偏见？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q1d', text: '"正义是相对的，每个人都有自己的看法。"', isCorrect: false, philosopherId: 'socrates' },
    ],
    explanation: '苏格拉底会通过追问定义和前提来揭示概念的复杂性，而不是直接给出答案。',
  },
  {
    id: 'q2',
    philosopherId: 'socrates',
    scene: '有人声称："我是个好人，因为我从不做坏事。"',
    options: [
      { id: 'q2a', text: '"你所谓的\'好\'是什么意思？是因为害怕惩罚才不做坏事吗？"', isCorrect: true, philosopherId: 'socrates' },
      { id: 'q2b', text: '"所谓的好，不过是弱者为了限制强者而编造的道德。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q2c', text: '"这个好的标准是谁定义的？是你自己，还是社会规训的结果？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q2d', text: '"只要问心无愧，就是好人。"', isCorrect: false, philosopherId: 'socrates' },
    ],
    explanation: '苏格拉底的"助产术"会通过追问帮助对方澄清自己的概念，而不是接受表面的答案。',
  },
  {
    id: 'q3',
    philosopherId: 'nietzsche',
    scene: '同事抱怨："生活太不公平了，为什么受苦的总是我？"',
    options: [
      { id: 'q3a', text: '"你在抱怨中寻求慰藉，这是奴隶的道德！苦难应该使你更强大。"', isCorrect: true, philosopherId: 'nietzsche' },
      { id: 'q3b', text: '"请告诉我，你所谓的\'公平\'是什么意思？"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q3c', text: '"你有没有考虑过，你的苦难可能与结构性的不平等有关？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q3d', text: '"生活本就不公平，接受现实吧。"', isCorrect: false, philosopherId: 'nietzsche' },
    ],
    explanation: '尼采鄙视怨恨道德，他会鼓励人在苦难中成长，而不是抱怨命运。',
  },
  {
    id: 'q4',
    philosopherId: 'nietzsche',
    scene: '有人说："人应该有同情心，帮助弱小是美德。"',
    options: [
      { id: 'q4a', text: '"同情心是毒药！它让强者被弱者拉下水，这是群氓的价值观。"', isCorrect: true, philosopherId: 'nietzsche' },
      { id: 'q4b', text: '"请先定义什么是\'弱小\'，什么是\'帮助\'。"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q4c', text: '"谁是弱小？这个标签是不是强者加诸于人的？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q4d', text: '"同情心是人的天性，你太冷酷了。"', isCorrect: false, philosopherId: 'nietzsche' },
    ],
    explanation: '尼采批判奴隶道德，认为同情会削弱人的生命力，阻碍超人的诞生。',
  },
  {
    id: 'q5',
    philosopherId: 'beauvoir',
    scene: '有人说："女人天生就比较情绪化，不适合做领导。"',
    options: [
      { id: 'q5a', text: '"你说的\'天生\'，到底是生理决定的，还是几千年社会规训的结果？"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q5b', text: '"请告诉我，你对\'情绪化\'的定义是什么？"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q5c', text: '"这是弱者的偏见，真正的强者超越性别。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q5d', text: '"我不同意你的看法，但每个人都有自己的观点。"', isCorrect: false, philosopherId: 'beauvoir' },
    ],
    explanation: '波伏娃的核心洞见是"女人不是天生的，而是变成的"，她会质疑所谓的"天性"。',
  },
  {
    id: 'q6',
    philosopherId: 'beauvoir',
    scene: '朋友说："女孩子就应该找个稳定的工作，然后结婚生子，这才是幸福。"',
    options: [
      { id: 'q6a', text: '"你说的\'应该\'，是你真实的选择，还是社会期待你扮演的角色？"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q6b', text: '"请先定义什么是\'幸福\'。"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q6c', text: '"这是羊群的幸福，真正的人要创造自己的价值。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q6d', text: '"每个人对幸福的定义不同，开心就好。"', isCorrect: false, philosopherId: 'beauvoir' },
    ],
    explanation: '波伏娃会追问"应该"背后的社会规训，鼓励女性摆脱被给定的角色。',
  },
  {
    id: 'q7',
    philosopherId: 'socrates',
    scene: '学生说："老师，我已经读了很多书，我很有智慧了。"',
    options: [
      { id: 'q7a', text: '"你读了很多书，但你知道自己不知道什么吗？"', isCorrect: true, philosopherId: 'socrates' },
      { id: 'q7b', text: '"书本知识是死的，重估一切价值才是真智慧。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q7c', text: '"这些书是谁写的？它们是不是在维护某种权力结构？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q7d', text: '"很好，知识就是力量。"', isCorrect: false, philosopherId: 'socrates' },
    ],
    explanation: '苏格拉底的"无知之知"认为，承认自己的无知才是真正智慧的开始。',
  },
  {
    id: 'q8',
    philosopherId: 'nietzsche',
    scene: '有人说："我要做个有道德的人，这样死后才能上天堂。"',
    options: [
      { id: 'q8a', text: '"上帝已经死了！你的道德不过是为了换取死后奖赏的奴隶契约。"', isCorrect: true, philosopherId: 'nietzsche' },
      { id: 'q8b', text: '"请告诉我，你说的\'道德\'是什么意思？"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q8c', text: '"这个道德标准是你自己选择的，还是别人教给你的？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q8d', text: '"做个好人总是没错的。"', isCorrect: false, philosopherId: 'nietzsche' },
    ],
    explanation: '尼采宣告"上帝已死"，批判基督教道德是为了驯服强者的奴隶道德。',
  },
  {
    id: 'q9',
    philosopherId: 'beauvoir',
    scene: '有人评论："那个女领导太强势了，一点都不像个女人。"',
    options: [
      { id: 'q9a', text: '"不像个女人？谁规定了女人应该是什么样子？为什么强势在男人身上是优点，在女人身上就是缺点？"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q9b', text: '"请定义\'像个女人\'是什么意思。"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q9c', text: '"强势是强者的品质，与性别无关。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q9d', text: '"每个人都有自己的风格，包容就好。"', isCorrect: false, philosopherId: 'beauvoir' },
    ],
    explanation: '波伏娃会揭露双重标准，质疑女性被期待的"他者"角色。',
  },
  {
    id: 'q10',
    philosopherId: 'socrates',
    scene: '政治家说："我是人民的代表，我知道什么对他们最好。"',
    options: [
      { id: 'q10a', text: '"你知道什么对人民最好？那请告诉我，\'好\'是什么？你怎么知道你知道？"', isCorrect: true, philosopherId: 'socrates' },
      { id: 'q10b', text: '"人民是羊群，而你不过是他们选出来的牧羊人，真正的超人不需要别人的认可。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q10c', text: '"人民中有一半是女性，你考虑过她们的处境和视角吗？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q10d', text: '"那你就好好为人民服务吧。"', isCorrect: false, philosopherId: 'socrates' },
    ],
    explanation: '苏格拉底会追问那些声称拥有知识的人，揭示他们的所谓知识其实是偏见。',
  },
  {
    id: 'q11',
    philosopherId: 'nietzsche',
    scene: '朋友说："我不想太出众，枪打出头鸟，还是平凡点好。"',
    options: [
      { id: 'q11a', text: '"你在逃避成为你自己！平凡是群氓的舒适区，超人要勇敢地成为与众不同的存在！"', isCorrect: true, philosopherId: 'nietzsche' },
      { id: 'q11b', text: '"请告诉我，什么是\'出众\'，什么是\'平凡\'？"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q11c', text: '"这个不想出众的想法，是你自己的选择，还是社会教你要低调？"', isCorrect: false, philosopherId: 'beauvoir' },
      { id: 'q11d', text: '"低调做人确实比较安全。"', isCorrect: false, philosopherId: 'nietzsche' },
    ],
    explanation: '尼采的超人哲学鼓励人超越平庸，勇敢地创造自己的价值。',
  },
  {
    id: 'q12',
    philosopherId: 'beauvoir',
    scene: '有人说："男主外女主内，这是自然分工，符合天道。"',
    options: [
      { id: 'q12a', text: '"自然分工？还是历史形成的权力结构？你把人为的压迫说成了自然的秩序！"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q12b', text: '"请定义\'自然分工\'和\'天道\'是什么意思。"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q12c', text: '"这是奴隶道德，真正的强者超越这些人为的规则。"', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q12d', text: '"每家情况不同，适合自己就好。"', isCorrect: false, philosopherId: 'beauvoir' },
    ],
    explanation: '波伏娃会揭露"自然"背后的历史建构，指出所谓的"自然秩序"其实是服务于特定权力结构的。',
  },
];

export const getQuestionsByPhilosopher = (philosopherId: PhilosopherId): Question[] => {
  return questions.filter(q => q.philosopherId === philosopherId);
};

export const getRandomQuestion = (
  philosopherId: PhilosopherId,
  excludeIds: string[] = []
): Question | null => {
  const availableQuestions = questions.filter(
    q => q.philosopherId === philosopherId && !excludeIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    return null;
  }
  
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
