import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("gallery")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("gallery").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("gallery")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.eq(q.field("isPublished"), true))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("gallery") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ============== MUTATIONS ==============

export const create = mutation({
    args: {
        title: v.string(),
        category: v.string(),
        image: v.string(),
        description: v.string(),
        order: v.optional(v.number()),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("gallery", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("gallery"),
        title: v.optional(v.string()),
        category: v.optional(v.string()),
        image: v.optional(v.string()),
        description: v.optional(v.string()),
        order: v.optional(v.number()),
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
    args: { id: v.id("gallery") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("gallery") },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id);
        if (!item) throw new Error("Gallery item not found");

        await ctx.db.patch(args.id, {
            isPublished: !item.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
