import mongoose from 'mongoose';

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 创建索引以便于查询
messageSchema.index({ read: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message; 

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 创建索引以便于查询
messageSchema.index({ read: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message; 