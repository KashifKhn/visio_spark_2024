import { Document, Model, ObjectId, Schema, model, models } from 'mongoose';

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionPlan: ObjectId;
  status: string;
  dateJoined: Date;
  serviceRequests: ObjectId[];
  subscriptionChanges: ObjectId[];
}

interface CustomerDocument extends Document, Customer {}

const customerSchema = new Schema<CustomerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    subscriptionPlan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    status: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    serviceRequests: [{ type: Schema.Types.ObjectId, ref: 'ServiceRequest' }],
    subscriptionChanges: [
      { type: Schema.Types.ObjectId, ref: 'SubscriptionChange' },
    ],
  },
  { timestamps: true }
);

const CustomerModel: Model<CustomerDocument> =
  models.Customer || model<CustomerDocument>('Customer', customerSchema);

export default CustomerModel;
