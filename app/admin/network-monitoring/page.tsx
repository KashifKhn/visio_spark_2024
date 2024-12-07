'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Activity, AlertTriangle, CheckCircle, RefreshCw, Search } from 'lucide-react'

// Mock data generation functions
const generateNetworkStatus = () => ({
    overallStatus: Math.random() > 0.8 ? 'Degraded' : 'Healthy',
    activeAlerts: Math.floor(Math.random() * 5),
    bandwidth: `${Math.floor(Math.random() * 20) + 80}%`,
    latency: `${Math.floor(Math.random() * 20) + 5}ms`,
    packetLoss: `${(Math.random() * 0.5).toFixed(2)}%`
})

const generateNetworkDevices = () => {
    const devices = [
        { id: 1, name: 'Router-01', type: 'Router' },
        { id: 2, name: 'Switch-01', type: 'Switch' },
        { id: 3, name: 'AP-01', type: 'Access Point' },
        { id: 4, name: 'Firewall-01', type: 'Firewall' },
        { id: 5, name: 'Server-01', type: 'Server' },
    ]
    return devices.map(device => ({
        ...device,
        status: Math.random() > 0.9 ? 'Offline' : 'Online',
        lastChecked: `${Math.floor(Math.random() * 10) + 1} mins ago`
    }))
}

const generateNetworkPerformance = () => {
    const data = []
    for (let i = 0; i < 24; i++) {
        data.push({
            time: `${i}:00`,
            bandwidth: Math.floor(Math.random() * 20) + 80,
            latency: Math.floor(Math.random() * 10) + 10,
        })
    }
    return data
}

// Mock API calls with delays
const fetchNetworkStatus = () => new Promise(resolve => setTimeout(() => resolve(generateNetworkStatus()), 500))
const fetchNetworkDevices = () => new Promise(resolve => setTimeout(() => resolve(generateNetworkDevices()), 500))
const fetchNetworkPerformance = () => new Promise(resolve => setTimeout(() => resolve(generateNetworkPerformance()), 500))

export default function NetworkMonitoringPage() {
    const [networkStatus, setNetworkStatus] = useState<any>(null)
    const [networkDevices, setNetworkDevices] = useState<any[]>([])
    const [networkPerformance, setNetworkPerformance] = useState<any[]>([])
    const [selectedMetric, setSelectedMetric] = useState('bandwidth')

    const fetchData = useCallback(async () => {
        const [status, devices, performance] = await Promise.all([
            fetchNetworkStatus(),
            fetchNetworkDevices(),
            fetchNetworkPerformance()
        ])
        setNetworkStatus(status as any)
        setNetworkDevices(devices as any[])
        setNetworkPerformance(performance as any[])
    }, [])

    useEffect(() => {
        fetchData()
        // Set up interval for real-time updates
        const interval = setInterval(fetchData, 5000) // Update every 5 seconds
        return () => clearInterval(interval)
    }, [fetchData])

    const handleRefresh = () => {
        fetchData()
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Network Monitoring</h1>
                <Button onClick={handleRefresh}
                
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>

            {networkStatus && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{networkStatus.overallStatus}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{networkStatus.activeAlerts}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{networkStatus.bandwidth}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Latency</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{networkStatus.latency}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Packet Loss</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{networkStatus.packetLoss}</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Tabs defaultValue="devices" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="devices">Network Devices</TabsTrigger>
                    <TabsTrigger value="performance">Network Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="devices" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Network Devices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Input placeholder="Search devices..." />
                                    <Button size="sm">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Devices</SelectItem>
                                        <SelectItem value="router">Routers</SelectItem>
                                        <SelectItem value="switch">Switches</SelectItem>
                                        <SelectItem value="ap">Access Points</SelectItem>
                                        <SelectItem value="firewall">Firewalls</SelectItem>
                                        <SelectItem value="server">Servers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Checked</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {networkDevices.map((device) => (
                                        <TableRow key={device.id}>
                                            <TableCell>{device.name}</TableCell>
                                            <TableCell>{device.type}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {device.status === 'Online' ? (
                                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                                                    )}
                                                    {device.status}
                                                </div>
                                            </TableCell>
                                            <TableCell>{device.lastChecked}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Network Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select metric" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bandwidth">Bandwidth</SelectItem>
                                        <SelectItem value="latency">Latency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={networkPerformance}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey={selectedMetric}
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
