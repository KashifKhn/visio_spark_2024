import { Document, Model, ObjectId, Schema, model, models } from 'mongoose';

export interface ServiceRequest {
  customer: ObjectId;
  description: string;
  status: string;
  date: Date;
}

interface ServiceRequestDocument extends Document, ServiceRequest {}

const serviceRequestSchema = new Schema<ServiceRequestDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const ServiceRequestModel: Model<ServiceRequestDocument> =
  models.ServiceRequest ||
  model<ServiceRequestDocument>('ServiceRequest', serviceRequestSchema);

export default ServiceRequestModel;
