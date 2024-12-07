'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Customer } from '@/types/customer';

export default function EditCustomerPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`/api/customers/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer');
                }
                const customerData = await response.json();
                setFormData(customerData);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        fetchCustomer();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                const response = await fetch(`/api/customers/${params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to update customer');
                }
                router.push(`/customers/${params.id}`);
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Customer</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                    <select
                        name="subscriptionPlan"
                        value={formData.subscriptionPlan as unknown as string}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                <Button type="submit">Update Customer</Button>
            </form>
        </div>
    );
}
