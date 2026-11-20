# Deployment checklist (do NOT upload this file to GitHub)

Upload to the repo root: **index.html, verify.html, config.js, site-data.js** (+ logo file, optional)

## A. Before uploading: edit config.js  (nothing else needs editing)
- [ ] 1. `siteUrl`  -> your GitHub Pages link, e.g. https://username.github.io/repo/  (keep trailing slash)
- [ ] 2. `university.name`, `sealName`, `city`, `tagline`
- [ ] 3. `university.address`, `phone`, `email`, `website`, `officeHours`  (shown on the verification page)
- [ ] 4. `university.officialPortal` -> the university's official result / verification portal
- [ ] 5. `university.headerLines` -> the 2 lines printed under the university name on marksheets
- [ ] 6. `university.logo` -> e.g. "logo.png" (square image uploaded next to index.html)  [optional]
- [ ] 7. `serialPrefix` (e.g. "XYZ-MS"), `footerNote`, `qrSizeMm`
- [ ] 8. `loginHash` -> new staff login (portal: Settings -> 4 Login -> Generate loginHash)

## B. Publish the site
- [ ] Create a GitHub repo -> upload the files above
- [ ] Settings -> Pages -> Deploy from branch `main` / root
- [ ] Create a fine-grained token (only this repo, Contents: Read and write, 90 days)
- [ ] Open the site, sign in, Settings -> 2 Publish -> save token -> Test connection
- [ ] Dashboard "Setup checklist": every item should become green

## C. First marksheet (step by step in the Issue tab)
- [ ] Step 1 Programme -> 2 Candidate -> 3 Marks -> 4 Signatures -> 5 Review
- [ ] Fix every red item in "Pending", read the yellow "Warnings", tick the confirmation, issue
- [ ] Print the marksheet
- [ ] **Publish** (button after issuing, or Settings -> Publish). Wait 1 to 2 minutes
- [ ] Open the verify page and scan the QR with a phone: it must say VERIFIED

## D. Optional: colour / border
- [ ] Issue tab -> Step 4 -> section 10: only if one semester must stand out (BCA / MCA defaults stay unchanged)

## E. Backups (browser data is the only copy of the register and keys)
- [ ] Settings -> Backup key (keep the file private and offline)
- [ ] Register -> Export backup (contains student data and record keys; keep private)

## Things to remember
- Public "Verify marksheet" link for the university website: `https://<your-site>/verify.html`
- Staff login: `https://<your-site>/`
- Every issue / revoke / re-issue needs a **Publish** to reach the public.
- Data location: register + keys in the staff browser; encrypted records in `data/` on GitHub.
- Login is a convenience gate. Real protection: signature + encryption.
