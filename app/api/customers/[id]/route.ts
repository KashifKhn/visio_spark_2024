import { NextRequest, NextResponse } from 'next/server';
import CustomerModel from '@/models/customer';
import startDb from '@/lib/db';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params; // Retrieve customer ID from params

  try {
    await startDb();

    // Find the customer by ID, populate related fields
    const customer = await CustomerModel.findById(id)
      .populate('subscriptionPlan', 'name description price')
      .populate('serviceRequests', 'description status date');

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await req.json();

  try {
    await startDb();

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, body, {
      new: true,
    })
      .populate('subscriptionPlan', 'name description price')
      .populate('serviceRequests', 'description status date');

    if (!updatedCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
