import mongoose from 'mongoose';

// Define interfaces
interface IComment {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  _id?: mongoose.Types.ObjectId;
}

interface IPost extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  comments: IComment[];
  likes: mongoose.Types.ObjectId[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  deleteComment(commentId: string, userId: string): Promise<IPost>;
}

interface IPostModel extends mongoose.Model<IPost> {
  deletePost(postId: string, userId: string): Promise<IPost>;
}

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  comments: [commentSchema],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 创建索引
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ tags: 1 });

// 更新时自动更新 updatedAt
postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 添加删除评论的方法
postSchema.methods.deleteComment = async function(commentId: string, userId: string) {
  const comment = this.comments.id(commentId);
  if (!comment) {
    throw new Error('Comment does not exist');
  }
  
  // 检查是否是评论作者或帖子作者
  if (comment.user.toString() !== userId && this.author.toString() !== userId) {
    throw new Error('You do not have permission to delete this comment');
  }
  
  // 使用 Mongoose 的 pull 方法删除评论
  this.comments.pull(commentId);
  await this.save();
  return this;
};

// 添加删除帖子的静态方法
postSchema.statics.deletePost = async function(postId: string, userId: string) {
  const post = await this.findById(postId);
  if (!post) {
    throw new Error('Post does not exist');
  }
  
  // 检查是否是帖子作者
  if (post.author.toString() !== userId) {
    throw new Error('You do not have permission to delete this post');
  }
  
  await this.findByIdAndDelete(postId);
  return post;
};

// Check if the model exists to avoid overwriting it
const Post = (mongoose.models.Post as IPostModel) || 
  mongoose.model<IPost, IPostModel>('Post', postSchema);

export default Post; 