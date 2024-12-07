import { SubscriptionChange } from '@/types/customer';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function SubscriptionChangeList({ subscriptionChanges }: { subscriptionChanges: SubscriptionChange[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Old Plan</TableHead>
                    <TableHead>New Plan</TableHead>
                    <TableHead>Change Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subscriptionChanges.map((change) => (
                    <TableRow key={change.id}>
                        <TableCell>{change.oldPlan}</TableCell>
                        <TableCell>{change.newPlan}</TableCell>
                        <TableCell>{new Date(change.changeDate).toLocaleDateString()}</TableCell>
                        <TableCell>{change.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

