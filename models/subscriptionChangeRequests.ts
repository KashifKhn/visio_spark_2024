import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface SubscriptionChangeRequest {
  customer: ObjectId;
  oldPlan: ObjectId;
  newPlan: ObjectId;
  changeDate: Date;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

interface SubscriptionChangeRequestDocument
  extends Document,
    SubscriptionChangeRequest {}

const subscriptionChangeRequestSchema =
  new Schema<SubscriptionChangeRequestDocument>(
    {
      customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
      oldPlan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
      newPlan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
      changeDate: { type: Date, required: true },
      status: { type: String, required: true },
    },
    { timestamps: true }
  );

const SubscriptionChangeRequestModel: Model<SubscriptionChangeRequestDocument> =
  mongoose.models.SubscriptionChangeRequest ||
  mongoose.model<SubscriptionChangeRequestDocument>(
    'SubscriptionChangeRequest',
    subscriptionChangeRequestSchema
  );

export default SubscriptionChangeRequestModel;
