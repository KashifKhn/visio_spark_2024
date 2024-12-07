import { ObjectId } from 'mongoose';

export interface SubscriptionChangeRequest {
  customer: ObjectId;
  oldPlan: ObjectId;
  newPlan: ObjectId;
  changeDate: Date;
  status: 'Pending' | 'Completed' | 'Cancelled';
}
