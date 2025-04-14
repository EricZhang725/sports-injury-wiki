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
  'sportsInjuryWiki': {
    'en': 'Sports Injury Wiki',
    'zh-CN': '运动损伤百科',
    'zh-TW': '運動損傷百科'
  },
  'home': {
    'en': 'Home',
    'zh-CN': '首页',
    'zh-TW': '首頁'
  },
  'injuryTypes': {
    'en': 'Injury Types',
    'zh-CN': '受伤类型',
    'zh-TW': '受傷類型'
  },
  'rehabilitationMethods': {
    'en': 'Rehabilitation Methods',
    'zh-CN': '康复方法',
    'zh-TW': '康復方法'
  },
  'emergency': {
    'en': 'Emergency',
    'zh-CN': '紧急情况',
    'zh-TW': '緊急情況'
  },
  'symptomChecker': {
    'en': 'Symptom Checker',
    'zh-CN': '症状检查器',
    'zh-TW': '症狀檢查器'
  },
  'community': {
    'en': 'Community',
    'zh-CN': '社区',
    'zh-TW': '社區'
  },
  'contactUs': {
    'en': 'Contact Us',
    'zh-CN': '联系我们',
    'zh-TW': '聯繫我們'
  },
  'profile': {
    'en': 'Profile',
    'zh-CN': '个人中心',
    'zh-TW': '個人中心'
  },
  'adminPanel': {
    'en': 'Admin Panel',
    'zh-CN': '管理后台',
    'zh-TW': '管理後台'
  },
  'login': {
    'en': 'Login',
    'zh-CN': '登录',
    'zh-TW': '登入'
  },
  'register': {
    'en': 'Register',
    'zh-CN': '注册',
    'zh-TW': '註冊'
  },
  'logout': {
    'en': 'Logout',
    'zh-CN': '退出登录',
    'zh-TW': '登出'
  },
  'language': {
    'en': 'Language',
    'zh-CN': '切换语言',
    'zh-TW': '切換語言'
  },
  'welcome': {
    'en': 'Welcome to Sports Injury Wiki',
    'zh-CN': '欢迎来到运动损伤百科',
    'zh-TW': '歡迎來到運動損傷百科'
  },
  'intro': {
    'en': 'Your comprehensive guide to sports injuries, treatments, and prevention',
    'zh-CN': '您的全面运动损伤、治疗和预防指南',
    'zh-TW': '您的全面運動損傷、治療和預防指南'
  },
  'startExploring': {
    'en': 'Start Exploring',
    'zh-CN': '开始探索',
    'zh-TW': '開始探索'
  },
  'emergencyHelp': {
    'en': 'Emergency Help',
    'zh-CN': '紧急帮助',
    'zh-TW': '緊急幫助'
  },
  'view_injuries': {
    'en': 'View Injury Catalog',
    'zh-CN': '查看伤害目录',
    'zh-TW': '查看傷害目錄'
  },
  'view_rehab': {
    'en': 'Explore Rehabilitation',
    'zh-CN': '探索康复方法',
    'zh-TW': '探索康復方法'
  },
  'why_use': {
    'en': 'Why Use Sports Injury Wiki',
    'zh-CN': '为什么使用运动损伤百科',
    'zh-TW': '為什麼使用運動損傷百科'
  },
  'why_use_desc': {
    'en': 'Sports Injury Wiki provides reliable information for athletes, coaches, and medical professionals.',
    'zh-CN': '运动损伤百科为运动员、教练和医疗专业人士提供可靠信息。',
    'zh-TW': '運動損傷百科為運動員、教練和醫療專業人士提供可靠信息。'
  },
  'feature_1_title': {
    'en': 'Evidence-Based Information',
    'zh-CN': '循证医学信息',
    'zh-TW': '循證醫學信息'
  },
  'feature_1_desc': {
    'en': 'All information is backed by scientific research and expert consensus.',
    'zh-CN': '所有信息均由科学研究和专家共识支持。',
    'zh-TW': '所有信息均由科學研究和專家共識支持。'
  },
  'feature_2_title': {
    'en': 'Multilingual Resources',
    'zh-CN': '多语言资源',
    'zh-TW': '多語言資源'
  },
  'feature_2_desc': {
    'en': 'Access our resources in multiple languages to serve a global audience.',
    'zh-CN': '以多种语言访问我们的资源，服务全球用户。',
    'zh-TW': '以多種語言訪問我們的資源，服務全球用戶。'
  },
  'feature_3_title': {
    'en': 'Community Support',
    'zh-CN': '社区支持',
    'zh-TW': '社區支持'
  },
  'feature_3_desc': {
    'en': 'Connect with others, share experiences, and learn from experts in our community.',
    'zh-CN': '在我们的社区中与他人联系，分享经验，向专家学习。',
    'zh-TW': '在我們的社區中與他人聯繫，分享經驗，向專家學習。'
  },
  // 联系页面
  'contactFillAllFields': {
    'en': 'Please fill in all fields',
    'zh-CN': '请填写所有字段',
    'zh-TW': '請填寫所有欄位'
  },
  'contactName': {
    'en': 'Name',
    'zh-CN': '姓名',
    'zh-TW': '姓名'
  },
  'contactEmail': {
    'en': 'Email',
    'zh-CN': '电子邮件',
    'zh-TW': '電子郵件'
  },
  'contactSentFrom': {
    'en': 'Sent from Sports Injury Wiki contact form',
    'zh-CN': '发送自运动伤害百科联系表单',
    'zh-TW': '發送自運動傷害百科聯繫表單'
  },
  'contactSuccessMessage': {
    'en': 'Message sent successfully!',
    'zh-CN': '消息发送成功！',
    'zh-TW': '消息發送成功！'
  },
  'contactSending': {
    'en': 'Sending...',
    'zh-CN': '发送中...',
    'zh-TW': '發送中...'
  },
  'contactSend': {
    'en': 'Send',
    'zh-CN': '发送',
    'zh-TW': '發送'
  },
  'contactImagesNote': {
    'en': 'You can upload multiple images if needed (maximum 5MB each)',
    'zh-CN': '您可以根据需要上传多张图片（每张最大5MB）',
    'zh-TW': '您可以根據需要上傳多張圖片（每張最大5MB）'
  },
  'contactImagesEmailNote': {
    'en': 'Note: You will need to attach the images manually in your email client',
    'zh-CN': '注意：您需要在邮件客户端中手动附加图片',
    'zh-TW': '注意：您需要在郵件客戶端中手動附加圖片'
  },
  'uploadImageEmailNote': {
    'en': 'Note: You will need to attach the images manually in your email client',
    'zh-CN': '注意：您需要在邮件客户端中手动附加图片',
    'zh-TW': '注意：您需要在郵件客戶端中手動附加圖片'
  },
  'workingHoursValue': {
    'en': 'Monday to Friday: 9:00 AM - 6:00 PM',
    'zh-CN': '周一-周五早上9点到晚上18点',
    'zh-TW': '週一-週五早上9點到晚上18點'
  },
  'contactMethods': {
    'en': 'Contact Information',
    'zh-CN': '联系方式',
    'zh-TW': '聯繫方式'
  },
  'email': {
    'en': 'Email',
    'zh-CN': '电子邮件',
    'zh-TW': '電子郵件'
  },
  'workingHours': {
    'en': 'Working Hours',
    'zh-CN': '工作时间',
    'zh-TW': '工作時間'
  },
  'sendMessage': {
    'en': 'Send a Message',
    'zh-CN': '发送消息',
    'zh-TW': '發送消息'
  },
  'name': {
    'en': 'Name',
    'zh-CN': '姓名',
    'zh-TW': '姓名'
  },
  'subject': {
    'en': 'Subject',
    'zh-CN': '主题',
    'zh-TW': '主題'
  },
  'messageContent': {
    'en': 'Message',
    'zh-CN': '消息内容',
    'zh-TW': '消息內容'
  },
  'uploadImage': {
    'en': 'Upload Image (Optional)',
    'zh-CN': '上传图片（可选）',
    'zh-TW': '上傳圖片（可選）'
  },
  'imageTypes': {
    'en': 'PNG, JPG, GIF up to 10MB',
    'zh-CN': 'PNG, JPG, GIF 最大 10MB',
    'zh-TW': 'PNG, JPG, GIF 最大 10MB'
  },
  'sendBtn': {
    'en': 'Send Message',
    'zh-CN': '发送消息',
    'zh-TW': '發送消息'
  },
  // 登录页面
  'login_title': {
    'en': 'Login to Your Account',
    'zh-CN': '登录您的账户',
    'zh-TW': '登入您的帳戶'
  },
  'username': {
    'en': 'Username',
    'zh-CN': '用户名',
    'zh-TW': '用戶名'
  },
  'username_or_email': {
    'en': 'Username or Email',
    'zh-CN': '用户名或邮箱',
    'zh-TW': '用戶名或郵箱'
  },
  'password': {
    'en': 'Password',
    'zh-CN': '密码',
    'zh-TW': '密碼'
  },
  'username_placeholder': {
    'en': 'Enter your username',
    'zh-CN': '输入您的用户名',
    'zh-TW': '輸入您的用戶名'
  },
  'password_placeholder': {
    'en': 'Enter your password',
    'zh-CN': '输入您的密码',
    'zh-TW': '輸入您的密碼'
  },
  'login_button': {
    'en': 'Login',
    'zh-CN': '登录',
    'zh-TW': '登入'
  },
  'login_loading': {
    'en': 'Logging in...',
    'zh-CN': '登录中...',
    'zh-TW': '登入中...'
  },
  'no_account': {
    'en': 'Don\'t have an account?',
    'zh-CN': '还没有账户？',
    'zh-TW': '還沒有帳戶？'
  },
  'create_account': {
    'en': 'Create an account',
    'zh-CN': '创建账户',
    'zh-TW': '創建帳戶'
  },
  'login_error': {
    'en': 'Login failed, please try again',
    'zh-CN': '登录失败，请重试',
    'zh-TW': '登入失敗，請重試'
  },
  'enter_credentials': {
    'en': 'Please enter username and password',
    'zh-CN': '请输入用户名和密码',
    'zh-TW': '請輸入用戶名和密碼'
  },
  'invalid_credentials': {
    'en': 'Invalid username or password',
    'zh-CN': '用户名或密码无效',
    'zh-TW': '用戶名或密碼無效'
  },
  'auth_error': {
    'en': 'Authentication error',
    'zh-CN': '认证错误',
    'zh-TW': '認證錯誤'
  },

  // 注册页面
  'register_title': {
    'en': 'Create an Account',
    'zh-CN': '创建账户',
    'zh-TW': '創建帳戶'
  },
  'register_subtitle': {
    'en': 'Join our community today',
    'zh-CN': '今天加入我们的社区',
    'zh-TW': '今天加入我們的社區'
  },
  'email_label': {
    'en': 'Email',
    'zh-CN': '电子邮箱',
    'zh-TW': '電子郵箱'
  },
  'username_label': {
    'en': 'Username',
    'zh-CN': '用户名',
    'zh-TW': '用戶名'
  },
  'password_label': {
    'en': 'Password',
    'zh-CN': '密码',
    'zh-TW': '密碼'
  },
  'admin_code_label': {
    'en': 'Admin Code (Optional)',
    'zh-CN': '管理员代码（可选）',
    'zh-TW': '管理員代碼（可選）'
  },
  'email_placeholder': {
    'en': 'Enter your email',
    'zh-CN': '输入您的电子邮箱',
    'zh-TW': '輸入您的電子郵箱'
  },
  'admin_code_placeholder': {
    'en': 'Enter admin code (if you have one)',
    'zh-CN': '输入管理员代码（如果有的话）',
    'zh-TW': '輸入管理員代碼（如果有的話）'
  },
  'register_button': {
    'en': 'Register',
    'zh-CN': '注册',
    'zh-TW': '註冊'
  },
  'register_loading': {
    'en': 'Registering...',
    'zh-CN': '注册中...',
    'zh-TW': '註冊中...'
  },
  'have_account': {
    'en': 'Already have an account?',
    'zh-CN': '已有账户？',
    'zh-TW': '已有帳戶？'
  },
  'login_now': {
    'en': 'Login now',
    'zh-CN': '立即登录',
    'zh-TW': '立即登入'
  },
  'registration_failed': {
    'en': 'Registration failed',
    'zh-CN': '注册失败',
    'zh-TW': '註冊失敗'
  },
  'server_error': {
    'en': 'Server error, please try again later',
    'zh-CN': '服务器错误，请稍后再试',
    'zh-TW': '伺服器錯誤，請稍後再試'
  },
  'register_error': {
    'en': 'Registration error, please try again',
    'zh-CN': '注册错误，请重试',
    'zh-TW': '註冊錯誤，請重試'
  },

  // 个人资料页面
  'profile_title': {
    'en': 'Personal Profile',
    'zh-CN': '个人资料',
    'zh-TW': '個人資料'
  },
  'edit_profile': {
    'en': 'Edit Profile',
    'zh-CN': '编辑资料',
    'zh-TW': '編輯資料'
  },
  'username_field': {
    'en': 'Username',
    'zh-CN': '用户名',
    'zh-TW': '用戶名'
  },
  'signature': {
    'en': 'Signature',
    'zh-CN': '个人签名',
    'zh-TW': '個人簽名'
  },
  'birthday': {
    'en': 'Birthday',
    'zh-CN': '生日',
    'zh-TW': '生日'
  },
  'no_signature': {
    'en': 'No signature',
    'zh-CN': '暂无签名',
    'zh-TW': '暫無簽名'
  },
  'not_set': {
    'en': 'Not set',
    'zh-CN': '未设置',
    'zh-TW': '未設置'
  },
  'save': {
    'en': 'Save',
    'zh-CN': '保存',
    'zh-TW': '保存'
  },
  'cancel': {
    'en': 'Cancel',
    'zh-CN': '取消',
    'zh-TW': '取消'
  },
  'profile_tab': {
    'en': 'Profile',
    'zh-CN': '个人资料',
    'zh-TW': '個人資料'
  },
  'favorites_tab': {
    'en': 'My Favorites',
    'zh-CN': '我的收藏',
    'zh-TW': '我的收藏'
  },
  'history_tab': {
    'en': 'Browsing History',
    'zh-CN': '浏览历史',
    'zh-TW': '瀏覽歷史'
  },
  'posts_tab': {
    'en': 'My Posts',
    'zh-CN': '我的帖子',
    'zh-TW': '我的帖子'
  },
  'messages_tab': {
    'en': 'User Messages',
    'zh-CN': '用户消息',
    'zh-TW': '用戶消息'
  },
  'users_tab': {
    'en': 'User Management',
    'zh-CN': '用户管理',
    'zh-TW': '用戶管理'
  },
  'loading': {
    'en': 'Loading...',
    'zh-CN': '加载中...',
    'zh-TW': '載入中...'
  },
  'error_title': {
    'en': 'Error:',
    'zh-CN': '出错了:',
    'zh-TW': '出錯了:'
  },
  'reload': {
    'en': 'Reload',
    'zh-CN': '重新加载',
    'zh-TW': '重新載入'
  },
  'profile_error': {
    'en': 'Failed to load profile',
    'zh-CN': '加载个人资料时出错',
    'zh-TW': '載入個人資料時出錯'
  },
  'update_error': {
    'en': 'Failed to update profile',
    'zh-CN': '更新个人资料失败',
    'zh-TW': '更新個人資料失敗'
  },
  // Community post detail page translations
  'post_fetch_error': {
    'en': 'Failed to fetch post',
    'zh-CN': '获取帖子失败',
    'zh-TW': '獲取帖子失敗'
  },
  'login_required': {
    'en': 'Please login to view posts',
    'zh-CN': '请先登录查看帖子',
    'zh-TW': '請先登入查看帖子'
  },
  'comment_error': {
    'en': 'Failed to post comment',
    'zh-CN': '评论失败',
    'zh-TW': '評論失敗'
  },
  'comment_error_retry': {
    'en': 'Failed to post comment, please try again later',
    'zh-CN': '评论失败，请稍后再试',
    'zh-TW': '評論失敗，請稍後再試'
  },
  'confirm_delete_comment': {
    'en': 'Are you sure you want to delete this comment?',
    'zh-CN': '确定要删除这条评论吗？',
    'zh-TW': '確定要刪除這條評論嗎？'
  },
  'delete_error': {
    'en': 'Delete failed',
    'zh-CN': '删除失败',
    'zh-TW': '刪除失敗'
  },
  'delete_error_retry': {
    'en': 'Delete failed, please try again later',
    'zh-CN': '删除失败，请稍后再试',
    'zh-TW': '刪除失敗，請稍後再試'
  },
  'confirm_delete_post': {
    'en': 'Are you sure you want to delete this post? This cannot be undone.',
    'zh-CN': '确定要删除这篇帖子吗？删除后无法恢复。',
    'zh-TW': '確定要刪除這篇帖子嗎？刪除後無法恢復。'
  },
  'post_delete_error': {
    'en': 'Failed to delete post',
    'zh-CN': '删除帖子失败',
    'zh-TW': '刪除帖子失敗'
  },
  'post_delete_error_retry': {
    'en': 'Failed to delete post, please try again later',
    'zh-CN': '删除帖子失败，请稍后再试',
    'zh-TW': '刪除帖子失敗，請稍後再試'
  },
  'post_not_exist': {
    'en': 'Post does not exist',
    'zh-CN': '帖子不存在',
    'zh-TW': '帖子不存在'
  },
  'deleting': {
    'en': 'Deleting...',
    'zh-CN': '删除中...',
    'zh-TW': '刪除中...'
  },
  'delete_post': {
    'en': 'Delete Post',
    'zh-CN': '删除帖子',
    'zh-TW': '刪除帖子'
  },
  'author': {
    'en': 'Author',
    'zh-CN': '作者',
    'zh-TW': '作者'
  },
  'views': {
    'en': 'Views',
    'zh-CN': '浏览',
    'zh-TW': '瀏覽'
  },
  'comments': {
    'en': 'Comments',
    'zh-CN': '评论',
    'zh-TW': '評論'
  },
  'write_comment': {
    'en': 'Write your comment...',
    'zh-CN': '写下你的评论...',
    'zh-TW': '寫下你的評論...'
  },
  'submitting': {
    'en': 'Submitting...',
    'zh-CN': '提交中...',
    'zh-TW': '提交中...'
  },
  'submit_comment': {
    'en': 'Submit Comment',
    'zh-CN': '提交评论',
    'zh-TW': '提交評論'
  },
  'login_to_comment': {
    'en': 'Please login to comment',
    'zh-CN': '请登录后发表评论',
    'zh-TW': '請登入後發表評論'
  },
  'delete': {
    'en': 'Delete',
    'zh-CN': '删除',
    'zh-TW': '刪除'
  },
  'all_fields_required': {
    'en': 'Please fill in all required fields',
    'zh-CN': '请填写所有必填字段',
    'zh-TW': '請填寫所有必填欄位'
  },
  'registering': {
    'en': 'Registering...',
    'zh-CN': '注册中...',
    'zh-TW': '註冊中...'
  },
  'already_registered': {
    'en': 'Already have an account?',
    'zh-CN': '已有账户？',
    'zh-TW': '已有帳戶？'
  },
  'optional': {
    'en': 'Optional',
    'zh-CN': '可选',
    'zh-TW': '可選'
  },
  'admin_code': {
    'en': 'Admin Code',
    'zh-CN': '管理员代码',
    'zh-TW': '管理員代碼'
  },
  'registration_success': {
    'en': 'Registration successful! Redirecting to login page...',
    'zh-CN': '注册成功！正在跳转到登录页面...',
    'zh-TW': '註冊成功！正在跳轉到登入頁面...'
  },
  'registration_error': {
    'en': 'Registration error',
    'zh-CN': '注册错误',
    'zh-TW': '註冊錯誤'
  },
  'logging_in': {
    'en': 'Logging in...',
    'zh-CN': '登录中...',
    'zh-TW': '登入中...'
  },
  'need_account': {
    'en': 'Need an account?',
    'zh-CN': '需要账户？',
    'zh-TW': '需要帳戶？'
  },
  'failed_to_fetch_posts': {
    'en': 'Failed to fetch posts',
    'zh-CN': '获取帖子失败',
    'zh-TW': '獲取帖子失敗'
  },
  'your_posts': {
    'en': 'Your Posts',
    'zh-CN': '您的帖子',
    'zh-TW': '您的帖子'
  },
  'no_posts_yet': {
    'en': 'You have not created any posts yet',
    'zh-CN': '您还没有创建任何帖子',
    'zh-TW': '您還沒有創建任何帖子'
  },
  'view_post': {
    'en': 'View Post',
    'zh-CN': '查看帖子',
    'zh-TW': '查看帖子'
  },
  'create_new_post': {
    'en': 'Create New Post',
    'zh-CN': '创建新帖子',
    'zh-TW': '創建新帖子'
  },
  'account_info': {
    'en': 'Account Information',
    'zh-CN': '账户信息',
    'zh-TW': '帳戶信息'
  },
  'account_actions': {
    'en': 'Account Actions',
    'zh-CN': '账户操作',
    'zh-TW': '帳戶操作'
  },
  'user_profile': {
    'en': 'User Profile',
    'zh-CN': '用户资料',
    'zh-TW': '用戶資料'
  },
  'likes': {
    'en': 'Likes',
    'zh-CN': '点赞',
    'zh-TW': '點贊'
  },
  'role': {
    'en': 'Role',
    'zh-CN': '角色',
    'zh-TW': '角色'
  },
  'admin': {
    'en': 'Administrator',
    'zh-CN': '管理员',
    'zh-TW': '管理員'
  },
  'user': {
    'en': 'User',
    'zh-CN': '普通用户',
    'zh-TW': '普通用戶'
  },
  sports_injuries: {
    en: 'Sports Injuries',
    'zh-CN': '运动损伤类型',
    'zh-TW': '運動損傷類型'
  },
  back: {
    en: 'Back',
    'zh-CN': '返回',
    'zh-TW': '返回'
  },
  symptoms: {
    en: 'Symptoms',
    'zh-CN': '症状',
    'zh-TW': '症狀'
  },
  acute_treatment: {
    en: 'Acute Treatment',
    'zh-CN': '急性期处理',
    'zh-TW': '急性期處理'
  },
  prevention: {
    en: 'Prevention',
    'zh-CN': '预防措施',
    'zh-TW': '預防措施'
  },
  references: {
    en: 'References',
    'zh-CN': '参考文献',
    'zh-TW': '參考文獻'
  },
  muscle_category: {
    en: 'Muscle Injuries',
    'zh-CN': '肌肉损伤',
    'zh-TW': '肌肉損傷'
  },
  muscle_category_description: {
    'en': 'Common muscle injuries including strains and tears',
    'zh-CN': '常见的肌肉损伤，包括拉伤和撕裂',
    'zh-TW': '常見的肌肉損傷，包括拉傷和撕裂'
  },
  joint_category: {
    en: 'Joint Injuries',
    'zh-CN': '关节损伤',
    'zh-TW': '關節損傷'
  },
  joint_category_description: {
    'en': 'Injuries affecting joints including sprains and dislocations',
    'zh-CN': '影响关节的损伤，包括扭伤和脱位',
    'zh-TW': '影響關節的損傷，包括扭傷和脫位'
  },
  bone_category: {
    en: 'Bone Injuries',
    'zh-CN': '骨骼损伤',
    'zh-TW': '骨骼損傷'
  },
  bone_category_description: {
    'en': 'Injuries affecting bones including fractures and stress injuries',
    'zh-CN': '影响骨骼的损伤，包括骨折和应力性损伤',
    'zh-TW': '影響骨骼的損傷，包括骨折和應力性損傷'
  },
  head_category: {
    en: 'Head Injuries',
    'zh-CN': '头部损伤',
    'zh-TW': '頭部損傷'
  },
  head_category_description: {
    'en': 'Head and brain injuries including concussions',
    'zh-CN': '头部和脑部损伤，包括脑震荡',
    'zh-TW': '頭部和腦部損傷，包括腦震盪'
  },
  other_category: {
    en: 'Other Injuries',
    'zh-CN': '其他损伤',
    'zh-TW': '其他損傷'
  },
  other_category_description: {
    'en': 'Other types of sports injuries and conditions',
    'zh-CN': '其他类型的运动损伤和症状',
    'zh-TW': '其他類型的運動損傷和症狀'
  },
  muscle_strain_title: {
    'en': 'Muscle Strain',
    'zh-CN': '肌肉拉伤',
    'zh-TW': '肌肉拉傷'
  },
  ligament_sprain_title: {
    'en': 'Ligament Sprain',
    'zh-CN': '韧带扭伤',
    'zh-TW': '韌帶扭傷'
  },
  concussion_title: {
    'en': 'Concussion',
    'zh-CN': '脑震荡',
    'zh-TW': '腦震盪'
  },
  fracture_title: {
    'en': 'Bone Fracture',
    'zh-CN': '骨折',
    'zh-TW': '骨折'
  },
  tendinitis_title: {
    'en': 'Tendinitis',
    'zh-CN': '肌腱炎',
    'zh-TW': '肌腱炎'
  },
  bruise_title: {
    'en': 'Bruise (Subcutaneous Hematoma)',
    'zh-CN': '淤青（皮下血肿）',
    'zh-TW': '淤青（皮下血腫）'
  },
  dehydration_title: {
    'en': 'Dehydration',
    'zh-CN': '脱水',
    'zh-TW': '脫水'
  },
  heatstroke_title: {
    'en': 'Heat Stroke',
    'zh-CN': '中暑',
    'zh-TW': '中暑'
  },
  ankle_sprain_title: {
    'en': 'Ankle Sprain',
    'zh-CN': '踝关节扭伤（崴脚）',
    'zh-TW': '踝關節扭傷（崴腳）'
  },
  meniscus_injury_title: {
    'en': 'Meniscus Injury',
    'zh-CN': '半月板损伤',
    'zh-TW': '半月板損傷'
  },
  achilles_tendinitis_title: {
    'en': 'Achilles Tendinitis',
    'zh-CN': '跟腱炎',
    'zh-TW': '跟腱炎'
  },
  blister_title: {
    'en': 'Blister',
    'zh-CN': '水泡',
    'zh-TW': '水泡'
  },
  arm_fracture_title: {
    'en': 'Arm Fracture',
    'zh-CN': '骨折-臂部',
    'zh-TW': '骨折-臂部'
  },
  leg_fracture_title: {
    'en': 'Leg Fracture',
    'zh-CN': '骨折-腿部',
    'zh-TW': '骨折-腿部'
  },
  tennis_elbow_title: {
    'en': 'Tennis Elbow',
    'zh-CN': '肌腱炎（网球肘）',
    'zh-TW': '肌腱炎（網球肘）'
  },
  finger_dislocation_title: {
    'en': 'Finger Joint Dislocation',
    'zh-CN': '掌指关节脱位',
    'zh-TW': '掌指關節脫位'
  },
  muscle_injuries: {
    'en': 'Muscle Injuries',
    'zh-CN': '肌肉损伤',
    'zh-TW': '肌肉損傷'
  },
  joint_injuries: {
    'en': 'Joint Injuries',
    'zh-CN': '关节损伤',
    'zh-TW': '關節損傷'
  },
  bone_injuries: {
    'en': 'Bone Injuries',
    'zh-CN': '骨骼损伤',
    'zh-TW': '骨骼損傷'
  },
  head_injuries: {
    'en': 'Head Injuries',
    'zh-CN': '头部损伤',
    'zh-TW': '頭部損傷'
  },
  other_injuries: {
    'en': 'Other Injuries',
    'zh-CN': '其他损伤',
    'zh-TW': '其他損傷'
  },
  'injuries_title': {
    'en': 'Sports Injuries Reference',
    'zh-CN': '运动伤害参考',
    'zh-TW': '運動傷害參考',
  },
  'collapse': {
    'en': 'Collapse',
    'zh-CN': '收起',
    'zh-TW': '收起',
  },
  'view_details': {
    'en': 'View details',
    'zh-CN': '查看详情',
    'zh-TW': '查看詳情',
  },
  'search_injuries': {
    'en': 'Search injuries, symptoms, or treatments...',
    'zh-CN': '搜索伤害、症状或治疗方法...',
    'zh-TW': '搜索傷害、症狀或治療方法...'
  },
  'search_results_count': {
    'en': 'Found {count} results',
    'zh-CN': '找到 {count} 个结果',
    'zh-TW': '找到 {count} 個結果'
  },
  'no_injuries_found': {
    'en': 'No injuries match your search',
    'zh-CN': '没有找到匹配的伤害',
    'zh-TW': '沒有找到匹配的傷害'
  },
  'all': {
    'en': 'All',
    'zh-CN': '全部',
    'zh-TW': '全部'
  },
  // 康复方法类别
  'exercise_category': {
    'en': 'Exercise Therapy',
    'zh-CN': '运动疗法',
    'zh-TW': '運動療法'
  },
  'exercise_category_description': {
    'en': 'Therapeutic exercises to restore function and strength',
    'zh-CN': '恢复功能和力量的治疗性运动',
    'zh-TW': '恢復功能和力量的治療性運動'
  },
  'therapy_category': {
    'en': 'Physical Therapy',
    'zh-CN': '物理疗法',
    'zh-TW': '物理療法'
  },
  'therapy_category_description': {
    'en': 'Professional physical therapy techniques',
    'zh-CN': '专业物理治疗技术',
    'zh-TW': '專業物理治療技術'
  },
  'equipment_category': {
    'en': 'Therapeutic Equipment',
    'zh-CN': '治疗设备',
    'zh-TW': '治療設備'
  },
  'equipment_category_description': {
    'en': 'Specialized equipment for rehabilitation',
    'zh-CN': '专门的康复设备',
    'zh-TW': '專門的康復設備'
  },
  'nutrition_category': {
    'en': 'Nutritional Support',
    'zh-CN': '营养支持',
    'zh-TW': '營養支持'
  },
  'nutrition_category_description': {
    'en': 'Dietary strategies to support recovery',
    'zh-CN': '支持恢复的饮食策略',
    'zh-TW': '支持恢復的飲食策略'
  },
  
  // 康复方法标题
  'proprioceptive_training_title': {
    'en': 'Proprioceptive Training',
    'zh-CN': '本体感觉训练',
    'zh-TW': '本體感覺訓練'
  },
  'blood_flow_restriction_training_title': {
    'en': 'Blood Flow Restriction Training',
    'zh-CN': '血流限制训练',
    'zh-TW': '血流限制訓練'
  },
  'neuromuscular_electrical_stimulation_title': {
    'en': 'Neuromuscular Electrical Stimulation',
    'zh-CN': '神经肌肉电刺激',
    'zh-TW': '神經肌肉電刺激'
  },
  
  // 康复页面元素
  'rehabilitation_methods_title': {
    'en': 'Evidence-Based Rehabilitation Methods',
    'zh-CN': '循证康复方法',
    'zh-TW': '循證康復方法'
  },
  'rehabilitation_methods_description': {
    'en': 'Scientifically validated approaches to injury recovery',
    'zh-CN': '科学验证的伤害恢复方法',
    'zh-TW': '科學驗證的傷害恢復方法'
  },
  'method_details': {
    'en': 'Method Details',
    'zh-CN': '方法详情',
    'zh-TW': '方法詳情'
  },
  'cautions': {
    'en': 'Cautions & Contraindications',
    'zh-CN': '注意事项及禁忌症',
    'zh-TW': '注意事項及禁忌症'
  },
  'timeline': {
    'en': 'Timeline',
    'zh-CN': '时间线',
    'zh-TW': '時間線'
  },
  'effectiveness': {
    'en': 'Effectiveness',
    'zh-CN': '有效性',
    'zh-TW': '有效性'
  },
  'search_rehab_methods': {
    'en': 'Search rehabilitation methods...',
    'zh-CN': '搜索康复方法...',
    'zh-TW': '搜索康復方法...'
  },
  rehabilitation: {
    en: "Rehabilitation",
    "zh-CN": "康复",
    "zh-TW": "康復"
  },
  search_rehab: {
    en: "Search rehabilitation methods",
    "zh-CN": "搜索康复方法",
    "zh-TW": "搜尋康復方法"
  },
  all_categories: {
    en: "All Categories",
    "zh-CN": "所有分类",
    "zh-TW": "所有分類"
  },
  exercise_therapy: {
    en: "Exercise Therapy",
    "zh-CN": "运动疗法",
    "zh-TW": "運動療法"
  },
  physical_therapy: {
    en: "Physical Therapy",
    "zh-CN": "物理疗法",
    "zh-TW": "物理療法"
  },
  therapeutic_equipment: {
    en: "Therapeutic Equipment",
    "zh-CN": "治疗设备",
    "zh-TW": "治療設備"
  },
  nutritional_support: {
    en: "Nutritional Support",
    "zh-CN": "营养支持",
    "zh-TW": "營養支持"
  },
  proprioceptive_training: {
    en: "Proprioceptive Training",
    "zh-CN": "本体感觉训练",
    "zh-TW": "本體感覺訓練"
  },
  blood_flow_restriction: {
    en: "Blood Flow Restriction Training",
    "zh-CN": "血流限制训练",
    "zh-TW": "血流限制訓練"
  },
  nmes: {
    en: "Neuromuscular Electrical Stimulation",
    "zh-CN": "神经肌肉电刺激",
    "zh-TW": "神經肌肉電刺激"
  },
  eccentric_training: {
    en: "Eccentric Training",
    "zh-CN": "离心训练",
    "zh-TW": "離心訓練"
  },
  steps: {
    en: "Steps",
    "zh-CN": "步骤",
    "zh-TW": "步驟"
  },
  cautions: {
    en: "Cautions",
    "zh-CN": "注意事项",
    "zh-TW": "注意事項"
  },
  timeline: {
    en: "Timeline",
    "zh-CN": "时间表",
    "zh-TW": "時間表"
  },
  effectiveness: {
    'en': 'Effectiveness',
    'zh-CN': '有效性',
    'zh-TW': '有效性'
  },
  references: {
    en: "References",
    "zh-CN": "参考文献",
    "zh-TW": "參考文獻"
  },
  show_more: {
    en: "Show More",
    "zh-CN": "显示更多",
    "zh-TW": "顯示更多"
  },
  show_less: {
    en: "Show Less",
    "zh-CN": "显示更少",
    "zh-TW": "顯示更少"
  },
  image_not_found: {
    en: "Image not found",
    "zh-CN": "找不到图片",
    "zh-TW": "找不到圖片"
  },
  image_not_available: {
    en: "Image not available",
    "zh-CN": "图片不可用",
    "zh-TW": "圖片不可用"
  },
  click_for_details: {
    'en': 'Click for details',
    'zh-CN': '点击查看详情',
    'zh-TW': '點擊查看詳情'
  },
  'clear_filters': {
    'en': 'Clear filters',
    'zh-CN': '清除筛选条件',
    'zh-TW': '清除篩選條件'
  },
  manual_therapy: {
    'en': 'Manual Therapy',
    'zh-CN': '手法治疗',
    'zh-TW': '手法治療'
  },
  therapeutic_ultrasound: {
    en: "Therapeutic Ultrasound",
    "zh-CN": "治疗性超声波",
    "zh-TW": "治療性超聲波"
  },
  protein_supplementation: {
    en: "Protein Supplementation",
    "zh-CN": "蛋白质补充",
    "zh-TW": "蛋白質補充"
  },
  anti_inflammatory_diet: {
    en: "Anti-inflammatory Diet",
    "zh-CN": "抗炎饮食",
    "zh-TW": "抗炎飲食"
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