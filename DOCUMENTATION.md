# Marksheet Portal: Documentation
Static website for issuing digitally signed marksheets and verifying them through a QR code.
Runs on **GitHub Pages**. No server, no database, no monthly cost.

---
## 1. What is in the folder
| File | Purpose | Who edits it |
|---|---|---|
| `index.html` | Staff portal: login, issue wizard, register, publish | nobody |
| `verify.html` | **Public verification page** the QR code opens | nobody |
| `config.js` | University details, site URL, login, serial prefix | **client, before deploying** |
| `site-data.js` | Public key used by `verify.html` | written by the portal (Publish) |
| `data/` | One **encrypted** file per issued marksheet | written by the portal (Publish) |
| `logo.png` (optional) | University logo | client |
| `DEPLOY-CHECKLIST.md`, `DOCUMENTATION.md`, `screens/` | Notes. **Do not upload** | - |

## 2. How it works
1. Staff sign in and fill a marksheet in 5 steps. The portal shows what is pending and warns about risky things.
2. On **Confirm & issue** the portal makes a short summary (name, roll no., programme, result, serial), **signs** it with the private key (ECDSA P-256) and **encrypts** it with a random key (AES-256-GCM style, 128-bit key).
3. **Publish** uploads the encrypted file as `data/<id>.json` to the GitHub repo (and the public key to `site-data.js` once).
4. The QR code holds only: `https://<site>/verify.html#id=<id>&k=<decryption key>&r=<revision>`.
5. Anyone scanning it opens **verify.html**, which fetches `data/<id>.json`, decrypts it with `k`, checks the signature and shows the result.

Why encrypted: the GitHub repo is public (needed for free Pages). Without encryption anybody could read every student's name and result from the `data/` folder. The key `k` exists only in the QR link (after the `#`, never sent to any server) and in the staff register.

Why the signature: even with repo access nobody can make a record that shows VERIFIED without the private key.

## 3. Where is the data saved, and for how long?
| Data | Where | How long |
|---|---|---|
| Register (full marksheets, photos, keys) | **Staff browser localStorage** (this browser, this site address only) | No expiry. Lost if browser data is cleared, another browser / device / private window is used, or storage is full |
| Signing (private) key | Same browser | Same. **Back it up** |
| Public record (summary, encrypted) | `data/` folder in the GitHub repo | Permanent until you change it |
| Decryption key of a record | Inside the printed QR + the register | Permanent |
| Public key | `site-data.js` in the repo | Permanent |
| University details, login hash | `config.js` in the repo | Until edited |
| Verification visitors | Nothing stored, nothing sent | - |

Browser space is about 5 MB (Dashboard shows a usage bar). A record with photo is roughly 30 to 60 KB.

## 4. First-time setup
1. Edit `config.js` (every field marked CHANGE; section 11).
2. Create a GitHub repository, upload `index.html`, `verify.html`, `config.js`, `site-data.js` (+ logo).
3. Settings -> Pages -> Deploy from branch `main`, folder `/ (root)`.
4. Create a **fine-grained token**: GitHub -> Settings -> Developer settings -> Fine-grained tokens -> Generate. Repository access: **only this repo**. Permissions: **Contents: Read and write**. Expiry: 90 days (renew later).
5. Open the site, sign in (signing key is created automatically). Settings -> 2 Publish -> paste the token -> **Save token** -> **Test connection**.
6. Settings -> **Backup key**; Register -> **Export backup**.
7. Dashboard "Setup checklist": aim for all green.

No token? Use **Download ZIP**, unzip it, drag the `data` folder and `site-data.js` into the repo on github.com (Add file -> Upload files), then press "I uploaded the ZIP: mark published".

## 5. Issuing a marksheet (Issue tab, step by step)
1. **Programme**: BCA or MCA template, exam details.
2. **Candidate**: name, parents, DOB, roll / enrollment / registration numbers, photo.
3. **Marks**: subjects (internal + external) and earlier semesters. Totals, grades, SGPA, CGPA are automatic.
4. **Signatures**: signatories (generated pen signature, drawn, or PNG), stamps, watermark, footer note, **colour & border**.
5. **Review**: red items must be fixed, yellow warnings should be read. Tick the confirmation, **Confirm & issue**.
6. After issuing: **Print** -> **Publish** -> **Open verify page / scan with a phone**.

Editing candidate, exam, marks or issue details after issuing clears the QR. Issue again: same serial, **revision 2**, same QR address. The old printed QR then shows OUTDATED once revision 2 is published. Colours, stamps and signatures do not clear the QR.

## 6. Colour and border options (Step 4, section 10)
BCA (navy / gold) and MCA (green / copper) stay the default. Choose a preset, or Primary / Accent / Paper colours, and a border: Braided (default), Solid, Double, Lattice, Dashed, Dotted, Minimal. "Reset to template default" undoes it.

## 7. What the verify page shows
| Badge | Meaning | Action |
|---|---|---|
| VERIFIED (green) | Record found, signature valid, latest version | Match details with the printed marksheet |
| NOT FULLY VERIFIED (amber) | Record found, public key not in `site-data.js` | Publish |
| OUTDATED VERSION (amber) | A newer revision exists | Check the newest marksheet |
| REVOKED (red) | University cancelled it | Do not accept |
| NOT VALID (red) | Link does not match the record, or record altered | Do not accept, contact the university |
| NO RECORD FOUND (red) | No such file: not published yet, or wrong QR | Publish, or check the QR |
| NOT PUBLISHED YET (amber) | Only on the staff computer | Publish |

Only a short summary is shown (no subject marks, DOB or parents) plus warnings, official-portal link and contact details from `config.js`. **Preview every state**: Dashboard or Settings -> Preview verify page. Share `https://<site>/verify.html` as the public "Verify marksheet" link.

## 8. Backup, restore, new computer
- **Backup key** (Settings) and **Export backup** (Register). Both contain secrets (the register has student data and record keys). Keep them private and offline.
- **New browser / computer**: sign in there, Settings -> Restore key, Register -> Import.
- Without the register you cannot update or revoke old records (their decryption keys are lost), but their printed QR codes keep working. Issue a new record instead.

## 9. Mistakes to avoid
1. Clearing browser data / changing browser without a backup.
2. Sharing the key or register backup files.
3. Printing and handing out marksheets before **Publish** (QR shows "No record found").
4. Changing `siteUrl` after printing: old QR codes keep the old address.
5. Printing with placeholder text ("Sample", "Dummy") or the SPECIMEN stamp on.
6. Editing marks after printing: the QR is cleared, issue again and reprint.
7. Uploading `DOCUMENTATION.md` / `DEPLOY-CHECKLIST.md` / the token anywhere public.
8. Deleting files from `data/` on GitHub (the QR then shows "No record found"). Revoke instead.

## 10. Troubleshooting
| Problem | Fix |
|---|---|
| NO RECORD FOUND | Publish, wait 1 to 2 minutes (cache up to ~10 min), try again |
| NOT FULLY VERIFIED | `site-data.js` not published: Settings -> Publish |
| Publish says 401 / 403 / 404 | Token expired, wrong repo, or missing Contents write permission. Use Test connection |
| Publish says 409 | Someone else changed the repo at the same time: press Publish again |
| "Browser storage is full" | Export register, delete unpublished old records, use smaller photos |
| Print dialog does not open | Use Chrome / Edge (not an in-app browser), Ctrl+P, A4, margins None |
| Forgot password | Generate a new hash (Settings -> Login), paste into `config.js` |
| Lost key and no backup | Old QR codes still work. Create new records; the new key gets published automatically |

## 11. `config.js` reference
`siteUrl` (keep trailing slash) · `github.owner/repo/branch/dataDir` (auto-detected from siteUrl, set only for custom domains) · `university.name / sealName / city / tagline / address / phone / email / website / officialPortal / officeHours / headerLines / logo` · `serialPrefix` · `footerNote` · `qrSizeMm` (20-30) · `loginHash`.

## 12. Security notes
- The login is a client-side gate: the file is public, so only a hash is stored. Real protection is the signature plus encryption.
- The GitHub token lives in the staff browser. Use a token limited to this one repo, with an expiry date.
- Staff computers must be trusted: the private key sits in that browser.
- Someone holding a QR link can read that one summary; nobody can read other records.

## 13. Cost and growth plan (GitHub Pages now, paid server later)
**Now:** GitHub Pages is free and verification runs in the visitor's browser, so traffic costs you nothing. Typical limits (check GitHub's current terms): about 1 GB site size, about 100 GB / month soft bandwidth. `verify.html` is about 15 KB, so that is millions of views. Pages is for static sites, not a business backend.

**Move when:** many staff, a central register, audit trail, instant revocation (cache), bulk issue, email / SMS, analytics.

**Migration (about 6 months), designed to be small:**
1. Keep the **QR format** (`verify.html#id=&k=&r=`) and the **record format** (encrypted JSON). Every printed marksheet keeps working.
2. Build a small backend (Node or Python + PostgreSQL): login, `POST /marksheets` (store the encrypted record), `GET /records/<id>` (serves the same JSON that `data/<id>.json` has now), revoke, list.
3. In `verify.html` change one line (`'data/'+p.id+'.json'` -> `API+'/records/'+p.id`). No other change; nothing is decrypted on the server.
4. In `index.html` replace `ghPut()` (publishing) and `LS()/WS()` (register storage) with API calls; move the private key to server secrets / a key vault. Import the key backup so old and new records share one key.
5. Import the exported register into the database; test with phones before changing `siteUrl`.
6. Add backups, monitoring, HTTPS (managed platforms include it).
