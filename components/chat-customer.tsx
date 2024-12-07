'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CustomerChatButtonProps {
    customerId: string
    customerName: string
}

export function CustomerChatButton({ customerId, customerName }: CustomerChatButtonProps) {
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        // Here you would implement the logic to send the message
        // For example, calling an API endpoint
        console.log(`Sending message to customer ${customerId}: ${message}`)
        // Reset the message input after sending
        setMessage('')
        // You might want to add some feedback to the user here
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                    <span className="sr-only">Open chat with {customerName}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chat with {customerName}</DialogTitle>
                    <DialogDescription>
                        Send a targeted message to this customer.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea
                        placeholder="Type your message here."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    Send Message
                </Button>
            </DialogContent>
        </Dialog>
    )
}

