export interface Reference {
  author: string;
  title: string;
  publication?: string;
  year?: string;
  url?: string;
}

export interface InjuryContent {
  symptoms: string[];
  acuteTreatment: string[];
  prevention: string[];
  references: Reference[];
}

export interface Injury {
  id: string;
  titleKey: string;
  category: 'common' | 'head' | 'arm' | 'leg' | 'foot';
  content: {
    zh: InjuryContent;
    en: InjuryContent;
  };
}

export interface InjuryData {
  id: string;
  category: string;
  titleKey: string;
  imagePath?: string;
  symptoms: {
    en: string[];
    zh: string[];
  };
  acuteTreatment: {
    en: string[];
    zh: string[];
  };
  prevention: {
    en: string[];
    zh: string[];
  };
  references: {
    en: string[];
    zh: string[];
  };
}

export const categories = [
  {
    id: 'muscle',
    titleKey: 'muscle_category',
    descriptionKey: 'muscle_category_description',
    icon: '🦾'
  },
  {
    id: 'joint',
    titleKey: 'joint_category',
    descriptionKey: 'joint_category_description',
    icon: '🦿'
  },
  {
    id: 'bone',
    titleKey: 'bone_category',
    descriptionKey: 'bone_category_description',
    icon: '🦴'
  },
  {
    id: 'head',
    titleKey: 'head_category',
    descriptionKey: 'head_category_description',
    icon: '🧠'
  },
  {
    id: 'other',
    titleKey: 'other_category',
    descriptionKey: 'other_category_description',
    icon: '⚕️'
  }
];

export const injuries: InjuryData[] = [
  {
    id: 'muscle-strain',
    category: 'muscle',
    titleKey: 'muscle_strain_title',
    imagePath: '/images/injuries/muscle-strain.jpg',
    symptoms: {
      en: [
        'Localized sharp pain (intensifies during activity)',
        'Muscle swelling or bruising',
        'Limited joint mobility (inability to stretch or contract)',
        'Hard lumps or depressions when touched',
        'Muscle spasms in severe cases',
        'Sudden sharp pain during activity',
        'Swelling and bruising',
        'Limited range of motion',
        'Muscle weakness',
        'Pain when using the affected muscle'
      ],
      zh: [
        '局部锐痛（活动时加剧）',
        '肌肉肿胀或淤青',
        '关节活动受限（如无法伸展或收缩）',
        '触摸有硬结或凹陷',
        '严重时出现肌肉痉挛',
        '运动时突然出现剧烈疼痛',
        '肿胀和瘀伤',
        '活动范围受限',
        '肌肉无力',
        '使用受伤肌肉时疼痛'
      ]
    },
    acuteTreatment: {
      en: [
        'Immediately stop exercising and apply an ice pack wrapped in a towel to the strained area (15 minutes each time, 1-hour intervals, repeat 3 times)',
        'Wrap elastic bandage spirally from distal to proximal (e.g., for thigh strain: wrap from above the knee to the hip)',
        'Elevate the affected limb above heart level (for lower limb strains, elevate the leg; for upper limb strains, use a triangular bandage to suspend)',
        'Avoid heat application or massage within 48 hours',
        'If severe swelling occurs or movement is impossible, seek medical attention immediately',
        'Follow RICE protocol (Rest, Ice, Compression, Elevation)',
        'Stop the activity immediately',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Use compression bandage',
        'Keep the injured area elevated'
      ],
      zh: [
        '立即停止运动，用冰袋包裹毛巾敷于拉伤部位（每次15分钟，间隔1小时，重复3次）',
        '弹性绷带从远端向近端螺旋缠绕加压（如大腿拉伤：从膝盖上方缠绕至髋部）',
        '抬高患肢至心脏水平以上（下肢拉伤可垫高腿，上肢用三角巾悬吊）',
        '48小时内避免热敷或按摩',
        '若出现剧烈肿胀或无法活动，立即就医',
        '遵循RICE原则（休息、冰敷、加压、抬高）',
        '立即停止运动',
        '每2-3小时冰敷15-20分钟',
        '使用弹性绷带包扎',
        '保持受伤部位抬高'
      ]
    },
    prevention: {
      en: [
        'Dynamic warm-up before exercise (such as high knee lifts, butt kicks, 2 sets × 30 seconds each)',
        'Wear muscle compression gear (such as quadriceps elastic sleeves)',
        'Strengthen eccentric training (such as Nordic hip descent, 3 sets × 10 repetitions/week)',
        'Static stretching after exercise (maintain stretching posture for 30 seconds/set, repeat 2 times)',
        'Proper warm-up before exercise',
        'Gradual increase in exercise intensity',
        'Regular stretching',
        'Maintain good muscle strength',
        'Use proper technique during activities'
      ],
      zh: [
        '运动前动态热身（如高抬腿、踢臀跑各2组×30秒）',
        '佩戴肌肉压缩护具（如股四头肌弹性套筒）',
        '加强离心训练（如北欧挺髋下降，3组×10次/周）',
        '运动后静态拉伸（保持拉伸姿势30秒/组，重复2次）',
        '运动前充分热身',
        '逐渐增加运动强度',
        '定期拉伸',
        '保持良好的肌肉力量',
        '运动时使用正确的技术动作'
      ]
    },
    references: {
      en: [
        'Liu, X. "The Most Common Sports Injury in Sprinters—The Causes and Solutions for Hamstring Muscle Strain." Talent 26 (2011): 1.',
        'American Academy of Orthopaedic Surgeons - Muscle Strains',
        'Sports Medicine Australia - Muscle Strain Guidelines',
        'British Journal of Sports Medicine - Prevention of Muscle Injuries'
      ],
      zh: [
        '刘晓梅. "短跑运动员最常见的运动损伤——大腿股后群肌肉拉伤的原因及其解决办法." 才智 26(2011):1.',
        '美国骨科医师学会 - 肌肉拉伤',
        '澳大利亚运动医学会 - 肌肉拉伤指南',
        '英国运动医学杂志 - 肌肉损伤预防'
      ]
    }
  },
  {
    id: 'bruise',
    category: 'other',
    titleKey: 'bruise_title',
    imagePath: '/images/injuries/bruise.jpg',
    symptoms: {
      en: [
        'Bluish-purple patches on skin surface (changing to yellow-green over time)',
        'Pain when pressed but no limitation in bone or joint movement',
        'Mild local swelling (without progressive worsening)',
        'No skin damage or open wounds'
      ],
      zh: [
        '皮肤表面蓝紫色斑块（随时间变为黄绿色）',
        '按压疼痛但无骨关节活动受限',
        '轻度局部肿胀（无进行性加重）',
        '无皮肤破损或开放性伤口'
      ]
    },
    acuteTreatment: {
      en: [
        'Apply ice pack wrapped in towel immediately after injury (10-15 minutes each time, 1-hour intervals, continue for 24 hours)',
        'Switch to warm compress after 48 hours (40°C wet towel, 3 times daily × 15 minutes to promote absorption)',
        'Elevate the affected area (e.g., for leg bruises, elevate above heart level)',
        'Avoid rubbing or massaging the hematoma area',
        'If bruising continues to expand or is accompanied by fever, seek medical attention to rule out coagulation disorders'
      ],
      zh: [
        '受伤后立即冰袋包裹毛巾冷敷（每次10-15分钟，间隔1小时，持续24小时）',
        '48小时后改用温热敷（40℃湿毛巾，每日3次×15分钟促进吸收）',
        '抬高患处（如腿部淤青垫高至心脏水平以上）',
        '避免揉搓或按摩血肿区域',
        '若淤青持续扩大或伴发热，就医排除凝血障碍'
      ]
    },
    prevention: {
      en: [
        'Wear protective pads on areas prone to collision (such as knee/elbow guards for sports)',
        'Supplement vitamin C/K (citrus/dark green vegetables) to enhance blood vessel resilience',
        'Avoid vigorous exercise while on long-term anticoagulant medication (such as aspirin)'
      ],
      zh: [
        '易碰撞部位穿戴防护垫（如运动护膝/护肘）',
        '补充维生素C/K（柑橘类/深绿色蔬菜）增强血管韧性',
        '避免长期使用抗凝药物（如阿司匹林）期间剧烈运动'
      ]
    },
    references: {
      en: [
        'Mayo Clinic Staff "How to administer first aid for a bruise", 17 April 2024.',
        'Wikipedia contributors. "Bruise." Wikipedia, The Free Encyclopedia, 11 Aug. 2024.'
      ],
      zh: [
        'Mayo Clinic Staff "How to administer first aid for a brusie", 17 April 2024.‹https://www.mayoclinic.org/first-aid/first-aid-bruise/basics/art-20056663›',
        'Wikipedia contributors. "瘀伤." 维基百科, 自由的百科全书. 维基百科, 自由的百科全书, 11 Aug. 2024. Web. 11 Aug. 2024.‹https://zh.wikipedia.org/w/index.php?title=%E7%98%80%E4%BC%A4&oldid=83769399›'
      ]
    }
  },
  {
    id: 'ligament-sprain',
    category: 'joint',
    titleKey: 'ligament_sprain_title',
    symptoms: {
      en: [
        'Sudden severe pain at the joint (often with a tearing sensation or popping sound)',
        'Joint looseness (such as anterior-posterior/lateral instability of the knee)',
        'Limited active movement (passive movement exacerbates pain)',
        'Local tenderness (most obvious at ligament attachment points)',
        'Pain around the joint',
        'Swelling and inflammation',
        'Joint instability',
        'Reduced range of motion',
        'Possible popping sound at time of injury'
      ],
      zh: [
        '关节处突发剧痛（常伴撕裂感或弹响）',
        '关节松动感（如膝关节前后/侧向不稳）',
        '主动活动受限（被动活动疼痛加剧）',
        '局部压痛（韧带附着点最明显）',
        '关节周围疼痛',
        '肿胀和炎症',
        '关节不稳定',
        '活动范围减少',
        '受伤时可能听到爆裂声'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop activity immediately, use elastic bandage to immobilize the joint in a "figure 8" pattern (e.g., for knee joint, use hinged brace locked at 0-30°)',
        'Apply ice pack wrapped in towel alternately (15 minutes ice/45 minutes rest, continue for 24-48 hours)',
        'Elevate the affected limb above heart level (e.g., for ankle injury, elevate to hip level)',
        'Seek medical attention urgently',
        'Apply RICE protocol immediately',
        'Avoid weight bearing on the injured joint',
        'Use appropriate support or brace',
        'Seek medical attention for severe sprains',
        'Begin gentle range of motion exercises when appropriate'
      ],
      zh: [
        '立即停止活动，用弹性绷带"8"字缠绕关节制动（如膝关节用铰链支具锁定0-30°）',
        '冰袋包裹毛巾交替冷敷（15分钟冰敷/45分钟休息，持续24-48小时）',
        '抬高患肢至心脏水平以上（如踝关节损伤垫高至髋部）',
        '紧急就医',
        '立即采用RICE原则处理',
        '避免受伤关节负重',
        '使用适当的支撑或护具',
        '严重扭伤需就医',
        '在适当时候开始轻柔的关节活动练习'
      ]
    },
    prevention: {
      en: [
        'Strengthen joint stability training (such as single-leg balance pad stands 3 sets × 60 seconds/day)',
        'Wear professional-grade protective gear during exercise (such as functional knee braces for those at high risk of ACL injury)',
        'Correct improper force patterns (such as knee valgus when landing from jumps)',
        'Use kinesio tape after exercise to enhance proprioception (such as Y-shaped taping for ankle joints)',
        'Strengthen muscles around joints',
        'Improve balance and proprioception',
        'Use proper footwear and equipment',
        'Practice proper landing techniques',
        'Maintain flexibility'
      ],
      zh: [
        '强化关节稳定性训练（如单腿平衡垫站立3组×60秒/日）',
        '运动时佩戴专业级护具（如ACL损伤高风险者用功能性膝关节护具）',
        '纠正错误发力模式（如跳跃落地时膝内扣）',
        '运动后使用肌效贴增强本体感觉（如踝关节Y形贴扎）',
        '加强关节周围肌肉力量',
        '提高平衡能力和本体感觉',
        '使用合适的鞋具和装备',
        '练习正确的落地技术',
        '保持柔韧性'
      ]
    },
    references: {
      en: [
        'Wang, Q. et al. "Discussion on the Treatment of Tibial Plateau Fracture with Peripheral Ligament Injury." Chinese Journal of Traumatic Orthopedics 6.3 (2004): 3.',
        'World Health Organization - Joint Injury Guidelines',
        'International Journal of Sports Physical Therapy',
        'Mayo Clinic - Sprain Treatment and Prevention'
      ],
      zh: [
        '王秋根等. "胫骨平台骨折合并周围韧带损伤治疗探讨." 中华创伤骨科杂志 6.3(2004):3.',
        '世界卫生组织 - 关节损伤指南',
        '国际运动物理治疗杂志',
        '梅奥诊所 - 扭伤治疗与预防'
      ]
    }
  },
  {
    id: 'dehydration',
    category: 'other',
    titleKey: 'dehydration_title',
    symptoms: {
      en: [
        'Thirst, dry mouth and tongue',
        'Dizziness or fatigue (worsening when standing)',
        'Decreased urine output with dark yellow color',
        'Decreased skin elasticity (pinched skin on back of hand returns slowly)',
        'Confusion or increased heart rate in severe cases'
      ],
      zh: [
        '口渴、口干舌燥',
        '头晕或乏力（站立时加重）',
        '尿量减少且颜色深黄',
        '皮肤弹性下降（捏起手背皮肤回弹缓慢）',
        '严重时意识模糊或心跳加速'
      ]
    },
    acuteTreatment: {
      en: [
        'Mild dehydration: Drink small amounts of electrolyte fluids frequently (sports drinks/oral rehydration salts, 100-200ml each time)',
        'Rest in a cool place, loosen tight clothing',
        'Moderate dehydration: Supplement 500-1000ml of fluid per hour (water:sports drink = 2:1)',
        'Use a wet towel to cool the neck and armpits',
        'Severe dehydration (emergency medical care): Do not give food or water if vomiting, convulsions, or consciousness disturbance occurs',
        'Place in recovery position to prevent aspiration, call emergency services immediately'
      ],
      zh: [
        '轻度脱水：少量多次饮用含电解质液体（运动饮料/口服补液盐，每次100-200ml）',
        '休息于阴凉处，解开紧身衣物',
        '中度脱水：每小时补充500-1000ml液体（水:运动饮料=2:1）',
        '用湿毛巾冷敷颈部、腋下降温',
        '重度脱水（紧急送医）：出现呕吐、抽搐或意识障碍时禁食水',
        '侧卧防止误吸，立即拨打急救电话'
      ]
    },
    prevention: {
      en: [
        'Drink 500ml of water 2 hours before exercise, supplement 150-200ml every 15 minutes during exercise',
        'Choose breathable quick-dry clothing in hot environments, avoid dark colors that absorb heat',
        'Supplement foods containing sodium/potassium during prolonged exercise (such as bananas, nuts, salty crackers)',
        'Adjust hydration plan according to sweat rate (replenish 1.5L fluid for every 1kg of weight lost)'
      ],
      zh: [
        '运动前2小时饮水500ml，运动中每15分钟补水150-200ml',
        '高温环境选择透气速干衣物，避免深色吸热材质',
        '长时间运动补充含钠/钾食物（如香蕉、坚果、咸饼干）',
        '根据出汗量调整补水计划（每丢失1kg体重补液1.5L）'
      ]
    },
    references: {
      en: [
        'Wikipedia contributors. "Dehydration." Wikipedia, The Free Encyclopedia, 9 Mar. 2025.'
      ],
      zh: [
        'Wikipedia contributors. "脱水." 维基百科, 自由的百科全书. 维基百科, 自由的百科全书, 9 Mar. 2025. Web. 9 Mar. 2025.‹https://zh.wikipedia.org/w/index.php?title=%E8%84%B1%E6%B0%B4&oldid=86385607›'
      ]
    }
  },
  {
    id: 'heatstroke',
    category: 'other',
    titleKey: 'heatstroke_title',
    symptoms: {
      en: [
        'Elevated body temperature (>40°C)',
        'Dry, red skin (without sweating)',
        'Dizziness, headache, nausea or vomiting',
        'Rapid heart rate, rapid breathing',
        'Confusion, seizures, or unconsciousness in severe cases'
      ],
      zh: [
        '体温升高（＞40℃）',
        '皮肤干燥发红（无汗）',
        '头晕、头痛、恶心或呕吐',
        '心跳加速、呼吸急促',
        '严重时意识模糊、抽搐或昏迷'
      ]
    },
    acuteTreatment: {
      en: [
        'Move to a cool, ventilated area, remove excess clothing',
        'Spray cool water on the entire body + use a fan to accelerate evaporation',
        'Apply ice packs to the neck, armpits, groin (rotate each area every 10 minutes)',
        'For conscious persons, provide small amounts of electrolyte fluids frequently (e.g., sports drinks, 50-100ml each time)',
        'For those with altered consciousness, maintain in recovery position to prevent aspiration',
        'Do not administer food or water, call emergency services',
        'Seek emergency medical care'
      ],
      zh: [
        '移至阴凉通风处，脱去多余衣物',
        '用冷水喷洒全身 + 风扇加速蒸发',
        '冰袋敷颈部、腋下、腹股沟（每处10分钟轮换）',
        '清醒者少量多次饮用含电解质液体（如运动饮料，每次50-100ml）',
        '意识障碍者保持侧卧位防误吸',
        '禁止喂食水，拨打急救电话',
        '紧急送医'
      ]
    },
    prevention: {
      en: [
        'Avoid outdoor activities between 11:00-15:00 in hot weather',
        'Wear light-colored, breathable, quick-drying clothes and wide-brimmed hats',
        'Hydrate regularly before/during/after exercise (150-200ml every 15 minutes)',
        'Carry cooling tools (ice neck wraps, spray water bottles)'
      ],
      zh: [
        '高温天气避免11:00-15:00户外运动',
        '穿浅色透气速干衣，戴宽檐遮阳帽',
        '运动前/中/后定时补水（每15分钟150-200ml）',
        '随身携带降温工具（冰颈圈、喷雾水瓶）'
      ]
    },
    references: {
      en: [
        'Mao, Z., & Wu, T. Modern Heat Stroke Diagnosis and Treatment. People\'s Military Medical Press, 2000.'
      ],
      zh: [
        '茅志成, and 邬堂春. 现代中暑诊断治疗学. 人民军医出版社, 2000.'
      ]
    }
  },
  {
    id: 'concussion',
    category: 'head',
    titleKey: 'concussion_title',
    symptoms: {
      en: [
        'Brief loss of consciousness or confusion (immediately after injury)',
        'Headache, dizziness, or decreased balance',
        'Nausea or vomiting',
        'Sensitivity to light and sound',
        'Memory impairment (e.g., inability to recall the injury)',
        'Headache or feeling of pressure in the head',
        'Temporary loss of consciousness',
        'Confusion or feeling foggy',
        'Dizziness or "seeing stars"',
        'Ringing in the ears',
        'Nausea or vomiting',
        'Slurred speech',
        'Delayed response to questions'
      ],
      zh: [
        '短暂意识丧失或混乱（受伤后立即出现）',
        '头痛、头晕或平衡感下降',
        '恶心或呕吐',
        '对光、声音敏感',
        '记忆力减退（如无法回忆受伤经过）',
        '头痛或头部压力感',
        '短暂意识丧失',
        '混乱或感觉模糊',
        '头晕或"看到星星"',
        '耳鸣',
        '恶心或呕吐',
        '言语含糊',
        '对问题反应延迟'
      ]
    },
    acuteTreatment: {
      en: [
        'Immediately stop activity, keep the patient calm, avoid head movement',
        'Check consciousness status (ask orientation questions like name, time, place)',
        'Apply ice pack wrapped in towel to swollen areas of the head (10 minutes each time, 20-minute intervals)',
        'Seek medical attention immediately',
        'Stop activity immediately and seek medical attention',
        'Rest physically and mentally',
        'Avoid screens and activities requiring concentration',
        'Gradually return to normal activities under medical supervision',
        'Do not return to sports until cleared by a healthcare professional'
      ],
      zh: [
        '立即停止活动，保持患者安静，避免头部晃动',
        '检查意识状态（询问姓名、时间、地点等定向问题）',
        '用冰袋包裹毛巾敷于头部肿胀处（每次10分钟，间隔20分钟）',
        '立即送医',
        '立即停止活动并寻求医疗帮助',
        '身体和精神休息',
        '避免看屏幕和需要集中注意力的活动',
        '在医疗监督下逐渐恢复正常活动',
        '在医疗专业人员允许前不要恢复运动'
      ]
    },
    prevention: {
      en: [
        'Wear proper helmets during sports (such as cycling, boxing, rugby, etc.)',
        'Strengthen neck muscle training (such as resistance head-raising exercises, 3 sets × 15 repetitions/week)',
        'Wear proper protective equipment (helmet when appropriate)',
        'Follow safety rules for sports and activities',
        'Practice proper technique, especially in contact sports',
        'Strengthen neck muscles',
        'Be aware of concussion symptoms and report immediately'
      ],
      zh: [
        '运动时佩戴合规头盔（如自行车、拳击、橄榄球等）',
        '强化颈部肌肉训练（如抗阻抬头练习，3组×15次/周）',
        '佩戴适当的防护装备（适当时戴头盔）',
        '遵守运动和活动的安全规则',
        '练习正确的技术，尤其是在接触性运动中',
        '加强颈部肌肉',
        '了解脑震荡症状并立即报告'
      ]
    },
    references: {
      en: [
        'Mayo Clinic Staff "concussion", 17 April 2024.',
        'CDC - Heads Up Concussion',
        'International Conference on Concussion in Sport',
        'American Academy of Neurology - Sports Concussion Guidelines'
      ],
      zh: [
        'Mayo Clinic Staff "concussion", 17 April 2024.‹https://www.mayoclinic.org/zh-hans/diseases-conditions/concussion/symptoms-causes/syc-20355594›',
        '疾病控制中心 - 头部抬起脑震荡',
        '国际运动脑震荡会议',
        '美国神经学会 - 运动脑震荡指南'
      ]
    }
  },
  {
    id: 'arm-fracture',
    category: 'bone',
    titleKey: 'arm_fracture_title',
    symptoms: {
      en: [
        'Severe pain (worsening with movement or touch)',
        'Obvious swelling, bruising',
        'Deformity or abnormal bending of the limb',
        'Complete loss of function',
        'Possible bone grinding sound (crepitus)'
      ],
      zh: [
        '剧烈疼痛（活动或触碰时加重）',
        '明显肿胀、瘀斑',
        '患肢畸形或异常弯曲',
        '活动功能完全丧失',
        '可能听到骨摩擦音（骨擦感）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop activity immediately, use splints (boards, hard cardboard, etc.) to immobilize the joints above and below the injury',
        'Apply ice pack wrapped in towel to swollen area (15 minutes each time, 1-hour intervals, avoid direct skin contact)',
        'Elevate the limb to reduce swelling (hand elevated to above heart level)',
        'Do not attempt to realign or forcibly move the injured limb',
        'Seek medical care promptly for imaging studies (X-ray/CT)'
      ],
      zh: [
        '立即停止活动，用夹板（木板、硬纸板等）固定患处上下两个关节',
        '冰袋包裹毛巾敷于肿胀处（每次15分钟，间隔1小时，避免直接接触皮肤）',
        '抬高患肢减少肿胀（手掌高至心脏水平以上）',
        '禁止尝试复位或强行移动伤肢',
        '尽快送医进行影像学检查（X光/CT）'
      ]
    },
    prevention: {
      en: [
        'Wear protective gear during sports (such as wrist guards for skiing)',
        'Supplement calcium and vitamin D (500ml milk daily + 30 minutes of sun exposure)',
        'Perform specific warm-up before high-risk activities (such as finger strength training before climbing)'
      ],
      zh: [
        '运动时佩戴护具（如滑雪用护腕）',
        '补充钙与维生素D（每日牛奶500ml+日晒30分钟）',
        '高危活动前进行专项热身（如攀岩前指力训练）'
      ]
    },
    references: {
      en: [
        'Yu, G., & Yan, X. "Selection of Treatment Methods for Calcaneal Fractures." Chinese Journal of Orthopaedics 26.2 (2006): 8.'
      ],
      zh: [
        '俞光荣, and 燕晓宇. "跟骨骨折治疗方法的选择." 中华骨科杂志 26.2(2006):8.'
      ]
    }
  },
  {
    id: 'tennis-elbow',
    category: 'muscle',
    titleKey: 'tennis_elbow_title',
    symptoms: {
      en: [
        'Sharp pain on the outer side of the elbow (worsened when making a fist/twisting a towel)',
        'Local tenderness (prominent at the lateral epicondyle of the humerus)',
        'Decreased grip strength (such as difficulty holding objects)',
        'Morning stiffness (slightly relieved after activity)'
      ],
      zh: [
        '肘关节外侧刺痛（握拳/拧毛巾时加剧）',
        '局部压痛（肱骨外上髁明显）',
        '握力下降（如持物困难）',
        '晨起僵硬（活动后稍缓解）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop movements that cause pain (such as backhand strokes)',
        'Apply ice to the painful point (10 minutes each time, 4-6 times daily)',
        'Use elbow compression band (wrapped 2cm from the pain point)',
        'Apply diclofenac sodium gel (3-4 times daily)',
        'Seek medical attention if pain persists for >2 weeks'
      ],
      zh: [
        '停止引发疼痛的动作（如反手击球）',
        '冰敷痛点（每次10分钟，每日4-6次）',
        '使用肘关节加压带（距离痛点2cm处缠绕）',
        '外用双氯芬酸钠凝胶（每日3-4次）',
        '持续疼痛＞2周需即刻就医'
      ]
    },
    prevention: {
      en: [
        'Strengthen forearm extensor muscles (eccentric grip training: slow release for 3 seconds during dumbbell wrist extension)',
        'Improve ball-striking technique (avoid excessive reliance on wrist power)',
        'Apply alternating hot and cold compresses after exercise (3 minutes hot + 1 minute cold, cycle 3 times)'
      ],
      zh: [
        '强化前臂伸肌群（离心抓握训练：哑铃腕伸展慢放3秒）',
        '改善击球技术（避免过度依赖手腕发力）',
        '运动后冷热交替敷（3分钟热敷+1分钟冰敷，循环3次）'
      ]
    },
    references: {
      en: [
        'Xing, G., Jing, R., & Yang, C. "Extracorporeal Shock Wave Therapy for Treatment of Heel Pain Syndrome, Periarthritis of Shoulder and Tennis Elbow." Chinese Journal of Physical Medicine and Rehabilitation 23.5 (2001).'
      ],
      zh: [
        '邢更彦, 井茹芳, and 杨传铎. "体外冲击波疗法治疗跟痛症及肩周炎网球肘." 中华物理医学与康复杂志 23.5(2001).'
      ]
    }
  },
  {
    id: 'finger-dislocation',
    category: 'joint',
    titleKey: 'finger_dislocation_title',
    symptoms: {
      en: [
        'Protrusion on the back of the finger joint',
        'Swelling and deformity of the joint',
        'Inability to make a fist',
        'Severe pain with passive movement',
        'Bruising and joint elastic fixation'
      ],
      zh: [
        '指节背侧隆起',
        '关节肿胀变形',
        '无法握拳',
        '被动活动剧痛',
        '瘀斑、关节弹性固定'
      ]
    },
    acuteTreatment: {
      en: [
        'Use ice pack wrapped in towel, apply to the back of the metacarpophalangeal joint, 10 minutes each time, 5-minute intervals, repeat 3 times',
        'Secure aluminum splint (or pen) along the palmar-dorsal aspect of the index finger with elastic bandage in a "figure 8" pattern (maintaining the wrist joint in the neutral position)',
        'Seek medical attention immediately'
      ],
      zh: [
        '使用冰袋包裹毛巾，敷于掌指关节背侧，每次10分钟，间隔5分钟，重复3次',
        '将铝制夹板（或笔杆）沿食指掌背侧固定用弹力绷带"8"字缠绕（保持腕关节立位）',
        '立即就医'
      ]
    },
    prevention: {
      en: [
        'Wear cross-finger bands',
        'Keep fingers slightly flexed when catching balls to buffer impact',
        'Practice grip strength exercises daily (3 sets × 15 repetitions)'
      ],
      zh: [
        '佩戴交叉绑指带',
        '接球时保持手指微屈缓冲',
        '每日握力器训练（3组×15次）'
      ]
    },
    references: {
      en: [
        'Zhang, Z. et al. "Surgical Methods and Functional Recovery of Complex Metacarpophalangeal Joint Dislocation." Chinese Journal of Orthopaedics and Traumatology 17.6 (2005): 2.'
      ],
      zh: [
        '张兆华等. "复杂性掌指关节脱位手术方式与功能恢复." 中医正骨 17.6(2005):2.'
      ]
    }
  },
  {
    id: 'leg-fracture',
    category: 'bone',
    titleKey: 'leg_fracture_title',
    symptoms: {
      en: [
        'Severe pain (worsening with movement or touch)',
        'Obvious swelling, bruising',
        'Deformity or abnormal bending of the limb',
        'Complete loss of function',
        'Possible bone grinding sound (crepitus)'
      ],
      zh: [
        '剧烈疼痛（活动或触碰时加重）',
        '明显肿胀、瘀斑',
        '患肢畸形或异常弯曲',
        '活动功能完全丧失',
        '可能听到骨摩擦音（骨擦感）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop activity immediately, use splints (boards, hard cardboard, etc.) to immobilize the joints above and below the injury',
        'Apply ice pack wrapped in towel to swollen area (15 minutes each time, 1-hour intervals, avoid direct skin contact)',
        'Elevate the limb to reduce swelling (for lower leg fractures, elevate above heart level)',
        'Do not attempt to realign or forcibly move the injured limb',
        'Seek medical care promptly for imaging studies (X-ray/CT)'
      ],
      zh: [
        '立即停止活动，用夹板（木板、硬纸板等）固定患处上下两个关节',
        '冰袋包裹毛巾敷于肿胀处（每次15分钟，间隔1小时，避免直接接触皮肤）',
        '抬高患肢减少肿胀（小腿骨折垫高至心脏水平以上）',
        '禁止尝试复位或强行移动伤肢',
        '尽快送医进行影像学检查（X光/CT）'
      ]
    },
    prevention: {
      en: [
        'Wear protective gear during sports (basketball ankle guards)',
        'Strengthen balance training (single-leg standing 3 sets × 1 minute daily)',
        'Supplement calcium and vitamin D (500ml milk daily + 30 minutes of sun exposure)',
        'Perform specific warm-up before high-risk activities (such as finger strength training before climbing)'
      ],
      zh: [
        '运动时佩戴护具（篮球护踝）',
        '加强平衡训练（单腿站立每日3组×1分钟）',
        '补充钙与维生素D（每日牛奶500ml+日晒30分钟）',
        '高危活动前进行专项热身（如攀岩前指力训练）'
      ]
    },
    references: {
      en: [
        'Yu, G., & Yan, X. "Selection of Treatment Methods for Calcaneal Fractures." Chinese Journal of Orthopaedics 26.2 (2006): 8.'
      ],
      zh: [
        '俞光荣, and 燕晓宇. "跟骨骨折治疗方法的选择." 中华骨科杂志 26.2(2006):8.'
      ]
    }
  },
  {
    id: 'meniscus-injury',
    category: 'joint',
    titleKey: 'meniscus_injury_title',
    symptoms: {
      en: [
        'Knee joint locking (suddenly getting stuck and unable to straighten)',
        'Joint swelling (worsening 6-12 hours after injury)',
        'Pain with popping sounds when flexing and extending the knee',
        'Severe pain when climbing stairs',
        'Local tenderness (medial/lateral joint space)'
      ],
      zh: [
        '膝关节交锁（突然卡住无法伸直）',
        '关节肿胀（伤后6-12小时加重）',
        '屈伸膝关节时疼痛伴弹响',
        '上下楼梯时剧痛',
        '局部压痛（内侧/外侧关节间隙）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop activity immediately, use hinged knee brace to lock the knee joint (0-30° range of motion)',
        'Apply ice pack wrapped in towel (15 minutes each time, 1-hour intervals, continue for 48 hours)',
        'Use crutches to avoid weight-bearing on the affected limb',
        'Seek medical attention promptly for MRI to determine the injury grade'
      ],
      zh: [
        '立即停止活动，用铰链式支具锁定膝关节（0-30°活动范围）',
        '冰袋包裹毛巾冷敷（每次15分钟，间隔1小时，持续48小时）',
        '使用拐杖避免患肢负重',
        '尽早就医进行MRI检查明确损伤分级'
      ]
    },
    prevention: {
      en: [
        'Strengthen the vastus medialis of the quadriceps (wall squats, knees not exceeding toes)',
        'Avoid sudden stopping and rotating movements during sports (such as soccer direction changes, basketball spin jump shots)',
        'Activate the gluteus medius before exercise (side-lying leg raise training 3 sets × 15 repetitions)',
        'Wear knee joint stability supports (such as patellar compression bands)'
      ],
      zh: [
        '强化股四头肌内侧头（靠墙静蹲，膝盖不超过脚尖）',
        '避免运动中急停旋转动作（如足球变向、篮球转身跳投）',
        '运动前激活臀中肌（侧卧抬腿训练3组×15次）',
        '穿戴膝关节稳定性护具（如髌骨加压带）'
      ]
    },
    references: {
      en: [
        'Sports Medicine Dr. Wan "What to do about meniscus injury? This article is enough!" 7, February, 2024'
      ],
      zh: [
        '运动医学万医生"半月板损伤该怎么办？看这篇文章就够了！"7,February,2024‹https://zhuanlan.zhihu.com/p/143272458›'
      ]
    }
  },
  {
    id: 'achilles-tendinitis',
    category: 'foot',
    titleKey: 'achilles_tendinitis_title',
    symptoms: {
      en: [
        'Sharp pain in the upper rear of the heel (worse in the morning or at the beginning of exercise)',
        'Swelling and thickening of the Achilles tendon (feels like a spindle-shaped enlargement when palpated)',
        'Pain worsening with toe-standing or jumping',
        'Redness and increased temperature of the local skin',
        'Pain at rest in severe cases (persistent dull pain at night)'
      ],
      zh: [
        '足跟后上方刺痛（晨起或运动初期加剧）',
        '跟腱肿胀、增粗（触诊呈梭形膨大）',
        '踮脚或跳跃时疼痛加重',
        '局部皮肤发红、温度升高',
        '严重时静息痛（夜间持续钝痛）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop training immediately, avoid any weight-bearing activities on the foot (such as climbing stairs)',
        'Apply ice pack wrapped in towel to the Achilles tendon (15 minutes each time, 1-hour intervals, continue for 72 hours)',
        'Wear Achilles tendon decompression supports (use ankle dorsiflexion orthosis at night)',
        'Seek medical attention if pain persists for >2 weeks'
      ],
      zh: [
        '立即停训，避免任何足部负重活动（如上下楼梯）',
        '冰袋包裹毛巾冷敷跟腱（每次15分钟，间隔1小时，持续72小时）',
        '穿戴跟腱减压支具（夜间使用足踝背屈矫形器）',
        '若疼痛持续＞2周，需就医'
      ]
    },
    prevention: {
      en: [
        'Strengthen calf eccentric training (step heel raise with slow release for 3 seconds, 3 sets × 15 repetitions/day)',
        'Dynamic stretching of the gastrocnemius muscle before exercise (wall push lunges, hold for 30 seconds × 3 sets)',
        'Avoid sudden increases in running distance (weekly increase ≤10%)'
      ],
      zh: [
        '强化小腿离心训练（台阶提踵慢放3秒，3组×15次/日）',
        '运动前动态拉伸腓肠肌（弓步推墙保持30秒×3组）',
        '避免突然增加跑量（每周增幅≤10%）'
      ]
    },
    references: {
      en: [
        'Gleneagles Hospital "Achilles Tendinitis"',
        'Bangkok Sports and Sports Medicine Surgery Center "Achilles Tendinitis"'
      ],
      zh: [
        '港怡医院"跟腱炎"‹https://gleneagles.hk/tc/medical-conditions/achilles-tendonitis›',
        '曼谷体育和运动医学外科中心"Achilles Tendinitis‹https://www.bangkokhospital.com/zh/content/achilles-tendinitis›'
      ]
    }
  },
  {
    id: 'ankle-sprain',
    category: 'foot',
    titleKey: 'ankle_sprain_title',
    symptoms: {
      en: [
        'Severe pain on lateral/medial aspect of the ankle (often with a popping sound)',
        'Rapid swelling (peaking within 24 hours)',
        'Subcutaneous bruising (common in lateral sprains)',
        'Difficulty or inability to bear weight or walk',
        'Decreased joint stability (e.g., positive inversion test)'
      ],
      zh: [
        '踝关节外侧/内侧剧烈疼痛（常伴弹响）',
        '迅速肿胀（24小时内达高峰）',
        '皮下瘀斑（外侧扭伤多见）',
        '承重困难或无法行走',
        '关节稳定性下降（如内翻试验阳性）'
      ]
    },
    acuteTreatment: {
      en: [
        'Stop activity immediately, use elastic bandage to immobilize the ankle joint in a "figure 8" pattern (maintaining neutral position)',
        'Apply ice pack wrapped in towel to swollen area (15 minutes each time, 1-hour intervals, repeat 3 times)',
        'Elevate the affected limb to hip level (foot higher than heart when sitting)',
        'Avoid heat application, massage, or alcohol rubs within 48 hours',
        'Seek medical attention immediately to rule out fracture'
      ],
      zh: [
        '立即停止活动，用弹性绷带"8"字缠绕固定踝关节（保持中立位）',
        '冰袋包裹毛巾敷于肿胀处（每次15分钟，间隔1小时，重复3次）',
        '抬高患肢至髋关节水平以上（坐位时脚踝高于心脏）',
        '48小时内禁止热敷、按摩或酒精擦拭',
        '立即就医排查骨折'
      ]
    },
    prevention: {
      en: [
        'Activate ankle muscles before exercise (heel raise training 3 sets × 20 repetitions)',
        'Wear ankle supports (level-3 protection with straps preferred)',
        'Choose high-top anti-slip athletic shoes'
      ],
      zh: [
        '运动前激活踝周肌群（提踵训练3组×20次）',
        '佩戴踝关节护具（三级防护优先选择绑带式）',
        '选择高帮防滑运动鞋'
      ]
    },
    references: {
      en: [
        'Huang, M., & Gong, J. "Clinical Efficacy Observation of Continuous Cold Therapy for Acute Ankle Sprain." Chinese Journal of School Health 20.3 (2006): 2.',
        'Yu, B. et al. "Efficacy Observation of Kinesio Taping Assisted Physical Therapy for Pain and Swelling in Patients with Acute Ankle Sprain." Chinese Journal of Sports Medicine 31.9 (2012): 5.'
      ],
      zh: [
        '黄美荣, and 龚金山. "持续冷敷疗法对急性期踝关节扭伤的临床疗效观察." 中国校医 20.3(2006):2.',
        '余波等. "肌内效布贴扎辅助理疗治疗急性踝关节扭伤患者肿胀疼痛疗效观察." 中国运动医学杂志 31.9(2012):5.'
      ]
    }
  },
  {
    id: 'blister',
    category: 'foot',
    titleKey: 'blister_title',
    symptoms: {
      en: [
        'Raised transparent fluid sac on skin surface (separation of epidermis from dermis)',
        'Local burning sensation or stinging pain',
        'Mild pain when pressed',
        'Redness of surrounding skin (friction area)'
      ],
      zh: [
        '皮肤表面隆起透明液囊（表皮与真皮层分离）',
        '局部灼热感或刺痛',
        '轻微按压疼痛',
        '周围皮肤发红（摩擦区域）'
      ]
    },
    acuteTreatment: {
      en: [
        'Small blister (<1cm): Keep the epidermis intact, cover with sterile dressing (such as silicone blister patches)',
        'Avoid continued friction (change to looser shoes/socks or pause exercise)',
        'Large blister (>1cm or already broken): Disinfect with iodine, puncture with sterile needle from the edge to drain fluid (do not tear off epidermis)',
        'Apply antibiotic ointment (such as mupirocin), cover with breathable dressing',
        'Change dressing daily, monitor for infection (redness/pus)'
      ],
      zh: [
        '小水泡（＜1cm）：保留表皮完整，用无菌敷料覆盖（如硅胶水泡贴）',
        '避免继续摩擦（换宽松鞋袜或暂停运动）',
        '大水泡（＞1cm或已破损）：用碘伏消毒，无菌针头从边缘刺破引流（勿撕脱表皮）',
        '涂抹抗生素软膏（如莫匹罗星），覆盖透气敷料',
        '每日更换敷料，观察是否感染（红肿/化脓）'
      ]
    },
    prevention: {
      en: [
        'Wear moisture-wicking athletic socks (polyester/wool blend, avoid pure cotton)',
        'Apply anti-friction patches to prone areas in advance (such as heel, arch)',
        'During break-in period for new shoes, wear them for only 1-2 hours daily, gradually increasing usage time',
        'Apply petroleum jelly or anti-friction cream to blister-prone areas before exercise (such as Compeed)'
      ],
      zh: [
        '穿吸湿排汗的运动袜（含涤纶/羊毛混纺，避免纯棉）',
        '易摩擦部位提前贴防磨贴（如脚跟、足弓）',
        '新鞋磨合期每日穿1-2小时，逐步增加使用时间',
        '运动前在易起泡处涂抹凡士林或抗摩擦膏（如Compeed）'
      ]
    },
    references: {
      en: [
        '"Blisters: First Aid." Mayo Clinic',
        '"How Do I Treat a Blister?" WebMD',
        '"Recovery – Burns and Scalds." NHS'
      ],
      zh: [
        '"Blisters: First Aid." Mayo Clinic, www.mayoclinic.org/first-aid/first-aid-blisters/basics/art-20056691.',
        '"How Do I Treat a Blister?" WebMD, www.webmd.com/skin-problems-and-treatments/qa/how-do-i-treat-a-blister.',
        '"Recovery – Burns and Scalds." NHS, www.nhs.uk/conditions/burns-and-scalds/recovery/.'
      ]
    }
  }
];

export const injuryCategories = [
  { id: 'common', titleKey: 'common_injuries' },
  { id: 'head', titleKey: 'head_injuries' },
  { id: 'arm', titleKey: 'arm_injuries' },
  { id: 'leg', titleKey: 'leg_injuries' },
  { id: 'foot', titleKey: 'foot_injuries' }
]; 