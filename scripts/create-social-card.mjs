import sharp from "sharp";

const width = 1200;
const height = 630;

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="background" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0A0308"/>
      <stop offset="1" stop-color="#240B1D"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#D71B7E" stop-opacity=".5"/>
      <stop offset="1" stop-color="#D71B7E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#background)"/>
  <circle cx="1050" cy="105" r="380" fill="url(#glow)"/>
  <circle cx="220" cy="610" r="300" fill="url(#glow)" opacity=".3"/>
  <rect x="62" y="58" width="1076" height="514" rx="28" fill="none" stroke="#64304D" stroke-width="2"/>
  <rect x="91" y="88" width="8" height="40" rx="4" fill="#FFB020"/>
  <text x="121" y="119" fill="#F7DCEB" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="4">FIX YOUR GAP</text>
  <text x="88" y="264" fill="#FBF3F8" font-family="Arial, sans-serif" font-size="74" font-weight="700">Your ideas.</text>
  <text x="88" y="349" fill="#FFB020" font-family="Arial, sans-serif" font-size="74" font-weight="700">Our execution.</text>
  <text x="91" y="419" fill="#D9C3D0" font-family="Arial, sans-serif" font-size="27">Digital · Technology · Marketing · Growth</text>
  <line x1="91" y1="510" x2="1108" y2="510" stroke="#64304D" stroke-width="2"/>
  <text x="91" y="546" fill="#F7DCEB" font-family="Arial, sans-serif" font-size="24">fixyourgap.com</text>
  <rect x="880" y="180" width="238" height="216" rx="28" fill="#FFFFFF"/>
</svg>`);

const logo = await sharp("public/images/fixyourgap-logo.png")
  .resize(210, 181, { fit: "contain" })
  .toBuffer();

await sharp(background)
  .composite([{ input: logo, left: 894, top: 198 }])
  .png()
  .toFile("public/images/social-card.png");
