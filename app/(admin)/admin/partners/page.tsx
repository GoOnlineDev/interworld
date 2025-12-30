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
    Users,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Id } from '@/convex/_generated/dataModel';

export default function PartnersPage() {
    const partners = useQuery(api.partners.getAll);
    const togglePublish = useMutation(api.partners.togglePublish);
    const removePartner = useMutation(api.partners.remove);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const filteredPartners = partners?.filter(partner =>
        partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTogglePublish = async (id: Id<"partners">) => {
        await togglePublish({ id });
        setActiveMenu(null);
    };

    const handleDelete = async (id: Id<"partners">) => {
        await removePartner({ id });
        setDeleteConfirm(null);
        setActiveMenu(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-charcoal-black">Partners</h1>
                    <p className="text-elegant-grey text-sm mt-1">Manage partner organizations</p>
                </div>
                <Link href="/admin/partners/new">
                    <Button className="bg-royal-green hover:bg-royal-green/90 rounded-xl h-12 px-6 shadow-lg shadow-royal-green/20">
                        <Plus className="h-5 w-5 mr-2" /> Add Partner
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search partners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                />
            </div>

            {/* Partners Grid */}
            {!partners ? (
                <div className="p-8 text-center text-elegant-grey">Loading...</div>
            ) : filteredPartners?.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-elegant-grey">No partners found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPartners?.map((partner) => (
                        <div key={partner._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                {/* Logo or placeholder */}
                                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                    {partner.logo ? (
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Users className="h-8 w-8 text-gray-400" />
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="relative">
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === partner._id ? null : partner._id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <MoreVertical className="h-5 w-5 text-gray-500" />
                                    </button>

                                    {activeMenu === partner._id && (
                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                                            <Link
                                                href={`/admin/partners/${partner._id}`}
                                                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Edit className="h-4 w-4" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleTogglePublish(partner._id)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                {partner.isPublished ? (
                                                    <><EyeOff className="h-4 w-4" /> Hide</>
                                                ) : (
                                                    <><Eye className="h-4 w-4" /> Show</>
                                                )}
                                            </button>
                                            <hr className="my-2" />
                                            <button
                                                onClick={() => setDeleteConfirm(partner._id)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-charcoal-black">{partner.name}</h3>
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${partner.isPublished
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {partner.isPublished ? 'Visible' : 'Hidden'}
                                </span>
                            </div>

                            {partner.description && (
                                <p className="text-sm text-elegant-grey line-clamp-2 mb-3">
                                    {partner.description}
                                </p>
                            )}

                            {partner.website && (
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-royal-green hover:underline"
                                >
                                    <Globe className="h-4 w-4" /> Website
                                </a>
                            )}

                            {/* Delete Confirmation */}
                            {deleteConfirm === partner._id && (
                                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-sm text-red-800 mb-3">Delete this partner?</p>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleDelete(partner._id)}
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

            {activeMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)} />
            )}
        </div>
    );
}
