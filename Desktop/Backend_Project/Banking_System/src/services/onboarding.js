const OnboardingTemplate =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Banking Ledger</title>
</head>

<body style="margin:0; padding:0; background:#eef2f7;
font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#eef2f7; padding:35px 12px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="max-width:600px; background:#ffffff;
border-radius:14px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#101c35; padding:35px 35px 25px;">

<h2 style="color:#d6b56d; margin:0;
letter-spacing:2px; font-size:19px;">
✦ BANKING LEDGER
</h2>

<p style="color:#aab7cc; font-size:11px;
letter-spacing:2px; margin-top:35px;">
YOUR ACCOUNT HAS BEEN CREATED
</p>

<h1 style="color:#ffffff; font-size:36px;
margin:10px 0;">
Welcome aboard.
</h1>

<h2 style="color:#d6b56d; font-size:21px;
font-weight:normal; margin:0;">
Your financial journey starts here.
</h2>

<p style="color:#cbd5e1; font-size:15px;
line-height:25px; margin-top:20px;">
We're delighted to have you with us.
A smarter and simpler way to manage
your financial activity starts today.
</p>

</td>
</tr>

<!-- Main content -->
<tr>
<td style="padding:35px;">

<h2 style="color:#17243a; font-size:23px;">
Hello {{name}}! 👋
</h2>

<p style="color:#526176; font-size:15px;
line-height:25px;">
Thank you for joining Banking Ledger.
We're excited to have you on our platform.
Your account has been successfully created
and you're ready to get started.
</p>

<h3 style="color:#17243a; margin-top:30px;">
Here's what awaits you:
</h3>

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#f3f6fa; border-radius:10px;">

<tr>
<td style="padding:17px;">
<strong style="color:#17243a;">
✓ Secure account management
</strong>
<p style="color:#64748b; font-size:13px; margin-bottom:0;">
Keep your account information protected.
</p>
</td>
</tr>

<tr>
<td style="padding:17px;">
<strong style="color:#17243a;">
✓ Financial activity tracking
</strong>
<p style="color:#64748b; font-size:13px; margin-bottom:0;">
Stay informed about your transactions.
</p>
</td>
</tr>

<tr>
<td style="padding:17px;">
<strong style="color:#17243a;">
✓ Smarter money management
</strong>
<p style="color:#64748b; font-size:13px; margin-bottom:0;">
Manage your financial activities in one place.
</p>
</td>
</tr>

</table>

<!-- CTA -->
<table width="100%" cellpadding="0" cellspacing="0"
style="margin-top:30px;">
<tr>
<td align="center" style="background:#17243a;
border-radius:8px; padding:20px;">

<h3 style="color:#ffffff; margin:0;
font-size:17px;">
Your journey begins now.
</h3>

<p style="color:#cbd5e1; font-size:13px;
margin-bottom:0;">
Thank you for trusting Banking Ledger.
</p>

</td>
</tr>
</table>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f3f6fa; padding:25px;
text-align:center;">

<p style="color:#526176; font-size:12px;">
© 2026 Banking Ledger. All rights reserved.
</p>

<p style="color:#94a3b8; font-size:11px;">
This is an automated welcome email.
Please do not reply to this message.
</p>

</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>`



module.exports = OnboardingTemplate