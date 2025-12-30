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
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Id } from '@/convex/_generated/dataModel';

export default function GalleryPage() {
    const gallery = useQuery(api.gallery.getAll);
    const togglePublish = useMutation(api.gallery.togglePublish);
    const removeItem = useMutation(api.gallery.remove);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const categories = gallery ? ['all', ...new Set(gallery.map(g => g.category))] : ['all'];

    const filteredGallery = gallery?.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleTogglePublish = async (id: Id<"gallery">) => {
        await togglePublish({ id });
        setActiveMenu(null);
    };

    const handleDelete = async (id: Id<"gallery">) => {
        await removeItem({ id });
        setDeleteConfirm(null);
        setActiveMenu(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-charcoal-black">Gallery</h1>
                    <p className="text-elegant-grey text-sm mt-1">Manage your image gallery</p>
                </div>
                <Link href="/admin/gallery/new">
                    <Button className="bg-royal-green hover:bg-royal-green/90 rounded-xl h-12 px-6 shadow-lg shadow-royal-green/20">
                        <Plus className="h-5 w-5 mr-2" /> Add Image
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search gallery..."
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

            {/* Gallery Grid */}
            {!gallery ? (
                <div className="p-8 text-center text-elegant-grey">Loading...</div>
            ) : filteredGallery?.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-elegant-grey">No images found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredGallery?.map((item) => (
                        <div key={item._id} className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                            {/* Image */}
                            <div className="aspect-square relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleTogglePublish(item._id)}
                                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        {item.isPublished ? (
                                            <EyeOff className="h-4 w-4 text-gray-700" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-700" />
                                        )}
                                    </button>
                                    <Link
                                        href={`/admin/gallery/${item._id}`}
                                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Edit className="h-4 w-4 text-gray-700" />
                                    </Link>
                                    <button
                                        onClick={() => setDeleteConfirm(item._id)}
                                        className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>

                                {/* Status badge */}
                                <div className="absolute top-2 left-2">
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${item.isPublished
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-500 text-white'
                                        }`}>
                                        {item.isPublished ? 'Live' : 'Draft'}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <h3 className="font-semibold text-sm text-charcoal-black truncate">{item.title}</h3>
                                <p className="text-xs text-elegant-grey truncate mt-1">{item.category}</p>
                            </div>

                            {/* Delete Confirmation Modal */}
                            {deleteConfirm === item._id && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
                                    <div className="bg-white rounded-xl p-4 w-full max-w-xs">
                                        <p className="text-sm text-charcoal-black mb-4">Delete this image?</p>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDelete(item._id)}
                                                className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg h-9 text-sm"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => setDeleteConfirm(null)}
                                                variant="outline"
                                                className="flex-1 rounded-lg h-9 text-sm"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
