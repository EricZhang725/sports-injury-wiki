export interface Reference {
  author: string;
  title: string;
  publication: string;
  year: string;
  url?: string;
}

export interface RehabMethod {
  id: string;
  category: string;
  titleKey: string;
  imagePath?: string;
  description: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  steps: {
    'en': string[];
    'zh-CN': string[];
    'zh-TW': string[];
  };
  cautions: {
    'en': string[];
    'zh-CN': string[];
    'zh-TW': string[];
  };
  timeline: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  effectiveness: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  references: Reference[];
}

export interface RehabCategory {
  id: string;
  icon: string;
}

export const rehabCategories: RehabCategory[] = [
  {
    id: 'exercise_therapy',
    icon: 'dumbbell'
  },
  {
    id: 'physical_therapy',
    icon: 'hand-holding-medical'
  },
  {
    id: 'therapeutic_equipment',
    icon: 'toolbox'
  },
  {
    id: 'nutritional_support',
    icon: 'apple-alt'
  }
];

export const rehabMethods: RehabMethod[] = [
  {
    id: 'proprioceptive_training',
    category: 'exercise_therapy',
    titleKey: 'proprioceptive_training',
    imagePath: '/images/rehab/proprioceptive-training.jpg',
    description: {
      'en': 'Proprioceptive training focuses on improving the body\'s ability to sense its position in space, enhancing joint stability and coordination.',
      'zh-CN': '本体感觉训练专注于提高身体感知空间位置的能力，增强关节稳定性和协调性。',
      'zh-TW': '本體感覺訓練專注於提高身體感知空間位置的能力，增強關節穩定性和協調性。'
    },
    steps: {
      'en': [
        'Start with basic balance exercises, such as standing on one leg',
        'Progress to using unstable surfaces like balance boards or foam pads',
        'Incorporate functional movements like squats or lunges on unstable surfaces',
        'Add dynamic movements such as catching and throwing while maintaining balance',
        'Gradually increase difficulty by closing eyes or adding resistance'
      ],
      'zh-CN': [
        '从基本平衡练习开始，如单腿站立',
        '进阶到使用不稳定表面，如平衡板或泡沫垫',
        '在不稳定表面上加入功能性动作，如深蹲或弓步',
        '加入动态动作，如在保持平衡的同时接球和投球',
        '通过闭眼或增加阻力逐渐增加难度'
      ],
      'zh-TW': [
        '從基本平衡練習開始，如單腿站立',
        '進階到使用不穩定表面，如平衡板或泡沫墊',
        '在不穩定表面上加入功能性動作，如深蹲或弓步',
        '加入動態動作，如在保持平衡的同時接球和投球',
        '通過閉眼或增加阻力逐漸增加難度'
      ]
    },
    cautions: {
      'en': [
        'Ensure proper supervision initially, especially for older adults or those with balance issues',
        'Progress gradually to avoid falls or injuries',
        'May not be suitable for individuals with vestibular disorders without medical clearance',
        'Discontinue if experiencing dizziness or increased pain'
      ],
      'zh-CN': [
        '确保初期有适当的监督，特别是对于老年人或平衡问题的人',
        '逐渐进阶以避免跌倒或受伤',
        '未经医疗许可，可能不适合前庭功能障碍的个体',
        '如果出现头晕或疼痛加剧，应停止训练'
      ],
      'zh-TW': [
        '確保初期有適當的監督，特別是對於老年人或平衡問題的人',
        '逐漸進階以避免跌倒或受傷',
        '未經醫療許可，可能不適合前庭功能障礙的個體',
        '如果出現頭暈或疼痛加劇，應停止訓練'
      ]
    },
    timeline: {
      'en': 'Improvements typically begin within 2-4 weeks of consistent training, with significant gains observed after 6-8 weeks.',
      'zh-CN': '在持续训练2-4周内通常开始出现改善，6-8周后观察到显著提升。',
      'zh-TW': '在持續訓練2-4週內通常開始出現改善，6-8週後觀察到顯著提升。'
    },
    effectiveness: {
      'en': 'Strong evidence supports proprioceptive training for reducing ankle sprain recurrence (by up to 50%) and improving functional outcomes following joint injuries.',
      'zh-CN': '有力证据支持本体感觉训练可减少踝关节扭伤复发（高达50%）并改善关节损伤后的功能结果。',
      'zh-TW': '有力證據支持本體感覺訓練可減少踝關節扭傷復發（高達50%）並改善關節損傷後的功能結果。'
    },
    references: [
      {
        author: 'Riva D, et al.',
        title: 'Proprioceptive training and injury prevention in a professional men\'s basketball team: A six-year prospective study',
        publication: 'Journal of Strength and Conditioning Research',
        year: '2016',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26473518/'
      },
      {
        author: 'Schiftan GS, Ross LA, Hahne AJ',
        title: 'The effectiveness of proprioceptive training in preventing ankle sprains in sporting populations: a systematic review and meta-analysis',
        publication: 'Journal of Science and Medicine in Sport',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24831756/'
      }
    ]
  },
  {
    id: 'blood_flow_restriction',
    category: 'therapeutic_equipment',
    titleKey: 'blood_flow_restriction',
    imagePath: '/images/rehab/blood-flow-restriction.jpg',
    description: {
      'en': 'Blood Flow Restriction (BFR) training involves applying pressure to limbs during exercise to partially restrict blood flow, allowing strength and muscle gains with lower weight loads.',
      'zh-CN': '血流限制训练(BFR)涉及在运动过程中对肢体施加压力以部分限制血流，允许使用较低重量负荷获得力量和肌肉增长。',
      'zh-TW': '血流限制訓練(BFR)涉及在運動過程中對肢體施加壓力以部分限制血流，允許使用較低重量負荷獲得力量和肌肉增長。'
    },
    steps: {
      'en': [
        'Apply specialized tourniquet cuffs or bands to the proximal portion of limbs',
        'Inflate to a personalized pressure (typically 40-80% of arterial occlusion pressure)',
        'Perform exercises at 20-30% of one-repetition maximum',
        'Complete 3-4 sets with 15-30 repetitions and short rest periods (30-60 seconds)',
        'Limit sessions to 15-20 minutes and remove bands immediately after completion'
      ],
      'zh-CN': [
        '将专用止血带或绑带应用于肢体近端部分',
        '充气至个性化压力（通常为动脉闭塞压力的40-80%）',
        '以最大单次重复的20-30%进行锻炼',
        '完成3-4组，每组15-30次重复，休息时间短（30-60秒）',
        '将训练时间限制在15-20分钟，完成后立即移除绑带'
      ],
      'zh-TW': [
        '將專用止血帶或綁帶應用於肢體近端部分',
        '充氣至個性化壓力（通常為動脈閉塞壓力的40-80%）',
        '以最大單次重複的20-30%進行鍛煉',
        '完成3-4組，每組15-30次重複，休息時間短（30-60秒）',
        '將訓練時間限制在15-20分鐘，完成後立即移除綁帶'
      ]
    },
    cautions: {
      'en': [
        'Should be performed under professional supervision, especially initially',
        'Contraindicated for individuals with cardiovascular conditions, hypertension, venous thromboembolism, or circulatory disorders',
        'Not recommended during pregnancy or for those with active infections or cancer',
        'May cause discomfort and bruising, which should be monitored',
        'Specialized equipment and proper pressure application are essential for safety'
      ],
      'zh-CN': [
        '应在专业监督下进行，尤其是初期',
        '心血管疾病、高血压、静脉血栓栓塞或循环系统疾病的个体禁用',
        '怀孕期间或有活动性感染或癌症的人群不推荐使用',
        '可能导致不适和瘀伤，应予以监控',
        '安全性依赖于专业设备和正确的压力应用'
      ],
      'zh-TW': [
        '應在專業監督下進行，尤其是初期',
        '心血管疾病、高血壓、靜脈血栓栓塞或循環系統疾病的個體禁用',
        '懷孕期間或有活動性感染或癌症的人群不推薦使用',
        '可能導致不適和瘀傷，應予以監控',
        '安全性依賴於專業設備和正確的壓力應用'
      ]
    },
    timeline: {
      'en': 'Hypertrophic responses can be seen within 2-3 weeks, with strength improvements typically following within 4-6 weeks of consistent training.',
      'zh-CN': '在2-3周内可以观察到肌肉肥大反应，在持续训练4-6周内通常会出现力量提升。',
      'zh-TW': '在2-3週內可以觀察到肌肉肥大反應，在持續訓練4-6週內通常會出現力量提升。'
    },
    effectiveness: {
      'en': 'Research indicates BFR can produce comparable muscle hypertrophy to high-load training while using only 20-30% of maximum loads, making it valuable for rehabilitation scenarios where heavy loading is contraindicated.',
      'zh-CN': '研究表明，血流限制训练只使用最大负荷的20-30%，就能产生与高负荷训练相当的肌肉肥大效果，这使其在禁用重负荷的康复场景中具有价值。',
      'zh-TW': '研究表明，血流限制訓練只使用最大負荷的20-30%，就能產生與高負荷訓練相當的肌肉肥大效果，這使其在禁用重負荷的康復場景中具有價值。'
    },
    references: [
      {
        author: 'Hughes L, Paton B, Rosenblatt B, Gissane C, Patterson SD',
        title: 'Blood flow restriction training in clinical musculoskeletal rehabilitation: a systematic review and meta-analysis',
        publication: 'British Journal of Sports Medicine',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28259850/'
      },
      {
        author: 'Centner C, Wiegel P, Gollhofer A, König D',
        title: 'Effects of Blood Flow Restriction Training on Muscular Strength and Hypertrophy in Older Individuals: A Systematic Review and Meta-Analysis',
        publication: 'Sports Medicine',
        year: '2019',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30838520/'
      }
    ]
  },
  {
    id: 'nmes',
    category: 'therapeutic_equipment',
    titleKey: 'nmes',
    imagePath: '/images/rehab/nmes.jpg',
    description: {
      'en': 'Neuromuscular Electrical Stimulation (NMES) uses electrical impulses to stimulate muscle contractions, helping to prevent atrophy and improve strength when voluntary contraction is limited or painful.',
      'zh-CN': '神经肌肉电刺激(NMES)使用电脉冲刺激肌肉收缩，在自主收缩受限或疼痛时有助于防止肌肉萎缩并提高力量。',
      'zh-TW': '神經肌肉電刺激(NMES)使用電脈衝刺激肌肉收縮，在自主收縮受限或疼痛時有助於防止肌肉萎縮並提高力量。'
    },
    steps: {
      'en': [
        'Position electrodes over target muscle groups following clinician guidance',
        'Start with low intensity and gradually increase to tolerance',
        'Set appropriate pulse width (typically 200-400 microseconds) and frequency (20-50 Hz for strength)',
        'Use duty cycles of 10-15 seconds on, 50-120 seconds off',
        'Complete treatment sessions of 15-60 minutes, 3-5 times per week'
      ],
      'zh-CN': [
        '按照临床医生指导将电极放置在目标肌肉群上',
        '从低强度开始，逐渐增加到耐受水平',
        '设置适当的脉冲宽度（通常为200-400微秒）和频率（力量训练为20-50 Hz）',
        '使用10-15秒开启，50-120秒关闭的工作周期',
        '完成15-60分钟的治疗课程，每周3-5次'
      ],
      'zh-TW': [
        '按照臨床醫生指導將電極放置在目標肌肉群上',
        '從低強度開始，逐漸增加到耐受水平',
        '設置適當的脈衝寬度（通常為200-400微秒）和頻率（力量訓練為20-50 Hz）',
        '使用10-15秒開啟，50-120秒關閉的工作週期',
        '完成15-60分鐘的治療課程，每週3-5次'
      ]
    },
    cautions: {
      'en': [
        'Contraindicated for individuals with cardiac pacemakers or implanted electronic devices',
        'Should not be used over areas with metal implants, cancerous lesions, or active infections',
        'Avoid application over the anterior neck, eyes, or carotid sinus regions',
        'Not recommended during pregnancy unless specifically prescribed',
        'Must be properly guided by healthcare professionals, especially for initial parameter setting'
      ],
      'zh-CN': [
        '心脏起搏器或植入电子设备的个体禁用',
        '不应在金属植入物、癌性病变或活动性感染区域使用',
        '避免应用于前颈部、眼睛或颈动脉窦区域',
        '除非特别处方，否则不建议在怀孕期间使用',
        '必须由医疗专业人员正确指导，特别是初始参数设置'
      ],
      'zh-TW': [
        '心臟起搏器或植入電子設備的個體禁用',
        '不應在金屬植入物、癌性病變或活動性感染區域使用',
        '避免應用於前頸部、眼睛或頸動脈竇區域',
        '除非特別處方，否則不建議在懷孕期間使用',
        '必須由醫療專業人員正確指導，特別是初始參數設置'
      ]
    },
    timeline: {
      'en': 'Muscle activation improvements can be observed within days, while strength gains typically require 4-6 weeks of consistent application.',
      'zh-CN': '肌肉激活改善可在数天内观察到，而力量增益通常需要4-6周的持续应用。',
      'zh-TW': '肌肉激活改善可在數天內觀察到，而力量增益通常需要4-6週的持續應用。'
    },
    effectiveness: {
      'en': 'Strong evidence supports NMES for reducing quadriceps weakness following knee surgery and for maintaining muscle mass during immobilization periods. It is particularly effective when combined with voluntary exercise when possible.',
      'zh-CN': '有力证据支持神经肌肉电刺激可减轻膝关节手术后的股四头肌无力，并在固定期间维持肌肉质量。在可能的情况下，与自主运动相结合时特别有效。',
      'zh-TW': '有力證據支持神經肌肉電刺激可減輕膝關節手術後的股四頭肌無力，並在固定期間維持肌肉質量。在可能的情況下，與自主運動相結合時特別有效。'
    },
    references: [
      {
        author: 'Maffiuletti NA, Gondin J, Place N, Stevens-Lapsley J, Vivodtzev I, Minetto MA',
        title: 'Clinical use of neuromuscular electrical stimulation for neuromuscular rehabilitation: what are we overlooking?',
        publication: 'Archives of Physical Medicine and Rehabilitation',
        year: '2018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29505744/'
      },
      {
        author: 'Hauger AV, Reiman MP, Bjordal JM, Sheets C, Ledbetter L, Goode AP',
        title: 'Neuromuscular electrical stimulation is effective in strengthening the quadriceps muscle after anterior cruciate ligament surgery',
        publication: 'Knee Surgery, Sports Traumatology, Arthroscopy',
        year: '2018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28161737/'
      }
    ]
  },
  {
    id: 'eccentric_training',
    category: 'exercise_therapy',
    titleKey: 'eccentric_training',
    imagePath: '/images/rehab/eccentric-training.jpg',
    description: {
      'en': 'Eccentric training focuses on the lengthening phase of muscle contraction under tension, which has been shown to be particularly effective for tendon rehabilitation and improving muscle strength.',
      'zh-CN': '离心训练专注于肌肉在张力下的伸长收缩阶段，这已被证明对肌腱康复和提高肌肉力量特别有效。',
      'zh-TW': '離心訓練專注於肌肉在張力下的伸長收縮階段，這已被證明對肌腱康復和提高肌肉力量特別有效。'
    },
    steps: {
      'en': [
        'Begin with a lighter load than used for concentric exercises',
        'Perform the eccentric (lowering) phase slowly, taking 3-5 seconds',
        'Use assistance or the other limb for the concentric (lifting) phase if needed',
        'Start with 3 sets of 10-15 repetitions, 2-3 times per week',
        'Gradually increase load rather than repetitions as strength improves'
      ],
      'zh-CN': [
        '从比向心运动更轻的负荷开始',
        '慢慢进行离心（下降）阶段，花费3-5秒',
        '如有需要，在向心（提升）阶段使用辅助或另一肢体',
        '开始时每组10-15次重复，每周2-3次，共3组',
        '随着力量提高，逐渐增加负荷而非重复次数'
      ],
      'zh-TW': [
        '從比向心運動更輕的負荷開始',
        '慢慢進行離心（下降）階段，花費3-5秒',
        '如有需要，在向心（提升）階段使用輔助或另一肢體',
        '開始時每組10-15次重複，每週2-3次，共3組',
        '隨著力量提高，逐漸增加負荷而非重複次數'
      ]
    },
    cautions: {
      'en': [
        'May cause increased muscle soreness, especially initially',
        'Not appropriate during acute inflammation phases',
        'Should be avoided or modified for individuals with uncontrolled cardiovascular conditions',
        'Progress load gradually to prevent overloading tendons',
        'Technique is crucial - maintain proper alignment and control throughout movements'
      ],
      'zh-CN': [
        '可能导致肌肉酸痛增加，特别是初期',
        '急性炎症阶段不适用',
        '对于心血管疾病失控的个体，应避免或修改',
        '逐渐增加负荷以防止肌腱过载',
        '技术至关重要 - 在整个动作过程中保持适当的对齐和控制'
      ],
      'zh-TW': [
        '可能導致肌肉酸痛增加，特別是初期',
        '急性炎症階段不適用',
        '對於心血管疾病失控的個體，應避免或修改',
        '逐漸增加負荷以防止肌腱過載',
        '技術至關重要 - 在整個動作過程中保持適當的對齊和控制'
      ]
    },
    timeline: {
      'en': 'Initial pain reduction may occur within 2-4 weeks, while significant tendon remodeling and strength improvements typically require 8-12 weeks.',
      'zh-CN': '初期疼痛减轻可能在2-4周内发生，而显著的肌腱重塑和力量提升通常需要8-12周。',
      'zh-TW': '初期疼痛減輕可能在2-4週內發生，而顯著的肌腱重塑和力量提升通常需要8-12週。'
    },
    effectiveness: {
      'en': 'Strong evidence supports eccentric training for the treatment of tendinopathies, particularly Achilles and patellar tendinopathy. Studies show 60-90% success rates for reducing pain and improving function.',
      'zh-CN': '有力证据支持离心训练用于肌腱病的治疗，特别是跟腱和髌腱病。研究显示，在减轻疼痛和改善功能方面，成功率为60-90%。',
      'zh-TW': '有力證據支持離心訓練用於肌腱病的治療，特別是跟腱和髕腱病。研究顯示，在減輕疼痛和改善功能方面，成功率為60-90%。'
    },
    references: [
      {
        author: 'Beyer R, Kongsgaard M, Hougs Kjær B, Øhlenschlæger T, Kjær M, Magnusson SP',
        title: 'Heavy Slow Resistance Versus Eccentric Training as Treatment for Achilles Tendinopathy: A Randomized Controlled Trial',
        publication: 'American Journal of Sports Medicine',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26018970/'
      },
      {
        author: 'Malliaras P, Barton CJ, Reeves ND, Langberg H',
        title: 'Achilles and patellar tendinopathy loading programmes: a systematic review comparing clinical outcomes and identifying potential mechanisms for effectiveness',
        publication: 'Sports Medicine',
        year: '2013',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23494258/'
      }
    ]
  },
  {
    id: 'manual_therapy',
    category: 'physical_therapy',
    titleKey: 'manual_therapy',
    imagePath: '/images/rehab/manual-therapy.jpg',
    description: {
      'en': 'Manual therapy involves skilled hands-on techniques applied by trained therapists to mobilize joints, reduce muscle tension, and improve tissue mobility, enhancing healing and restoring function.',
      'zh-CN': '手法治疗包括由训练有素的治疗师应用熟练的手法技术，用于关节松动、减轻肌肉紧张和改善组织活动度，促进愈合并恢复功能。',
      'zh-TW': '手法治療包括由訓練有素的治療師應用熟練的手法技術，用於關節鬆動、減輕肌肉緊張和改善組織活動度，促進癒合並恢復功能。'
    },
    steps: {
      'en': [
        'Thorough assessment to identify movement restrictions and tissue dysfunction',
        'Application of specific hands-on techniques tailored to patient needs',
        'May include joint mobilization, manipulation, soft tissue mobilization, and myofascial release',
        'Often combined with therapeutic exercises for optimal outcomes',
        'Usually performed 1-3 times per week for 3-6 weeks'
      ],
      'zh-CN': [
        '彻底评估以确定运动限制和组织功能障碍',
        '应用根据患者需求定制的特定手法技术',
        '可能包括关节松动、整脊、软组织松动和筋膜释放',
        '通常与治疗性运动相结合以获得最佳效果',
        '通常每周进行1-3次，持续3-6周'
      ],
      'zh-TW': [
        '徹底評估以確定運動限制和組織功能障礙',
        '應用根據患者需求定制的特定手法技術',
        '可能包括關節鬆動、整脊、軟組織鬆動和筋膜釋放',
        '通常與治療性運動相結合以獲得最佳效果',
        '通常每週進行1-3次，持續3-6週'
      ]
    },
    cautions: {
      'en': [
        'Should be performed only by qualified healthcare professionals with specific training',
        'Contraindicated in cases of fracture, inflammatory arthritis, malignancy, or vascular compromise',
        'Techniques must be modified based on patient condition and tissue irritability',
        'Some techniques may cause temporary soreness or discomfort',
        'High-velocity techniques should be avoided in patients with osteoporosis, vertigo, or certain spinal conditions'
      ],
      'zh-CN': [
        '应仅由接受过特定训练的合格医疗专业人员执行',
        '骨折、炎性关节炎、恶性肿瘤或血管损伤等情况禁用',
        '必须根据患者状况和组织刺激性修改技术',
        '某些技术可能导致暂时性酸痛或不适',
        '骨质疏松、眩晕或某些脊柱疾病患者应避免高速技术'
      ],
      'zh-TW': [
        '應僅由接受過特定訓練的合格醫療專業人員執行',
        '骨折、炎性關節炎、惡性腫瘤或血管損傷等情況禁用',
        '必須根據患者狀況和組織刺激性修改技術',
        '某些技術可能導致暫時性酸痛或不適',
        '骨質疏鬆、眩暈或某些脊柱疾病患者應避免高速技術'
      ]
    },
    timeline: {
      'en': 'Pain reduction often occurs within 1-3 sessions, while functional improvements typically develop over 2-6 weeks of treatment.',
      'zh-CN': '疼痛减轻通常在1-3次治疗后出现，而功能改善通常在2-6周的治疗过程中逐渐发展。',
      'zh-TW': '疼痛減輕通常在1-3次治療後出現，而功能改善通常在2-6週的治療過程中逐漸發展。'
    },
    effectiveness: {
      'en': 'Research supports the effectiveness of manual therapy for reducing pain and improving function in a variety of musculoskeletal conditions, particularly when combined with exercise therapy.',
      'zh-CN': '研究支持手法治疗在减轻各种肌肉骨骼疾病的疼痛和改善功能方面的有效性，特别是当与运动疗法相结合时。',
      'zh-TW': '研究支持手法治療在減輕各種肌肉骨骼疾病的疼痛和改善功能方面的有效性，特別是當與運動療法相結合時。'
    },
    references: [
      {
        author: 'Deyle GD, Allison SC, Matekel RL, et al.',
        title: 'Physical therapy treatment effectiveness for osteoarthritis of the knee: A randomized comparison of supervised clinical exercise and manual therapy procedures versus a home exercise program',
        publication: 'Physical Therapy',
        year: '2005',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16305269/'
      },
      {
        author: 'Gross A, Langevin P, Burnie SJ, et al.',
        title: 'Manipulation and mobilisation for neck pain contrasted against an inactive control or another active treatment',
        publication: 'Cochrane Database of Systematic Reviews',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26397370/'
      }
    ]
  },
  {
    id: 'therapeutic_ultrasound',
    category: 'physical_therapy',
    titleKey: 'therapeutic_ultrasound',
    imagePath: '/images/rehab/therapeutic-ultrasound.jpg',
    description: {
      'en': 'Therapeutic ultrasound uses high-frequency sound waves to generate deep heat in tissues, increasing blood flow, reducing pain, and enhancing the tissue healing process in injured areas.',
      'zh-CN': '治疗性超声波使用高频声波在组织中产生深层热量，增加血流量，减轻疼痛，并增强受伤区域的组织愈合过程。',
      'zh-TW': '治療性超聲波使用高頻聲波在組織中產生深層熱量，增加血流量，減輕疼痛，並增強受傷區域的組織癒合過程。'
    },
    steps: {
      'en': [
        'Patient positioned comfortably with the target area exposed',
        'Conductive gel applied to ensure proper sound wave transmission',
        'Ultrasound head moved slowly and continuously over the treatment area',
        'Typical treatment parameters: 0.5-2.0 W/cm² intensity for 5-10 minutes',
        'Treatments usually administered 2-3 times per week for 2-4 weeks'
      ],
      'zh-CN': [
        '患者舒适定位，暴露目标区域',
        '涂抹导电凝胶以确保正确的声波传输',
        '超声波探头在治疗区域缓慢连续移动',
        '典型治疗参数：0.5-2.0 W/cm²强度，5-10分钟',
        '通常每周接受2-3次治疗，持续2-4周'
      ],
      'zh-TW': [
        '患者舒適定位，暴露目標區域',
        '塗抹導電凝膠以確保正確的聲波傳輸',
        '超聲波探頭在治療區域緩慢連續移動',
        '典型治療參數：0.5-2.0 W/cm²強度，5-10分鐘',
        '通常每週接受2-3次治療，持續2-4週'
      ]
    },
    cautions: {
      'en': [
        'Contraindicated over areas with malignancy, acute infection, or impaired sensation',
        'Should not be used over metal implants, pacemakers, or growth plates in children',
        'Avoid application over the eyes, heart, reproductive organs, or spinal cord',
        'Thermal mode not recommended for acute injuries (first 24-48 hours)',
        'Should be administered only by trained healthcare professionals'
      ],
      'zh-CN': [
        '禁止在恶性肿瘤、急性感染或感觉障碍区域使用',
        '不应在金属植入物、起搏器或儿童生长板上使用',
        '避免在眼睛、心脏、生殖器官或脊髓上使用',
        '急性损伤（前24-48小时）不建议使用热模式',
        '只能由受过训练的医疗专业人员使用'
      ],
      'zh-TW': [
        '禁止在惡性腫瘤、急性感染或感覺障礙區域使用',
        '不應在金屬植入物、起搏器或兒童生長板上使用',
        '避免在眼睛、心臟、生殖器官或脊髓上使用',
        '急性損傷（前24-48小時）不建議使用熱模式',
        '只能由受過訓練的醫療專業人員使用'
      ]
    },
    timeline: {
      'en': 'Pain reduction may be observed after 1-3 sessions, while tissue healing effects typically require 6-12 sessions over 3-6 weeks.',
      'zh-CN': '疼痛减轻可能在1-3次治疗后观察到，而组织愈合效果通常需要3-6周内的6-12次治疗。',
      'zh-TW': '疼痛減輕可能在1-3次治療後觀察到，而組織癒合效果通常需要3-6週內的6-12次治療。'
    },
    effectiveness: {
      'en': 'Evidence supports ultrasound effectiveness for treating specific conditions including plantar fasciitis, carpal tunnel syndrome, and certain types of tendinopathies, particularly when combined with other therapies.',
      'zh-CN': '证据支持超声波治疗特定疾病的有效性，包括足底筋膜炎、腕管综合症和某些类型的肌腱病，特别是与其他疗法结合时。',
      'zh-TW': '證據支持超聲波治療特定疾病的有效性，包括足底筋膜炎、腕管綜合症和某些類型的肌腱病，特別是與其他療法結合時。'
    },
    references: [
      {
        author: 'Ebenbichler GR, Resch KL, Nicolakis P, et al.',
        title: 'Ultrasound treatment for treating the carpal tunnel syndrome: randomised "sham" controlled trial',
        publication: 'BMJ',
        year: '1998',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9492683/'
      },
      {
        author: 'Draper DO, Pitsillides E',
        title: 'Therapeutic Ultrasound: Current Perspectives, Trends, and Techniques',
        publication: 'Athletic Training & Sports Health Care',
        year: '2021',
        url: 'https://journals.healio.com/doi/10.3928/19425864-20210429-01'
      }
    ]
  },
  {
    id: 'protein_supplementation',
    category: 'nutritional_support',
    titleKey: 'protein_supplementation',
    imagePath: '/images/rehab/protein-supplementation.jpg',
    description: {
      'en': 'Protein supplementation provides essential amino acids that enhance muscle repair and growth during rehabilitation, helping to prevent atrophy and accelerate recovery from injury or surgery.',
      'zh-CN': '蛋白质补充提供必需氨基酸，在康复期间增强肌肉修复和生长，帮助防止肌肉萎缩并加速从伤害或手术中恢复。',
      'zh-TW': '蛋白質補充提供必需氨基酸，在康復期間增強肌肉修復和生長，幫助防止肌肉萎縮並加速從傷害或手術中恢復。'
    },
    steps: {
      'en': [
        'Assess baseline protein intake through dietary analysis',
        'Calculate individual protein needs based on body weight, injury severity, and activity level (typically 1.6-2.2g/kg/day for injured athletes)',
        'Choose high-quality protein sources with complete amino acid profiles',
        'Distribute protein intake throughout the day (20-40g per meal/snack)',
        'Time protein intake strategically around rehabilitation exercises (within 30 minutes post-exercise)'
      ],
      'zh-CN': [
        '通过饮食分析评估基线蛋白质摄入量',
        '根据体重、伤害严重程度和活动水平计算个人蛋白质需求（受伤运动员通常为1.6-2.2g/kg/天）',
        '选择具有完整氨基酸谱的高质量蛋白质来源',
        '全天分配蛋白质摄入（每餐/零食20-40g）',
        '在康复练习周围战略性地安排蛋白质摄入时间（运动后30分钟内）'
      ],
      'zh-TW': [
        '通過飲食分析評估基線蛋白質攝入量',
        '根據體重、傷害嚴重程度和活動水平計算個人蛋白質需求（受傷運動員通常為1.6-2.2g/kg/天）',
        '選擇具有完整氨基酸譜的高質量蛋白質來源',
        '全天分配蛋白質攝入（每餐/零食20-40g）',
        '在康復練習周圍戰略性地安排蛋白質攝入時間（運動後30分鐘內）'
      ]
    },
    cautions: {
      'en': [
        'Monitor kidney function in individuals with pre-existing renal conditions',
        'Balance protein intake with adequate hydration',
        'Consider potential allergens in protein supplements (dairy, soy, etc.)',
        'Excessive protein intake may cause gastrointestinal discomfort',
        'Supplements should complement, not replace, whole food protein sources'
      ],
      'zh-CN': [
        '监测既有肾脏疾病个体的肾功能',
        '平衡蛋白质摄入与充分水合',
        '考虑蛋白质补充剂中的潜在过敏原（乳制品、大豆等）',
        '过量蛋白质摄入可能导致胃肠不适',
        '补充剂应补充而非替代全食物蛋白质来源'
      ],
      'zh-TW': [
        '監測既有腎臟疾病個體的腎功能',
        '平衡蛋白質攝入與充分水合',
        '考慮蛋白質補充劑中的潛在過敏原（乳製品、大豆等）',
        '過量蛋白質攝入可能導致胃腸不適',
        '補充劑應補充而非替代全食物蛋白質來源'
      ]
    },
    timeline: {
      'en': 'Muscular adaptations begin within 2-4 weeks of optimized protein intake, with continuing benefits throughout the rehabilitation process.',
      'zh-CN': '优化蛋白质摄入后2-4周内肌肉适应开始，在整个康复过程中持续获益。',
      'zh-TW': '優化蛋白質攝入後2-4週內肌肉適應開始，在整個康復過程中持續獲益。'
    },
    effectiveness: {
      'en': 'Research demonstrates that adequate protein supplementation can reduce muscle atrophy by 20-30% during immobilization, accelerate strength recovery, and improve overall rehabilitation outcomes.',
      'zh-CN': '研究表明，充足的蛋白质补充可在固定期间减少20-30%的肌肉萎缩，加速力量恢复，并改善整体康复结果。',
      'zh-TW': '研究表明，充足的蛋白質補充可在固定期間減少20-30%的肌肉萎縮，加速力量恢復，並改善整體康復結果。'
    },
    references: [
      {
        author: 'Wall BT, Morton JP, van Loon LJC',
        title: 'Strategies to maintain skeletal muscle mass in the injured athlete: Nutritional considerations and exercise mimetics',
        publication: 'European Journal of Sport Science',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25257770/'
      },
      {
        author: 'Tipton KD',
        title: 'Nutritional Support for Exercise-Induced Injuries',
        publication: 'Sports Medicine',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26553489/'
      }
    ]
  },
  {
    id: 'anti_inflammatory_diet',
    category: 'nutritional_support',
    titleKey: 'anti_inflammatory_diet',
    imagePath: '/images/rehab/anti-inflammatory-diet.jpg',
    description: {
      'en': 'An anti-inflammatory diet focuses on nutrient-rich foods that help control inflammation, reduce pain, and support tissue healing during rehabilitation from injuries or surgeries.',
      'zh-CN': '抗炎饮食专注于富含营养的食物，有助于控制炎症，减轻疼痛，并在伤害或手术康复期间支持组织愈合。',
      'zh-TW': '抗炎飲食專注於富含營養的食物，有助於控制炎症，減輕疼痛，並在傷害或手術康復期間支持組織癒合。'
    },
    steps: {
      'en': [
        'Emphasize omega-3 rich foods (fatty fish, flaxseeds, walnuts) to balance inflammatory response',
        'Include abundant colorful fruits and vegetables (8-10 servings daily) for antioxidants',
        'Incorporate anti-inflammatory spices like turmeric, ginger, and cinnamon',
        'Minimize processed foods, refined carbohydrates, and industrial seed oils',
        'Stay adequately hydrated with water, herbal teas, and natural broths'
      ],
      'zh-CN': [
        '强调富含omega-3的食物（肥鱼、亚麻籽、核桃）以平衡炎症反应',
        '包括丰富的彩色水果和蔬菜（每天8-10份）以获取抗氧化剂',
        '加入抗炎香料，如姜黄、生姜和肉桂',
        '减少加工食品、精制碳水化合物和工业种子油',
        '用水、草药茶和天然肉汤保持充分水分'
      ],
      'zh-TW': [
        '強調富含omega-3的食物（肥魚、亞麻籽、核桃）以平衡炎症反應',
        '包括豐富的彩色水果和蔬菜（每天8-10份）以獲取抗氧化劑',
        '加入抗炎香料，如薑黃、生薑和肉桂',
        '減少加工食品、精製碳水化合物和工業種子油',
        '用水、草藥茶和天然肉湯保持充分水分'
      ]
    },
    cautions: {
      'en': [
        'Consider individual allergies and food sensitivities when designing diet plans',
        'Consult healthcare providers before eliminating major food groups',
        'Balance anti-inflammatory approach with adequate energy intake for healing',
        'Some herbal supplements may interact with medications',
        'Modification may be needed for individuals with specific medical conditions'
      ],
      'zh-CN': [
        '设计饮食计划时考虑个人过敏和食物敏感性',
        '在消除主要食物群之前咨询医疗提供者',
        '平衡抗炎方法与愈合所需的充足能量摄入',
        '某些草药补充剂可能与药物相互作用',
        '特定医疗状况的个体可能需要调整'
      ],
      'zh-TW': [
        '設計飲食計劃時考慮個人過敏和食物敏感性',
        '在消除主要食物群之前咨詢醫療提供者',
        '平衡抗炎方法與癒合所需的充足能量攝入',
        '某些草藥補充劑可能與藥物相互作用',
        '特定醫療狀況的個體可能需要調整'
      ]
    },
    timeline: {
      'en': 'Initial effects on inflammatory markers may be observed within 2-3 weeks, while tissue healing benefits typically become noticeable after 4-8 weeks of consistent dietary adherence.',
      'zh-CN': '炎症标记物的初步影响可能在2-3周内观察到，而组织愈合益处通常在持续坚持饮食4-8周后变得明显。',
      'zh-TW': '炎症標記物的初步影響可能在2-3週內觀察到，而組織癒合益處通常在持續堅持飲食4-8週後變得明顯。'
    },
    effectiveness: {
      'en': 'Studies show anti-inflammatory diets can reduce inflammatory markers by 20-40%, decrease pain levels, and support faster return to function when combined with appropriate rehabilitation protocols.',
      'zh-CN': '研究表明，抗炎饮食可减少20-40%的炎症标记物，降低疼痛水平，并在与适当康复方案结合时支持更快的功能恢复。',
      'zh-TW': '研究表明，抗炎飲食可減少20-40%的炎症標記物，降低疼痛水平，並在與適當康復方案結合時支持更快的功能恢復。'
    },
    references: [
      {
        author: 'Ricker MA, Haas WC',
        title: 'Anti-inflammatory diet in clinical practice: A review',
        publication: 'Nutrition in Clinical Practice',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28350517/'
      },
      {
        author: 'Bonaccio M, Pounis G, Cerletti C, et al.',
        title: 'Mediterranean diet, dietary polyphenols and low grade inflammation: results from the MOLI-SANI study',
        publication: 'British Journal of Clinical Pharmacology',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26935858/'
      }
    ]
  }
]; 
  author: string;
  title: string;
  publication: string;
  year: string;
  url?: string;
}

export interface RehabMethod {
  id: string;
  category: string;
  titleKey: string;
  imagePath?: string;
  description: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  steps: {
    'en': string[];
    'zh-CN': string[];
    'zh-TW': string[];
  };
  cautions: {
    'en': string[];
    'zh-CN': string[];
    'zh-TW': string[];
  };
  timeline: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  effectiveness: {
    'en': string;
    'zh-CN': string;
    'zh-TW': string;
  };
  references: Reference[];
}

export interface RehabCategory {
  id: string;
  icon: string;
}

export const rehabCategories: RehabCategory[] = [
  {
    id: 'exercise_therapy',
    icon: 'dumbbell'
  },
  {
    id: 'physical_therapy',
    icon: 'hand-holding-medical'
  },
  {
    id: 'therapeutic_equipment',
    icon: 'toolbox'
  },
  {
    id: 'nutritional_support',
    icon: 'apple-alt'
  }
];

export const rehabMethods: RehabMethod[] = [
  {
    id: 'proprioceptive_training',
    category: 'exercise_therapy',
    titleKey: 'proprioceptive_training',
    imagePath: '/images/rehab/proprioceptive-training.jpg',
    description: {
      'en': 'Proprioceptive training focuses on improving the body\'s ability to sense its position in space, enhancing joint stability and coordination.',
      'zh-CN': '本体感觉训练专注于提高身体感知空间位置的能力，增强关节稳定性和协调性。',
      'zh-TW': '本體感覺訓練專注於提高身體感知空間位置的能力，增強關節穩定性和協調性。'
    },
    steps: {
      'en': [
        'Start with basic balance exercises, such as standing on one leg',
        'Progress to using unstable surfaces like balance boards or foam pads',
        'Incorporate functional movements like squats or lunges on unstable surfaces',
        'Add dynamic movements such as catching and throwing while maintaining balance',
        'Gradually increase difficulty by closing eyes or adding resistance'
      ],
      'zh-CN': [
        '从基本平衡练习开始，如单腿站立',
        '进阶到使用不稳定表面，如平衡板或泡沫垫',
        '在不稳定表面上加入功能性动作，如深蹲或弓步',
        '加入动态动作，如在保持平衡的同时接球和投球',
        '通过闭眼或增加阻力逐渐增加难度'
      ],
      'zh-TW': [
        '從基本平衡練習開始，如單腿站立',
        '進階到使用不穩定表面，如平衡板或泡沫墊',
        '在不穩定表面上加入功能性動作，如深蹲或弓步',
        '加入動態動作，如在保持平衡的同時接球和投球',
        '通過閉眼或增加阻力逐漸增加難度'
      ]
    },
    cautions: {
      'en': [
        'Ensure proper supervision initially, especially for older adults or those with balance issues',
        'Progress gradually to avoid falls or injuries',
        'May not be suitable for individuals with vestibular disorders without medical clearance',
        'Discontinue if experiencing dizziness or increased pain'
      ],
      'zh-CN': [
        '确保初期有适当的监督，特别是对于老年人或平衡问题的人',
        '逐渐进阶以避免跌倒或受伤',
        '未经医疗许可，可能不适合前庭功能障碍的个体',
        '如果出现头晕或疼痛加剧，应停止训练'
      ],
      'zh-TW': [
        '確保初期有適當的監督，特別是對於老年人或平衡問題的人',
        '逐漸進階以避免跌倒或受傷',
        '未經醫療許可，可能不適合前庭功能障礙的個體',
        '如果出現頭暈或疼痛加劇，應停止訓練'
      ]
    },
    timeline: {
      'en': 'Improvements typically begin within 2-4 weeks of consistent training, with significant gains observed after 6-8 weeks.',
      'zh-CN': '在持续训练2-4周内通常开始出现改善，6-8周后观察到显著提升。',
      'zh-TW': '在持續訓練2-4週內通常開始出現改善，6-8週後觀察到顯著提升。'
    },
    effectiveness: {
      'en': 'Strong evidence supports proprioceptive training for reducing ankle sprain recurrence (by up to 50%) and improving functional outcomes following joint injuries.',
      'zh-CN': '有力证据支持本体感觉训练可减少踝关节扭伤复发（高达50%）并改善关节损伤后的功能结果。',
      'zh-TW': '有力證據支持本體感覺訓練可減少踝關節扭傷復發（高達50%）並改善關節損傷後的功能結果。'
    },
    references: [
      {
        author: 'Riva D, et al.',
        title: 'Proprioceptive training and injury prevention in a professional men\'s basketball team: A six-year prospective study',
        publication: 'Journal of Strength and Conditioning Research',
        year: '2016',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26473518/'
      },
      {
        author: 'Schiftan GS, Ross LA, Hahne AJ',
        title: 'The effectiveness of proprioceptive training in preventing ankle sprains in sporting populations: a systematic review and meta-analysis',
        publication: 'Journal of Science and Medicine in Sport',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24831756/'
      }
    ]
  },
  {
    id: 'blood_flow_restriction',
    category: 'therapeutic_equipment',
    titleKey: 'blood_flow_restriction',
    imagePath: '/images/rehab/blood-flow-restriction.jpg',
    description: {
      'en': 'Blood Flow Restriction (BFR) training involves applying pressure to limbs during exercise to partially restrict blood flow, allowing strength and muscle gains with lower weight loads.',
      'zh-CN': '血流限制训练(BFR)涉及在运动过程中对肢体施加压力以部分限制血流，允许使用较低重量负荷获得力量和肌肉增长。',
      'zh-TW': '血流限制訓練(BFR)涉及在運動過程中對肢體施加壓力以部分限制血流，允許使用較低重量負荷獲得力量和肌肉增長。'
    },
    steps: {
      'en': [
        'Apply specialized tourniquet cuffs or bands to the proximal portion of limbs',
        'Inflate to a personalized pressure (typically 40-80% of arterial occlusion pressure)',
        'Perform exercises at 20-30% of one-repetition maximum',
        'Complete 3-4 sets with 15-30 repetitions and short rest periods (30-60 seconds)',
        'Limit sessions to 15-20 minutes and remove bands immediately after completion'
      ],
      'zh-CN': [
        '将专用止血带或绑带应用于肢体近端部分',
        '充气至个性化压力（通常为动脉闭塞压力的40-80%）',
        '以最大单次重复的20-30%进行锻炼',
        '完成3-4组，每组15-30次重复，休息时间短（30-60秒）',
        '将训练时间限制在15-20分钟，完成后立即移除绑带'
      ],
      'zh-TW': [
        '將專用止血帶或綁帶應用於肢體近端部分',
        '充氣至個性化壓力（通常為動脈閉塞壓力的40-80%）',
        '以最大單次重複的20-30%進行鍛煉',
        '完成3-4組，每組15-30次重複，休息時間短（30-60秒）',
        '將訓練時間限制在15-20分鐘，完成後立即移除綁帶'
      ]
    },
    cautions: {
      'en': [
        'Should be performed under professional supervision, especially initially',
        'Contraindicated for individuals with cardiovascular conditions, hypertension, venous thromboembolism, or circulatory disorders',
        'Not recommended during pregnancy or for those with active infections or cancer',
        'May cause discomfort and bruising, which should be monitored',
        'Specialized equipment and proper pressure application are essential for safety'
      ],
      'zh-CN': [
        '应在专业监督下进行，尤其是初期',
        '心血管疾病、高血压、静脉血栓栓塞或循环系统疾病的个体禁用',
        '怀孕期间或有活动性感染或癌症的人群不推荐使用',
        '可能导致不适和瘀伤，应予以监控',
        '安全性依赖于专业设备和正确的压力应用'
      ],
      'zh-TW': [
        '應在專業監督下進行，尤其是初期',
        '心血管疾病、高血壓、靜脈血栓栓塞或循環系統疾病的個體禁用',
        '懷孕期間或有活動性感染或癌症的人群不推薦使用',
        '可能導致不適和瘀傷，應予以監控',
        '安全性依賴於專業設備和正確的壓力應用'
      ]
    },
    timeline: {
      'en': 'Hypertrophic responses can be seen within 2-3 weeks, with strength improvements typically following within 4-6 weeks of consistent training.',
      'zh-CN': '在2-3周内可以观察到肌肉肥大反应，在持续训练4-6周内通常会出现力量提升。',
      'zh-TW': '在2-3週內可以觀察到肌肉肥大反應，在持續訓練4-6週內通常會出現力量提升。'
    },
    effectiveness: {
      'en': 'Research indicates BFR can produce comparable muscle hypertrophy to high-load training while using only 20-30% of maximum loads, making it valuable for rehabilitation scenarios where heavy loading is contraindicated.',
      'zh-CN': '研究表明，血流限制训练只使用最大负荷的20-30%，就能产生与高负荷训练相当的肌肉肥大效果，这使其在禁用重负荷的康复场景中具有价值。',
      'zh-TW': '研究表明，血流限制訓練只使用最大負荷的20-30%，就能產生與高負荷訓練相當的肌肉肥大效果，這使其在禁用重負荷的康復場景中具有價值。'
    },
    references: [
      {
        author: 'Hughes L, Paton B, Rosenblatt B, Gissane C, Patterson SD',
        title: 'Blood flow restriction training in clinical musculoskeletal rehabilitation: a systematic review and meta-analysis',
        publication: 'British Journal of Sports Medicine',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28259850/'
      },
      {
        author: 'Centner C, Wiegel P, Gollhofer A, König D',
        title: 'Effects of Blood Flow Restriction Training on Muscular Strength and Hypertrophy in Older Individuals: A Systematic Review and Meta-Analysis',
        publication: 'Sports Medicine',
        year: '2019',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30838520/'
      }
    ]
  },
  {
    id: 'nmes',
    category: 'therapeutic_equipment',
    titleKey: 'nmes',
    imagePath: '/images/rehab/nmes.jpg',
    description: {
      'en': 'Neuromuscular Electrical Stimulation (NMES) uses electrical impulses to stimulate muscle contractions, helping to prevent atrophy and improve strength when voluntary contraction is limited or painful.',
      'zh-CN': '神经肌肉电刺激(NMES)使用电脉冲刺激肌肉收缩，在自主收缩受限或疼痛时有助于防止肌肉萎缩并提高力量。',
      'zh-TW': '神經肌肉電刺激(NMES)使用電脈衝刺激肌肉收縮，在自主收縮受限或疼痛時有助於防止肌肉萎縮並提高力量。'
    },
    steps: {
      'en': [
        'Position electrodes over target muscle groups following clinician guidance',
        'Start with low intensity and gradually increase to tolerance',
        'Set appropriate pulse width (typically 200-400 microseconds) and frequency (20-50 Hz for strength)',
        'Use duty cycles of 10-15 seconds on, 50-120 seconds off',
        'Complete treatment sessions of 15-60 minutes, 3-5 times per week'
      ],
      'zh-CN': [
        '按照临床医生指导将电极放置在目标肌肉群上',
        '从低强度开始，逐渐增加到耐受水平',
        '设置适当的脉冲宽度（通常为200-400微秒）和频率（力量训练为20-50 Hz）',
        '使用10-15秒开启，50-120秒关闭的工作周期',
        '完成15-60分钟的治疗课程，每周3-5次'
      ],
      'zh-TW': [
        '按照臨床醫生指導將電極放置在目標肌肉群上',
        '從低強度開始，逐漸增加到耐受水平',
        '設置適當的脈衝寬度（通常為200-400微秒）和頻率（力量訓練為20-50 Hz）',
        '使用10-15秒開啟，50-120秒關閉的工作週期',
        '完成15-60分鐘的治療課程，每週3-5次'
      ]
    },
    cautions: {
      'en': [
        'Contraindicated for individuals with cardiac pacemakers or implanted electronic devices',
        'Should not be used over areas with metal implants, cancerous lesions, or active infections',
        'Avoid application over the anterior neck, eyes, or carotid sinus regions',
        'Not recommended during pregnancy unless specifically prescribed',
        'Must be properly guided by healthcare professionals, especially for initial parameter setting'
      ],
      'zh-CN': [
        '心脏起搏器或植入电子设备的个体禁用',
        '不应在金属植入物、癌性病变或活动性感染区域使用',
        '避免应用于前颈部、眼睛或颈动脉窦区域',
        '除非特别处方，否则不建议在怀孕期间使用',
        '必须由医疗专业人员正确指导，特别是初始参数设置'
      ],
      'zh-TW': [
        '心臟起搏器或植入電子設備的個體禁用',
        '不應在金屬植入物、癌性病變或活動性感染區域使用',
        '避免應用於前頸部、眼睛或頸動脈竇區域',
        '除非特別處方，否則不建議在懷孕期間使用',
        '必須由醫療專業人員正確指導，特別是初始參數設置'
      ]
    },
    timeline: {
      'en': 'Muscle activation improvements can be observed within days, while strength gains typically require 4-6 weeks of consistent application.',
      'zh-CN': '肌肉激活改善可在数天内观察到，而力量增益通常需要4-6周的持续应用。',
      'zh-TW': '肌肉激活改善可在數天內觀察到，而力量增益通常需要4-6週的持續應用。'
    },
    effectiveness: {
      'en': 'Strong evidence supports NMES for reducing quadriceps weakness following knee surgery and for maintaining muscle mass during immobilization periods. It is particularly effective when combined with voluntary exercise when possible.',
      'zh-CN': '有力证据支持神经肌肉电刺激可减轻膝关节手术后的股四头肌无力，并在固定期间维持肌肉质量。在可能的情况下，与自主运动相结合时特别有效。',
      'zh-TW': '有力證據支持神經肌肉電刺激可減輕膝關節手術後的股四頭肌無力，並在固定期間維持肌肉質量。在可能的情況下，與自主運動相結合時特別有效。'
    },
    references: [
      {
        author: 'Maffiuletti NA, Gondin J, Place N, Stevens-Lapsley J, Vivodtzev I, Minetto MA',
        title: 'Clinical use of neuromuscular electrical stimulation for neuromuscular rehabilitation: what are we overlooking?',
        publication: 'Archives of Physical Medicine and Rehabilitation',
        year: '2018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29505744/'
      },
      {
        author: 'Hauger AV, Reiman MP, Bjordal JM, Sheets C, Ledbetter L, Goode AP',
        title: 'Neuromuscular electrical stimulation is effective in strengthening the quadriceps muscle after anterior cruciate ligament surgery',
        publication: 'Knee Surgery, Sports Traumatology, Arthroscopy',
        year: '2018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28161737/'
      }
    ]
  },
  {
    id: 'eccentric_training',
    category: 'exercise_therapy',
    titleKey: 'eccentric_training',
    imagePath: '/images/rehab/eccentric-training.jpg',
    description: {
      'en': 'Eccentric training focuses on the lengthening phase of muscle contraction under tension, which has been shown to be particularly effective for tendon rehabilitation and improving muscle strength.',
      'zh-CN': '离心训练专注于肌肉在张力下的伸长收缩阶段，这已被证明对肌腱康复和提高肌肉力量特别有效。',
      'zh-TW': '離心訓練專注於肌肉在張力下的伸長收縮階段，這已被證明對肌腱康復和提高肌肉力量特別有效。'
    },
    steps: {
      'en': [
        'Begin with a lighter load than used for concentric exercises',
        'Perform the eccentric (lowering) phase slowly, taking 3-5 seconds',
        'Use assistance or the other limb for the concentric (lifting) phase if needed',
        'Start with 3 sets of 10-15 repetitions, 2-3 times per week',
        'Gradually increase load rather than repetitions as strength improves'
      ],
      'zh-CN': [
        '从比向心运动更轻的负荷开始',
        '慢慢进行离心（下降）阶段，花费3-5秒',
        '如有需要，在向心（提升）阶段使用辅助或另一肢体',
        '开始时每组10-15次重复，每周2-3次，共3组',
        '随着力量提高，逐渐增加负荷而非重复次数'
      ],
      'zh-TW': [
        '從比向心運動更輕的負荷開始',
        '慢慢進行離心（下降）階段，花費3-5秒',
        '如有需要，在向心（提升）階段使用輔助或另一肢體',
        '開始時每組10-15次重複，每週2-3次，共3組',
        '隨著力量提高，逐漸增加負荷而非重複次數'
      ]
    },
    cautions: {
      'en': [
        'May cause increased muscle soreness, especially initially',
        'Not appropriate during acute inflammation phases',
        'Should be avoided or modified for individuals with uncontrolled cardiovascular conditions',
        'Progress load gradually to prevent overloading tendons',
        'Technique is crucial - maintain proper alignment and control throughout movements'
      ],
      'zh-CN': [
        '可能导致肌肉酸痛增加，特别是初期',
        '急性炎症阶段不适用',
        '对于心血管疾病失控的个体，应避免或修改',
        '逐渐增加负荷以防止肌腱过载',
        '技术至关重要 - 在整个动作过程中保持适当的对齐和控制'
      ],
      'zh-TW': [
        '可能導致肌肉酸痛增加，特別是初期',
        '急性炎症階段不適用',
        '對於心血管疾病失控的個體，應避免或修改',
        '逐漸增加負荷以防止肌腱過載',
        '技術至關重要 - 在整個動作過程中保持適當的對齊和控制'
      ]
    },
    timeline: {
      'en': 'Initial pain reduction may occur within 2-4 weeks, while significant tendon remodeling and strength improvements typically require 8-12 weeks.',
      'zh-CN': '初期疼痛减轻可能在2-4周内发生，而显著的肌腱重塑和力量提升通常需要8-12周。',
      'zh-TW': '初期疼痛減輕可能在2-4週內發生，而顯著的肌腱重塑和力量提升通常需要8-12週。'
    },
    effectiveness: {
      'en': 'Strong evidence supports eccentric training for the treatment of tendinopathies, particularly Achilles and patellar tendinopathy. Studies show 60-90% success rates for reducing pain and improving function.',
      'zh-CN': '有力证据支持离心训练用于肌腱病的治疗，特别是跟腱和髌腱病。研究显示，在减轻疼痛和改善功能方面，成功率为60-90%。',
      'zh-TW': '有力證據支持離心訓練用於肌腱病的治療，特別是跟腱和髕腱病。研究顯示，在減輕疼痛和改善功能方面，成功率為60-90%。'
    },
    references: [
      {
        author: 'Beyer R, Kongsgaard M, Hougs Kjær B, Øhlenschlæger T, Kjær M, Magnusson SP',
        title: 'Heavy Slow Resistance Versus Eccentric Training as Treatment for Achilles Tendinopathy: A Randomized Controlled Trial',
        publication: 'American Journal of Sports Medicine',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26018970/'
      },
      {
        author: 'Malliaras P, Barton CJ, Reeves ND, Langberg H',
        title: 'Achilles and patellar tendinopathy loading programmes: a systematic review comparing clinical outcomes and identifying potential mechanisms for effectiveness',
        publication: 'Sports Medicine',
        year: '2013',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23494258/'
      }
    ]
  },
  {
    id: 'manual_therapy',
    category: 'physical_therapy',
    titleKey: 'manual_therapy',
    imagePath: '/images/rehab/manual-therapy.jpg',
    description: {
      'en': 'Manual therapy involves skilled hands-on techniques applied by trained therapists to mobilize joints, reduce muscle tension, and improve tissue mobility, enhancing healing and restoring function.',
      'zh-CN': '手法治疗包括由训练有素的治疗师应用熟练的手法技术，用于关节松动、减轻肌肉紧张和改善组织活动度，促进愈合并恢复功能。',
      'zh-TW': '手法治療包括由訓練有素的治療師應用熟練的手法技術，用於關節鬆動、減輕肌肉緊張和改善組織活動度，促進癒合並恢復功能。'
    },
    steps: {
      'en': [
        'Thorough assessment to identify movement restrictions and tissue dysfunction',
        'Application of specific hands-on techniques tailored to patient needs',
        'May include joint mobilization, manipulation, soft tissue mobilization, and myofascial release',
        'Often combined with therapeutic exercises for optimal outcomes',
        'Usually performed 1-3 times per week for 3-6 weeks'
      ],
      'zh-CN': [
        '彻底评估以确定运动限制和组织功能障碍',
        '应用根据患者需求定制的特定手法技术',
        '可能包括关节松动、整脊、软组织松动和筋膜释放',
        '通常与治疗性运动相结合以获得最佳效果',
        '通常每周进行1-3次，持续3-6周'
      ],
      'zh-TW': [
        '徹底評估以確定運動限制和組織功能障礙',
        '應用根據患者需求定制的特定手法技術',
        '可能包括關節鬆動、整脊、軟組織鬆動和筋膜釋放',
        '通常與治療性運動相結合以獲得最佳效果',
        '通常每週進行1-3次，持續3-6週'
      ]
    },
    cautions: {
      'en': [
        'Should be performed only by qualified healthcare professionals with specific training',
        'Contraindicated in cases of fracture, inflammatory arthritis, malignancy, or vascular compromise',
        'Techniques must be modified based on patient condition and tissue irritability',
        'Some techniques may cause temporary soreness or discomfort',
        'High-velocity techniques should be avoided in patients with osteoporosis, vertigo, or certain spinal conditions'
      ],
      'zh-CN': [
        '应仅由接受过特定训练的合格医疗专业人员执行',
        '骨折、炎性关节炎、恶性肿瘤或血管损伤等情况禁用',
        '必须根据患者状况和组织刺激性修改技术',
        '某些技术可能导致暂时性酸痛或不适',
        '骨质疏松、眩晕或某些脊柱疾病患者应避免高速技术'
      ],
      'zh-TW': [
        '應僅由接受過特定訓練的合格醫療專業人員執行',
        '骨折、炎性關節炎、惡性腫瘤或血管損傷等情況禁用',
        '必須根據患者狀況和組織刺激性修改技術',
        '某些技術可能導致暫時性酸痛或不適',
        '骨質疏鬆、眩暈或某些脊柱疾病患者應避免高速技術'
      ]
    },
    timeline: {
      'en': 'Pain reduction often occurs within 1-3 sessions, while functional improvements typically develop over 2-6 weeks of treatment.',
      'zh-CN': '疼痛减轻通常在1-3次治疗后出现，而功能改善通常在2-6周的治疗过程中逐渐发展。',
      'zh-TW': '疼痛減輕通常在1-3次治療後出現，而功能改善通常在2-6週的治療過程中逐漸發展。'
    },
    effectiveness: {
      'en': 'Research supports the effectiveness of manual therapy for reducing pain and improving function in a variety of musculoskeletal conditions, particularly when combined with exercise therapy.',
      'zh-CN': '研究支持手法治疗在减轻各种肌肉骨骼疾病的疼痛和改善功能方面的有效性，特别是当与运动疗法相结合时。',
      'zh-TW': '研究支持手法治療在減輕各種肌肉骨骼疾病的疼痛和改善功能方面的有效性，特別是當與運動療法相結合時。'
    },
    references: [
      {
        author: 'Deyle GD, Allison SC, Matekel RL, et al.',
        title: 'Physical therapy treatment effectiveness for osteoarthritis of the knee: A randomized comparison of supervised clinical exercise and manual therapy procedures versus a home exercise program',
        publication: 'Physical Therapy',
        year: '2005',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16305269/'
      },
      {
        author: 'Gross A, Langevin P, Burnie SJ, et al.',
        title: 'Manipulation and mobilisation for neck pain contrasted against an inactive control or another active treatment',
        publication: 'Cochrane Database of Systematic Reviews',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26397370/'
      }
    ]
  },
  {
    id: 'therapeutic_ultrasound',
    category: 'physical_therapy',
    titleKey: 'therapeutic_ultrasound',
    imagePath: '/images/rehab/therapeutic-ultrasound.jpg',
    description: {
      'en': 'Therapeutic ultrasound uses high-frequency sound waves to generate deep heat in tissues, increasing blood flow, reducing pain, and enhancing the tissue healing process in injured areas.',
      'zh-CN': '治疗性超声波使用高频声波在组织中产生深层热量，增加血流量，减轻疼痛，并增强受伤区域的组织愈合过程。',
      'zh-TW': '治療性超聲波使用高頻聲波在組織中產生深層熱量，增加血流量，減輕疼痛，並增強受傷區域的組織癒合過程。'
    },
    steps: {
      'en': [
        'Patient positioned comfortably with the target area exposed',
        'Conductive gel applied to ensure proper sound wave transmission',
        'Ultrasound head moved slowly and continuously over the treatment area',
        'Typical treatment parameters: 0.5-2.0 W/cm² intensity for 5-10 minutes',
        'Treatments usually administered 2-3 times per week for 2-4 weeks'
      ],
      'zh-CN': [
        '患者舒适定位，暴露目标区域',
        '涂抹导电凝胶以确保正确的声波传输',
        '超声波探头在治疗区域缓慢连续移动',
        '典型治疗参数：0.5-2.0 W/cm²强度，5-10分钟',
        '通常每周接受2-3次治疗，持续2-4周'
      ],
      'zh-TW': [
        '患者舒適定位，暴露目標區域',
        '塗抹導電凝膠以確保正確的聲波傳輸',
        '超聲波探頭在治療區域緩慢連續移動',
        '典型治療參數：0.5-2.0 W/cm²強度，5-10分鐘',
        '通常每週接受2-3次治療，持續2-4週'
      ]
    },
    cautions: {
      'en': [
        'Contraindicated over areas with malignancy, acute infection, or impaired sensation',
        'Should not be used over metal implants, pacemakers, or growth plates in children',
        'Avoid application over the eyes, heart, reproductive organs, or spinal cord',
        'Thermal mode not recommended for acute injuries (first 24-48 hours)',
        'Should be administered only by trained healthcare professionals'
      ],
      'zh-CN': [
        '禁止在恶性肿瘤、急性感染或感觉障碍区域使用',
        '不应在金属植入物、起搏器或儿童生长板上使用',
        '避免在眼睛、心脏、生殖器官或脊髓上使用',
        '急性损伤（前24-48小时）不建议使用热模式',
        '只能由受过训练的医疗专业人员使用'
      ],
      'zh-TW': [
        '禁止在惡性腫瘤、急性感染或感覺障礙區域使用',
        '不應在金屬植入物、起搏器或兒童生長板上使用',
        '避免在眼睛、心臟、生殖器官或脊髓上使用',
        '急性損傷（前24-48小時）不建議使用熱模式',
        '只能由受過訓練的醫療專業人員使用'
      ]
    },
    timeline: {
      'en': 'Pain reduction may be observed after 1-3 sessions, while tissue healing effects typically require 6-12 sessions over 3-6 weeks.',
      'zh-CN': '疼痛减轻可能在1-3次治疗后观察到，而组织愈合效果通常需要3-6周内的6-12次治疗。',
      'zh-TW': '疼痛減輕可能在1-3次治療後觀察到，而組織癒合效果通常需要3-6週內的6-12次治療。'
    },
    effectiveness: {
      'en': 'Evidence supports ultrasound effectiveness for treating specific conditions including plantar fasciitis, carpal tunnel syndrome, and certain types of tendinopathies, particularly when combined with other therapies.',
      'zh-CN': '证据支持超声波治疗特定疾病的有效性，包括足底筋膜炎、腕管综合症和某些类型的肌腱病，特别是与其他疗法结合时。',
      'zh-TW': '證據支持超聲波治療特定疾病的有效性，包括足底筋膜炎、腕管綜合症和某些類型的肌腱病，特別是與其他療法結合時。'
    },
    references: [
      {
        author: 'Ebenbichler GR, Resch KL, Nicolakis P, et al.',
        title: 'Ultrasound treatment for treating the carpal tunnel syndrome: randomised "sham" controlled trial',
        publication: 'BMJ',
        year: '1998',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9492683/'
      },
      {
        author: 'Draper DO, Pitsillides E',
        title: 'Therapeutic Ultrasound: Current Perspectives, Trends, and Techniques',
        publication: 'Athletic Training & Sports Health Care',
        year: '2021',
        url: 'https://journals.healio.com/doi/10.3928/19425864-20210429-01'
      }
    ]
  },
  {
    id: 'protein_supplementation',
    category: 'nutritional_support',
    titleKey: 'protein_supplementation',
    imagePath: '/images/rehab/protein-supplementation.jpg',
    description: {
      'en': 'Protein supplementation provides essential amino acids that enhance muscle repair and growth during rehabilitation, helping to prevent atrophy and accelerate recovery from injury or surgery.',
      'zh-CN': '蛋白质补充提供必需氨基酸，在康复期间增强肌肉修复和生长，帮助防止肌肉萎缩并加速从伤害或手术中恢复。',
      'zh-TW': '蛋白質補充提供必需氨基酸，在康復期間增強肌肉修復和生長，幫助防止肌肉萎縮並加速從傷害或手術中恢復。'
    },
    steps: {
      'en': [
        'Assess baseline protein intake through dietary analysis',
        'Calculate individual protein needs based on body weight, injury severity, and activity level (typically 1.6-2.2g/kg/day for injured athletes)',
        'Choose high-quality protein sources with complete amino acid profiles',
        'Distribute protein intake throughout the day (20-40g per meal/snack)',
        'Time protein intake strategically around rehabilitation exercises (within 30 minutes post-exercise)'
      ],
      'zh-CN': [
        '通过饮食分析评估基线蛋白质摄入量',
        '根据体重、伤害严重程度和活动水平计算个人蛋白质需求（受伤运动员通常为1.6-2.2g/kg/天）',
        '选择具有完整氨基酸谱的高质量蛋白质来源',
        '全天分配蛋白质摄入（每餐/零食20-40g）',
        '在康复练习周围战略性地安排蛋白质摄入时间（运动后30分钟内）'
      ],
      'zh-TW': [
        '通過飲食分析評估基線蛋白質攝入量',
        '根據體重、傷害嚴重程度和活動水平計算個人蛋白質需求（受傷運動員通常為1.6-2.2g/kg/天）',
        '選擇具有完整氨基酸譜的高質量蛋白質來源',
        '全天分配蛋白質攝入（每餐/零食20-40g）',
        '在康復練習周圍戰略性地安排蛋白質攝入時間（運動後30分鐘內）'
      ]
    },
    cautions: {
      'en': [
        'Monitor kidney function in individuals with pre-existing renal conditions',
        'Balance protein intake with adequate hydration',
        'Consider potential allergens in protein supplements (dairy, soy, etc.)',
        'Excessive protein intake may cause gastrointestinal discomfort',
        'Supplements should complement, not replace, whole food protein sources'
      ],
      'zh-CN': [
        '监测既有肾脏疾病个体的肾功能',
        '平衡蛋白质摄入与充分水合',
        '考虑蛋白质补充剂中的潜在过敏原（乳制品、大豆等）',
        '过量蛋白质摄入可能导致胃肠不适',
        '补充剂应补充而非替代全食物蛋白质来源'
      ],
      'zh-TW': [
        '監測既有腎臟疾病個體的腎功能',
        '平衡蛋白質攝入與充分水合',
        '考慮蛋白質補充劑中的潛在過敏原（乳製品、大豆等）',
        '過量蛋白質攝入可能導致胃腸不適',
        '補充劑應補充而非替代全食物蛋白質來源'
      ]
    },
    timeline: {
      'en': 'Muscular adaptations begin within 2-4 weeks of optimized protein intake, with continuing benefits throughout the rehabilitation process.',
      'zh-CN': '优化蛋白质摄入后2-4周内肌肉适应开始，在整个康复过程中持续获益。',
      'zh-TW': '優化蛋白質攝入後2-4週內肌肉適應開始，在整個康復過程中持續獲益。'
    },
    effectiveness: {
      'en': 'Research demonstrates that adequate protein supplementation can reduce muscle atrophy by 20-30% during immobilization, accelerate strength recovery, and improve overall rehabilitation outcomes.',
      'zh-CN': '研究表明，充足的蛋白质补充可在固定期间减少20-30%的肌肉萎缩，加速力量恢复，并改善整体康复结果。',
      'zh-TW': '研究表明，充足的蛋白質補充可在固定期間減少20-30%的肌肉萎縮，加速力量恢復，並改善整體康復結果。'
    },
    references: [
      {
        author: 'Wall BT, Morton JP, van Loon LJC',
        title: 'Strategies to maintain skeletal muscle mass in the injured athlete: Nutritional considerations and exercise mimetics',
        publication: 'European Journal of Sport Science',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25257770/'
      },
      {
        author: 'Tipton KD',
        title: 'Nutritional Support for Exercise-Induced Injuries',
        publication: 'Sports Medicine',
        year: '2015',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26553489/'
      }
    ]
  },
  {
    id: 'anti_inflammatory_diet',
    category: 'nutritional_support',
    titleKey: 'anti_inflammatory_diet',
    imagePath: '/images/rehab/anti-inflammatory-diet.jpg',
    description: {
      'en': 'An anti-inflammatory diet focuses on nutrient-rich foods that help control inflammation, reduce pain, and support tissue healing during rehabilitation from injuries or surgeries.',
      'zh-CN': '抗炎饮食专注于富含营养的食物，有助于控制炎症，减轻疼痛，并在伤害或手术康复期间支持组织愈合。',
      'zh-TW': '抗炎飲食專注於富含營養的食物，有助於控制炎症，減輕疼痛，並在傷害或手術康復期間支持組織癒合。'
    },
    steps: {
      'en': [
        'Emphasize omega-3 rich foods (fatty fish, flaxseeds, walnuts) to balance inflammatory response',
        'Include abundant colorful fruits and vegetables (8-10 servings daily) for antioxidants',
        'Incorporate anti-inflammatory spices like turmeric, ginger, and cinnamon',
        'Minimize processed foods, refined carbohydrates, and industrial seed oils',
        'Stay adequately hydrated with water, herbal teas, and natural broths'
      ],
      'zh-CN': [
        '强调富含omega-3的食物（肥鱼、亚麻籽、核桃）以平衡炎症反应',
        '包括丰富的彩色水果和蔬菜（每天8-10份）以获取抗氧化剂',
        '加入抗炎香料，如姜黄、生姜和肉桂',
        '减少加工食品、精制碳水化合物和工业种子油',
        '用水、草药茶和天然肉汤保持充分水分'
      ],
      'zh-TW': [
        '強調富含omega-3的食物（肥魚、亞麻籽、核桃）以平衡炎症反應',
        '包括豐富的彩色水果和蔬菜（每天8-10份）以獲取抗氧化劑',
        '加入抗炎香料，如薑黃、生薑和肉桂',
        '減少加工食品、精製碳水化合物和工業種子油',
        '用水、草藥茶和天然肉湯保持充分水分'
      ]
    },
    cautions: {
      'en': [
        'Consider individual allergies and food sensitivities when designing diet plans',
        'Consult healthcare providers before eliminating major food groups',
        'Balance anti-inflammatory approach with adequate energy intake for healing',
        'Some herbal supplements may interact with medications',
        'Modification may be needed for individuals with specific medical conditions'
      ],
      'zh-CN': [
        '设计饮食计划时考虑个人过敏和食物敏感性',
        '在消除主要食物群之前咨询医疗提供者',
        '平衡抗炎方法与愈合所需的充足能量摄入',
        '某些草药补充剂可能与药物相互作用',
        '特定医疗状况的个体可能需要调整'
      ],
      'zh-TW': [
        '設計飲食計劃時考慮個人過敏和食物敏感性',
        '在消除主要食物群之前咨詢醫療提供者',
        '平衡抗炎方法與癒合所需的充足能量攝入',
        '某些草藥補充劑可能與藥物相互作用',
        '特定醫療狀況的個體可能需要調整'
      ]
    },
    timeline: {
      'en': 'Initial effects on inflammatory markers may be observed within 2-3 weeks, while tissue healing benefits typically become noticeable after 4-8 weeks of consistent dietary adherence.',
      'zh-CN': '炎症标记物的初步影响可能在2-3周内观察到，而组织愈合益处通常在持续坚持饮食4-8周后变得明显。',
      'zh-TW': '炎症標記物的初步影響可能在2-3週內觀察到，而組織癒合益處通常在持續堅持飲食4-8週後變得明顯。'
    },
    effectiveness: {
      'en': 'Studies show anti-inflammatory diets can reduce inflammatory markers by 20-40%, decrease pain levels, and support faster return to function when combined with appropriate rehabilitation protocols.',
      'zh-CN': '研究表明，抗炎饮食可减少20-40%的炎症标记物，降低疼痛水平，并在与适当康复方案结合时支持更快的功能恢复。',
      'zh-TW': '研究表明，抗炎飲食可減少20-40%的炎症標記物，降低疼痛水平，並在與適當康復方案結合時支持更快的功能恢復。'
    },
    references: [
      {
        author: 'Ricker MA, Haas WC',
        title: 'Anti-inflammatory diet in clinical practice: A review',
        publication: 'Nutrition in Clinical Practice',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28350517/'
      },
      {
        author: 'Bonaccio M, Pounis G, Cerletti C, et al.',
        title: 'Mediterranean diet, dietary polyphenols and low grade inflammation: results from the MOLI-SANI study',
        publication: 'British Journal of Clinical Pharmacology',
        year: '2017',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26935858/'
      }
    ]
  }
]; 