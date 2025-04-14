import mongoose from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  signature?: string; 
  birthday?: Date;
  favorites?: mongoose.Types.ObjectId[];
  history?: any[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 定义用户模型的结构
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  signature: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
    default: null,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Injury',
    default: [],
  }],
  history: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// 只保留必要的索引
userSchema.index({ 'history.viewedAt': -1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// 避免重复模型定义
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 
  history: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// 只保留必要的索引
userSchema.index({ 'history.viewedAt': -1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// 避免重复模型定义
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 