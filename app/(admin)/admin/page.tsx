'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import {
    BookOpen,
    Briefcase,
    Wrench,
    Newspaper,
    Image as ImageIcon,
    Users,
    HelpCircle,
    Mail,
    ArrowRight,
    Plus,
    TrendingUp,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';




function StatCard({
    title,
    value,
    icon: Icon,
    href,
    color = 'bg-royal-green'
}: {
    title: string;
    value: number | string;
    icon: React.ElementType;
    href: string;
    color?: string;
}) {
    return (
        <Link href={href} className="group">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-royal-green group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-3xl font-bold text-charcoal-black mb-1">{value}</div>
                <div className="text-sm text-elegant-grey">{title}</div>
            </div>
        </Link>
    );
}

function QuickAction({
    title,
    description,
    href,
    icon: Icon
}: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
}) {
    return (
        <Link href={href} className="group">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-royal-green/5 border border-transparent hover:border-royal-green/20 transition-all">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-royal-green shadow-sm group-hover:bg-royal-green group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-charcoal-black text-sm">{title}</div>
                    <div className="text-xs text-elegant-grey">{description}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-royal-green transition-colors" />
            </div>
        </Link>
    );
}

export default function AdminDashboard() {
    const publications = useQuery(api.publications.getAll);
    const projects = useQuery(api.projects.getAll);
    const services = useQuery(api.services.getAll);
    const updates = useQuery(api.updates.getAll);
    const gallery = useQuery(api.gallery.getAll);
    const partners = useQuery(api.partners.getAll);
    const faqs = useQuery(api.faqs.getAll);
    const unreadContacts = useQuery(api.contacts.getUnreadCount);

    const stats = [
        { title: 'Publications', value: publications?.length ?? '...', icon: BookOpen, href: '/admin/publications', color: 'bg-blue-600' },
        { title: 'Projects', value: projects?.length ?? '...', icon: Briefcase, href: '/admin/projects', color: 'bg-emerald-600' },
        { title: 'Services', value: services?.length ?? '...', icon: Wrench, href: '/admin/services', color: 'bg-purple-600' },
        { title: 'Updates', value: updates?.length ?? '...', icon: Newspaper, href: '/admin/updates', color: 'bg-orange-600' },
        { title: 'Gallery Items', value: gallery?.length ?? '...', icon: ImageIcon, href: '/admin/gallery', color: 'bg-pink-600' },
        { title: 'Partners', value: partners?.length ?? '...', icon: Users, href: '/admin/partners', color: 'bg-cyan-600' },
        { title: 'FAQs', value: faqs?.length ?? '...', icon: HelpCircle, href: '/admin/faqs', color: 'bg-yellow-600' },
        { title: 'Unread Messages', value: unreadContacts ?? '...', icon: Mail, href: '/admin/contacts', color: 'bg-red-600' },
    ];

    const quickActions = [
        { title: 'Add Publication', description: 'Create a new publication', href: '/admin/publications/new', icon: Plus },
        { title: 'Add Project', description: 'Add a new project', href: '/admin/projects/new', icon: Plus },
        { title: 'Add Update', description: 'Post a news update', href: '/admin/updates/new', icon: Plus },
        { title: 'View Site', description: 'Open main website', href: '/', icon: Eye },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-charcoal-black mb-2">Dashboard</h1>
                <p className="text-elegant-grey">Welcome to Interworld Admin. Manage your content from here.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-charcoal-black mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        {quickActions.map((action) => (
                            <QuickAction key={action.title} {...action} />
                        ))}
                    </div>

                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-charcoal-black mb-4">Content Overview</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-royal-green/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-royal-green" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm text-charcoal-black">Published Content</div>
                                    <div className="text-xs text-elegant-grey">Active items on site</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-royal-green">
                                {(publications?.filter(p => p.isPublished).length ?? 0) +
                                    (projects?.filter(p => p.isPublished).length ?? 0) +
                                    (updates?.filter(u => u.isPublished).length ?? 0)}
                            </div>
                        </div>

                        <div className="p-4 bg-charcoal-black rounded-xl text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="h-5 w-5 text-royal-green" />
                                <span className="font-semibold">Unread Messages</span>
                            </div>
                            <p className="text-white/60 text-sm mb-4">
                                You have {unreadContacts ?? 0} unread message(s) waiting for your response.
                            </p>
                            <Link href="/admin/contacts">
                                <Button className="w-full bg-royal-green hover:bg-royal-green/90 rounded-xl h-10 text-sm">
                                    View Messages
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
