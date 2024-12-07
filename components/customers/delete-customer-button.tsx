'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteCustomer } from '@/lib/api';

export function DeleteCustomerButton({ customerId }: { customerId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this customer?')) {
            setIsDeleting(true);
            await deleteCustomer(customerId);
            router.push('/customers');
        }
    };

    return (
        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
    );
}

