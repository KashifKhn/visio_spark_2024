import { Suspense } from 'react';
import { CustomersTable } from '@/components/customers/customer-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCustomers } from '@/lib/api';

export default async function CustomersPage() {
    const customers = await getCustomers();

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

