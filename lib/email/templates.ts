/**
 * Email Templates for Bizen Green Future
 * All templates use inline styles for maximum email client compatibility
 */

// Get the app URL for logo (emails need absolute URLs)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const LOGO_URL = `${APP_URL}/logo.png`;

// Brand colors
const colors = {
  primary: '#22c55e',
  primaryDark: '#15803d',
  white: '#ffffff',
  gray: '#6b7280',
  grayLight: '#f3f4f6',
  grayDark: '#374151',
  yellow: '#fbbf24',
  yellowBg: '#fef3c7',
  red: '#ef4444',
  redBg: '#fee2e2',
  blue: '#3b82f6',
  blueBg: '#dbeafe',
};

// Base wrapper for all emails
function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bizen Green Future</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.grayLight}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%); padding: 32px; text-align: center;">
              <img 
                src="${LOGO_URL}" 
                alt="Bizen Green Future" 
                width="80" 
                height="80" 
                style="display: block; margin: 0 auto 16px auto; max-width: 80px; height: auto;"
              />
              <h1 style="margin: 0; color: ${colors.white}; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                Bizen Green Future
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Sustainable Solutions for a Greener Tomorrow
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: ${colors.grayLight}; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
              <img 
                src="${LOGO_URL}" 
                alt="Bizen" 
                width="40" 
                height="40" 
                style="display: block; margin: 0 auto 12px auto; max-width: 40px; height: auto; opacity: 0.7;"
              />
              <p style="margin: 0 0 8px 0; color: ${colors.gray}; font-size: 14px;">
                © ${new Date().getFullYear()} Bizen Green Future Ltd. All rights reserved.
              </p>
              <p style="margin: 0; color: ${colors.gray}; font-size: 12px;">
                Kampala, Uganda Rubaga Road Opposite Red Cross | info@bizengreenfuture.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Button component
function button(text: string, url: string, color: string = colors.primary): string {
  return `
    <table role="presentation" style="margin: 24px 0;">
      <tr>
        <td style="background-color: ${color}; border-radius: 8px;">
          <a href="${url}" style="display: inline-block; padding: 14px 28px; color: ${colors.white}; text-decoration: none; font-weight: 600; font-size: 16px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
}

// Info box component
function infoBox(content: string, bgColor: string = colors.grayLight, borderColor: string = '#e5e7eb'): string {
  return `
    <div style="background-color: ${bgColor}; border-left: 4px solid ${borderColor}; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 16px 0;">
      ${content}
    </div>
  `;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export interface NewUserPendingData {
  userName: string;
  userEmail: string;
  signupTime: string;
  adminDashboardUrl: string;
}

export function newUserPendingTemplate(data: NewUserPendingData): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      👤 New User Awaiting Approval
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      A new user has signed up and is waiting for your approval to access the admin dashboard.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Name:</strong> ${data.userName}</p>
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Email:</strong> ${data.userEmail}</p>
      <p style="margin: 0; color: ${colors.gray}; font-size: 14px;"><strong>Signed up:</strong> ${data.signupTime}</p>
    `, colors.yellowBg, colors.yellow)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Please review this request and approve or reject the user from the Team Management page.
    </p>
    
    ${button('Review User', data.adminDashboardUrl, colors.primaryDark)}
  `;
  
  return baseTemplate(content);
}

export interface UserApprovedData {
  userName: string;
  role: 'admin' | 'editor';
  adminDashboardUrl: string;
}

export function userApprovedTemplate(data: UserApprovedData): string {
  const roleDescription = data.role === 'admin' 
    ? 'full access to manage content, publish items, and manage team members'
    : 'create and edit products, gallery items, and manage contacts and leads';
    
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      🎉 Welcome to the Team!
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Hi ${data.userName}, great news! Your account has been approved.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 16px;">
        <strong>Your Role:</strong> <span style="color: ${colors.primary}; text-transform: capitalize;">${data.role}</span>
      </p>
      <p style="margin: 0; color: ${colors.gray}; font-size: 14px;">
        You can now ${roleDescription}.
      </p>
    `, colors.blueBg, colors.blue)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Click the button below to access the admin dashboard and get started.
    </p>
    
    ${button('Go to Dashboard', data.adminDashboardUrl)}
  `;
  
  return baseTemplate(content);
}

export interface UserRejectedData {
  userName: string;
}

export function userRejectedTemplate(data: UserRejectedData): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      Account Request Update
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Hi ${data.userName}, thank you for your interest in joining the Bizen Green Future team.
    </p>
    
    ${infoBox(`
      <p style="margin: 0; color: ${colors.grayDark}; font-size: 14px;">
        Unfortunately, your request for admin access has not been approved at this time.
      </p>
    `, colors.redBg, colors.red)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      If you believe this was a mistake or have questions, please contact us at info@bizengreenfuture.com.
    </p>
  `;
  
  return baseTemplate(content);
}

export interface NewContactData {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  message: string;
  submittedAt: string;
  adminDashboardUrl: string;
}

export function newContactTemplate(data: NewContactData): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      📬 New Contact Form Submission
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Someone has submitted a contact form on the website.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Name:</strong> ${data.contactName}</p>
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Email:</strong> ${data.contactEmail}</p>
      ${data.contactPhone ? `<p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Phone:</strong> ${data.contactPhone}</p>` : ''}
      <p style="margin: 0; color: ${colors.gray}; font-size: 12px;"><strong>Submitted:</strong> ${data.submittedAt}</p>
    `)}
    
    <div style="background-color: ${colors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
        Message
      </p>
      <p style="margin: 0; color: ${colors.grayDark}; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${data.message}
      </p>
    </div>
    
    ${button('View in Dashboard', data.adminDashboardUrl)}
    
    <p style="margin: 16px 0 0 0; color: ${colors.gray}; font-size: 12px;">
      Reply directly to: <a href="mailto:${data.contactEmail}" style="color: ${colors.primary};">${data.contactEmail}</a>
    </p>
  `;
  
  return baseTemplate(content);
}

export interface ContactResponseData {
  contactName: string;
}

export function contactResponseTemplate(data: ContactResponseData): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      Thank You for Reaching Out!
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Dear ${data.contactName},
    </p>
    <p style="margin: 0 0 16px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Thank you for contacting Bizen Green Future Ltd. We have received your message and our team will get back to you shortly.
    </p>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      We typically respond within 24-48 business hours. In the meantime, feel free to learn more about our sustainable agricultural solutions on our website.
    </p>
    
    ${infoBox(`
      <p style="margin: 0; color: ${colors.grayDark}; font-size: 14px;">
        <strong>Our mission:</strong> Transforming agriculture through innovative, eco-friendly solutions that enhance productivity while protecting our environment.
      </p>
    `)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Warm regards,<br>
      <strong style="color: ${colors.grayDark};">The Bizen Green Future Team</strong>
    </p>
  `;
  
  return baseTemplate(content);
}

export interface NewLeadData {
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  company?: string;
  interest: string;
  source?: string;
  adminDashboardUrl: string;
}

export function newLeadTemplate(data: NewLeadData): string {
  const interestLabels: Record<string, string> = {
    supertech: '🧪 SuperTech Products',
    fertilizers: '🌿 Organic Fertilizers',
    feed: '🐄 Animal Feed',
    general: '📋 General Inquiry',
  };
  
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      🎯 New Lead Captured
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      A new potential customer has shown interest in your products.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Name:</strong> ${data.leadName}</p>
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Email:</strong> ${data.leadEmail}</p>
      ${data.leadPhone ? `<p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Phone:</strong> ${data.leadPhone}</p>` : ''}
      ${data.company ? `<p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Company:</strong> ${data.company}</p>` : ''}
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Interest:</strong> ${interestLabels[data.interest] || data.interest}</p>
      ${data.source ? `<p style="margin: 0; color: ${colors.gray}; font-size: 12px;"><strong>Source:</strong> ${data.source}</p>` : ''}
    `, colors.blueBg, colors.blue)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Follow up with this lead as soon as possible to maximize conversion.
    </p>
    
    ${button('View Lead Details', data.adminDashboardUrl)}
  `;
  
  return baseTemplate(content);
}

export interface LeadAssignedData {
  assigneeName: string;
  leadName: string;
  leadEmail: string;
  interest: string;
  adminDashboardUrl: string;
}

export function leadAssignedTemplate(data: LeadAssignedData): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      📋 Lead Assigned to You
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Hi ${data.assigneeName}, a lead has been assigned to you for follow-up.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Lead Name:</strong> ${data.leadName}</p>
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Email:</strong> ${data.leadEmail}</p>
      <p style="margin: 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Interest:</strong> ${data.interest}</p>
    `)}
    
    <p style="margin: 24px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Please reach out to this lead and update the status in the dashboard.
    </p>
    
    ${button('View Lead', data.adminDashboardUrl)}
  `;
  
  return baseTemplate(content);
}

export interface ContentPublishedData {
  creatorName: string;
  contentType: 'product' | 'gallery';
  contentTitle: string;
  publishedBy: string;
  viewUrl?: string;
}

export function contentPublishedTemplate(data: ContentPublishedData): string {
  const typeLabel = data.contentType === 'product' ? '📦 Product' : '🖼️ Gallery Item';
  
  const content = `
    <h2 style="margin: 0 0 16px 0; color: ${colors.grayDark}; font-size: 24px; font-weight: 600;">
      ✅ Your Content is Live!
    </h2>
    <p style="margin: 0 0 24px 0; color: ${colors.gray}; font-size: 16px; line-height: 1.6;">
      Hi ${data.creatorName}, your content has been published and is now visible on the website.
    </p>
    
    ${infoBox(`
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Type:</strong> ${typeLabel}</p>
      <p style="margin: 0 0 8px 0; color: ${colors.grayDark}; font-size: 14px;"><strong>Title:</strong> ${data.contentTitle}</p>
      <p style="margin: 0; color: ${colors.gray}; font-size: 12px;"><strong>Published by:</strong> ${data.publishedBy}</p>
    `, colors.blueBg, colors.primary)}
    
    ${data.viewUrl ? button('View on Website', data.viewUrl) : ''}
    
    <p style="margin: 16px 0 0 0; color: ${colors.gray}; font-size: 14px; line-height: 1.6;">
      Great work! Keep creating amazing content for Bizen Green Future.
    </p>
  `;
  
  return baseTemplate(content);
}
