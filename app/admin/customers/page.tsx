import { Suspense } from 'react';
import { CustomersTable } from '@/components/customers/customer-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import startDb from '@/lib/db';
import CustomerModel from '@/models/customer';
import SubscriptionPlanModel from '@/models/subscriptionPlan';
import { Customer } from '@/types/customer';

export default async function CustomersPage() {
    const getCustomers = async (): Promise<Customer[]> => {
        try {
            await startDb();

            // Fetch customers and their subscription plans
            const customers = await CustomerModel.find()
                .lean() // Convert Mongoose documents to plain objects
                .populate('subscriptionPlan', 'name')
                .exec();

            return customers.map(customer => ({
                ...customer,
                subscriptionPlan: customer.subscriptionPlan
                    ? (customer.subscriptionPlan as any).name
                    : 'No Plan',
            }));
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw new Error('Failed to fetch customers');
        }
    };

    let customers: Customer[] = [];
    try {
        customers = await getCustomers();
    } catch (error) {
        console.error('Error in CustomersPage:', error);
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Customers</h1>
                <Link href="/admin/customers/add">
                    <Button>Add Customer</Button>
                </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CustomersTable data={customers} />
            </Suspense>
        </div>
    );
}
