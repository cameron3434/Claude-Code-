/**
 * ADU West Coast — Open House Sign-In
 * ------------------------------------------------------------------
 * Container-bound Google Apps Script (lives inside a Google Sheet).
 *
 * It does two jobs:
 *   1. doGet()        -> serves the public sign-in web page (Index.html)
 *   2. submitSignin() -> called by that page; writes each visitor to the
 *                        Sheet and saves their signature image to Drive.
 *
 * Setup + deploy steps are provided separately. The short version:
 *   Sheet -> Extensions -> Apps Script -> paste this file + Index.html
 *   -> Deploy -> New deployment -> Web app
 *      Execute as: Me   |   Who has access: Anyone
 * ------------------------------------------------------------------
 */

var SHEET_NAME = 'Sign-Ins';
var SIGNATURE_FOLDER = 'Open House Signatures';
var EVENT_TITLE = 'ADU West Coast Open House';
var EVENT_ADDRESS = '15623 Van Ness Ave, Gardena, CA 90249';

/** Serve the sign-in page. */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Open House Sign-In · ADU West Coast')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Get (or create) the Sign-Ins sheet, ensuring the header row exists. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Wants Info', 'Agreed Waiver', 'Signature']);
    sheet.setFrozenRows(1);
    sheet.getRange('C:C').setNumberFormat('@'); // keep phone as text
  }
  return sheet;
}

/** Get (or create) the Drive folder that holds signature images. */
function getSignatureFolder_() {
  var folders = DriveApp.getFoldersByName(SIGNATURE_FOLDER);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(SIGNATURE_FOLDER);
}

/**
 * Record one sign-in. Called from the page via google.script.run.
 * @param {Object} payload {name, phone, email, consent, agreed, signature, company}
 * @return {Object} { ok: true }
 */
function submitSignin(payload) {
  payload = payload || {};

  // Honeypot: bots tend to fill hidden fields. Silently ignore them.
  if (payload.company) return { ok: true };

  var name = String(payload.name || '').trim();
  var phone = String(payload.phone || '').trim();
  var email = String(payload.email || '').trim();

  if (!name || !phone || !email || !payload.agreed || !payload.signature) {
    throw new Error('Missing required information.');
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid two visitors writing the same row at once
  try {
    var sigUrl = '';
    try {
      var base64 = String(payload.signature).split(',')[1];
      var bytes = Utilities.base64Decode(base64);
      var safe = name.replace(/[^a-z0-9]+/gi, '_').slice(0, 40) || 'visitor';
      var blob = Utilities.newBlob(bytes, 'image/png', safe + '_' + Date.now() + '.png');
      sigUrl = getSignatureFolder_().createFile(blob).getUrl();
    } catch (sigErr) {
      sigUrl = '(signature not saved: ' + sigErr + ')';
    }

    getSheet_().appendRow([
      new Date(),
      name,
      phone,
      email,
      payload.consent ? 'Yes' : 'No',
      'Yes',
      sigUrl
    ]);
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}
