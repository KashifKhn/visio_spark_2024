'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, RefreshCw, Search, User } from 'lucide-react'

// Mock data generation functions
const generateChatSessions = () => {
    const statuses = ['Active', 'Waiting', 'Closed']
    const agents = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
    const topics = ['Billing Issue', 'Technical Support', 'Account Inquiry', 'Service Upgrade', 'General Question']

    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        customer: `Customer ${i + 1}`,
        agent: agents[Math.floor(Math.random() * agents.length)],
        topic: topics[Math.floor(Math.random() * topics.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastActivity: `${Math.floor(Math.random() * 60)} mins ago`,
    }))
}

const generateChatMessages = (sessionId: number) => {
    const messages = [
        { sender: 'customer', content: 'Hello, I need help with my internet connection.' },
        { sender: 'agent', content: 'Hello! I\'d be happy to help you with that. Can you please describe the issue you\'re experiencing?' },
        { sender: 'customer', content: 'My internet keeps disconnecting every few minutes.' },
        { sender: 'agent', content: 'I see. Let\'s try a few troubleshooting steps. First, can you please restart your router?' },
        { sender: 'customer', content: 'Okay, I\'ve restarted the router.' },
        { sender: 'agent', content: 'Great. Let\'s wait a few minutes to see if the issue persists. In the meantime, can you tell me which devices are affected?' },
        { sender: 'customer', content: 'It seems to be affecting all devices - my laptop, phone, and smart TV.' },
        { sender: 'agent', content: 'Thank you for that information. It sounds like there might be an issue with the connection to your home. I\'m going to run a diagnostic on our end.' },
    ]

    return messages.map((msg, index) => ({
        id: index + 1,
        sessionId,
        ...msg,
        timestamp: new Date(Date.now() - (messages.length - index) * 60000).toISOString(),
    }))
}

// Mock API calls with delays
const fetchChatSessions = () => new Promise(resolve => setTimeout(() => resolve(generateChatSessions()), 500))
const fetchChatMessages = (sessionId: number) => new Promise(resolve => setTimeout(() => resolve(generateChatMessages(sessionId)), 300))

export default function ChatSystemPage() {
    const [chatSessions, setChatSessions] = useState<any[]>([])
    const [selectedSession, setSelectedSession] = useState<number | null>(null)
    const [chatMessages, setChatMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')

    const fetchData = useCallback(async () => {
        const sessions = await fetchChatSessions()
        setChatSessions(sessions as any[])
        if (selectedSession) {
            const messages = await fetchChatMessages(selectedSession)
            setChatMessages(messages as any[])
        }
    }, [selectedSession])

    useEffect(() => {
        fetchData()
        // Set up interval for real-time updates
        const interval = setInterval(fetchData, 10000) // Update every 10 seconds
        return () => clearInterval(interval)
    }, [fetchData])

    const handleRefresh = () => {
        fetchData()
    }

    const handleSessionSelect = async (sessionId: number) => {
        setSelectedSession(sessionId)
        const messages = await fetchChatMessages(sessionId)
        setChatMessages(messages as any[])
    }

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedSession) {
            const newMsg = {
                id: chatMessages.length + 1,
                sessionId: selectedSession,
                sender: 'agent',
                content: newMessage,
                timestamp: new Date().toISOString(),
            }
            setChatMessages([...chatMessages, newMsg])
            setNewMessage('')
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Customer Service Chats</h1>
                <Button onClick={handleRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Chat Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Input placeholder="Search sessions..." />
                                <Button size="sm">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="waiting">Waiting</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Activity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chatSessions.map((session) => (
                                    <TableRow
                                        key={session.id}
                                        onClick={() => handleSessionSelect(session.id)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell>{session.customer}</TableCell>
                                        <TableCell>{session.agent}</TableCell>
                                        <TableCell>{session.topic}</TableCell>
                                        <TableCell>{session.status}</TableCell>
                                        <TableCell>{session.lastActivity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Chat Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedSession ? (
                            <>
                                <div className="h-[400px] overflow-y-auto mb-4 space-y-2">
                                    {chatMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`p-2 rounded-lg ${message.sender === 'agent'
                                                    ? 'bg-blue-100 ml-auto'
                                                    : 'bg-gray-100'
                                                } max-w-[80%]`}
                                        >
                                            <p className="text-sm font-semibold">
                                                {message.sender === 'agent' ? 'Agent' : 'Customer'}
                                            </p>
                                            <p>{message.content}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(message.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex space-x-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                    />
                                    <Button onClick={handleSendMessage}>Send</Button>
                                </div>
                            </>
                        ) : (
                            <p>Select a chat session to view messages</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

