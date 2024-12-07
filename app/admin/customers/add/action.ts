'use server';

import startDb from '@/lib/db';
import CustomerModel from '@/models/customer';
import SubscriptionPlanModel from '@/models/subscriptionPlan';

export default async function addCustomer(customer: any) {
  try {
    console.log('customer', customer);
    //omit the subscriptionPlan field
    await startDb();

    //get the subscription plan

    const subscriptionPlan = await SubscriptionPlanModel.findOne({
      name: customer.subscriptionPlan,
    });
    //if the subscription plan does not exist, throw an error
    if (!subscriptionPlan) {
      throw new Error('Subscription plan not found');
    }
    //create a new customer

    const newCustomer = await new CustomerModel({
      ...customer,
      subscriptionPlan: subscriptionPlan._id,
    });
    await newCustomer.save();
  } catch (error) {
    if (error instanceof Error) {
      console.log('error', error);
      throw new Error(error.message);
    } else {
      console.log('error', error);
      throw new Error('An unknown error occurred');
    }
  }
}
