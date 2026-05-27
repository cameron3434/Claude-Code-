# SOP: Open House Electronic Sign-In

**Purpose:** Capture every open house visitor's name, phone, and email, and have
them acknowledge a construction-site liability waiver (with signature) before
entering. Use this at **every** open house.

**Owner:** ADU West Coast
**Tools:** Google Sheet + Google Apps Script web app (free, data stays in our Google account)

---

## What it is

A single web link that visitors open on their own phones. They enter their
contact info, read and agree to the construction-site waiver, sign with a
finger, and tap **Sign In & Enter Site**. Every submission lands in a Google
Sheet, and each signature image is saved to a Google Drive folder
("Open House Signatures").

Source files live in this repo:
- `apps-script/Code.gs` — the server (serves the page + records sign-ins)
- `apps-script/Index.html` — the visitor sign-in page
- `preview.html` — a no-save demo of the page (for showing the design only)

---

## One-time setup (per Google account)

1. Sign into the Google account that should own the data (e.g. the
   aduwestcoast.com account). Go to **sheets.new** and create a blank Sheet
   named "Open House Sign-Ins."
2. In that Sheet: **Extensions → Apps Script**.
3. Delete the sample `Code.gs` content and paste in `apps-script/Code.gs`.
4. **Files → + → HTML**, name it exactly **`Index`**, and paste in
   `apps-script/Index.html`.
5. **Save.**
6. **Deploy → New deployment →** gear icon **→ Web app**.
7. Set **Execute as: Me** and **Who has access: Anyone**, then **Deploy** and
   **Authorize access** (approve your own script when prompted).
8. Copy the **Web app URL** (ends in `/exec`). This is the live link to share.

**Live sign-in link:** `__PASTE_YOUR_/exec_URL_HERE__`

> If you ever edit `Code.gs` or `Index.html`, redeploy:
> **Deploy → Manage deployments → (edit / pencil) → Version: New version → Deploy.**

---

## Before each open house

- [ ] Confirm the live link still loads (open it on a phone).
- [ ] Print the "Scan to Sign In" QR poster and post it at the entrance.
- [ ] Have a backup device (phone/tablet) at the door in case a visitor's phone
      can't scan or load the page.

## During each open house

- [ ] Every visitor signs in **before** entering the construction area.
- [ ] Visitors must check the waiver agreement box and add a signature.
- [ ] Offer help to anyone who has trouble (they can sign in on the door device).

## After each open house

- [ ] Open the "Open House Sign-Ins" Sheet → **File → Download → CSV** for the
      contact list.
- [ ] Signatures are in Google Drive → "Open House Signatures" folder (each row
      in the Sheet links to its signature image).
- [ ] Follow up with visitors who checked "I'd like to receive information."

---

## Notes

- Visitors need internet (Wi-Fi or cell) to load and submit the page.
- "Who has access: Anyone" only lets people see the form — never the Sheet.
- The waiver is a general acknowledgment, **not legal advice**. Have a licensed
  attorney review it if you want a binding, project-specific waiver.
