"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Bell,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    MenuIcon,
    PanelLeftCloseIcon,
    LogOutIcon,
    File,
    Settings2,
    Network,
    TicketCheck,
    MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { UserButton } from "@clerk/nextjs";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: User, label: "Users", href: "/admin/users" },
    { icon: User, label: "Customers", href: "/admin/customers" },
    { icon: File, label: "Reports", href: "/admin/reports" },
    { icon: Network, label: "Network Monitoring", href: "/admin/network-monitoring" },
    { icon: TicketCheck, label: "Tickets", href: "/admin/tickets" },
    { icon: MessageCircle, label: "Chats", href: "/admin/chats" },

];

interface DashLink {
    icon: React.ElementType;
    label: string;
    href: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [menuLinks] = useState<DashLink[]>(sidebarItems);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    // const { data: session } = useSession()

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
                className={`bg-white dark:bg-gray-800 w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static z-30`}
            >
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <Link href="/" className="flex items-center space-x-2">
                        <Settings2 className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-primary">OMS</span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <PanelLeftCloseIcon className="h-6 w-6" />{" "}
                    </Button>{" "}
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-2">
                        {menuLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                                        pathname === item.href
                                            ? "bg-primary text-primary-foreground"
                                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t dark:border-gray-700">
                    <Link
                        href="/profile"
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-primary"
                    >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center space-x-2 mt-2 text-gray-700 dark:text-gray-200 hover:text-primary"
                    >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-20">
                    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 flex lg:justify-end justify-between items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-0 m-0 border-2"
                        >
                            <MenuIcon className="h-8 w-8" />
                        </Button>

                        <div className="flex items-center">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <UserButton />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 md:p-8 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}

