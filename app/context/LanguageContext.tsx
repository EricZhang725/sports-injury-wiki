'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 支持的语言
export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
];

export type Language = 'en' | 'zh-CN' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 所有翻译内容
export const translations = {
  // Common
  welcome: {
    "en": "Welcome to Sports Injury Wiki",
    "zh-CN": "欢迎来到运动损伤维基",
    "zh-TW": "歡迎來到運動損傷維基"
  },
  language: {
    "en": "Language",
    "zh-CN": "语言",
    "zh-TW": "語言"
  },
  home: {
    "en": "Home",
    "zh-CN": "首页",
    "zh-TW": "首頁"
  },
  username_or_email: {
    "en": "Username or Email",
    "zh-CN": "用户名或邮箱",
    "zh-TW": "用戶名或郵箱"
  },
  sportsInjuryWiki: {
    "en": "Sports Injury Wiki",
    "zh-CN": "运动损伤百科",
    "zh-TW": "運動損傷百科"
  },
  injuryTypes: {
    "en": "Injury Types",
    "zh-CN": "受伤类型",
    "zh-TW": "受傷類型"
  },
  rehabilitationMethods: {
    "en": "Rehabilitation Methods",
    "zh-CN": "康复方法",
    "zh-TW": "康復方法"
  },
  emergency: {
    "en": "Emergency",
    "zh-CN": "紧急情况",
    "zh-TW": "緊急情況"
  },
  symptomChecker: {
    "en": "Symptom Checker",
    "zh-CN": "症状检查器",
    "zh-TW": "症狀檢查器"
  },
  community: {
    "en": "Community",
    "zh-CN": "社区",
    "zh-TW": "社區"
  },
  contactUs: {
    "en": "Contact Us",
    "zh-CN": "联系我们",
    "zh-TW": "聯繫我們"
  },
  profile: {
    "en": "Profile",
    "zh-CN": "个人中心",
    "zh-TW": "個人中心"
  },
  adminPanel: {
    "en": "Admin Panel",
    "zh-CN": "管理后台",
    "zh-TW": "管理後台"
  },
  login: {
    "en": "Login",
    "zh-CN": "登录",
    "zh-TW": "登入"
  },
  register: {
    "en": "Register",
    "zh-CN": "注册",
    "zh-TW": "註冊"
  },
  logout: {
    "en": "Logout",
    "zh-CN": "退出登录",
    "zh-TW": "登出"
  },
  intro: {
    "en": "Your comprehensive guide to sports injuries, treatments, and prevention",
    "zh-CN": "您的全面运动损伤、治疗和预防指南",
    "zh-TW": "您的全面運動損傷、治療和預防指南"
  },
  startExploring: {
    "en": "Start Exploring",
    "zh-CN": "开始探索",
    "zh-TW": "開始探索"
  },
  emergencyHelp: {
    "en": "Emergency Help",
    "zh-CN": "紧急帮助",
    "zh-TW": "緊急幫助"
  },
  view_injuries: {
    "en": "View Injury Catalog",
    "zh-CN": "查看伤害目录",
    "zh-TW": "查看傷害目錄"
  },
  view_rehab: {
    "en": "Explore Rehabilitation",
    "zh-CN": "探索康复方法",
    "zh-TW": "探索康復方法"
  },
  why_use: {
    "en": "Why Use Sports Injury Wiki",
    "zh-CN": "为什么使用运动损伤百科",
    "zh-TW": "為什麼使用運動損傷百科"
  },
  why_use_desc: {
    "en": "Sports Injury Wiki provides reliable information for athletes, coaches, and medical professionals.",
    "zh-CN": "运动损伤百科为运动员、教练和医疗专业人士提供可靠信息。",
    "zh-TW": "運動損傷百科為運動員、教練和醫療專業人士提供可靠信息。"
  },
  feature_1_title: {
    "en": "Evidence-Based Information",
    "zh-CN": "循证医学信息",
    "zh-TW": "循證醫學信息"
  },
  feature_1_desc: {
    "en": "All information is backed by scientific research and expert consensus.",
    "zh-CN": "所有信息均由科学研究和专家共识支持。",
    "zh-TW": "所有信息均由科學研究和專家共識支持。"
  },
  feature_2_title: {
    "en": "Multilingual Resources",
    "zh-CN": "多语言资源",
    "zh-TW": "多語言資源"
  },
  feature_2_desc: {
    "en": "Access our resources in multiple languages to serve a global audience.",
    "zh-CN": "以多种语言访问我们的资源，服务全球用户。",
    "zh-TW": "以多種語言訪問我們的資源，服務全球用戶。"
  },
  feature_3_title: {
    "en": "Community Support",
    "zh-CN": "社区支持",
    "zh-TW": "社區支持"
  },
  feature_3_desc: {
    "en": "Connect with others, share experiences, and learn from experts in our community.",
    "zh-CN": "在我们的社区中与他人联系，分享经验，向专家学习。",
    "zh-TW": "在我們的社區中與他人聯繫，分享經驗，向專家學習。"
  },
  
  // Contact page translations
  contactFillAllFields: {
    "en": "Please fill in all fields",
    "zh-CN": "请填写所有字段",
    "zh-TW": "請填寫所有欄位"
  },
  contactName: {
    "en": "Name",
    "zh-CN": "姓名",
    "zh-TW": "姓名"
  },
  contactEmail: {
    "en": "Email",
    "zh-CN": "电子邮件",
    "zh-TW": "電子郵件"
  },
  contactSentFrom: {
    "en": "Sent from Sports Injury Wiki contact form",
    "zh-CN": "发送自运动伤害百科联系表单",
    "zh-TW": "發送自運動傷害百科聯繫表單"
  },
  contactSuccessMessage: {
    "en": "Message sent successfully!",
    "zh-CN": "消息发送成功！",
    "zh-TW": "消息發送成功！"
  },
  contactSending: {
    "en": "Sending...",
    "zh-CN": "发送中...",
    "zh-TW": "發送中..."
  },
  contactSend: {
    "en": "Send",
    "zh-CN": "发送",
    "zh-TW": "發送"
  },
  
  // Rehabilitation page translations
  rehabilitation: {
    "en": "Rehabilitation",
    "zh-CN": "康复",
    "zh-TW": "康復"
  },
  search_rehab: {
    "en": "Search rehabilitation methods",
    "zh-CN": "搜索康复方法",
    "zh-TW": "搜尋康復方法"
  },
  all_categories: {
    "en": "All Categories",
    "zh-CN": "所有分类",
    "zh-TW": "所有分類"
  },
  exercise_therapy: {
    "en": "Exercise Therapy",
    "zh-CN": "运动疗法",
    "zh-TW": "運動療法"
  },
  physical_therapy: {
    "en": "Physical Therapy",
    "zh-CN": "物理疗法",
    "zh-TW": "物理療法"
  },
  therapeutic_equipment: {
    "en": "Therapeutic Equipment",
    "zh-CN": "治疗设备",
    "zh-TW": "治療設備"
  },
  nutritional_support: {
    "en": "Nutritional Support",
    "zh-CN": "营养支持",
    "zh-TW": "營養支持"
  },
  proprioceptive_training: {
    "en": "Proprioceptive Training",
    "zh-CN": "本体感觉训练",
    "zh-TW": "本體感覺訓練"
  },
  blood_flow_restriction: {
    "en": "Blood Flow Restriction Training",
    "zh-CN": "血流限制训练",
    "zh-TW": "血流限制訓練"
  },
  nmes: {
    "en": "Neuromuscular Electrical Stimulation",
    "zh-CN": "神经肌肉电刺激",
    "zh-TW": "神經肌肉電刺激"
  },
  eccentric_training: {
    "en": "Eccentric Training",
    "zh-CN": "离心训练",
    "zh-TW": "離心訓練"
  },
  steps: {
    "en": "Steps",
    "zh-CN": "步骤",
    "zh-TW": "步驟"
  },
  cautions: {
    "en": "Cautions",
    "zh-CN": "注意事项",
    "zh-TW": "注意事項"
  },
  timeline: {
    "en": "Timeline",
    "zh-CN": "时间表",
    "zh-TW": "時間表"
  },
  effectiveness: {
    "en": "Effectiveness",
    "zh-CN": "有效性",
    "zh-TW": "有效性"
  },
  references: {
    "en": "References",
    "zh-CN": "参考文献",
    "zh-TW": "參考文獻"
  },
  show_more: {
    "en": "Show More",
    "zh-CN": "显示更多",
    "zh-TW": "顯示更多"
  },
  show_less: {
    "en": "Show Less",
    "zh-CN": "显示更少",
    "zh-TW": "顯示更少"
  },
  image_not_found: {
    "en": "Image not found",
    "zh-CN": "找不到图片",
    "zh-TW": "找不到圖片"
  },
  image_not_available: {
    "en": "Image not available",
    "zh-CN": "图片不可用",
    "zh-TW": "圖片不可用"
  },
  click_for_details: {
    "en": "Click for details",
    "zh-CN": "点击查看详情",
    "zh-TW": "點擊查看詳情"
  },
  clear_filters: {
    "en": "Clear filters",
    "zh-CN": "清除筛选条件",
    "zh-TW": "清除篩選條件"
  },
  manual_therapy: {
    "en": "Manual Therapy",
    "zh-CN": "手法治疗",
    "zh-TW": "手法治療"
  },
  therapeutic_ultrasound: {
    "en": "Therapeutic Ultrasound",
    "zh-CN": "治疗性超声波",
    "zh-TW": "治療性超聲波"
  },
  protein_supplementation: {
    "en": "Protein Supplementation",
    "zh-CN": "蛋白质补充",
    "zh-TW": "蛋白質補充"
  },
  anti_inflammatory_diet: {
    "en": "Anti-inflammatory Diet",
    "zh-CN": "抗炎饮食",
    "zh-TW": "抗炎飲食"
  },
  
  // Login page translations
  login_title: {
    "en": "Login to Your Account",
    "zh-CN": "登录您的账户",
    "zh-TW": "登入您的帳戶"
  },
  password: {
    "en": "Password",
    "zh-CN": "密码",
    "zh-TW": "密碼"
  },
  login_button: {
    "en": "Login",
    "zh-CN": "登录",
    "zh-TW": "登入"
  },
  login_error: {
    "en": "Login failed, please try again",
    "zh-CN": "登录失败，请重试",
    "zh-TW": "登入失敗，請重試"
  },
  
  // 错误页面
  failed_to_fetch_posts: {
    "en": "Failed to fetch posts",
    "zh-CN": "获取帖子失败",
    "zh-TW": "獲取帖子失敗"
  },
  your_posts: {
    "en": "Your Posts",
    "zh-CN": "您的帖子",
    "zh-TW": "您的帖子"
  },
  no_posts_yet: {
    "en": "You have not created any posts yet",
    "zh-CN": "您还没有创建任何帖子",
    "zh-TW": "您還沒有創建任何帖子"
  },
  
  // Login and Register page translations 
  login_subtitle: {
    "en": "Sign in to your account",
    "zh-CN": "登录您的账户",
    "zh-TW": "登入您的帳戶"
  },
  password_label: {
    "en": "Password",
    "zh-CN": "密码",
    "zh-TW": "密碼"
  },
  logging_in: {
    "en": "Signing in...",
    "zh-CN": "登录中...",
    "zh-TW": "登入中..."
  },
  need_account: {
    "en": "Need an account? Register",
    "zh-CN": "需要账号？去注册",
    "zh-TW": "需要帳號？去註冊"
  },
  already_registered: {
    "en": "Already have an account? Log in",
    "zh-CN": "已有账号？去登录",
    "zh-TW": "已有帳號？去登入"
  },
  invalid_credentials: {
    "en": "Invalid username or password",
    "zh-CN": "用户名或密码无效",
    "zh-TW": "用戶名或密碼無效"
  },
  all_fields_required: {
    "en": "All fields are required",
    "zh-CN": "所有字段都是必填的",
    "zh-TW": "所有欄位都是必填的"
  },
  connection_error: {
    "en": "Could not connect to authentication server. Please check your network connection and try again.",
    "zh-CN": "无法连接到认证服务器。请检查您的网络连接后重试。",
    "zh-TW": "無法連接到認證服務器。請檢查您的網絡連接後重試。"
  },
  
  // Registration related translations
  registering: {
    "en": "Registering...",
    "zh-CN": "注册中...",
    "zh-TW": "註冊中..."
  },
  registration_success: {
    "en": "Registration successful! Redirecting to login...",
    "zh-CN": "注册成功！正在重定向到登录页面...",
    "zh-TW": "註冊成功！正在重定向到登入頁面..."
  },
  registration_failed: {
    "en": "Registration failed",
    "zh-CN": "注册失败",
    "zh-TW": "註冊失敗"
  },
  registration_error: {
    "en": "An error occurred during registration",
    "zh-CN": "注册过程中发生错误",
    "zh-TW": "註冊過程中發生錯誤"
  },
  username: {
    "en": "Username",
    "zh-CN": "用户名",
    "zh-TW": "用戶名"
  },
  email_label: {
    "en": "Email",
    "zh-CN": "电子邮件",
    "zh-TW": "電子郵件"
  },
  admin_code: {
    "en": "Admin Code",
    "zh-CN": "管理员代码",
    "zh-TW": "管理員代碼"
  },
  optional: {
    "en": "optional",
    "zh-CN": "可选",
    "zh-TW": "可選"
  },
  
  // Injuries page translations
  injuries_title: {
    "en": "Sports Injuries",
    "zh-CN": "运动损伤",
    "zh-TW": "運動損傷"
  },
  injuries_subtitle: {
    "en": "Learn about common sports injuries, their symptoms, causes, and treatments",
    "zh-CN": "了解常见的运动损伤、症状、原因和治疗方法",
    "zh-TW": "了解常見的運動損傷、症狀、原因和治療方法"
  },
  search_injuries: {
    "en": "Search injuries",
    "zh-CN": "搜索损伤",
    "zh-TW": "搜索損傷"
  },
  clear_search: {
    "en": "Clear search",
    "zh-CN": "清除搜索",
    "zh-TW": "清除搜索"
  },
  search_results_count: {
    "en": "Found {count} results",
    "zh-CN": "找到 {count} 个结果",
    "zh-TW": "找到 {count} 個結果"
  },
  no_injuries_found: {
    "en": "No injuries found",
    "zh-CN": "未找到损伤",
    "zh-TW": "未找到損傷"
  },
  all: {
    "en": "All",
    "zh-CN": "全部",
    "zh-TW": "全部"
  },
  muscle_category: {
    "en": "Muscle Injuries",
    "zh-CN": "肌肉损伤",
    "zh-TW": "肌肉損傷"
  },
  joint_category: {
    "en": "Joint Injuries",
    "zh-CN": "关节损伤",
    "zh-TW": "關節損傷"
  },
  bone_category: {
    "en": "Bone Injuries",
    "zh-CN": "骨骼损伤",
    "zh-TW": "骨骼損傷"
  },
  head_category: {
    "en": "Head Injuries",
    "zh-CN": "头部损伤",
    "zh-TW": "頭部損傷"
  },
  other_category: {
    "en": "Other Injuries",
    "zh-CN": "其他损伤",
    "zh-TW": "其他損傷"
  },
  
  // Injury category descriptions
  muscle_category_description: {
    "en": "Injuries affecting muscles and soft tissues",
    "zh-CN": "影响肌肉和软组织的损伤",
    "zh-TW": "影響肌肉和軟組織的損傷"
  },
  joint_category_description: {
    "en": "Injuries affecting joints and ligaments",
    "zh-CN": "影响关节和韧带的损伤",
    "zh-TW": "影響關節和韌帶的損傷"
  },
  bone_category_description: {
    "en": "Injuries affecting bones and skeletal structure",
    "zh-CN": "影响骨骼和骨架结构的损伤",
    "zh-TW": "影響骨骼和骨架結構的損傷"
  },
  head_category_description: {
    "en": "Injuries affecting the head and brain",
    "zh-CN": "影响头部和大脑的损伤",
    "zh-TW": "影響頭部和大腦的損傷"
  },
  other_category_description: {
    "en": "Other types of sports injuries",
    "zh-CN": "其他类型的运动损伤",
    "zh-TW": "其他類型的運動損傷"
  },
  
  // Injury titles translations
  muscle_strain_title: {
    "en": "Muscle Strain",
    "zh-CN": "肌肉拉伤",
    "zh-TW": "肌肉拉傷"
  },
  bruise_title: {
    "en": "Bruise",
    "zh-CN": "挫伤",
    "zh-TW": "挫傷"
  },
  ligament_sprain_title: {
    "en": "Ligament Sprain",
    "zh-CN": "韧带扭伤",
    "zh-TW": "韌帶扭傷"
  },
  dehydration_title: {
    "en": "Dehydration",
    "zh-CN": "脱水",
    "zh-TW": "脫水"
  },
  heatstroke_title: {
    "en": "Heat Stroke",
    "zh-CN": "中暑",
    "zh-TW": "中暑"
  },
  concussion_title: {
    "en": "Concussion",
    "zh-CN": "脑震荡",
    "zh-TW": "腦震盪"
  },
  arm_fracture_title: {
    "en": "Arm Fracture",
    "zh-CN": "手臂骨折",
    "zh-TW": "手臂骨折"
  },
  tennis_elbow_title: {
    "en": "Tennis Elbow",
    "zh-CN": "网球肘",
    "zh-TW": "網球肘"
  },
  finger_dislocation_title: {
    "en": "Finger Dislocation",
    "zh-CN": "手指脱位",
    "zh-TW": "手指脫位"
  },
  leg_fracture_title: {
    "en": "Leg Fracture",
    "zh-CN": "腿部骨折",
    "zh-TW": "腿部骨折"
  },
  
  symptoms: {
    "en": "Symptoms",
    "zh-CN": "症状",
    "zh-TW": "症狀"
  },
  acute_treatment: {
    "en": "Acute Treatment",
    "zh-CN": "急性期处理",
    "zh-TW": "急性期處理"
  },
  prevention: {
    "en": "Prevention",
    "zh-CN": "预防",
    "zh-TW": "預防"
  },
  collapse: {
    "en": "Collapse",
    "zh-CN": "收起",
    "zh-TW": "收起"
  },
  
  // Debug information translations
  debug_info: {
    "en": "Debug Information",
    "zh-CN": "调试信息",
    "zh-TW": "調試信息"
  },
  environment: {
    "en": "Environment",
    "zh-CN": "环境",
    "zh-TW": "環境"
  },
  nextauth_url: {
    "en": "NextAuth URL",
    "zh-CN": "NextAuth URL",
    "zh-TW": "NextAuth URL"
  },
  session_status: {
    "en": "Session Status",
    "zh-CN": "会话状态",
    "zh-TW": "會話狀態"
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  // 加载保存的语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && ['en', 'zh-CN', 'zh-TW'].includes(savedLanguage)) {
        setLanguage(savedLanguage as Language);
      }
    }
  }, []);

  // 保存语言设置到 localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // 更新 HTML 的 lang 属性
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'en' ? 'en' : 
                                      language === 'zh-TW' ? 'zh-Hant' : 'zh-Hans';
    }
  }, [language]);
  
  // 翻译函数
  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language as keyof typeof translations[keyof typeof translations]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 