# Affiliate Program Setup Guide

This gives you a real affiliate program: a signup page, personal tracking links, banners, a stats dashboard, and $5-per-referral tracking — all running on a free Google Sheet as the backend. No new accounts needed beyond the Google account you already have.

## What you're getting (and the one honest limit)

- Affiliates sign up at `affiliate-signup.html`, get a unique code and link.
- Every visit through their link is logged automatically as a "click."
- When someone completes a purchase and lands on `welcome.html`, it's logged as a "conversion" **if that same browser clicked an affiliate link within the last 48 hours.**
- Affiliates can check their own stats anytime at `affiliate-dashboard.html`.

**The honest limit:** conversions are tracked by browser behavior, not by a verified PayPal payment record. In practice this works fine for a small, trust-based program — but a technically savvy person could visit the return page without actually paying and fake a conversion. For a $5 payout at small scale, this is a reasonable tradeoff. If you ever want conversions verified directly against real PayPal payments, that's a bigger project (connecting to PayPal's API) — let me know if you want to go that route later.

## Step 1: Create the Google Sheet backend

1. Go to sheets.google.com and create a new blank spreadsheet. Name it something like "Confident Clicks Affiliate Data."
2. Go to **Extensions → Apps Script**.
3. Delete any starter code in the editor, and paste in the entire contents of `Code.gs` (included in your files).
4. Click the **Save** icon (or Ctrl+S).
5. Click **Deploy → New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
8. Click **Deploy**. The first time, Google will ask you to authorize the script — click through the prompts (you'll see a warning screen since it's your own unverified script; click "Advanced" then "Go to [project name] (unsafe)" — this is normal and safe since it's your own code).
9. Copy the **Web app URL** it gives you (looks like `https://script.google.com/macros/s/XXXXXXXX/exec`).

## Step 2: Connect your site to the backend

1. Open `affiliate.js` in a text editor.
2. Find this line near the top:
   ```
   const AFF_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder with your real Web App URL from Step 1, keeping the quotes:
   ```
   const AFF_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```
4. Save the file.

## Step 3: Upload everything to GitHub

Upload these new files into your existing repo, alongside your other files:
- `affiliate.js`
- `affiliate-signup.html`
- `affiliate-dashboard.html`
- `banner-728x90.png`
- `banner-300x250.png`

Also re-upload your updated `index.html` and `welcome.html` — both now include the affiliate tracking script.

## Step 4: Test it yourself before promoting

1. Visit `affiliate-signup.html` on your live site and sign up with a test name/email.
2. Confirm you get a real link and see the banners.
3. Open your Google Sheet — you should see a new row in an "Affiliates" tab.
4. Visit your `index.html` using the link you just got (with `?aff=YOURCODE` on the end). Check the Sheet — a "Clicks" tab should now have a row.
5. Click through to PayPal and land on `welcome.html` (a real test purchase, or just visiting that URL directly within the test window). Check the Sheet's "Conversions" tab for a new row.
6. Go to `affiliate-dashboard.html`, enter your test code, and confirm the stats show up.

## Step 5: Paying your affiliates

Once a week (or however often you like):
1. Open your Google Sheet.
2. Check the "Conversions" tab for new rows since your last payout.
3. Cross-reference the code with the "Affiliates" tab to find their name and email.
4. Send $5 per conversion via PayPal to that email.

This is the one manual step in the "simple" version of this system — everything else (signup, link generation, click tracking, stats) runs automatically.

## Where the banners point

Affiliates should wrap the banner images in a link to their own personal link (shown to them on the signup page), for example:

```html
<a href="https://trubyconsulting.github.io/confident-clicks/index.html?aff=Jane4821">
  <img src="banner-728x90.png" alt="Confident Clicks">
</a>
```

You may want to mention this in a quick note to affiliates, since not everyone will think to link the image themselves.
