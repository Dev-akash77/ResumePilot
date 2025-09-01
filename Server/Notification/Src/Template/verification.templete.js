export const accountVerificationTemplate = (userName, otpCode) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; background-color: var(--background, #ffffff); color: var(--text, #121212); border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: var(--blue, #5044e5); color: var(--white, #ffffff); text-align: center; padding: 18px;">
      <h2 style="margin: 0; font-size: 22px;">🔐 Verify Your Account</h2>
    </div>

    <!-- Body -->
    <div style="padding: 24px;">
      <p style="margin: 0 0 12px;">Hello <strong>${userName}</strong>,</p>

      <p style="margin: 0 0 18px;">To complete your account setup, use the One-Time Password (OTP) below:</p>

      <!-- OTP Block -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="font-size: 16px; margin-bottom: 10px; color: var(--grayBlack, #314158);">Your OTP is:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: var(--text, #121212); padding: 14px 0; border: 1px dashed #ccc; display: inline-block; width: 220px; background-color: #f9f9f9; border-radius: 6px;">
          ${otpCode}
        </div>
      </div>

      <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
        This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
      </p>

      <!-- Button -->
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="display: inline-block; background-color: var(--blue, #5044e5); color: var(--white, #ffffff); padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Verify Now
        </a>
      </div>

      <p style="margin-top: 30px;">Stay secure,<br><strong>The ResumePilot Team</strong></p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;" />
      <p style="font-size: 12px; color: #888888; text-align: center;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  </div>
`;
