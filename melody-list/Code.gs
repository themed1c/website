/**
 * themed1c - melody list capture (hardened)
 * Bound to the private Google Sheet that stores signups.
 *
 * The Sheet stays private. This script runs as YOU ("Execute as: Me"),
 * which is what grants it write access. Visitors never touch the Sheet.
 *
 * Setup:
 *   Project Settings > Script properties > add:
 *     MELODY_SHARED_SECRET = <long random string>
 *   Deploy > New deployment > Web app
 *     Execute as:  Me
 *     Access:      Anyone      <- exposes the ENDPOINT, not the Sheet
 *
 * The /exec URL is stored only as a Cloudflare secret. It never appears
 * in the site's client-side code.
 */

var SHEET_NAME = 'melody-list';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');

    var expected = PropertiesService
      .getScriptProperties()
      .getProperty('MELODY_SHARED_SECRET');

    if (!expected || body.secret !== expected) {
      return json({ ok: false, error: 'forbidden' });
    }

    // Honeypot: real users never fill this. Accept, do not store.
    if (body.website) {
      return json({ ok: true });
    }

    var email = String(body.email || '').trim();
    if (!email || email.indexOf('@') === -1 || email.length > 254) {
      return json({ ok: false, error: 'invalid' });
    }

    var sheet = getSheet();
    var lastRow = sheet.getLastRow();
    var existing = lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(function (r) {
          return String(r[0]).trim().toLowerCase();
        })
      : [];

    if (existing.indexOf(email.toLowerCase()) === -1) {
      sheet.appendRow([email, new Date().toISOString(), body.source || 'store']);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'server' });
  }
}

/**
 * Deliberately returns nothing about the list. There is no read path in
 * this script - the endpoint can only append.
 */
function doGet() {
  return json({ ok: true });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['email', 'submitted_at', 'source']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
