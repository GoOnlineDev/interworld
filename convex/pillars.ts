import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("pillars")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("pillars").collect();
    },
});

export const getById = query({
    args: { id: v.id("pillars") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ============== MUTATIONS ==============

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        iconName: v.string(),
        order: v.optional(v.number()),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("pillars", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("pillars"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        iconName: v.optional(v.string()),
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
    args: { id: v.id("pillars") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("pillars") },
    handler: async (ctx, args) => {
        const pillar = await ctx.db.get(args.id);
        if (!pillar) throw new Error("Pillar not found");

        await ctx.db.patch(args.id, {
            isPublished: !pillar.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
