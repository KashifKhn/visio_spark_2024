import { ServiceRequest } from '@/types/customer';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function ServiceRequestList({ serviceRequests }: { serviceRequests: ServiceRequest[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Created</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {serviceRequests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{new Date(request.dateCreated).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

