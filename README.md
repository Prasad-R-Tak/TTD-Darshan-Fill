TTD Darshan Fill 🛕
A Chrome extension prototype that helps populate pilgrim details in TTD Special Entry Darshan-style forms. It stores reusable details for up to six pilgrims and attempts to fill matching fields on a supported page.
Features
- Maintain details for up to six pilgrims.
- Save a pilgrim's name, age, gender, photo ID proof type, and ID number.
- Fill a selected pilgrim's details using the extension popup.
- Match common input names, IDs, placeholders, and form-control names.
- Includes a local HTML test form for trying the field-filling logic.
- Uses Chrome Extension Manifest V3.
Tech Stack
- JavaScript
- HTML and CSS
- Chrome Extensions API (Manifest V3)
- chrome.storage and content scripts
Project Structure
ttd-simple/
├── manifest.json
├── popup.html
├── content.js
├── test-form.html
└── icons/
    └── icon.png
Installation (Developer Mode)
1. Download or clone this repository.
2. Extract the ZIP if needed.
3. Open chrome://extensions/ in Google Chrome.
4. Enable Developer mode.
5. Select Load unpacked.
6. Choose the ttd-simple directory containing manifest.json.
7. Open the extension popup and enter the pilgrim details.
How to Use
1. Enter the details for the required pilgrim tab.
2. Select Save to store the profile.
3. Open a compatible form and use the relevant Fill P1, Fill P2, etc. action.
4. Review the populated values and correct any mismatches manually.
5. Complete submission yourself after confirming all details are accurate.
Test Locally
The repository includes test-form.html, a sample registration form with six pilgrim sections. Open it in Chrome to inspect the form layout. For reliable extension testing, load the extension in Developer mode and test against the local form or a controlled test page; browser extension restrictions can affect local-file access.
Important Notes
- This is an independent prototype for learning and personal productivity. It is not an official TTD product and is not affiliated with or endorsed by Tirumala Tirupati Devasthanams.
- Real booking pages can change their HTML structure, so automatic field detection may fail or require maintenance.
- The extension does not guarantee darshan slot availability or successful booking.
- Always verify each pilgrim's name, age, gender, ID proof, and ID number before proceeding.
- Do not use the extension to bypass CAPTCHA, queues, booking limits, or other website controls. Follow the official site's current terms and instructions.
- The current manifest uses broad <all_urls> host access. Consider restricting this to the official site and any explicitly required test pages before publishing or using the extension with sensitive data.
Privacy
Pilgrim details and identification numbers are sensitive personal information. Review the extension's storage behavior and permissions before use. Never commit real identity numbers, personal profiles, screenshots, or other private data to a public repository.
Future Improvements
- Restrict host permissions to the minimum required domains.
- Add a clear-profile action and validate inputs.
- Improve matching so fields are scoped reliably to each pilgrim section.
- Display a clear success/failure count for each field.
- Add tests for different form structures and browser versions.
License
No license has been specified yet. Add a LICENSE file before allowing reuse or redistribution.
