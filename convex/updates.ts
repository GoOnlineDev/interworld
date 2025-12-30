import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("updates")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("updates").collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("updates")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("updates")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.eq(q.field("isPublished"), true))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("updates") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ============== MUTATIONS ==============

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        category: v.string(),
        date: v.string(),
        excerpt: v.string(),
        content: v.string(),
        image: v.string(),
        publishedAt: v.optional(v.number()),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("updates", {
            ...args,
            publishedAt: args.publishedAt ?? Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("updates"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        category: v.optional(v.string()),
        date: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        content: v.optional(v.string()),
        image: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined)
        );
        await ctx.db.patch(id, filteredUpdates);
        return await ctx.db.get(id);
    },
});

export const remove = mutation({
    args: { id: v.id("updates") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("updates") },
    handler: async (ctx, args) => {
        const update = await ctx.db.get(args.id);
        if (!update) throw new Error("Update not found");

        await ctx.db.patch(args.id, {
            isPublished: !update.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
