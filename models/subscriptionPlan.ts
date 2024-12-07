import { Document, Model, Schema, model, models } from 'mongoose';

export interface SubscriptionPlan {
  sid: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface SubscriptionPlanDocument extends Document, SubscriptionPlan {}

const subscriptionPlanSchema = new Schema<SubscriptionPlanDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

const SubscriptionPlanModel: Model<SubscriptionPlanDocument> =
  models.SubscriptionPlan ||
  model<SubscriptionPlanDocument>('SubscriptionPlan', subscriptionPlanSchema);

export default SubscriptionPlanModel;
