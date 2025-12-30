import { NextRequest, NextResponse } from 'next/server';
import {
  sendNewUserPendingEmail,
  sendUserApprovedEmail,
  sendUserRejectedEmail,
  sendNewContactEmail,
  sendContactResponseEmail,
  sendNewLeadEmail,
  sendLeadAssignedEmail,
  sendContentPublishedEmail,
  type NewUserPendingData,
  type UserApprovedData,
  type UserRejectedData,
  type NewContactData,
  type ContactResponseData,
  type NewLeadData,
  type LeadAssignedData,
  type ContentPublishedData,
} from '@/lib/email';

// Email type definitions
type EmailType = 
  | 'new_user_pending'
  | 'user_approved'
  | 'user_rejected'
  | 'new_contact'
  | 'contact_response'
  | 'new_lead'
  | 'lead_assigned'
  | 'content_published';

interface EmailRequest {
  type: EmailType;
  to: string | string[];
  data: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();
    const { type, to, data } = body;

    if (!type || !to || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type, to, data' },
        { status: 400 }
      );
    }

    let result: { success: boolean; error?: string };

    switch (type) {
      case 'new_user_pending':
        result = await sendNewUserPendingEmail(
          Array.isArray(to) ? to : [to],
          data as NewUserPendingData
        );
        break;

      case 'user_approved':
        result = await sendUserApprovedEmail(
          Array.isArray(to) ? to[0] : to,
          data as UserApprovedData
        );
        break;

      case 'user_rejected':
        result = await sendUserRejectedEmail(
          Array.isArray(to) ? to[0] : to,
          data as UserRejectedData
        );
        break;

      case 'new_contact':
        result = await sendNewContactEmail(
          Array.isArray(to) ? to : [to],
          data as NewContactData
        );
        break;

      case 'contact_response':
        result = await sendContactResponseEmail(
          Array.isArray(to) ? to[0] : to,
          data as ContactResponseData
        );
        break;

      case 'new_lead':
        result = await sendNewLeadEmail(
          Array.isArray(to) ? to : [to],
          data as NewLeadData
        );
        break;

      case 'lead_assigned':
        result = await sendLeadAssignedEmail(
          Array.isArray(to) ? to[0] : to,
          data as LeadAssignedData
        );
        break;

      case 'content_published':
        result = await sendContentPublishedEmail(
          Array.isArray(to) ? to[0] : to,
          data as ContentPublishedData
        );
        break;

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
