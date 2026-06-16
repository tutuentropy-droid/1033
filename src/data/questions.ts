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
    baseFollowUpLength: 3,
    followUpQuestions: [
      {
        id: 'q1-f1',
        depth: 1,
        scene: '朋友想了想，回答道："法律是多数人制定的，多数人的意志就是正义的。"苏格拉底继续追问...',
        options: [
          { id: 'q1-f1a', text: '"多数人就一定对吗？如果多数人制定的法律伤害了少数人，这还是正义吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q1-f1b', text: '"多数人的暴政依然是暴政，正义应该超越集体意志。"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q1-f1c', text: '"多数人中的女性声音被充分代表了吗？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q1-f1d', text: '"多数人说了算，这就是民主的正义。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底不会接受"多数即正义"的简单答案，他会追问多数人意志的道德正当性。',
      },
      {
        id: 'q1-f2',
        depth: 2,
        scene: '朋友困惑了，又说："那正义就是强者的利益吧？强者制定法律维护自己的利益。"苏格拉底继续追问...',
        options: [
          { id: 'q1-f2a', text: '"强者真的知道自己的利益是什么吗？如果强者搞错了自己的利益，那法律还正义吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q1-f2b', text: '"没错！正义就是强者的利益，弱者不过是被欺骗的对象。"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q1-f2c', text: '"所谓强者，大多是在父权体系下占据优势的男性。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q1-f2d', text: '"那我就不知道什么是正义了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会追问"强者"是否真正拥有关于自身利益的知识，把讨论引向知识与正义的关系。',
      },
      {
        id: 'q1-f3',
        depth: 3,
        scene: '朋友彻底困惑了："那请你告诉我，正义到底是什么？"苏格拉底的最后回应是...',
        options: [
          { id: 'q1-f3a', text: '"我也不知道正义是什么，但我们一起继续追问，或许能更接近它。"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q1-f3b', text: '"正义是弱者的幻觉，超人创造自己的正义。"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q1-f3c', text: '"正义需要先打破性别压迫的结构，才有可能真正实现。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q1-f3d', text: '"正义就是己所不欲勿施于人。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底的智慧在于承认自己的无知，并邀请对话者一起继续探索。助产术不生产答案，而是生产思考。',
      },
    ],
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
    baseFollowUpLength: 3,
    followUpQuestions: [
      {
        id: 'q2-f1',
        depth: 1,
        scene: '那人回答："好就是不伤害别人，不偷盗不杀人。这些都是法律规定的。"苏格拉底继续追问...',
        options: [
          { id: 'q2-f1a', text: '"如果不偷盗不伤害别人只是因为害怕被抓，那你是真的好，还是只是胆小呢？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q2-f1b', text: '"不偷盗只是因为你不够强去掠夺，奴隶的道德！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q2-f1c', text: '"这些法律是在谁的利益下制定的？有没有可能某些伤害不被算作伤害？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q2-f1d', text: '"反正我不做坏事就行了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会区分行为的外在表现与内在动机，追问道德行为的真正来源。',
      },
      {
        id: 'q2-f2',
        depth: 2,
        scene: '那人想了想："好吧，就算我是因为害怕惩罚，但我做的事是好事，这还不够吗？"苏格拉底继续追问...',
        options: [
          { id: 'q2-f2a', text: '"如果你不知道什么是真正的好，只是碰巧做了好事，你能说自己是好人吗？一个好的行为和一个好人，是同一回事吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q2-f2b', text: '"不够！奴隶的道德不管外在内在都是奴性的！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q2-f2c', text: '"你有没有想过，你害怕的惩罚系统，本身就是维护不公正的？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q2-f2d', text: '"那我真不知道该怎么回答了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会进一步追问知识与德行的关系：真正的德行需要对善的知识，而不仅仅是偶然的行为。',
      },
      {
        id: 'q2-f3',
        depth: 3,
        scene: '那人沉默良久，最后说："苏格拉底，你让我意识到，我其实并不知道什么是真正的善。"苏格拉底最后说道...',
        options: [
          { id: 'q2-f3a', text: '"很好！知道自己不知道，这是进步的开始。让我们一起继续追问什么是善。"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q2-f3b', text: '"善是强者创造的，你要成为强者才能定义它！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q2-f3c', text: '"不知道就对了，因为所谓的善很多时候都是压迫的工具。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q2-f3d', text: '"别问了，行善就是了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底的"无知之知"是哲学的起点。助产术的目的不是灌输答案，而是帮助对话者产出自已的思考。',
      },
    ],
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
      { id: 'q5a', text: '"你说的\'天生\'，到底是生理决定的，还是几千年社会规训的结果？"', frenchText: '"Ce que tu appelles \'naturel\', est-ce vraiment déterminé par la physiologie, ou le résultat de millénaires de conditionnement social ?"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q5b', text: '"请告诉我，你对\'情绪化\'的定义是什么？"', frenchText: '"Dis-moi, quelle est ta définition de \'émotionnel\' ?"', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q5c', text: '"这是弱者的偏见，真正的强者超越性别。"', frenchText: '"C\'est le préjugé des faibles. Le véritable surhomme dépasse le genre."', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q5d', text: '"我不同意你的看法，但每个人都有自己的观点。"', frenchText: '"Je ne suis pas d\'accord avec toi, mais chacun a son avis."', isCorrect: false, philosopherId: 'beauvoir' },
    ],
    explanation: '波伏娃的核心洞见是"女人不是天生的，而是变成的"，她会质疑所谓的"天性"。',
  },
  {
    id: 'q6',
    philosopherId: 'beauvoir',
    scene: '朋友说："女孩子就应该找个稳定的工作，然后结婚生子，这才是幸福。"',
    options: [
      { id: 'q6a', text: '"你说的\'应该\'，是你真实的选择，还是社会期待你扮演的角色？"', frenchText: '"Ce \'devrais\' que tu dis, est-ce ton vrai choix, ou le rôle que la société attend de toi ?"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q6b', text: '"请先定义什么是\'幸福\'。"', frenchText: '"Définis d\'abord ce qu\'est le \'bonheur\'."', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q6c', text: '"这是羊群的幸福，真正的人要创造自己的价值。"', frenchText: '"C\'est le bonheur du troupeau. L\'homme véritable crée ses propres valeurs."', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q6d', text: '"每个人对幸福的定义不同，开心就好。"', frenchText: '"Chacun a sa définition du bonheur, tant qu\'on est heureux."', isCorrect: false, philosopherId: 'beauvoir' },
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
    baseFollowUpLength: 3,
    followUpQuestions: [
      {
        id: 'q7-f1',
        depth: 1,
        scene: '学生得意地说："我不知道的当然很少了！我精通数学、修辞、诗歌，还有什么不知道的呢？"苏格拉底继续追问...',
        options: [
          { id: 'q7-f1a', text: '"你知道什么是善吗？你知道什么是美吗？你知道什么是正义吗？——这些你最应该知道的东西，你真的知道吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q7-f1b', text: '"精通再多也是奴隶的学问，真正的智慧是重估一切价值！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q7-f1c', text: '"你学的这些是谁规定的知识？有没有可能排除了女性和底层的视角？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q7-f1d', text: '"老师你别考我了，反正我都知道。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会把知识从技术层面引向人生最重要的问题——关于善、美、正义的知识，这些才是真正重要的。',
      },
      {
        id: 'q7-f2',
        depth: 2,
        scene: '学生说："善就是帮助朋友，美就是好看的东西，正义就是遵守法律。这些我当然知道！"苏格拉底继续追问...',
        options: [
          { id: 'q7-f2a', text: '"如果你的朋友做了坏事，帮助他还是善吗？如果一幅画好看但内容邪恶，还是美的吗？如果法律本身不正义，遵守它还是正义吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q7-f2b', text: '"这些定义都是奴隶道德的产物，要全部推倒重来！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q7-f2c', text: '"你说的美是谁定义的？是不是男性凝视下的美？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q7-f2d', text: '"这...你说得太复杂了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底通过举出反例来揭示学生定义中的漏洞，让学生意识到自己其实并没有真正理解这些概念。',
      },
      {
        id: 'q7-f3',
        depth: 3,
        scene: '学生低下头，惭愧地说："老师，我现在发现，我自以为知道的东西，其实我并不知道。"苏格拉底最后说道...',
        options: [
          { id: 'q7-f3a', text: '"这就是你比别人更有智慧的地方——你知道自己不知道。而别人连这一点都不知道。"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q7-f3b', text: '"现在开始重估一切价值吧！你将成为超人！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q7-f3c', text: '"很好，现在你可以开始质疑那些塑造你认知的权力结构了。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q7-f3d', text: '"没关系，多读几本书就知道了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底的"无知之知"不是消极的不可知论，而是一种积极的哲学态度：认识到自己的局限，才能真正开始追求智慧。',
      },
    ],
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
      { id: 'q9a', text: '"不像个女人？谁规定了女人应该是什么样子？为什么强势在男人身上是优点，在女人身上就是缺点？"', frenchText: '"Pas comme une femme ? Qui a décidé ce qu\'une femme devrait être ? Pourquoi l\'autorité est une qualité chez un homme, mais un défaut chez une femme ?"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q9b', text: '"请定义\'像个女人\'是什么意思。"', frenchText: '"Définis ce que signifie \'être comme une femme\'."', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q9c', text: '"强势是强者的品质，与性别无关。"', frenchText: '"L\'autorité est une qualité du fort, indépendante du genre."', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q9d', text: '"每个人都有自己的风格，包容就好。"', frenchText: '"Chacun a son style, il suffit d\'être tolérant."', isCorrect: false, philosopherId: 'beauvoir' },
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
    baseFollowUpLength: 3,
    followUpQuestions: [
      {
        id: 'q10-f1',
        depth: 1,
        scene: '政治家拍胸脯说："好就是让人民安居乐业，让城邦繁荣富强。这难道不对吗？"苏格拉底继续追问...',
        options: [
          { id: 'q10-f1a', text: '"安居乐业是为了什么？繁荣富强又是为了什么？你追求的这些，最终是为了什么？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q10-f1b', text: '"繁荣富强只是平庸的目标，真正的城邦需要超人来创造新价值！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q10-f1c', text: '"你的繁荣富强中，女性的贡献被算进去了吗？还是只算了男性的？"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q10-f1d', text: '"反正我是为了人民好，你别问了。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会不断追问事物的目的（telos），因为只有知道了最终目的，才能判断当下的选择是否真正是"好"的。',
      },
      {
        id: 'q10-f2',
        depth: 2,
        scene: '政治家不耐烦地说："为了什么？为了人民的幸福！你这人怎么这么多问题！"苏格拉底继续追问...',
        options: [
          { id: 'q10-f2a', text: '"幸福是什么？如果人民觉得快乐，但其实过着被奴役的生活，这算幸福吗？你真的愿意为人民的真正幸福负责吗？"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q10-f2b', text: '"人民的幸福是奴隶的快乐，真正的强者追求的是伟大和荣耀！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q10-f2c', text: '"你说的幸福是不是男人定义的幸福？女人的幸福可能完全是另一回事。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q10-f2d', text: '"你再问我就叫人把你抓起来了！"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底会追问幸福的真正含义，区分表面的快乐与真正的福祉，以及区分统治者的利益与人民的利益。',
      },
      {
        id: 'q10-f3',
        depth: 3,
        scene: '政治家沉默不语，最后低声说："我从未想过这些问题...也许我并不像我以为的那样知道什么是好。"苏格拉底最后说道...',
        options: [
          { id: 'q10-f3a', text: '"那就从今天开始思考吧。一个不知道什么是好的统治者，只会带领人民走向深渊。但承认自己不知道，已经是改变的开始了。"', isCorrect: true, philosopherId: 'socrates' },
          { id: 'q10-f3b', text: '"那就下台吧，让真正的强者来统治！"', isCorrect: false, philosopherId: 'nietzsche' },
          { id: 'q10-f3c', text: '"那就去听听被你忽略的声音吧，这是改变的开始。"', isCorrect: false, philosopherId: 'beauvoir' },
          { id: 'q10-f3d', text: '"知道就好，以后多听意见就行。"', isCorrect: false, philosopherId: 'socrates' },
        ],
        explanation: '苏格拉底对统治者的追问是出于对城邦的爱——他相信只有清醒的统治者才能带领人民走向真正的善。这种追问后来也为他招来了杀身之祸。',
      },
    ],
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
      { id: 'q12a', text: '"自然分工？还是历史形成的权力结构？你把人为的压迫说成了自然的秩序！"', frenchText: '"Division naturelle du travail ? Ou structure de pouvoir formée par l\'histoire ? Tu présentes l\'oppression artificielle comme un ordre naturel !"', isCorrect: true, philosopherId: 'beauvoir' },
      { id: 'q12b', text: '"请定义\'自然分工\'和\'天道\'是什么意思。"', frenchText: '"Définis ce que signifient \'division naturelle du travail\' et \'ordre céleste\'."', isCorrect: false, philosopherId: 'socrates' },
      { id: 'q12c', text: '"这是奴隶道德，真正的强者超越这些人为的规则。"', frenchText: '"C\'est la morale des esclaves. Le véritable surhomme dépasse ces règles artificielles."', isCorrect: false, philosopherId: 'nietzsche' },
      { id: 'q12d', text: '"每家情况不同，适合自己就好。"', frenchText: '"Chaque famille est différente, tant que ça convient à chacun."', isCorrect: false, philosopherId: 'beauvoir' },
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
