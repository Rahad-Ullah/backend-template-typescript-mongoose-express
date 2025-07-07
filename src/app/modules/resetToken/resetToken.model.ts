import { model, Schema } from 'mongoose';
import { IResetToken, ResetTokenModel } from './resetToken.interface';

const resetTokenSchema = new Schema<IResetToken, ResetTokenModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

//token check
resetTokenSchema.statics.isExistToken = async (
  token: string
): Promise<IResetToken | null> => {
  return await ResetToken.findOne({ token });
};

//token validity check
resetTokenSchema.statics.isExpireToken = async (token: string) => {
  const currentDate = new Date();
  const resetToken = await ResetToken.findOne({
    token,
    expireAt: { $gt: currentDate },
  });
  return !!resetToken;
};

export const ResetToken = model<IResetToken, ResetTokenModel>(
  'Token',
  resetTokenSchema
);
