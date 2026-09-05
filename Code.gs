/*
  CONFIDENT CLICKS — AFFILIATE TRACKING BACKEND
  ------------------------------------------------
  This runs inside a Google Sheet (via Extensions > Apps Script) and acts
  as a free API for the affiliate program. It stores everything as rows
  in the spreadsheet, so you can always open the sheet directly to see
  raw data — no separate database to manage.

  See AFFILIATE_SETUP.md for exact setup steps.
*/

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var now = new Date();

  if (data.type === 'signup') {
    var sheet = getOrCreateSheet(ss, 'Affiliates', ['Code', 'Name', 'Email', 'Date Joined']);
    var code = generateCode(data.name, sheet);
    sheet.appendRow([code, data.name, data.email, now]);
    return jsonResponse({ code: code });
  }

  if (data.type === 'click' || data.type === 'conversion') {
    var sheetName = data.type === 'click' ? 'Clicks' : 'Conversions';
    var sheet = getOrCreateSheet(ss, sheetName, ['Code', 'Timestamp']);
    sheet.appendRow([data.code, now]);
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'Unknown request type' });
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var code = e.parameter.code;
  if (!code) {
    return jsonResponse({ error: 'Missing affiliate code' });
  }
  var clicks = countMatches(ss, 'Clicks', code);
  var conversions = countMatches(ss, 'Conversions', code);
  return jsonResponse({
    code: code,
    clicks: clicks,
    conversions: conversions,
    earnings: conversions * 5
  });
}

function getOrCreateSheet(ss, name, headerRow) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
  }
  return sheet;
}

function countMatches(ss, sheetName, code) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return 0;
  var values = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === code) count++;
  }
  return count;
}

function generateCode(name, sheet) {
  var clean = String(name || 'friend').replace(/[^a-zA-Z0-9]/g, '');
  if (!clean) clean = 'friend';
  var existingValues = sheet.getDataRange().getValues();
  var existingCodes = [];
  for (var i = 1; i < existingValues.length; i++) {
    existingCodes.push(existingValues[i][0]);
  }
  var code;
  do {
    code = clean + Math.floor(1000 + Math.random() * 9000);
  } while (existingCodes.indexOf(code) !== -1);
  return code;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
