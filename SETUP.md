# Confident Clicks — Setup Guide

Everything below is written so you can do it tonight, step by step, with no coding experience needed.

## 1. Connect PayPal so payments go to your email

This site uses PayPal's newer **Payment Link** feature (the kind that gives you a link like `paypal.com/ncp/payment/...`), which is simpler than the old button code.

1. Log into paypal.com with the account tied to **trubyconsulting@gmail.com** (create a free Business account if you don't have one).
2. Search PayPal's help/search bar for "Payment Links" or go to **Pay & Get Paid → Payment Links**.
3. Create a link with:
   - Item name: `Confident Clicks: Computer Basics for Seniors`
   - Price: `19.00 USD`
4. Turn on **Auto Return** in the link's settings, and set the return address to your `welcome.html` page once it's hosted (see step 2 below) — e.g. `https://trubyconsulting.github.io/confident-clicks/welcome.html`. This is configured entirely inside PayPal's dashboard now, not in the website code.
5. Save it. PayPal gives you a link like `https://www.paypal.com/ncp/payment/XXXXXXXXXXX`.
6. That link is already placed in `index.html` on the "Get Started for $19" button. If you ever create a new payment link, just replace the URL in this line:
   ```
   <a href="https://www.paypal.com/ncp/payment/ULJ8CUBFJZLWS" class="btn" id="paypal-link">Get Started for $19</a>
   ```

### About the referral tracking with this link type
The older PayPal button code could carry a hidden referral code invisibly into your PayPal transaction. This newer Payment Link format doesn't support that — so referred buyers now see a reminder on the page asking them to email you the referral code after paying, so you can credit their friend. It's one extra manual step, and worth mentioning to buyers if you promote the referral program actively.

## 2. Host it for free (GitHub Pages)

1. Create a free account at github.com if you don't have one.
2. Create a new repository, e.g. `confident-clicks`.
3. Upload `index.html` and `welcome.html` into it (use "Add file → Upload files" in the browser — no command line needed).
4. Go to the repo's **Settings → Pages**, set the source to your main branch, and save.
5. GitHub will give you a free web address like:
   `https://yourusername.github.io/confident-clicks/`
6. Your two live pages will be:
   - `https://yourusername.github.io/confident-clicks/index.html`
   - `https://yourusername.github.io/confident-clicks/welcome.html`
7. Go back and update the PayPal button's return URL and the `return` value inside `index.html` to your real `welcome.html` address, then re-upload the file.

This hosting is genuinely free for as long as GitHub offers Pages (they have for over a decade), with no bandwidth bill for a simple static site like this.

## 3. How the referral program actually works (read this honestly)

There is no free way to fully automate "$5 per paying referral" without a backend server and a database. Here's the real, working process this site sets up instead:

- On the **welcome page**, each buyer types their name and gets a personal link like `.../index.html?ref=Jane4821`.
- When someone visits through that link and pays, their referral code rides along into the PayPal "Custom" field, so it shows up in **your PayPal Activity → transaction details** for that payment.
- Once a week (or however often you like), check PayPal for new transactions, note any `ref:` codes attached, and manually send $5 via PayPal to whoever referred them.
- This takes a few minutes of manual review per batch of sales — it is not automatic, and I want to be upfront about that rather than pretend otherwise.

If this ever grows to the point where manual tracking is a burden, the next step up (still low-cost) is a small serverless function (e.g., free tier on Vercel or Cloudflare Workers) that logs referrals to a spreadsheet automatically. Worth revisiting once you have real volume — not needed to launch tonight.

## 4. Before you promote tonight

A few things to finish first so you don't lose trust with real buyers:
- **Write the actual lesson content.** Right now the lesson list is a table of contents only. Seniors are paying for real instructions — even simple text + screenshots per lesson is enough to start; you can add video later.
- **Decide how buyers actually access the paid lessons.** Right now `welcome.html` is public to anyone with the link — that's fine for a fast launch (this is a "soft paywall," common for small creators), but don't post the `welcome.html` link publicly, only share it via the PayPal return redirect.
- **Update the `og:title`/`canonical` URLs** in `index.html`'s `<head>` to your real GitHub Pages address once you have it, so sharing on Facebook/social looks correct.
- **Test the full flow yourself**: visit your live index page, click "Get Started," pay $1 test amount if PayPal allows a sandbox test, or just verify the button opens PayPal correctly before sending it to real people.

## 5. Where to promote (realistic, not hypey)

- Local Facebook groups for your town or nearby senior centers/retirement communities — post as a genuine offer, not a spam link.
- Nextdoor.
- Ask friends/family to share it with their parents/grandparents — this audience trusts a personal referral far more than an ad.
- A local senior center or library sometimes will post a flyer for a low-cost class — ask.

Realistic expectations: a handful of sales in the first week from personal network sharing is a solid start. Getting to consistent, meaningful monthly income is realistic in months, not overnight, and depends on you continuing to promote it — the referral program helps, but it multiplies existing effort, it doesn't replace it.
