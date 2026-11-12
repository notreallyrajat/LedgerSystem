const TransactionTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Successfully Completed</title>
</head>

<body style="margin:0; padding:0; background:#eef2f7; font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7; padding:35px 12px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#101c35; padding:35px;">

<h2 style="color:#d6b56d; margin:0; letter-spacing:2px; font-size:19px;">
✦ BANKING LEDGER
</h2>

<p style="color:#aab7cc; font-size:11px; letter-spacing:2px; margin-top:35px;">
TRANSACTION CONFIRMATION
</p>

<h1 style="color:#ffffff; font-size:32px; margin:10px 0;">
Payment Successful!
</h1>

<h2 style="color:#d6b56d; font-size:20px; font-weight:normal; margin:0;">
Your transaction is complete.
</h2>

<p style="color:#cbd5e1; font-size:15px; line-height:25px; margin-top:20px;">
Your transaction has been successfully processed.
Thank you for choosing Banking Ledger for your
financial transactions.
</p>

</td>
</tr>

<!-- Main Content -->
<tr>
<td style="padding:35px;">

<h2 style="color:#17243a; font-size:23px;">
Hello {{name}}! 👋
</h2>

<p style="color:#526176; font-size:15px; line-height:25px;">
We're pleased to inform you that your transaction
has been successfully committed to the ledger.
The transaction details are provided below for
your records.
</p>

<!-- Success Badge -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5; border-radius:10px; margin-top:25px;">
<tr>
<td align="center" style="padding:22px;">

<h2 style="color:#047857; margin:0; font-size:20px;">
✓ TRANSACTION SUCCESSFUL
</h2>

<p style="color:#065f46; font-size:13px; margin-bottom:0;">
Your payment has been successfully processed.
</p>

</td>
</tr>
</table>

<!-- Transaction Details -->
<h3 style="color:#17243a; margin-top:30px;">
Transaction Summary
</h3>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fa; border-radius:10px;">

<tr>
<td style="padding:15px; color:#64748b; font-size:14px;">
Transaction ID
</td>
<td align="right" style="padding:15px; color:#17243a; font-size:14px; font-weight:bold;">
{{transactionId}}
</td>
</tr>

<tr>
<td style="padding:15px; color:#64748b; font-size:14px;">
Amount Transferred
</td>
<td align="right" style="padding:15px; color:#047857; font-size:17px; font-weight:bold;">
₹{{amount}}
</td>
</tr>

<tr>
<td style="padding:15px; color:#64748b; font-size:14px;">
Sender
</td>
<td align="right" style="padding:15px; color:#17243a; font-size:14px;">
{{sender}}
</td>
</tr>

<tr>
<td style="padding:15px; color:#64748b; font-size:14px;">
Receiver
</td>
<td align="right" style="padding:15px; color:#17243a; font-size:14px;">
{{receiver}}
</td>
</tr>

<tr>
<td style="padding:15px; color:#64748b; font-size:14px;">
Date & Time
</td>
<td align="right" style="padding:15px; color:#17243a; font-size:14px;">
{{timestamp}}
</td>
</tr>

</table>

<!-- Security Notice -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px; border-left:4px solid #d6b56d; background:#fffbeb;">
<tr>
<td style="padding:18px;">

<strong style="color:#17243a; font-size:14px;">
Keep this confirmation for your records.
</strong>

<p style="color:#64748b; font-size:13px; line-height:22px; margin-bottom:0;">
If you did not authorize this transaction,
please contact our support team immediately.
Never share your password or authentication
credentials with anyone.
</p>

</td>
</tr>
</table>

<p style="color:#526176; font-size:14px; line-height:24px; margin-top:30px;">
Thank you for trusting Banking Ledger.
We appreciate your continued confidence in us.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f3f6fa; padding:25px; text-align:center;">

<p style="color:#526176; font-size:12px;">
© 2026 Banking Ledger. All rights reserved.
</p>

<p style="color:#94a3b8; font-size:11px;">
This is an automated transaction notification.
Please do not reply to this message.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;

module.exports = TransactionTemplate;