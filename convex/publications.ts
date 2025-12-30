import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

// Get all published publications
export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("publications")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

// Get all publications (for admin)
export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("publications").collect();
    },
});

// Get publication by slug
export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("publications")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

// Get publications by category
export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("publications")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.eq(q.field("isPublished"), true))
            .collect();
    },
});

// Get publication by ID
export const getById = query({
    args: { id: v.id("publications") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ============== MUTATIONS ==============

// Create a new publication
export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        category: v.string(),
        summary: v.string(),
        fullDetails: v.string(),
        cover: v.string(),
        pdfUrl: v.optional(v.string()),
        iconName: v.string(),
        publishedAt: v.optional(v.number()),
        language: v.optional(v.string()),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("publications", {
            ...args,
            publishedAt: args.publishedAt ?? Date.now(),
        });
    },
});

// Update a publication
export const update = mutation({
    args: {
        id: v.id("publications"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        category: v.optional(v.string()),
        summary: v.optional(v.string()),
        fullDetails: v.optional(v.string()),
        cover: v.optional(v.string()),
        pdfUrl: v.optional(v.string()),
        iconName: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        language: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        // Filter out undefined values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined)
        );
        await ctx.db.patch(id, filteredUpdates);
        return await ctx.db.get(id);
    },
});

// Delete a publication
export const remove = mutation({
    args: { id: v.id("publications") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Toggle publish status
export const togglePublish = mutation({
    args: { id: v.id("publications") },
    handler: async (ctx, args) => {
        const publication = await ctx.db.get(args.id);
        if (!publication) throw new Error("Publication not found");

        await ctx.db.patch(args.id, {
            isPublished: !publication.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
