'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { AlertCircle, CheckCircle, Clock, Filter, PlusCircle, RefreshCw, Search } from 'lucide-react'

// Mock data and API calls
const fetchTickets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, subject: 'Internet connection issue', status: 'Open', priority: 'High', createdAt: '2023-06-01', updatedAt: '2023-06-02' },
                { id: 2, subject: 'Billing inquiry', status: 'In Progress', priority: 'Medium', createdAt: '2023-06-02', updatedAt: '2023-06-03' },
                { id: 3, subject: 'Service upgrade request', status: 'Closed', priority: 'Low', createdAt: '2023-06-03', updatedAt: '2023-06-04' },
                { id: 4, subject: 'Router configuration', status: 'Open', priority: 'High', createdAt: '2023-06-04', updatedAt: '2023-06-04' },
                { id: 5, subject: 'Account access issue', status: 'In Progress', priority: 'Medium', createdAt: '2023-06-05', updatedAt: '2023-06-06' },
            ])
        }, 500)
    })
}

const fetchTicketStats = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Open', value: 15 },
                { name: 'In Progress', value: 10 },
                { name: 'Closed', value: 25 },
            ])
        }, 500)
    })
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function TicketSystemPage() {
    const [tickets, setTickets] = useState<any[]>([])
    const [ticketStats, setTicketStats] = useState<any[]>([])
    const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false)

    useEffect(() => {
        fetchTickets().then(setTickets)
        fetchTicketStats().then(setTicketStats)
    }, [])

    const handleRefresh = () => {
        fetchTickets().then(setTickets)
        fetchTicketStats().then(setTicketStats)
    }

    const handleNewTicketSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Here you would typically send the new ticket data to your backend
        console.log('New ticket submitted')
        setIsNewTicketDialogOpen(false)
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Ticket System</h1>
                <div className="space-x-2">
                    <Button onClick={handleRefresh}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button onClick={() => setIsNewTicketDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Ticket
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ticketStats.find(stat => stat.name === 'Open')?.value || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ticketStats.find(stat => stat.name === 'In Progress')?.value || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Closed Tickets</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ticketStats.find(stat => stat.name === 'Closed')?.value || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ticket Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Input placeholder="Search tickets..." />
                                    <Button size="sm">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Priorities</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Updated</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell>{ticket.id}</TableCell>
                                            <TableCell>{ticket.subject}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.priority}</TableCell>
                                            <TableCell>{ticket.createdAt}</TableCell>
                                            <TableCell>{ticket.updatedAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Ticket Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ticketStats}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {ticketStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isNewTicketDialogOpen} onOpenChange={setIsNewTicketDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Ticket</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new support ticket.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleNewTicketSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    Subject
                                </Label>
                                <Input id="subject" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea id="description" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create Ticket</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

