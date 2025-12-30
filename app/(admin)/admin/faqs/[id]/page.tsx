'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import FAQForm from '@/components/admin/forms/FAQForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditFAQPage() {
    const params = useParams();
    const id = params.id as Id<"faqs">;
    const faq = useQuery(api.faqs.getById, { id });

    if (faq === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (faq === null) {
        return <div>FAQ not found</div>;
    }

    return (
        <FAQForm
            initialData={faq}
            isEdit={true}
        />
    );
}
