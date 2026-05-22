export const projects = [
  {
    id: 'vla-arm',
    title: '基于 VLA 的通用机械臂',
    shortTitle: 'VLA 机械臂',
    description: '对 OpenVLA、SmolVLA 等主流 VLA 模型进行端到端推理验证、实验对标与架构调整。探索多模态融合以增强模型的泛化能力，完成机械臂实物部署测试。',
    tags: ['Python', 'PyTorch', 'VLA', '具身智能', '机械臂控制'],
    icon: '🦾',
    award: null,
    media: [
      { type: 'video', src: '实验视频.mp4', caption: 'OpenVLA / SmolVLA 模型端到端推理验证与实物部署' },
      { type: 'image', src: '图片.png', caption: '典型机械臂操作任务的模型效果复现与泛化优化' },
    ],
    featureMap: 'gradient-activation',
  },
  {
    id: 'garbage-sort',
    title: '智能垃圾分类系统',
    shortTitle: '智能垃圾分类',
    description: '集检测-分类-追踪-抓取-压缩于一体的全流程系统。基于 YOLOv11-obb 构建目标检测模型，部署于树莓派、MaixCam 等边缘设备，与 STM32 联动实现视觉-机械闭环控制。',
    tags: ['Python', 'YOLOv11', '神经网络', 'STM32', '嵌入式'],
    icon: '🚀',
    award: '国家级一等奖',
    media: [
      { type: 'image', src: 'sort.jpg', caption: '系统整体外观，自主设计的机械结构与控制电路' },
      { type: 'image', src: 'sort3.jpg', caption: 'YOLOv11-obb 训练过程指标曲线' },
      { type: 'image', src: 'val_batch0_pred.jpg', caption: '目标检测效果，多类别垃圾识别与定位' },
      { type: 'image', src: 'sort4.jpg', caption: '比赛现场合影' },
    ],
    featureMap: 'grid-detection',
  },
  {
    id: 'robocup',
    title: 'RoboCup 农业采摘机器人',
    shortTitle: 'RoboCup',
    description: '面向农业采摘场景，开发集自主定位、视觉识别、机械抓取于一体的移动操作小车。基于 OpenCV 构建视觉识别，完成相机标定、目标检测与坐标转换。',
    tags: ['C', 'OpenCV', '电机/舵机控制'],
    icon: '🤖',
    award: '国家级三等奖',
    media: [
      { type: 'image', src: 'robocup.jpg', caption: '参赛机器人整体展示' },
      { type: 'image', src: 'robocup1.jpg', caption: '比赛现场调试' },
    ],
    featureMap: 'contour-vision',
  },
  {
    id: 'wind-turbine',
    title: '工业装备智能运维',
    shortTitle: '智能运维',
    description: '基于深度学习的工业装备故障识别与寿命预测。构建 CNN-LSTM-Multi Attention 融合模型，实现故障分类与 RUL 预测，开发配套可视化交互界面。',
    tags: ['Python', '神经网络', '机器学习', '三维建模', '数据分析'],
    icon: '⚡',
    award: null,
    media: [
      { type: 'image', src: 'wind-turbine2.jpg', caption: '项目展示' },
      { type: 'image', src: 'wind-turbine4.jpg', caption: '神经网络架构图' },
      { type: 'image', src: 'wind-turbine.jpg', caption: '数据可视化界面与三维建模' },
      { type: 'image', src: 'wind-turbine3.jpg', caption: '特征预测与寿命预测曲线' },
    ],
    featureMap: 'attention-heatmap',
  },
  {
    id: 'paper-insights',
    title: 'Paper Insights · 学术助手',
    shortTitle: '学术助手',
    description: '智能学术论文分析工具，支持 DOI/ArXiv ID/标题检索，LLM 生成智能摘要与阅读建议，参考文献启发式排序。Daily Knowledge Briefing 聚合多源学术资讯。',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'LLM', 'RSS', 'Vercel'],
    icon: '📚',
    award: null,
    media: [
      { type: 'image', src: 'paper-assistant-1.jpg', caption: '首页，支持多种检索方式' },
      { type: 'image', src: 'paper-assistant-2.jpg', caption: 'AI 生成智能摘要与引用排序' },
      { type: 'image', src: 'paper-assistant-4.jpg', caption: 'Daily Knowledge Briefing 聚合资讯' },
      { type: 'image', src: 'paper-assistant-6.jpg', caption: '微信公众号 RSS 订阅库' },
    ],
    featureMap: 'network-graph',
  },
];

export const skills = [
  {
    category: '编程语言',
    items: [
      { name: 'Python', level: 0.95 },
      { name: 'C', level: 0.82 },
      { name: 'MATLAB', level: 0.75 },
    ],
  },
  {
    category: '深度学习 & AI',
    items: [
      { name: 'PyTorch', level: 0.90 },
      { name: 'OpenCV', level: 0.85 },
      { name: 'VLA Models', level: 0.80 },
      { name: 'CNN / Transformer', level: 0.85 },
    ],
  },
  {
    category: '硬件 & 工具',
    items: [
      { name: 'STM32', level: 0.80 },
      { name: '树莓派', level: 0.82 },
      { name: 'MaixCam', level: 0.78 },
      { name: 'SolidWorks', level: 0.72 },
      { name: 'Git / Linux', level: 0.85 },
    ],
  },
];

export const about = {
  name: '王昱程',
  englishName: 'Yucheng Wang',
  title: '智能制造工程 · 具身智能',
  school: '西安交通大学',
  major: '智能制造工程',
  gpa: '87.44',
  ielts: '7.0',
  email: 'echoesftutu47@qq.com',
  github: 'https://github.com/325200wang',
  zhihu: 'https://www.zhihu.com/people/48-51-74-31',
  description: [
    '西安交通大学智能制造工程专业本科，专注于机器人控制、智能系统与 VLA 模型应用。',
    '作为负责人参与多项机器人竞赛，获中国大学生工程实践与创新能力大赛国家级一等奖、RoboCup 国家级三等奖等。',
    '毕业设计聚焦于基于 VLA 模型的通用场景机械臂，完成多模型实验验证与实物部署。',
    '目前正在寻找具身智能方向的实习机会，期望将技能应用到实际的机器人项目中。',
  ],
  stats: [
    { label: '竞赛获奖', value: '5+' },
    { label: '完整项目', value: '5+' },
    { label: '校园成绩', value: '87.44' },
  ],
};

export const certs = {
  education: {
    title: '教育背景',
    items: [
      { title: '本科学位', desc: '西安交通大学 · 智能制造工程', date: '2021.09 - 2025.06' },
      { title: '短期交换', desc: '帝国理工学院', date: '2025.02' },
    ],
  },
  language: {
    title: '语言能力',
    items: [
      { title: '雅思 IELTS', desc: '总分 7.0（听力 8 / 阅读 7.5 / 写作 6 / 口语 6）', date: '2025.09' },
    ],
  },
  awards: {
    title: '荣誉奖项',
    items: [
      { title: '工创大赛', desc: '智能垃圾分类赛道 国家级一等奖', date: '2024.11' },
      { title: 'RoboCup', desc: '农业采摘机器人 国家级三等奖', date: '2024.05' },
      { title: '大创项目', desc: '负责人，省级，已结题', date: '2023.06' },
      { title: '智能网联汽车', desc: '负责人，省级二等奖', date: '2023.06' },
    ],
  },
};
