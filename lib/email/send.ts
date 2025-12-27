import { getTransporter } from './nodemailer';
import {
  newUserPendingTemplate,
  userApprovedTemplate,
  userRejectedTemplate,
  newContactTemplate,
  contactResponseTemplate,
  newLeadTemplate,
  leadAssignedTemplate,
  contentPublishedTemplate,
  type NewUserPendingData,
  type UserApprovedData,
  type UserRejectedData,
  type NewContactData,
  type ContactResponseData,
  type NewLeadData,
  type LeadAssignedData,
  type ContentPublishedData,
} from './templates';

// Get sender email from environment
const senderEmail = process.env.EMAIL || 'info@bizengreenfuture.com';
const senderName = 'Bizen Green Future';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Core email sending function with error handling
 */
async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();
    
    const result = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    console.log(`Email sent successfully: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send email:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

// ============================================
// EMAIL SENDING FUNCTIONS
// ============================================

/**
 * Notify admins about a new pending user
 */
export async function sendNewUserPendingEmail(
  adminEmails: string[],
  data: NewUserPendingData
): Promise<{ success: boolean; error?: string }> {
  if (adminEmails.length === 0) {
    return { success: false, error: 'No admin emails provided' };
  }

  return sendEmail({
    to: adminEmails,
    subject: `🔔 New User Awaiting Approval: ${data.userName}`,
    html: newUserPendingTemplate(data),
  });
}

/**
 * Notify user that they've been approved
 */
export async function sendUserApprovedEmail(
  userEmail: string,
  data: UserApprovedData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: `🎉 Welcome to Bizen Green Future - You're Approved!`,
    html: userApprovedTemplate(data),
  });
}

/**
 * Notify user that they've been rejected
 */
export async function sendUserRejectedEmail(
  userEmail: string,
  data: UserRejectedData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: `Bizen Green Future - Account Request Update`,
    html: userRejectedTemplate(data),
  });
}

/**
 * Notify team about new contact form submission
 */
export async function sendNewContactEmail(
  teamEmails: string[],
  data: NewContactData
): Promise<{ success: boolean; error?: string }> {
  if (teamEmails.length === 0) {
    return { success: false, error: 'No team emails provided' };
  }

  return sendEmail({
    to: teamEmails,
    subject: `📬 New Contact: ${data.contactName}`,
    html: newContactTemplate(data),
    replyTo: data.contactEmail,
  });
}

/**
 * Send thank you response to contact
 */
export async function sendContactResponseEmail(
  contactEmail: string,
  data: ContactResponseData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: contactEmail,
    subject: `Thank you for contacting Bizen Green Future`,
    html: contactResponseTemplate(data),
  });
}

/**
 * Notify admins about new lead
 */
export async function sendNewLeadEmail(
  adminEmails: string[],
  data: NewLeadData
): Promise<{ success: boolean; error?: string }> {
  if (adminEmails.length === 0) {
    return { success: false, error: 'No admin emails provided' };
  }

  return sendEmail({
    to: adminEmails,
    subject: `🎯 New Lead: ${data.leadName} (${data.interest})`,
    html: newLeadTemplate(data),
  });
}

/**
 * Notify user that a lead was assigned to them
 */
export async function sendLeadAssignedEmail(
  assigneeEmail: string,
  data: LeadAssignedData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: assigneeEmail,
    subject: `📋 Lead Assigned: ${data.leadName}`,
    html: leadAssignedTemplate(data),
  });
}

/**
 * Notify content creator that their content was published
 */
export async function sendContentPublishedEmail(
  creatorEmail: string,
  data: ContentPublishedData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: creatorEmail,
    subject: `✅ Your ${data.contentType} "${data.contentTitle}" is now live!`,
    html: contentPublishedTemplate(data),
  });
}

// Export all types for use in API routes
export type {
  NewUserPendingData,
  UserApprovedData,
  UserRejectedData,
  NewContactData,
  ContactResponseData,
  NewLeadData,
  LeadAssignedData,
  ContentPublishedData,
};
