export interface SearchContent {
  id: string;
  type: 'home' | 'treatment' | 'emergency';
  title: string;
  description: string;
  content: string;
  url: string;
}

export const allContent: SearchContent[] = [
  // 首页内容
  {
    id: 'home-intro',
    type: 'home',
    title: '运动损伤百科',
    description: '专业的运动损伤知识库',
    content: '运动损伤百科是一个专业的运动损伤知识库，提供全面的运动损伤预防、治疗和康复指导。我们致力于帮助运动爱好者更好地了解和处理运动损伤，让运动更安全、更健康。',
    url: '/'
  },
  {
    id: 'home-features',
    type: 'home',
    title: '主要功能',
    description: '运动损伤百科的主要功能',
    content: '运动损伤百科提供以下主要功能：1. 运动损伤知识库：提供各种运动损伤的详细信息和处理方法。2. 康复指导：提供专业的康复训练建议和指导。3. 紧急情况处理：提供运动损伤紧急情况的处理方法和建议。4. 预防措施：提供运动损伤的预防措施和建议。',
    url: '/'
  },

  // 康复方法
  {
    id: 'rice',
    type: 'treatment',
    title: 'RICE原则',
    description: '运动损伤初期处理的基本原则',
    content: 'RICE是运动损伤初期处理的基本原则，包括：休息(Rest)：停止运动，避免进一步损伤。冰敷(Ice)：用冰袋敷在受伤部位，每次15-20分钟，每2-3小时一次。压迫(Compression)：使用弹性绷带包扎，减少肿胀。抬高(Elevation)：将受伤部位抬高，促进血液回流。',
    url: '/treatments/rice'
  },
  {
    id: 'physical-therapy',
    type: 'treatment',
    title: '物理治疗',
    description: '运动损伤的物理治疗方法',
    content: '物理治疗包括：热敷：促进血液循环，缓解肌肉紧张。冷敷：减轻炎症和肿胀。电疗：通过电流刺激促进组织修复。超声波：促进组织愈合，缓解疼痛。按摩：放松肌肉，促进血液循环。',
    url: '/treatments/physical-therapy'
  },
  {
    id: 'exercise-therapy',
    type: 'treatment',
    title: '运动疗法',
    description: '运动损伤的运动治疗方法',
    content: '运动疗法包括：关节活动度训练：恢复关节的正常活动范围。肌肉力量训练：增强肌肉力量，预防再次损伤。平衡训练：提高身体平衡能力，预防跌倒。柔韧性训练：提高肌肉和关节的柔韧性。功能性训练：恢复日常活动能力。',
    url: '/treatments/exercise-therapy'
  },
  {
    id: 'nutrition',
    type: 'treatment',
    title: '营养补充',
    description: '运动损伤的营养补充建议',
    content: '营养补充包括：蛋白质：促进肌肉修复和生长。维生素C：促进胶原蛋白合成，加速伤口愈合。维生素D：促进钙吸收，增强骨骼健康。Omega-3脂肪酸：减轻炎症反应。抗氧化剂：减少自由基损伤，促进组织修复。',
    url: '/treatments/nutrition'
  },
  {
    id: 'psychological',
    type: 'treatment',
    title: '心理康复',
    description: '运动损伤的心理康复方法',
    content: '心理康复包括：心理支持：提供情感支持和鼓励。目标设定：设定合理的康复目标。压力管理：学习应对康复过程中的压力。积极心态：保持积极乐观的心态。重返运动：制定合理的重返运动计划。',
    url: '/treatments/psychological'
  },

  // 紧急情况
  {
    id: 'cycling-fall',
    type: 'emergency',
    title: '骑行摔倒',
    description: '骑行摔倒的紧急处理方法',
    content: '骑行摔倒的紧急处理包括：1. 保持冷静，评估伤情。2. 检查意识状态和呼吸。3. 检查是否有明显骨折或严重出血。4. 固定受伤部位，避免移动。5. 呼叫急救电话。6. 记录事故经过。7. 等待专业医疗人员到达。8. 配合医疗人员处理。',
    url: '/emergency/cycling-fall'
  },
  {
    id: 'joint-dislocation',
    type: 'emergency',
    title: '关节脱位',
    description: '关节脱位的紧急处理方法',
    content: '关节脱位的紧急处理包括：1. 立即停止运动。2. 保持关节稳定。3. 不要尝试复位。4. 用夹板或绷带固定。5. 冰敷减轻肿胀。6. 抬高受伤部位。7. 及时就医。8. 记录受伤经过。',
    url: '/emergency/joint-dislocation'
  },
  {
    id: 'muscle-cramp',
    type: 'emergency',
    title: '肌肉抽筋',
    description: '肌肉抽筋的紧急处理方法',
    content: '肌肉抽筋的紧急处理包括：1. 立即停止运动。2. 缓慢拉伸抽筋肌肉。3. 按摩抽筋部位。4. 补充电解质。5. 保持温暖。6. 适当休息。7. 预防再次抽筋。8. 记录抽筋情况。',
    url: '/emergency/muscle-cramp'
  },
  {
    id: 'heat-stroke',
    type: 'emergency',
    title: '中暑',
    description: '中暑的紧急处理方法',
    content: '中暑的紧急处理包括：1. 立即停止运动。2. 转移到阴凉处。3. 脱去多余衣物。4. 补充水分。5. 物理降温。6. 监测体温。7. 及时就医。8. 预防再次中暑。',
    url: '/emergency/heat-stroke'
  },
  {
    id: 'fracture',
    type: 'emergency',
    title: '骨折',
    description: '骨折的紧急处理方法',
    content: '骨折的紧急处理包括：1. 立即停止运动。2. 固定受伤部位。3. 冰敷减轻肿胀。4. 抬高受伤部位。5. 呼叫急救电话。6. 记录受伤经过。7. 等待专业医疗人员。8. 配合医疗处理。',
    url: '/emergency/fracture'
  },
  {
    id: 'syncope',
    type: 'emergency',
    title: '运动性晕厥',
    description: '运动性晕厥的紧急处理方法',
    content: '运动性晕厥的紧急处理包括：1. 立即停止运动。2. 让患者平躺，抬高下肢。3. 检查呼吸和脉搏。4. 松开紧身衣物。5. 保持空气流通。6. 监测意识状态。7. 及时就医。8. 记录晕厥情况。',
    url: '/emergency/syncope'
  },
  {
    id: 'asthma',
    type: 'emergency',
    title: '运动性哮喘',
    description: '运动性哮喘的紧急处理方法',
    content: '运动性哮喘的紧急处理包括：1. 立即停止运动。2. 使用急救吸入器。3. 保持坐姿，身体前倾。4. 缓慢深呼吸。5. 保持冷静。6. 监测呼吸状态。7. 及时就医。8. 记录哮喘发作情况。',
    url: '/emergency/asthma'
  },
  {
    id: 'allergy',
    type: 'emergency',
    title: '运动性过敏',
    description: '运动性过敏的紧急处理方法',
    content: '运动性过敏的紧急处理包括：1. 立即停止运动。2. 使用抗过敏药物。3. 检查过敏症状。4. 保持呼吸通畅。5. 监测生命体征。6. 及时就医。7. 记录过敏情况。8. 避免接触过敏原。',
    url: '/emergency/allergy'
  },
  {
    id: 'dehydration',
    type: 'emergency',
    title: '运动性脱水',
    description: '运动性脱水的紧急处理方法',
    content: '运动性脱水的紧急处理包括：1. 立即停止运动。2. 补充水分和电解质。3. 转移到阴凉处。4. 脱去多余衣物。5. 监测尿量和颜色。6. 及时就医。7. 记录脱水症状。8. 预防再次脱水。',
    url: '/emergency/dehydration'
  },
  {
    id: 'muscle-strain',
    type: 'emergency',
    title: '运动性肌肉拉伤',
    description: '运动性肌肉拉伤的紧急处理方法',
    content: '运动性肌肉拉伤的紧急处理包括：1. 立即停止运动。2. 应用RICE原则。3. 评估拉伤程度。4. 固定受伤部位。5. 冰敷减轻肿胀。6. 抬高受伤部位。7. 及时就医。8. 记录拉伤情况。',
    url: '/emergency/muscle-strain'
  },
  {
    id: 'sprain',
    type: 'emergency',
    title: '运动性扭伤',
    description: '运动性扭伤的紧急处理方法',
    content: '运动性扭伤的紧急处理包括：1. 立即停止运动。2. 应用RICE原则。3. 评估扭伤程度。4. 固定受伤部位。5. 冰敷减轻肿胀。6. 抬高受伤部位。7. 及时就医。8. 记录扭伤情况。',
    url: '/emergency/sprain'
  },
  {
    id: 'fatigue',
    type: 'emergency',
    title: '运动性过度疲劳',
    description: '运动性过度疲劳的紧急处理方法',
    content: '运动性过度疲劳的紧急处理包括：1. 立即停止运动。2. 充分休息。3. 补充水分和营养。4. 监测生命体征。5. 评估疲劳程度。6. 及时就医。7. 记录疲劳症状。8. 调整运动计划。',
    url: '/emergency/fatigue'
  }
]; 