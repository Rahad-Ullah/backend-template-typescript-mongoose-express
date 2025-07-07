import { Model, Types } from 'mongoose';

export type IResetToken = {
  user: Types.ObjectId;
  token: string;
  expireAt: Date;
};

export type ResetTokenModel = {
  isExistToken(token: string): any;
  isExpireToken(token: string): boolean;
} & Model<IResetToken>;
