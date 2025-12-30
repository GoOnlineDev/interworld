import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("contacts")
            .order("desc")
            .collect();
    },
});

export const getUnread = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("contacts")
            .withIndex("by_read", (q) => q.eq("isRead", false))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getUnreadCount = query({
    args: {},
    handler: async (ctx) => {
        const unread = await ctx.db
            .query("contacts")
            .withIndex("by_read", (q) => q.eq("isRead", false))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .collect();
        return unread.length;
    },
});

// ============== MUTATIONS ==============

// Submit a new contact form (public)
export const submit = mutation({
    args: {
        fullName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("contacts", {
            ...args,
            submittedAt: Date.now(),
            isRead: false,
            isArchived: false,
        });
    },
});

// Mark as read
export const markAsRead = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isRead: true });
        return await ctx.db.get(args.id);
    },
});

// Mark as unread
export const markAsUnread = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isRead: false });
        return await ctx.db.get(args.id);
    },
});

// Archive a contact
export const archive = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isArchived: true });
        return await ctx.db.get(args.id);
    },
});

// Unarchive a contact
export const unarchive = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isArchived: false });
        return await ctx.db.get(args.id);
    },
});

// Delete a contact permanently
export const remove = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
