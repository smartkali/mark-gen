/* =====================================================================
   CLIENT CONFIG: edit ONLY this file before deploying.
   Every value marked "CHANGE" must be replaced with your own details.
   (Do not delete the commas or quotes.)
   ===================================================================== */
window.PORTAL_CONFIG = {

  /* CHANGE 1: the address where this site will live (GitHub Pages link).
     The QR code opens  <siteUrl>verify.html . Keep the trailing slash. */
  siteUrl: "https://YOUR-USERNAME.github.io/YOUR-REPO/",

  /* Optional: GitHub repo used for one-click publishing. Leave empty to
     auto-detect from siteUrl (works for username.github.io/repo). */
  github: { owner: "", repo: "", branch: "main", dataDir: "data" },

  /* CHANGE 2: university details. Shown on the verification page and marksheet. */
  university: {
    name: "SAMPLE UNIVERSITY OF TECHNOLOGY",
    sealName: "SAMPLE UNIVERSITY",            // short name used in watermark emblem
    city: "Sample City (U.P.)",               // used in watermark emblem
    tagline: "Office of the Controller of Examinations",
    address: "University Campus, Knowledge Park, Sample City - 226 010, State",
    phone: "+91 00000 00000",
    email: "exam@sampleuniversity.edu",
    website: "https://www.sampleuniversity.edu",
    officialPortal: "https://results.sampleuniversity.edu",   // official result / verification portal
    officeHours: "Mon-Sat, 10:00 AM - 5:00 PM",
    /* Two lines printed under the university name on every marksheet (HTML allowed). */
    headerLines: "Established under State Act No. 12 of 2005 · Recognised by UGC · NAAC Accredited 'A' Grade<br>University Campus, Knowledge Park, Sample City - 226 010, State · Tel: +91 00000 00000 · exam@sampleuniversity.edu",
    /* CHANGE 3 (optional): logo file next to index.html, e.g. "logo.png" (square, under 100 KB). */
    logo: "/logo.png"
  },

  /* CHANGE 4: marksheet serial number prefix, e.g. SU-MS-2026-000001 */
  serialPrefix: "SU-MS",

  /* Small text printed at the bottom of every marksheet. Leave "" for nothing. */
  footerNote: "Computer-generated statement. Verify authenticity by scanning the QR code.",

  /* QR code size on the printed marksheet in millimetres (20 to 30). */
  qrSizeMm: 24,

  /* CHANGE 5: staff login. Generate a new value in the portal:
     Settings -> 4 Login -> Generate loginHash, then paste it here. */
  loginHash: "b8243b4ddf05f254d69006a6d0ba9e584b2b35c06c2b08990219ac8cbe1c05c1"
};
