export type SubscriptionPlan = 'standard' | 'premium' | 'premium+';

export type CustomerStatus = 'Active' | 'Inactive' | 'Suspended';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionPlan: SubscriptionPlan;
  status: CustomerStatus;
  dateJoined: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  type: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  dateCreated: string;
  dateResolved?: string;
}

export interface SubscriptionChange {
  id: string;
  customerId: string;
  oldPlan: SubscriptionPlan;
  newPlan: SubscriptionPlan;
  changeDate: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}
