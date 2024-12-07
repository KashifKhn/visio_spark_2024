'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import addCustomer from './action';
import { Customer } from '@/types/customer';
import toast from 'react-hot-toast';

export default function AddCustomerPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
        name: '',
        email: '',
        phone: '',
        address: '',
        subscriptionPlan: 'standard',
        status: 'Active',
        dateJoined: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addCustomer(formData);
        toast.success('Customer added successfully');
        //set a timeout to allow the toast to show before redirecting
        setTimeout(() => {
            router.push('/admin/customers');
        }, 1000);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Add New Customer</h1>
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
                    <select id="subscriptionPlan" name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange}>
                        <option value="standard">Standard</option>

                        <option value="premium">Premium</option>
                        <option value="premium+">Premium+</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                <Button type="submit">Add Customer</Button>
            </form>
        </div>
    );
}

