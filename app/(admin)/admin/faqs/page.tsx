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
    HelpCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';

export default function FAQsPage() {
    const faqs = useQuery(api.faqs.getAll);
    const togglePublish = useMutation(api.faqs.togglePublish);
    const removeFaq = useMutation(api.faqs.remove);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const categories = faqs ? ['all', ...new Set(faqs.map(f => f.category))] : ['all'];

    const filteredFaqs = faqs?.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleTogglePublish = async (id: Id<"faqs">) => {
        await togglePublish({ id });
        setActiveMenu(null);
    };

    const handleDelete = async (id: Id<"faqs">) => {
        await removeFaq({ id });
        setDeleteConfirm(null);
        setActiveMenu(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-charcoal-black">FAQs</h1>
                    <p className="text-elegant-grey text-sm mt-1">Manage frequently asked questions</p>
                </div>
                <Link href="/admin/faqs/new">
                    <Button className="bg-royal-green hover:bg-royal-green/90 rounded-xl h-12 px-6 shadow-lg shadow-royal-green/20">
                        <Plus className="h-5 w-5 mr-2" /> Add FAQ
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-colors ${categoryFilter === cat
                                    ? 'bg-royal-green text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQs List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {!faqs ? (
                    <div className="p-8 text-center text-elegant-grey">Loading...</div>
                ) : filteredFaqs?.length === 0 ? (
                    <div className="p-8 text-center">
                        <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-elegant-grey">No FAQs found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredFaqs?.map((faq) => (
                            <div key={faq._id} className="hover:bg-gray-50 transition-colors">
                                <div
                                    className="p-4 lg:p-6 cursor-pointer"
                                    onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${faq.isPublished
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {faq.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-charcoal-black">{faq.question}</h3>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {expandedFaq === faq._id ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenu(activeMenu === faq._id ? null : faq._id);
                                                }}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <MoreVertical className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Answer */}
                                    {expandedFaq === faq._id && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-elegant-grey whitespace-pre-wrap">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions Menu */}
                                {activeMenu === faq._id && (
                                    <div className="absolute right-6 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                                        <Link
                                            href={`/admin/faqs/${faq._id}`}
                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleTogglePublish(faq._id)}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            {faq.isPublished ? (
                                                <><EyeOff className="h-4 w-4" /> Unpublish</>
                                            ) : (
                                                <><Eye className="h-4 w-4" /> Publish</>
                                            )}
                                        </button>
                                        <hr className="my-2" />
                                        <button
                                            onClick={() => setDeleteConfirm(faq._id)}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </button>
                                    </div>
                                )}

                                {/* Delete Confirmation */}
                                {deleteConfirm === faq._id && (
                                    <div className="p-4 bg-red-50 border-t border-red-100" onClick={(e) => e.stopPropagation()}>
                                        <p className="text-sm text-red-800 mb-3">Delete this FAQ?</p>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDelete(faq._id)}
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

            {activeMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)} />
            )}
        </div>
    );
}
