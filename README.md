# NOVA Landing Page

A premium, Apple-inspired, single-page performance marketing landing page built for "NOVA".

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Development Setup

First, install dependencies:
```bash
npm install
```

Copy the `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Lead Form Setup (Google Apps Script)

The Lead Form is designed to write directly to a Google Sheet via a Google Apps Script Web App endpoint, avoiding the need for a dedicated backend.

### 1. Create the Google Sheet
1. Create a new Google Sheet where you want leads to be saved.
2. (Optional) Name your columns in the first row: `Date`, `Name`, `Email`, `Company`, `Budget`.

### 2. Create the Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Replace the default code with the following script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    var rowData = [
      new Date(),
      data.name,
      data.email,
      data.company,
      data.budget
    ];
    
    // Write to the first empty row
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Deploy the Web App
1. Click the **Deploy** button (top right) -> **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the settings exactly as follows:
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial step, or it will require authentication)*
4. Click **Deploy** and authorize the script when prompted.
5. Copy the generated **Web app URL**.

### 4. Configure the Environment
Add the URL you copied to your `.env.local` file:
```env
NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Your form will now securely transmit leads directly to your Google Sheet without exposing credentials!

---

## Google Tag Manager (GTM) Setup

This project includes built-in Google Tag Manager support. It safely tracks the `lead_form_submit` event without hardcoding credentials in the codebase.

### Configuration
To enable GTM, add your Container ID to the `.env.local` file:
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Events Tracked
- **`lead_form_submit`**: Fires automatically when a user successfully submits the lead form.

### Verification
If `NEXT_PUBLIC_GTM_ID` is empty, the GTM script will not load, but the `window.dataLayer.push` commands will still fail silently without throwing console errors.
