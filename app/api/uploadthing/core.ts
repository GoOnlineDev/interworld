import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Product images uploader
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // For now, allow all uploads from admin
      // In production, you'd verify the user session here
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for:", metadata.uploadedBy);
      console.log("File URL:", file.ufsUrl);
      return { url: file.ufsUrl, uploadedBy: metadata.uploadedBy };
    }),

  // Gallery images uploader (supports multiple images)
  galleryUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 4,
    },
  })
    .middleware(async ({ req }) => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery upload complete:", file.ufsUrl);
      return { url: file.ufsUrl, uploadedBy: metadata.uploadedBy };
    }),

  // Partner logo uploader
  partnerLogoUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Partner logo upload complete:", file.ufsUrl);
      return { url: file.ufsUrl, uploadedBy: metadata.uploadedBy };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
