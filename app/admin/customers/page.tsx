import { Suspense } from 'react';
import { CustomersTable } from '@/components/customers/customer-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import startDb from '@/lib/db';
import CustomerModel from '@/models/customer';
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

    // Fallback array of customer objects
    const fallbackCustomers: Customer[] = [
        {
            id: '6753fc890a5f98ef50facb89',
            name: ' Customer 1',
            email: 'fallback1@example.com',
            phone: '123-456-7890',
            address: '123 Main St, Fallback City',
            subscriptionPlan: 'Basic Plan',
            status: 'Active',
            dateJoined: new Date().toISOString(),
        },
        {
            id: '6753fc890a5f98ef50facb89',
            name: 'Customer 2',
            email: 'fallback2@example.com',
            phone: '987-654-3210',
            address: '456 Elm St, Fallback Town',
            subscriptionPlan: 'Premium Plan',
            status: 'Inactive',
            dateJoined: new Date().toISOString(),
        },
    ];

    // Attempt to fetch customers, falling back to the fallback array on error
    let customers: Customer[] = [];
    try {
        customers = await getCustomers();
    } catch (error) {
        console.error('Error in CustomersPage, using fallback data:', error);
        customers = fallbackCustomers; // Use fallback data
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
