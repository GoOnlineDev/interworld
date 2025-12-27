import nodemailer from 'nodemailer';

// Singleton transporter instance with connection pooling
// This follows best practices for nodemailer optimization
let transporter: nodemailer.Transporter | null = null;

/**
 * Get or create a reusable transporter instance
 * Uses connection pooling for better performance
 */
export function getTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  // Validate environment variables
  const email = process.env.EMAIL;
  const password = process.env.EMAIL_PASSWORD;

  if (!email || !password) {
    throw new Error('Email credentials not configured. Set EMAIL and EMAIL_PASSWORD environment variables.');
  }

  // Create pooled transporter for Gmail
  transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    pool: true, // Enable connection pooling
    maxConnections: 3, // Max simultaneous connections (keep low for Gmail)
    maxMessages: 50, // Messages per connection before recycling
    auth: {
      user: email,
      pass: password, // App password from Google
    },
    // Timeouts for reliability
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 30000,
  });

  // Verify connection on first use
  transporter.verify((error) => {
    if (error) {
      console.error('Email transporter verification failed:', error.message);
      transporter = null; // Reset to retry on next call
    } else {
      console.log('Email transporter ready');
    }
  });

  return transporter;
}

/**
 * Close the transporter pool gracefully
 * Call this during app shutdown
 */
export function closeTransporter(): void {
  if (transporter) {
    transporter.close();
    transporter = null;
  }
}

/**
 * Check if the transporter is ready
 */
export async function isTransporterReady(): Promise<boolean> {
  try {
    const t = getTransporter();
    await t.verify();
    return true;
  } catch {
    return false;
  }
}
