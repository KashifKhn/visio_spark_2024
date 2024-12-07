'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis
} from 'recharts'
import { Users, Wifi, PhoneCall, DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Mock API calls with more detailed data
const fetchRevenueData = (startDate: Date, endDate: Date) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = []
            let currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                data.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    totalRevenue: Math.floor(Math.random() * 10000) + 50000,
                    subscriptionRevenue: Math.floor(Math.random() * 8000) + 40000,
                    additionalServicesRevenue: Math.floor(Math.random() * 2000) + 10000,
                })
                currentDate = addDays(currentDate, 1)
            }
            resolve(data)
        }, 1000)
    })
}

const fetchCustomerData = (startDate: Date, endDate: Date) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = []
            let currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                data.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    newCustomers: Math.floor(Math.random() * 50) + 50,
                    churnedCustomers: Math.floor(Math.random() * 20) + 10,
                    totalCustomers: Math.floor(Math.random() * 1000) + 9000,
                })
                currentDate = addDays(currentDate, 1)
            }
            resolve(data)
        }, 1000)
    })
}

const fetchServiceData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Fiber', value: 4000, growth: 15 },
                { name: 'Cable', value: 3000, growth: 5 },
                { name: 'DSL', value: 2000, growth: -10 },
                { name: 'Satellite', value: 1000, growth: 20 },
                { name: '5G', value: 500, growth: 50 },
            ])
        }, 1000)
    })
}

const fetchSupportData = (startDate: Date, endDate: Date) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = []
            let currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                data.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    technicalIssues: Math.floor(Math.random() * 50) + 100,
                    billingInquiries: Math.floor(Math.random() * 30) + 50,
                    serviceChanges: Math.floor(Math.random() * 20) + 30,
                    newInstallations: Math.floor(Math.random() * 10) + 20,
                    generalInquiries: Math.floor(Math.random() * 20) + 40,
                })
                currentDate = addDays(currentDate, 1)
            }
            resolve(data)
        }, 1000)
    })
}

const fetchPerformanceData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = []
            for (let i = 0; i < 100; i++) {
                data.push({
                    bandwidth: Math.floor(Math.random() * 500) + 500,
                    latency: Math.floor(Math.random() * 50) + 10,
                    packetLoss: Math.random() * 2,
                    customers: Math.floor(Math.random() * 1000) + 1000,
                })
            }
            resolve(data)
        }, 1000)
    })
}

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    })
    const [revenueData, setRevenueData] = useState([])
    const [customerData, setCustomerData] = useState([])
    const [serviceData, setServiceData] = useState([])
    const [supportData, setSupportData] = useState([])
    const [performanceData, setPerformanceData] = useState([])
    const [selectedMetric, setSelectedMetric] = useState('totalRevenue')

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            fetchRevenueData(dateRange.from, dateRange.to).then(data => setRevenueData(data as any))
            fetchCustomerData(dateRange.from, dateRange.to).then(data => setCustomerData(data as any))
            fetchSupportData(dateRange.from, dateRange.to).then(data => setSupportData(data as any))
        }
        fetchServiceData().then(data => setServiceData(data as any))
        fetchPerformanceData().then(data => setPerformanceData(data as any))
    }, [dateRange])

    const totalRevenue = useMemo(() => revenueData.reduce((sum, item: any) => sum + item.totalRevenue, 0), [revenueData])
    const totalCustomers = useMemo(() => customerData.length > 0 ? customerData[customerData.length - 1].totalCustomers : 0, [customerData])
    const totalServices = useMemo(() => serviceData.reduce((sum, item: any) => sum + item.value, 0), [serviceData])
    const totalSupportTickets = useMemo(() => supportData.reduce((sum, item: any) =>
        sum + item.technicalIssues + item.billingInquiries + item.serviceChanges + item.newInstallations + item.generalInquiries, 0
    ), [supportData])

    const handleDownloadPDF = () => {
        const input = document.getElementById('report-content');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save('isp-report.pdf');
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                <Button onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                </Button>
            </div>

            <div className="flex space-x-4 items-center">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="totalRevenue">Total Revenue</SelectItem>
                        <SelectItem value="subscriptionRevenue">Subscription Revenue</SelectItem>
                        <SelectItem value="additionalServicesRevenue">Additional Services Revenue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div id="report-content" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Revenue"
                        value={`$${totalRevenue.toLocaleString()}`}
                        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                        trend={<TrendingUp className="h-4 w-4 text-green-500" />}
                        trendText="+12.5% from last period"
                    />
                    <StatCard
                        title="Total Customers"
                        value={totalCustomers.toLocaleString()}
                        icon={<Users className="h-4 w-4 text-muted-foreground" />}
                        trend={<TrendingUp className="h-4 w-4 text-green-500" />}
                        trendText="+8.3% from last period"
                    />
                    <StatCard
                        title="Active Services"
                        value={totalServices.toLocaleString()}
                        icon={<Wifi className="h-4 w-4 text-muted-foreground" />}
                        trend={<TrendingUp className="h-4 w-4 text-green-500" />}
                        trendText="+5.7% from last period"
                    />
                    <StatCard
                        title="Support Tickets"
                        value={totalSupportTickets.toLocaleString()}
                        icon={<PhoneCall className="h-4 w-4 text-muted-foreground" />}
                        trend={<TrendingDown className="h-4 w-4 text-red-500" />}
                        trendText="-3.2% from last period"
                    />
                </div>

                <Tabs defaultValue="revenue" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                        <TabsTrigger value="performance">Network Performance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="revenue" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="customers" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Acquisition vs Churn</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={customerData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="newCustomers" fill="#8884d8" name="New Customers" />
                                        <Bar dataKey="churnedCustomers" fill="#82ca9d" name="Churned Customers" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="services" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Service Distribution and Growth</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={serviceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        />
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="support" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Support Ticket Categories Over Time</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={supportData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="technicalIssues" stackId="a" fill="#8884d8" />
                                        <Bar dataKey="billingInquiries" stackId="a" fill="#82ca9d" />
                                        <Bar dataKey="serviceChanges" stackId="a" fill="#ffc658" />
                                        <Bar dataKey="newInstallations" stackId="a" fill="#ff8042" />
                                        <Bar dataKey="generalInquiries" stackId="a" fill="#0088fe" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="performance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Network Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="bandwidth" name="Bandwidth (Mbps)" unit="Mbps" />
                                        <YAxis dataKey="latency" name="Latency (ms)" unit="ms" />
                                        <ZAxis dataKey="packetLoss" name="Packet Loss (%)" unit="%" range={[0, 1000]} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Legend />
                                        <Scatter name="Network Performance" data={performanceData} fill="#8884d8" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, trend, trendText }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: React.ReactNode;
    trendText: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                    {trend}
                    <span className="ml-1">{trendText}</span>
                </p>
            </CardContent>
        </Card>
    )
}

