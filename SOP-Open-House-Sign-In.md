# SOP: Open House Electronic Sign-In

**Purpose:** Capture every open house visitor's name, phone, and email, and have
them acknowledge a construction-site liability waiver (with a typed-name
e-signature) before entering. Use this at **every** open house.

**Owner:** ADU West Coast

---

## The live link (share this)

**Sign-in URL:**
`https://raw.githack.com/cameron3434/Claude-Code-/v1/signin-live.html`

**Printable QR poster for the door:**
`https://raw.githack.com/cameron3434/Claude-Code-/v1/poster.html`
(Open it in a browser, click **Print this poster**, choose Letter size.)

---

## How it works

Visitors open the link (or scan the QR poster) on their own phone. They:
1. Enter their **name, phone, and email**.
2. Read the **construction-site liability waiver** and tick "I have read and agree."
3. **Type their full legal name** as their electronic signature.
4. Tap **Sign In & Enter Site**.

Each submission is **emailed to cameron@aduwestcoast.com**, with
**stephanie@aduwestcoast.com** and **mario@resi-co.com** CC'd, via FormSubmit
(a free form-relay service). Filter Gmail by the subject prefix
"Open house sign-in" to round them up after the event.

---

## One-time activation (first use only)

The very first sign-in (do a test one yourself) triggers a FormSubmit
**"Activate your account"** email to cameron@aduwestcoast.com. Click the
activation link in that email **once** — after that, every sign-in goes
through automatically, forever. No further setup ever.

---

## Before each open house

- [ ] Open the live link on a phone to confirm it loads.
- [ ] Print the QR poster (`poster.html`) and post it at the entrance.
- [ ] Have a backup device (phone/tablet) at the door for guests whose phone
      can't scan or load the page.

## During each open house

- [ ] Every visitor signs in **before** entering the construction area.
- [ ] Visitors must check the waiver agreement and type their full name to sign.
- [ ] Help anyone who has trouble — they can sign in on the door device.

## After each open house

- [ ] In Gmail, search "Open house sign-in" to gather every submission.
- [ ] Follow up with anyone who checked "I'd like to receive information."

---

## Notes

- Visitors need internet (Wi-Fi or cell) to load and submit the page.
- The waiver is a general acknowledgment, **not legal advice** — have a licensed
  attorney review it for a binding, project-specific waiver.
- The page exposes `cameron@aduwestcoast.com` in its source so FormSubmit can
  route mail to you. If spam becomes an issue, the link can be rotated to a
  FormSubmit hashed alias.
- Source files live in this repo:
  - `signin-live.html` — the visitor sign-in page (this is what visitors open)
  - `poster.html` — the printable QR poster
  - `preview.html` — early no-save demo of the design (kept for reference)
