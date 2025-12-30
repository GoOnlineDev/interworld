'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { useState } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Mail,
    MailOpen,
    Archive,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';

export default function ContactsPage() {
    const contacts = useQuery(api.contacts.getAll);
    const markAsRead = useMutation(api.contacts.markAsRead);
    const markAsUnread = useMutation(api.contacts.markAsUnread);
    const archiveContact = useMutation(api.contacts.archive);
    const removeContact = useMutation(api.contacts.remove);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

    const filteredContacts = contacts?.filter(contact => {
        const matchesSearch =
            contact.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'unread') return matchesSearch && !contact.isRead && !contact.isArchived;
        if (filter === 'archived') return matchesSearch && contact.isArchived;
        return matchesSearch && !contact.isArchived;
    });

    const handleMarkAsRead = async (id: Id<"contacts">) => {
        await markAsRead({ id });
        setActiveMenu(null);
    };

    const handleMarkAsUnread = async (id: Id<"contacts">) => {
        await markAsUnread({ id });
        setActiveMenu(null);
    };

    const handleArchive = async (id: Id<"contacts">) => {
        await archiveContact({ id });
        setActiveMenu(null);
    };

    const handleDelete = async (id: Id<"contacts">) => {
        await removeContact({ id });
        setDeleteConfirm(null);
        setActiveMenu(null);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-charcoal-black">Contact Submissions</h1>
                <p className="text-elegant-grey text-sm mt-1">Manage messages from the contact form</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'unread', 'archived'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as typeof filter)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium capitalize transition-colors ${filter === f
                                    ? 'bg-royal-green text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contacts List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {!contacts ? (
                    <div className="p-8 text-center text-elegant-grey">Loading...</div>
                ) : filteredContacts?.length === 0 ? (
                    <div className="p-8 text-center">
                        <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-elegant-grey">No messages found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredContacts?.map((contact) => (
                            <div
                                key={contact._id}
                                className={`p-4 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${!contact.isRead ? 'bg-blue-50/50' : ''
                                    }`}
                                onClick={() => {
                                    setSelectedMessage(selectedMessage === contact._id ? null : contact._id);
                                    if (!contact.isRead) {
                                        handleMarkAsRead(contact._id);
                                    }
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${contact.isRead ? 'bg-gray-100' : 'bg-royal-green'
                                        }`}>
                                        {contact.isRead ? (
                                            <MailOpen className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <Mail className="h-5 w-5 text-white" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4 mb-1">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className={`font-semibold truncate ${!contact.isRead ? 'text-charcoal-black' : 'text-gray-700'}`}>
                                                    {contact.fullName}
                                                </span>
                                                {!contact.isRead && (
                                                    <span className="w-2 h-2 bg-royal-green rounded-full shrink-0" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-xs text-elegant-grey flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(contact.submittedAt)}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMenu(activeMenu === contact._id ? null : contact._id);
                                                    }}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-elegant-grey truncate">{contact.email}</p>
                                        <p className={`text-sm mt-1 ${!contact.isRead ? 'font-semibold text-charcoal-black' : 'text-gray-700'}`}>
                                            {contact.subject}
                                        </p>

                                        {/* Expanded message */}
                                        {selectedMessage === contact._id && (
                                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                                <p className="text-sm text-charcoal-black whitespace-pre-wrap">{contact.message}</p>
                                                <div className="mt-4 flex gap-2">
                                                    <a href={`mailto:${contact.email}`}>
                                                        <Button className="bg-royal-green hover:bg-royal-green/90 rounded-lg h-9 text-sm">
                                                            Reply via Email
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Menu */}
                                {activeMenu === contact._id && (
                                    <div
                                        className="absolute right-6 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {contact.isRead ? (
                                            <button
                                                onClick={() => handleMarkAsUnread(contact._id)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Mail className="h-4 w-4" /> Mark as unread
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkAsRead(contact._id)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <MailOpen className="h-4 w-4" /> Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleArchive(contact._id)}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            <Archive className="h-4 w-4" /> Archive
                                        </button>
                                        <hr className="my-2" />
                                        <button
                                            onClick={() => setDeleteConfirm(contact._id)}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </button>
                                    </div>
                                )}

                                {/* Delete Confirmation */}
                                {deleteConfirm === contact._id && (
                                    <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100" onClick={(e) => e.stopPropagation()}>
                                        <p className="text-sm text-red-800 mb-3">
                                            Are you sure you want to delete this message? This action cannot be undone.
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDelete(contact._id)}
                                                className="bg-red-600 hover:bg-red-700 rounded-lg h-9 text-sm"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => setDeleteConfirm(null)}
                                                variant="outline"
                                                className="rounded-lg h-9 text-sm"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Click outside to close menu */}
            {activeMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveMenu(null)}
                />
            )}
        </div>
    );
}
