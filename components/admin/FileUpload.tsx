"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { X, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming sonner is used, or I'll use simple alert/console for now if not sure

interface FileUploadProps {
    endpoint: "imageUploader" | "galleryUploader" | "partnerLogoUploader" | "pdfUploader";
    value?: string;
    onChange: (url?: string) => void;
    label?: string;
}

export default function FileUpload({ endpoint, value, onChange, label }: FileUploadProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    // Determine file type based on endpoint or value
    const isPdf = endpoint === "pdfUploader" || value?.endsWith(".pdf");

    if (value) {
        return (
            <div className="space-y-2">
                {label && <label className="text-sm font-semibold text-charcoal-black">{label}</label>}
                <div className="relative rounded-xl border border-gray-200 overflow-hidden group">
                    {/* Delete Functionality - Simulation since UT doesn't support client-side delete easily without server action */}
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="button"
                            onClick={() => onChange(undefined)}
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {isPdf ? (
                        <div className="flex items-center gap-4 p-4 bg-gray-50">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <FileText className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-charcoal-black truncate mb-1">
                                    PDF Document
                                </p>
                                <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-royal-green hover:underline break-all"
                                >
                                    {value}
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="relative aspect-video w-full bg-gray-100">
                            <Image
                                src={value}
                                alt="Upload"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-semibold text-charcoal-black">{label}</label>}
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.error(error);
                    alert(`ERROR! ${error.message}`);
                }}
                className="ut-label:text-royal-green ut-allowed-content:text-gray-400 border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl"
                appearance={{
                    button: "bg-royal-green text-white hover:bg-royal-green/90",
                    container: "w-full p-8"
                }}
            />
        </div>
    );
}
