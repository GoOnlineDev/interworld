'use client';

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    Wrench,
    Newspaper,
    Image as ImageIcon,
    Users,
    HelpCircle,
    Mail,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Publications', href: '/admin/publications', icon: BookOpen },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Updates', href: '/admin/updates', icon: Newspaper },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Partners', href: '/admin/partners', icon: Users },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Contacts', href: '/admin/contacts', icon: Mail },
];

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-charcoal-black text-white
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:h-screen
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <Link href="/admin" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Interworld"
                                width={150}
                                height={40}
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/admin' && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                                        transition-all duration-200
                                        ${isActive
                                            ? 'bg-royal-green text-white shadow-lg shadow-royal-green/20'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom section */}
                    <div className="p-4 border-t border-white/10 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Home className="h-5 w-5" />
                            View Site
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}

function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const pathname = usePathname();

    // Generate breadcrumb from pathname
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm">
                        {pathSegments.map((segment, index) => (
                            <div key={segment} className="flex items-center">
                                {index > 0 && (
                                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                                )}
                                <span className={`capitalize ${index === pathSegments.length - 1
                                        ? 'text-charcoal-black font-semibold'
                                        : 'text-gray-500'
                                    }`}>
                                    {segment}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-10 w-10"
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ClerkProvider>
            <ConvexProvider client={convex}>
                <SignedIn>
                    <div className="flex h-screen bg-gray-50">
                        <AdminSidebar
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                        />

                        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                            <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                </SignedIn>

                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ConvexProvider>
        </ClerkProvider>
    );
}
