/*
  CONFIDENT CLICKS — AFFILIATE TRACKING (frontend)
  --------------------------------------------------
  Include this file on index.html and welcome.html.
  After you deploy Code.gs as a Web App (see AFFILIATE_SETUP.md),
  paste your Web App URL below.
*/
const AFF_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

function affGetParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function affLog(type, code) {
  if (!AFF_ENDPOINT || AFF_ENDPOINT.indexOf('PASTE_') === 0) return;
  fetch(AFF_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ type: type, code: code })
  }).catch(function () { /* fail silently — never block the visitor */ });
}

/*
  Call this on index.html page load. If the visitor arrived via an
  affiliate link (?aff=CODE), this remembers it for later and logs
  a click.
*/
function affCaptureClick() {
  var code = affGetParam('aff');
  if (code) {
    localStorage.setItem('cc_aff_code', code);
    localStorage.setItem('cc_aff_time', Date.now().toString());
    affLog('click', code);
  }
}

/*
  Call this on welcome.html page load (the page PayPal returns
  buyers to). If this browser clicked an affiliate link recently
  and hasn't already been credited, this logs a conversion.

  Important honesty note: this is based on the buyer's own browser
  history, not a verified PayPal payment record. It's a reasonable,
  low-effort signal for a small referral program, but a determined
  person could fake it. True verified tracking requires connecting
  to PayPal's API directly (a bigger project — ask if you want that later).
*/
function affCaptureConversion() {
  var code = localStorage.getItem('cc_aff_code');
  var time = parseInt(localStorage.getItem('cc_aff_time') || '0', 10);
  var already = localStorage.getItem('cc_aff_converted');
  var withinWindow = (Date.now() - time) < (1000 * 60 * 60 * 48); // 48 hours
  if (code && withinWindow && !already) {
    affLog('conversion', code);
    localStorage.setItem('cc_aff_converted', '1');
  }
}
