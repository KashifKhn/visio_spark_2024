import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCustomerById, getServiceRequests, getSubscriptionChanges } from '@/lib/api';
import { ServiceRequestList } from '@/components/customers/service-request-list';
import { SubscriptionChangeList } from '@/components/customers/subscription-change-list';
import { DeleteCustomerButton } from '@/components/customers/delete-customer-button';

export default async function CustomerProfilePage({ params }: { params: { id: string } }) {
    const customer = await getCustomerById(params.id);
    const serviceRequests = await getServiceRequests(params.id);
    const subscriptionChanges = await getSubscriptionChanges(params.id);

    if (!customer) {
        return <div>Customer not found</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{customer.name}</h1>
                <div className="space-x-2">
                    <Link href={`/admin/customers/${params.id}/edit`}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                    <DeleteCustomerButton customerId={params.id} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Phone:</strong> {customer.phone}</p>
                        <p><strong>Address:</strong> {customer.address}</p>
                        <p><strong>Subscription Plan:</strong> {customer.subscriptionPlan}</p>
                        <p><strong>Status:</strong> {customer.status}</p>
                        <p><strong>Date Joined:</strong> {new Date(customer.dateJoined).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Service Requests</h2>
                    <Suspense fallback={<div>Loading service requests...</div>}>
                        <ServiceRequestList serviceRequests={serviceRequests} />
                    </Suspense>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Subscription Changes</h2>
                <Suspense fallback={<div>Loading subscription changes...</div>}>
                    <SubscriptionChangeList subscriptionChanges={subscriptionChanges} />
                </Suspense>
            </div>
        </div>
    );
}

