import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: String;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessages: boolean;
  messages: Message[];
  isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, "please use validations"],
  },
  password: {
    type: String,
    required: [true, "Password is required "],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify coe is required "],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Password is required "],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
