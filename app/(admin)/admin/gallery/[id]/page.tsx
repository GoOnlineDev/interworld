'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import GalleryForm from '@/components/admin/forms/GalleryForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditGalleryItemPage() {
    const params = useParams();
    const id = params.id as Id<"gallery">;
    const item = useQuery(api.gallery.getById, { id });

    if (item === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (item === null) {
        return <div>Image not found</div>;
    }

    return (
        <GalleryForm
            initialData={{
                ...item,
                description: item.description || ''
            }}
            isEdit={true}
        />
    );
}
