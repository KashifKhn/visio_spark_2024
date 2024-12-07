import { NextResponse } from 'next/server';
import CustomerModel from '@/models/customer';
import startDb from '@/lib/db';

export const GET = async () => {
  try {
    await startDb();

    // Fetch all customers and populate related fields
    const customers = await CustomerModel.find()
      .populate('subscriptionPlan', 'name description price')
      .populate('serviceRequests', 'status date description');

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
