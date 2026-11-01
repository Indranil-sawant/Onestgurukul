/**
 * ============================================================================
 * ONEST GURUKUL - COMPLETE FORMS & NOTIFICATION BACKEND (GOOGLE APPS SCRIPT)
 * ============================================================================
 * 
 * Target Institution: O'Nest Gurukul School, Ratnagiri, Maharashtra, India
 * Address: Wadekar Wadi, Ambeshet Road, near Hanuman Mandir, Abhyudhya Nagar,
 *          Nachane, Maharashtra 415639
 * Official Contact: +91 8767672478 / +91 7888056699
 * 
 * Supports all website forms:
 * 1. Multi-Step Student Admission Form (admissions.html)
 * 2. Campus Tour Booking Form (admissions.html)
 * 3. Prospectus Download Lead Form (admissions.html)
 * 4. Contact Us Enquiry Form (contact.html)
 * 5. Homepage Consultation / Message Form (index.html)
 * 
 * Core Features:
 * - Automatically organizes data into dedicated, styled Google Sheets tabs:
 *     - "Admissions"
 *     - "Campus_Visits"
 *     - "Prospectus_Leads"
 *     - "Contact_Enquiries"
 *     - "Homepage_Messages"
 * - Automatically creates missing tabs with branded Navy & Gold headers.
 * - Freezes header rows and sets auto-fit column widths.
 * - Honeypot spam trap check to silently discard bot submissions.
 * - Instant branded HTML email notification to School Administration.
 * - Instant personalized, professional confirmation HTML email to Parent/User.
 * - Concurrency control with LockService to prevent race conditions.
 * - Full CORS JSON response for asynchronous browser submissions.
 * ============================================================================
 */

// ============================================================================
// 1. CONFIGURATION
// ============================================================================
const CONFIG = {
  // School Admin Email to receive instant submission alerts
  ADMIN_EMAIL: 'onestgurukulprimary@gmail.com',

  // Optional: Add secondary email or leave empty ''
  CC_EMAILS: '',

  // School Identity & Details
  SCHOOL_NAME: "O'Nest Gurukul",
  SCHOOL_TAGLINE: "CBSE-Aligned Experiential Learning with Gurukul Values",
  SCHOOL_EMAIL: 'onestgurukulprimary@gmail.com',
  SCHOOL_PHONE: '+91 8767672478 / +91 7888056699',
  SCHOOL_ADDRESS: "Wadekar Wadi, Ambeshet Road, near Hanuman Mandir, Abhyudhya Nagar, Nachane, Maharashtra 415639",
  OFFICE_HOURS: "Monday – Saturday: 8:30 AM to 5:00 PM (Sunday Closed)",
  WEBSITE_URL: "https://onestgurukul.edu.in",
  PROSPECTUS_LINK: "https://onestgurukul.edu.in/admissions.html", // Replace with direct PDF link if preferred

  // Optional: If this script is NOT bound to the spreadsheet, paste Sheet ID here.
  // If bound via Google Sheets -> Extensions -> Apps Script, leave as empty string ''.
  SPREADSHEET_ID: '',

  // Visual Theme Colors
  COLOR_NAVY: "#002147",
  COLOR_GOLD: "#D97706",
  COLOR_GOLD_LIGHT: "#FEF3C7",
  COLOR_BG: "#F8FAFC",
  COLOR_CARD: "#FFFFFF",
  COLOR_BORDER: "#E2E8F0",
  COLOR_TEXT: "#1E293B",
  COLOR_MUTED: "#64748B"
};


// ============================================================================
// 2. SHEET SCHEMAS & FIELD MAPPINGS
// ============================================================================
const SCHEMAS = {
  'Admissions': {
    name: 'Admissions',
    headers: [
      'Timestamp (IST)',
      'Student Full Name',
      'Date of Birth',
      'Grade Applied',
      'Gender',
      'Parent / Guardian Name',
      'Relationship',
      'Email Address',
      'Phone Number',
      'Residential Address',
      'Scholarship Applied',
      'Application Status'
    ],
    mapRow: function (data, timestamp) {
      const studentName = data.StudentName || data['adm-name'] || data.Name || '';
      const dob = data.DOB || data['adm-dob'] || '';
      const grade = data.Grade || data['adm-grade'] || '';
      const gender = data.Gender || data['adm-gender'] || '';
      const parentName = data.ParentName || data['adm-parent'] || '';
      const relation = data.Relation || data['adm-relation'] || 'Parent/Guardian';
      const email = data.Email || data['adm-email'] || '';
      const phone = data.Phone || data['adm-phone'] || '';
      
      let address = data.Address || '';
      if (!address && data['adm-address']) {
        address = [
          data['adm-address'],
          data['adm-city'],
          data['adm-state'],
          data['adm-pincode']
        ].filter(Boolean).join(', ');
      }

      const scholarship = data.ScholarshipApplied || (data['adm-scholarship'] ? 'Yes' : 'No') || 'No';

      return [
        timestamp,
        studentName,
        dob,
        grade,
        gender,
        parentName,
        relation,
        email,
        phone,
        address,
        scholarship,
        'Under Review'
      ];
    }
  },

  'Campus_Visits': {
    name: 'Campus_Visits',
    headers: [
      'Timestamp (IST)',
      'Visitor Full Name',
      'Preferred Date',
      'Preferred Time Slot',
      'Email Address',
      'Phone Number',
      'Visit Status'
    ],
    mapRow: function (data, timestamp) {
      return [
        timestamp,
        data.VisitorName || data['bk-name'] || data.Name || '',
        data.Date || data['bk-date'] || '',
        data.TimeSlot || data['bk-time'] || '',
        data.Email || data['bk-email'] || '',
        data.Phone || data['bk-phone'] || '',
        'Scheduled / Confirmed'
      ];
    }
  },

  'Prospectus_Leads': {
    name: 'Prospectus_Leads',
    headers: [
      'Timestamp (IST)',
      'Full Name',
      'Email Address',
      'Phone Number',
      'Download Status'
    ],
    mapRow: function (data, timestamp) {
      return [
        timestamp,
        data.VisitorName || data.Name || data['pr-name'] || '',
        data.Email || data['pr-email'] || '',
        data.Phone || data['pr-phone'] || '',
        'Prospectus Link Sent'
      ];
    }
  },

  'Contact_Enquiries': {
    name: 'Contact_Enquiries',
    headers: [
      'Timestamp (IST)',
      'Parent / Sender Name',
      'Student Name',
      'Grade / Class',
      'Phone Number',
      'Email Address',
      'Inquiry Purpose',
      'Preferred Contact Mode',
      'Message / Inquiry Details',
      'Status'
    ],
    mapRow: function (data, timestamp) {
      return [
        timestamp,
        data.ParentName || data.Name || '',
        data.StudentName || 'N/A',
        data.Grade || 'N/A',
        data.Phone || '',
        data.Email || '',
        data.Purpose || 'General Inquiry',
        data.ContactMode || 'Phone / Email',
        data.Message || '',
        'Pending Response'
      ];
    }
  },

  'Homepage_Messages': {
    name: 'Homepage_Messages',
    headers: [
      'Timestamp (IST)',
      'Sender Name',
      'Email Address',
      'Preferred Date / Target Date',
      'Message Details',
      'Status'
    ],
    mapRow: function (data, timestamp) {
      return [
        timestamp,
        data.Name || data.ApplicantName || '',
        data.Email || '',
        data.Date || '',
        data.Message || '',
        'New Message'
      ];
    }
  }
};


// ============================================================================
// 3. HTTP ENDPOINTS (doPost & doGet)
// ============================================================================

/**
 * Handles incoming HTTP GET requests for health check verification.
 */
function doGet(e) {
  const result = {
    status: 'online',
    institution: CONFIG.SCHOOL_NAME,
    message: "O'Nest Gurukul Form Automation API is operational.",
    timestamp: getFormattedTimestampIST()
  };
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles incoming HTTP POST requests from website forms.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  const hasLock = lock.tryLock(15000); // Wait up to 15 seconds to prevent concurrency collisions

  try {
    // 1. Extract payload
    const data = parseIncomingData(e);

    // 2. Honeypot Anti-Spam Check
    if (data.honeypot || data['home-honeypot'] || data.hp) {
      console.warn("Spam bot detected via honeypot field. Silently dropping payload.");
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Request received.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Resolve Target Schema
    const formType = (data.FormType || data.formType || 'Contact Enquiry').toString();
    const schemaKey = resolveSchemaKey(formType);
    const schema = SCHEMAS[schemaKey];

    // 4. Record to Google Sheet
    const ss = getSpreadsheet();
    const sheet = getOrCreateSheet(ss, schema);
    const timestamp = getFormattedTimestampIST();
    const rowValues = schema.mapRow(data, timestamp);

    const targetRow = sheet.getLastRow() + 1;
    sheet.appendRow(rowValues);

    // Format new row
    const rowRange = sheet.getRange(targetRow, 1, 1, rowValues.length);
    rowRange.setFontSize(9).setVerticalAlignment('middle');
    if (targetRow % 2 === 0) {
      rowRange.setBackground('#F8FAFC');
    }

    // 5. Send Dual Notifications
    // (a) Admin Notification
    try {
      sendAdminNotification(formType, schema, data, timestamp);
    } catch (adminErr) {
      console.error("Failed sending admin notification: " + adminErr.toString());
    }

    // (b) User / Parent Confirmation
    try {
      sendUserConfirmation(formType, schemaKey, data);
    } catch (userErr) {
      console.error("Failed sending user confirmation email: " + userErr.toString());
    }

    // 6. Return Success Response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      formType: formType,
      sheetTab: schema.name,
      message: 'Submission successfully recorded and notifications dispatched.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("Error in doPost: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}


// ============================================================================
// 4. PARSING & ROUTING HELPERS
// ============================================================================

/**
 * Parses URLSearchParams, standard FormData, or raw JSON payload.
 */
function parseIncomingData(e) {
  let data = {};

  if (!e) return data;

  // If query parameters or urlencoded form parameters exist
  if (e.parameter) {
    for (const key in e.parameter) {
      data[key] = e.parameter[key];
    }
  }

  // If raw postData is provided (JSON payload)
  if (e.postData && e.postData.contents) {
    try {
      const json = JSON.parse(e.postData.contents);
      for (const k in json) {
        data[k] = json[k];
      }
    } catch (parseErr) {
      // Not JSON, continue with form data
    }
  }

  return data;
}

/**
 * Matches formType string to one of our defined schemas.
 */
function resolveSchemaKey(formType) {
  const ft = formType.toLowerCase();

  if (ft.includes('admission')) {
    return 'Admissions';
  } else if (ft.includes('tour') || ft.includes('visit') || ft.includes('booking')) {
    return 'Campus_Visits';
  } else if (ft.includes('prospectus')) {
    return 'Prospectus_Leads';
  } else if (ft.includes('home')) {
    return 'Homepage_Messages';
  } else {
    return 'Contact_Enquiries';
  }
}

/**
 * Obtains the Google Spreadsheet instance.
 */
function getSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim() !== '') {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
  }
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    throw new Error("No active spreadsheet found. Bind this script to a Google Sheet (Extensions > Apps Script) or enter CONFIG.SPREADSHEET_ID.");
  }
}

/**
 * Retrieves an existing sheet tab or creates & styles a new one.
 */
function getOrCreateSheet(ss, schema) {
  let sheet = ss.getSheetByName(schema.name);

  if (!sheet) {
    sheet = ss.insertSheet(schema.name);

    // Write header row
    sheet.appendRow(schema.headers);

    // Style Header Row
    const headerRange = sheet.getRange(1, 1, 1, schema.headers.length);
    headerRange.setBackground(CONFIG.COLOR_NAVY)
               .setFontColor('#FFFFFF')
               .setFontWeight('bold')
               .setFontSize(10)
               .setHorizontalAlignment('center')
               .setVerticalAlignment('middle');

    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);

    // Initial column widths
    for (let c = 1; c <= schema.headers.length; c++) {
      sheet.setColumnWidth(c, 160);
    }
  }

  return sheet;
}

/**
 * Returns clean IST formatted timestamp string.
 */
function getFormattedTimestampIST() {
  const now = new Date();
  return Utilities.formatDate(now, "Asia/Kolkata", "dd MMM yyyy, hh:mm:ss a");
}


// ============================================================================
// 5. EMAIL NOTIFICATION LOGIC
// ============================================================================

/**
 * Sends a detailed, styled HTML alert to School Administration.
 */
function sendAdminNotification(formType, schema, data, timestamp) {
  const adminEmail = CONFIG.ADMIN_EMAIL;
  if (!adminEmail) return;

  const applicantName = data.StudentName || data.VisitorName || data.ParentName || data.Name || data['adm-name'] || data['bk-name'] || data['pr-name'] || "New Lead";
  const applicantEmail = data.Email || data['adm-email'] || data['bk-email'] || data['pr-email'] || '';
  const applicantPhone = data.Phone || data['adm-phone'] || data['bk-phone'] || data['pr-phone'] || '';

  const subject = `🔔 [${CONFIG.SCHOOL_NAME}] New ${formType} - ${applicantName}`;

  // Build field rows
  let rowsHtml = '';
  const fields = [
    { label: "Submission Type", val: formType },
    { label: "Date & Time", val: timestamp },
    { label: "Applicant / Parent Name", val: applicantName },
    { label: "Contact Email", val: applicantEmail ? `<a href="mailto:${applicantEmail}" style="color: #002147; font-weight: bold;">${applicantEmail}</a>` : 'Not Provided' },
    { label: "Contact Phone", val: applicantPhone ? `<a href="tel:${applicantPhone}" style="color: #002147; font-weight: bold;">${applicantPhone}</a>` : 'Not Provided' }
  ];

  if (data.Grade || data['adm-grade']) fields.push({ label: "Grade / Class", val: data.Grade || data['adm-grade'] });
  if (data.DOB || data['adm-dob']) fields.push({ label: "Date of Birth", val: data.DOB || data['adm-dob'] });
  if (data.Gender || data['adm-gender']) fields.push({ label: "Gender", val: data.Gender || data['adm-gender'] });
  if (data.Relation || data['adm-relation']) fields.push({ label: "Relationship", val: data.Relation || data['adm-relation'] });
  if (data.Date || data['bk-date']) fields.push({ label: "Requested Visit Date", val: data.Date || data['bk-date'] });
  if (data.TimeSlot || data['bk-time']) fields.push({ label: "Preferred Time Slot", val: data.TimeSlot || data['bk-time'] });
  if (data.Purpose) fields.push({ label: "Inquiry Purpose", val: data.Purpose });
  if (data.ContactMode) fields.push({ label: "Preferred Contact Mode", val: data.ContactMode });
  if (data.Address || data['adm-address']) {
    const addr = data.Address || [data['adm-address'], data['adm-city'], data['adm-state'], data['adm-pincode']].filter(Boolean).join(', ');
    fields.push({ label: "Address", val: addr });
  }
  if (data.ScholarshipApplied || data['adm-scholarship']) fields.push({ label: "Scholarship Interest", val: data.ScholarshipApplied || "Yes" });
  if (data.Message) fields.push({ label: "Message / Query", val: data.Message });

  fields.forEach(f => {
    rowsHtml += `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-weight: 600; color: #475569; width: 35%; background: #F8FAFC;">
          ${f.label}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #0F172A;">
          ${f.val}
        </td>
      </tr>
    `;
  });

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F5F9; padding: 24px 12px; margin: 0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
        
        <!-- Header -->
        <tr>
          <td style="background-color: ${CONFIG.COLOR_NAVY}; padding: 24px; text-align: center; border-bottom: 4px solid ${CONFIG.COLOR_GOLD};">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">${CONFIG.SCHOOL_NAME}</h1>
            <p style="color: ${CONFIG.COLOR_GOLD_LIGHT}; margin: 6px 0 0; font-size: 13px; font-weight: 500;">Administrative Inquiry & Lead Notification</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 24px;">
            <div style="background-color: #FEF3C7; border-left: 4px solid ${CONFIG.COLOR_GOLD}; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
              <span style="color: #92400E; font-weight: 700; font-size: 14px;">Notice:</span>
              <span style="color: #78350F; font-size: 14px;"> New submission received for <strong>${formType}</strong>.</span>
            </div>

            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; font-size: 13px; margin-bottom: 20px;">
              ${rowsHtml}
            </table>

            <!-- Quick Action Buttons -->
            <div style="text-align: center; margin: 24px 0 10px;">
              ${applicantEmail ? `<a href="mailto:${applicantEmail}?subject=Regarding your inquiry at ${encodeURIComponent(CONFIG.SCHOOL_NAME)}" style="display: inline-block; background-color: ${CONFIG.COLOR_NAVY}; color: #FFFFFF; padding: 10px 18px; border-radius: 6px; font-weight: 600; text-decoration: none; font-size: 13px; margin-right: 8px;">Reply via Email</a>` : ''}
              ${applicantPhone ? `<a href="tel:${applicantPhone}" style="display: inline-block; background-color: #10B981; color: #FFFFFF; padding: 10px 18px; border-radius: 6px; font-weight: 600; text-decoration: none; font-size: 13px;">Call Parent</a>` : ''}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #F8FAFC; padding: 16px 24px; border-top: 1px solid #E2E8F0; text-align: center; color: #64748B; font-size: 11px;">
            <p style="margin: 0 0 4px;"><strong>${CONFIG.SCHOOL_NAME}</strong> • ${CONFIG.SCHOOL_ADDRESS}</p>
            <p style="margin: 0;">Phone: ${CONFIG.SCHOOL_PHONE} • Email: ${CONFIG.SCHOOL_EMAIL}</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const mailOptions = {
    to: adminEmail,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.SCHOOL_NAME + " Portal"
  };

  if (CONFIG.CC_EMAILS && CONFIG.CC_EMAILS.trim() !== '') {
    mailOptions.cc = CONFIG.CC_EMAILS.trim();
  }
  if (applicantEmail) {
    mailOptions.replyTo = applicantEmail;
  }

  GmailApp.sendEmail(adminEmail, subject, "", mailOptions);
}


/**
 * Sends a personalized, professional HTML confirmation email to the Parent/Applicant.
 */
function sendUserConfirmation(formType, schemaKey, data) {
  const recipientEmail = data.Email || data['adm-email'] || data['bk-email'] || data['pr-email'];
  if (!recipientEmail || !recipientEmail.includes('@')) {
    console.log("No valid recipient email found for user confirmation.");
    return;
  }

  const recipientName = data.ParentName || data.VisitorName || data.Name || data['adm-parent'] || data['bk-name'] || data['pr-name'] || "Respected Parent / Guardian";
  const studentName = data.StudentName || data['adm-name'] || '';
  const grade = data.Grade || data['adm-grade'] || '';

  let subject = "";
  let contentHtml = "";

  if (schemaKey === 'Admissions') {
    subject = `Application Acknowledged: Admission to ${CONFIG.SCHOOL_NAME} [AY 2026-27]`;
    contentHtml = `
      <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
        Dear <strong>${recipientName}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Namaste and welcome to <strong>${CONFIG.SCHOOL_NAME}</strong>. We are pleased to acknowledge receipt of the admission application for <strong>${studentName ? studentName : 'your child'}</strong> for <strong>${grade ? grade : 'the upcoming academic session'}</strong>.
      </p>

      <div style="background-color: #FEF3C7; border-left: 4px solid ${CONFIG.COLOR_GOLD}; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
        <h4 style="margin: 0 0 6px; color: #92400E; font-size: 14px; font-weight: bold;">Next Steps in the Admission Process:</h4>
        <ol style="margin: 0; padding-left: 20px; color: #78350F; font-size: 13px; line-height: 1.6;">
          <li><strong>Application Review:</strong> Our academic team will verify the submitted information.</li>
          <li><strong>Parent-Student Interaction:</strong> Our admissions desk will contact you via phone/WhatsApp to schedule a friendly orientation session.</li>
          <li><strong>Document Verification & Enrollment:</strong> Completion of formal paperwork and seat reservation.</li>
        </ol>
      </div>

      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px; color: #002147; font-size: 13px; font-weight: bold;">Documents to Keep Ready for Verification:</h4>
        <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 12px; line-height: 1.6;">
          <li>Child's Original Birth Certificate (and photocopy)</li>
          <li>Previous School Progress Report / Transfer Certificate (for Class 1 onwards)</li>
          <li>Aadhaar Card copies of student and parents</li>
          <li>4 passport-size photographs of the student</li>
        </ul>
      </div>
    `;

  } else if (schemaKey === 'Campus_Visits') {
    const visitDate = data.Date || data['bk-date'] || 'your requested date';
    const visitTime = data.TimeSlot || data['bk-time'] || 'your preferred slot';
    subject = `Campus Tour Confirmed - Welcome to ${CONFIG.SCHOOL_NAME}, Ratnagiri`;
    contentHtml = `
      <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
        Dear <strong>${recipientName}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        We look forward to welcoming you and your family to <strong>${CONFIG.SCHOOL_NAME}</strong>! Your campus visit request has been logged successfully:
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin: 18px 0; font-size: 13px;">
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #475569; width: 40%;">Scheduled Date</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #002147; font-weight: 600;">${visitDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #475569;">Preferred Time Slot</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #002147; font-weight: 600;">${visitTime}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; font-weight: bold; color: #475569;">Campus Location</td>
          <td style="padding: 10px 14px; color: #002147;">${CONFIG.SCHOOL_ADDRESS}</td>
        </tr>
      </table>

      <p style="font-size: 13px; color: #475569; line-height: 1.6;">
        During the visit, you will have the opportunity to explore our experiential classrooms, STEM lab, Paras Bagh organic garden, and speak directly with our academic mentors. If you need to reschedule or require travel assistance, please call our transport coordinator at <strong>${CONFIG.SCHOOL_PHONE}</strong>.
      </p>
    `;

  } else if (schemaKey === 'Prospectus_Leads') {
    subject = `Your O'Nest Gurukul Prospectus & Academic Guide`;
    contentHtml = `
      <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
        Dear <strong>${recipientName}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Thank you for your interest in <strong>${CONFIG.SCHOOL_NAME}</strong>, Ratnagiri. We are delighted to share our comprehensive curriculum guide and prospectus with you.
      </p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${CONFIG.PROSPECTUS_LINK}" style="display: inline-block; background-color: ${CONFIG.COLOR_NAVY}; color: #FFFFFF; padding: 12px 24px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 14px; letter-spacing: 0.3px;">
          📖 View / Download School Prospectus
        </a>
      </div>

      <p style="font-size: 13px; color: #475569; line-height: 1.6;">
        Our prospectus details our CBSE-aligned curriculum framework, balanced bilingual language development (English, Marathi, Hindi), STEM inquiry program, and Gurukul values education.
      </p>
      <p style="font-size: 13px; color: #475569; line-height: 1.6;">
        We cordially invite you to visit our campus in Nachane, Ratnagiri to experience our vibrant learning environment in person.
      </p>
    `;

  } else {
    // Contact & Homepage
    subject = `Thank You for Contacting ${CONFIG.SCHOOL_NAME}, Ratnagiri`;
    contentHtml = `
      <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
        Dear <strong>${recipientName}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Thank you for reaching out to <strong>${CONFIG.SCHOOL_NAME}</strong>. We have received your message and our administrative team is reviewing your query.
      </p>

      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px 18px; border-radius: 8px; margin: 18px 0; font-size: 13px; color: #334155; line-height: 1.6;">
        <p style="margin: 0 0 6px;"><strong>Status:</strong> Under Review by Administration Desk</p>
        <p style="margin: 0;">Our coordinator will respond to you via your preferred contact channel within <strong>24 business hours</strong>.</p>
      </div>

      <p style="font-size: 13px; color: #475569; line-height: 1.6;">
        If your enquiry is urgent or related to immediate admissions, please call our office helpline directly at <strong>${CONFIG.SCHOOL_PHONE}</strong> during working hours.
      </p>
    `;
  }

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F5F9; padding: 24px 12px; margin: 0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
        
        <!-- Header -->
        <tr>
          <td style="background-color: ${CONFIG.COLOR_NAVY}; padding: 28px 24px; text-align: center; border-bottom: 4px solid ${CONFIG.COLOR_GOLD};">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">${CONFIG.SCHOOL_NAME}</h1>
            <p style="color: ${CONFIG.COLOR_GOLD_LIGHT}; margin: 6px 0 0; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.8px;">${CONFIG.SCHOOL_TAGLINE}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 28px 24px;">
            ${contentHtml}

            <!-- Helpline Card -->
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size: 12px; color: #64748B; line-height: 1.5;">
                    <strong style="color: #002147;">School Office & Help Desk:</strong><br>
                    📞 Phone: ${CONFIG.SCHOOL_PHONE}<br>
                    ✉️ Email: ${CONFIG.SCHOOL_EMAIL}<br>
                    📍 Address: ${CONFIG.SCHOOL_ADDRESS}<br>
                    ⏰ Office Hours: ${CONFIG.OFFICE_HOURS}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #F8FAFC; padding: 18px 24px; border-top: 1px solid #E2E8F0; text-align: center; color: #64748B; font-size: 11px; line-height: 1.5;">
            <p style="margin: 0 0 6px;">&copy; ${new Date().getFullYear()} ${CONFIG.SCHOOL_NAME}, Ratnagiri. All Rights Reserved.</p>
            <p style="margin: 0;"><a href="${CONFIG.WEBSITE_URL}" style="color: ${CONFIG.COLOR_GOLD}; text-decoration: none; font-weight: bold;">Visit Official Website</a></p>
          </td>
        </tr>
      </table>
    </div>
  `;

  GmailApp.sendEmail(recipientEmail, subject, "", {
    name: CONFIG.SCHOOL_NAME,
    htmlBody: htmlBody,
    replyTo: CONFIG.ADMIN_EMAIL
  });
}

