'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import PartnerForm from '@/components/admin/forms/PartnerForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditPartnerPage() {
    const params = useParams();
    const id = params.id as Id<"partners">;
    const partner = useQuery(api.partners.getById, { id });

    if (partner === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (partner === null) {
        return <div>Partner not found</div>;
    }

    return (
        <PartnerForm
            initialData={{
                ...partner,
                logo: partner.logo || ''
            }}
            isEdit={true}
        />
    );
}
