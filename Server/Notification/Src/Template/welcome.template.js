export const welcomeTemplate = (userName, ctaLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; color: #000000; border: 1px solid #dcdcdc; border-radius: 8px;">
    
    <h2 style="font-size: 22px; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px; margin-bottom: 20px;">
      🚀 Welcome to ResumePilot
    </h2>

    <p>Hello <strong>${userName}</strong>,</p>

    <p>We’re thrilled to have you join <strong>ResumePilot</strong> — your next-gen AI-powered resume builder. Here’s what you can do:</p>

    <div style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin: 20px 0; background-color: #fafafa;">
      <ul style="margin: 0; padding-left: 20px;">
        <li>Create a professional resume in minutes</li>
        <li>Choose modern, ATS-friendly templates</li>
        <li>Use AI to highlight your strengths</li>
        <li>Edit and download anytime</li>
      </ul>
    </div>

    <a href="${ctaLink}" style="display: inline-block; margin-top: 20px; background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Get Started
    </a>

    <p style="margin-top: 30px;">We’re excited to help you on your career journey.<br><strong>The ResumePilot Team</strong></p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #dcdcdc;" />
    <p style="font-size: 12px; color: #888888;">This is an automated message. Please do not reply.</p>
  </div>
`;
