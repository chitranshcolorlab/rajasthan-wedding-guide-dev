/************************************************************
 * RAJASTHAN WEDDING GUIDE
 * Vendor Registration + Secure Admin Approval Backend
 ************************************************************/
const SPREADSHEET_ID =
  '1XxO0mATpxA85Qc0BZW3oMk7pULuypZeXchqSEJuRsQY';
const SHEET_NAME = 'Vendor Registrations';
const AUDIT_SHEET_NAME = 'Admin Audit Log';
const PHOTO_FOLDER_NAME =
  'Rajasthan Wedding Guide - DEV Vendor Uploads';
/*
 * IMPORTANT:
 * This must be the SAME Google OAuth Web Client ID
 * used by admin-review\.html
 */
const GOOGLE_CLIENT_ID =
  '180810306472-6u3ujevmmm3hhvjim4jfll136tn5b5dc.apps.googleusercontent.com';
/*
 * Only this Google account can approve/reject/edit vendors.
 */
const AUTHORIZED_ADMIN_EMAIL =
  'sharadmn29\@gmail.com';
/************************************************************
 * VENDOR SHEET HEADERS
 ************************************************************/
const HEADERS = [
  'Submission ID',
  'Business Name',
  'Owner Name',
  'Mobile',
  'WhatsApp',
  'Email',
  'Years in Business',
  'Category',
  'District',
'City',
  'Full Address',
  'Service Areas',
  'Google Maps',
  'About Business',
  'Services',
  'Starting Price',
  'Languages',
  'Specialities',
  'Instagram',
  'Website',
  'Facebook',
  'Portfolio Link',
  'Logo URL',
  'Photo URLs',
  'Registration Date',
  'Status',
  'Review Notes',
  'Slug'
];
/************************************************************
 * SPREADSHEET CONNECTION
 ************************************************************/
function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const devId = props.getProperty('DEV_SPREADSHEET_ID');
  if (props.getProperty('RWG_ENV') !== 'dev' || !devId || devId === SPREADSHEET_ID) throw new Error('Isolated DEV spreadsheet required');
  return SpreadsheetApp.openById(devId);
}
/************************************************************
 * GET / CREATE VENDOR SHEET
 ************************************************************/
function getSheet_() {
  const ss = getSpreadsheet_();
  let sheet =
    ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet =
      ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(
        1,
        1,
        1,
        HEADERS.length
      )
      .setValues([HEADERS]);
    sheet
      .getRange(
        1,
        1,
        1,
        HEADERS.length
      )
      .setFontWeight('bold')
      .setBackground('#c7a15a');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
/************************************************************
 * GET / CREATE AUDIT LOG
 ************************************************************/
/******************************************************************************
 * HEADER-BASED COLUMN LOOKUP
 * Prevents Status / Review Notes updates from breaking when columns are added.
 ******************************************************************************/
function getHeaderColumn_(sheet, headerName) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn < 1) throw new Error('Vendor sheet has no headers.');
  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  const index = headers.findIndex(function (header) {
    return String(header || '').trim() === headerName;
  });
  if (index === -1) {
    throw new Error('Required sheet header not found: ' + headerName);
  }
  return index + 1;
}
function getAuditSheet_() {
  const ss = getSpreadsheet_();
  let sheet =
    ss.getSheetByName(
      AUDIT_SHEET_NAME
    );
  if (!sheet) {
    sheet =
      ss.insertSheet(
        AUDIT_SHEET_NAME
      );
  }
  /*
   * Upgrade old audit sheet automatically.
   */
  const requiredHeaders = [
    'Date',
    'Submission ID',
    'Action',
    'Note',
    'Admin Email',
    'Google Account ID'
  ];
  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(
        1,
        1,
        1,
        requiredHeaders.length
      )
      .setValues([
        requiredHeaders
      ]);
  } else {
    /*
     * Preserve existing audit records.
     * Add the two new headers if old sheet
     * only had 4 columns.
     */
    sheet
      .getRange(
        1,
        1,
        1,
        requiredHeaders.length
      )
      .setValues([
        requiredHeaders
      ]);
  }
  sheet
    .getRange(
      1,
      1,
      1,
      requiredHeaders.length
    )
    .setFontWeight('bold')
    .setBackground('#c7a15a');
  sheet.setFrozenRows(1);
  return sheet;
}
/************************************************************
 * INITIAL SETUP
 ************************************************************/
function setupSystem() {
  getSheet_();
  getAuditSheet_();
  getUploadFolder_();
  Logger.log(
    'Rajasthan Wedding Guide Secure System Ready'
  );
  return 'Rajasthan Wedding Guide Secure System Ready';
}
/************************************************************
 * GET REQUEST
 *
 * Examples:
 *
 * ?action=test
 * ?action=list
 * ?action=list&status=Approved
 ************************************************************/
function doGet(e) {
  try {
    const params =
      e && e.parameter
        ? e.parameter
        : {};
    const action =
      String(
        params.action || 'list'
      )
      .trim()
      .toLowerCase();
    /*
     * CONNECTION TEST
     */
    if (action === 'test') {
      getSpreadsheet_();
      return json_({
        ok: true,
        message:
          'Rajasthan Wedding Guide API working',
        environment: 'dev',
        version: 'automatic-vendor-v1'
      });
    }
    /*
     * PUBLIC LIST API
     */
    if (action !== 'list') {
      return json_({
        ok: false,
        error:
          'Unsupported GET action'
      });
    }
    const status =
      String(
        params.status || ''
      ).trim();
    const sheet =
      getSheet_();
    const values =
      sheet
        .getDataRange()
        .getDisplayValues();
    if (values.length < 2) {
      return json_({
        ok: true,
        count: 0,
        items: []
      });
    }
    const headers =
      values[0];
    let items =
      values
        .slice(1)
        .filter(
          row =>
            String(
              row[0] || ''
            ).trim()
        )
        .map(
          row =>
            rowObject_(
              headers,
              row
            )
        );
    items = items.filter(item => item['Status'] === 'Approved').map(publicVendor_);
    if (status) {
      items =
        items.filter(
          item =>
            String(
              item['Status'] || ''
            ).trim() === status
        );
    }
    return json_({
      ok: true,
      count:
        items.length,
      items:
        items
    });
  }
  catch (err) {
    Logger.log(
      'GET ERROR: ' +
      err
    );
    return json_({
      ok: false,
      error:
        String(err)
    });
  }
}
/************************************************************
 * POST REQUEST
 ************************************************************/
function doPost(e) {
  try {
    const raw =
      e &&
      e.postData &&
      e.postData.contents
        ? e.postData.contents
        : '{}';
    /*
     * Do NOT log the complete raw request because
     * status requests contain a Google ID token.
     */
    const body =
      JSON.parse(raw);
    const action =
      String(
        body.action || ''
      )
      .trim()
      .toLowerCase();
    Logger.log(
      'POST ACTION: ' +
      action
    );
    /*
     * PUBLIC REGISTRATION
     */
    if (action === 'submit') {
      return submitVendor_(
        body
      );
    }
    /*
     * SECURE ADMIN STATUS ACTION
     */
    if (action === 'admin-list') {
      const admin = verifyGoogleAdminToken_(body.idToken);
      if (!admin.ok) return json_(admin);
      const values = getSheet_().getDataRange().getDisplayValues();
      return json_({ok:true, items: values.slice(1).filter(row => row[0]).map(row => rowObject_(values[0], row))});
    }
    if (action === 'status') {
      const admin =
        verifyGoogleAdminToken_(
          body.idToken
        );
      if (!admin.ok) {
        Logger.log(
          'ADMIN AUTH FAILED: ' +
          admin.error
        );
        return json_({
          ok: false,
          error:
            admin.error ||
            'Unauthorized admin'
        });
      }
      return updateStatus_(
        body,
        admin
      );
    }
    return json_({
      ok: false,
      error:
        'Unsupported POST action'
    });
  }
  catch (err) {
    Logger.log(
      'POST ERROR: ' +
      err
    );
    return json_({
      ok: false,
      error:
        String(err)
    });
  }
}
/************************************************************
 * VERIFY GOOGLE ADMIN ID TOKEN
 *
 * Apps Script-only implementation:
 * Google tokeninfo validates the supplied Google ID token.
 *
 * We additionally enforce:
 * - audience
 * - issuer
 * - expiry
 * - email_verified
 * - exact authorized email
 * - Google subject ID
 ************************************************************/
function verifyGoogleAdminToken_(
  idToken
) {
  try {
    if (
      !idToken ||
      typeof idToken !== 'string'
    ) {
      return {
        ok: false,
        error:
          'Google ID token missing.'
      };
    }
    /*
     * Ask Google's tokeninfo service
     * to validate the Google ID token.
     */
    const verificationUrl =
      'https\://oauth2.googleapis.com/tokeninfo?id_token=' +
      encodeURIComponent(
        idToken
      );
    const response =
      UrlFetchApp.fetch(
        verificationUrl,
        {
          method: 'get',
          muteHttpExceptions: true
        }
      );
    const responseCode =
      response.getResponseCode();
    if (responseCode !== 200) {
      Logger.log(
        'Google token verification rejected.'
      );
      return {
        ok: false,
        error:
          'Invalid or expired Google ID token.'
      };
    }
    let payload;
    try {
      payload =
        JSON.parse(
          response.getContentText()
        );
    }
    catch (err) {
      return {
        ok: false,
        error:
          'Invalid Google token response.'
      };
    }
    /********************************************************
     * AUDIENCE CHECK
     ********************************************************/
    const audience =
      String(
        payload.aud || ''
      );
    if (
      audience !==
      GOOGLE_CLIENT_ID
    ) {
      return {
        ok: false,
        error:
          'Invalid token audience.'
      };
    }
    /********************************************************
     * ISSUER CHECK
     ********************************************************/
    const issuer =
      String(
        payload.iss || ''
      );
    const validIssuer =
      issuer ===
        'accounts.google.com' ||
      issuer ===
        'https\://accounts.google.com';
    if (!validIssuer) {
      return {
        ok: false,
        error:
          'Invalid token issuer.'
      };
    }
    /********************************************************
     * EXPIRY CHECK
     ********************************************************/
    const expiry =
      Number(
        payload.exp || 0
      );
    const now =
      Math.floor(
        Date.now() / 1000
      );
    if (
      !expiry ||
      expiry <= now
    ) {
      return {
        ok: false,
        error:
          'Google login has expired.'
      };
    }
    /********************************************************
     * EMAIL VERIFIED CHECK
     ********************************************************/
    const emailVerified =
      payload.email_verified === true ||
      String(
        payload.email_verified || ''
      ).toLowerCase() === 'true';
    if (!emailVerified) {
      return {
        ok: false,
        error:
          'Google email is not verified.'
      };
    }
    /********************************************************
     * EMAIL CHECK
     ********************************************************/
    const email =
      String(
        payload.email || ''
      )
      .trim()
      .toLowerCase();
    if (!email) {
      return {
        ok: false,
        error:
          'Google email missing.'
      };
    }
    if (
      email !==
      AUTHORIZED_ADMIN_EMAIL
        .toLowerCase()
    ) {
      Logger.log(
        'Unauthorized Google account attempted admin action: ' +
        email
      );
      return {
        ok: false,
        error:
          'This Google account is not authorized.'
      };
    }
    /********************************************************
     * GOOGLE ACCOUNT SUBJECT
     ********************************************************/
    const subject =
      String(
        payload.sub || ''
      ).trim();
    if (!subject) {
      return {
        ok: false,
        error:
          'Google account ID missing.'
      };
    }
    return {
      ok: true,
      email:
        email,
      sub:
        subject,
      name:
        String(
          payload.name || ''
        ),
      exp:
        expiry
    };
  }
  catch (err) {
    Logger.log(
      'TOKEN VERIFY ERROR: ' +
      err
    );
    return {
      ok: false,
      error:
        'Google authentication verification failed.'
    };
  }
}
/************************************************************
 * SUBMIT NEW VENDOR
 ************************************************************/
function submitVendor_(
  body
) {
  validateVendor_(body);
  const sheet =
    getSheet_();
  /*
   * REQUIRED FIELDS
   */
  if (
    !body.businessName ||
    !body.ownerName ||
    !body.mobile ||
    !body.whatsapp ||
    !body.category ||
    !body.city
  ) {
    return json_({
      ok: false,
      error:
        'Required vendor information is missing.'
    });
  }
  const now =
    new Date();
  const id = 'RWG-' + Utilities.getUuid();
  /**********************************************************
   * FILE UPLOAD
   **********************************************************/
  const folder =
    getUploadFolder_();
  const logoUrl =
    saveFile_(
      folder,
      body.logo,
      id + '-logo'
    );
  const photos =
    Array.isArray(
      body.photos
    )
      ? body.photos.slice(
          0,
          10
        )
      : [];
  const photoUrls =
    photos
      .map(
        (photo, index) =>
          saveFile_(
            folder,
            photo,
            id +
            '-photo-' +
            (index + 1)
          )
      )
      .filter(Boolean);
  /**********************************************************
   * CREATE ROW
   **********************************************************/
  const row = [
    id,
    body.businessName || '',
    body.ownerName || '',
    body.mobile || '',
    body.whatsapp || '',
    body.email || '',
    body.experience || '',
    body.category || '',
    body.district || '',
body.city || '',
    body.address || '',
    body.serviceAreas || '',
    body.maps || '',
    body.about || '',
    body.services || '',
    body.startingPrice || '',
    body.languages || '',
    body.specialities || '',
    body.instagram || '',
    body.website || '',
    body.facebook || '',
    body.portfolio || '',
    logoUrl,
    photoUrls.join('\n'),
    Utilities.formatDate(
      now,
      'Asia/Kolkata',
      'yyyy-MM-dd HH:mm:ss'
    ),
    'Pending Approval',
    body.notes || ''
  ];
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
  const record = rowObject_(HEADERS, row);
  sheet.appendRow(headers.map(h => safeCell_(record[h] || '')));
  SpreadsheetApp.flush();
  return json_({
    ok: true,
    id:
      id,
    status:
      'Pending Approval',
    message:
      'Vendor registration received successfully.'
  });
}
/************************************************************
 * SECURE UPDATE STATUS
 *
 * ONLY authenticated admin can reach this function
 * through doPost().
 ************************************************************/
function updateStatus_(body, admin) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try { return updateStatusLocked_(body, admin); } finally { lock.releaseLock(); }
}
function updateStatusLocked_(body, admin) {
  /*
   * Do NOT allow Pending Approval through
   * the public/admin status API.
   *
   * New registrations receive Pending Approval
   * automatically during submitVendor_().
   */
  const allowed = [
    'Approved',
    'Rejected',
    'Edit Required'
  ];
  const id =
    String(
      body.id || ''
    ).trim();
  const status =
    String(
      body.status || ''
    ).trim();
  const note =
    String(
      body.note || ''
    ).trim();
  /**********************************************************
   * DEFENSIVE ADMIN CHECK
   **********************************************************/
  if (
    !admin ||
    !admin.ok
  ) {
    return json_({
      ok: false,
      error:
        'Unauthorized admin.'
    });
  }
  if (
    String(
      admin.email || ''
    )
    .toLowerCase() !==
    AUTHORIZED_ADMIN_EMAIL
      .toLowerCase()
  ) {
    return json_({
      ok: false,
      error:
        'Unauthorized admin account.'
    });
  }
  /**********************************************************
   * VALIDATE ID
   **********************************************************/
  if (!id) {
    return json_({
      ok: false,
      error:
        'Submission ID missing'
    });
  }
  /**********************************************************
   * VALIDATE STATUS
   **********************************************************/
  if (
    !allowed.includes(
      status
    )
  ) {
    return json_({
      ok: false,
      error:
        'Invalid admin status: ' +
        status
    });
  }
  const sheet =
    getSheet_();
  const lastRow =
    sheet.getLastRow();
  if (lastRow < 2) {
    return json_({
      ok: false,
      error:
        'No vendor submissions found'
    });
  }
  /**********************************************************
   * FIND SUBMISSION ID
   **********************************************************/
  const ids =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        1
      )
      .getDisplayValues();
  let foundRow = -1;
  for (
    let i = 0;
    i < ids.length;
    i++
  ) {
    const sheetId =
      String(
        ids[i][0]
      ).trim();
    if (
      sheetId === id
    ) {
      foundRow =
        i + 2;
      break;
    }
  }
  if (
    foundRow === -1
  ) {
    Logger.log(
      'Submission not found: ' +
      id
    );
    return json_({
      ok: false,
      error:
        'Submission not found',
      id:
        id
    });
  }
  /******************************************************************************
   * HEADER-BASED STATUS / REVIEW NOTES UPDATE
   ******************************************************************************/
  const statusColumn = getHeaderColumn_(sheet, 'Status');
  const reviewNotesColumn = getHeaderColumn_(sheet, 'Review Notes');
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
  const vendor = rowObject_(headers, sheet.getRange(foundRow,1,1,headers.length).getDisplayValues()[0]);
  let slug = String(vendor.Slug || '');
  if (status === 'Approved') {
    validateVendor_({businessName:vendor['Business Name'],ownerName:vendor['Owner Name'],mobile:vendor.Mobile,whatsapp:vendor.WhatsApp,category:vendor.Category,district:vendor.District,city:vendor.City,services:vendor.Services});
    const all = sheet.getDataRange().getDisplayValues().slice(1).map(row => rowObject_(headers,row));
    if (slug && all.some(v => v['Submission ID'] !== id && v.Slug === slug)) throw new Error('Duplicate stored slug');
    if (!slug) {
      const base = (slugify_(vendor['Business Name']) + '-' + slugify_(vendor.City)).slice(0,160).replace(/-+$/,'');
      slug = base;
      let suffix=2;
      const used = new Set(all.filter(v => v['Submission ID'] !== id).map(v=>v.Slug));
      while (used.has(slug)) slug = base + '-' + suffix++;
      let column = headers.indexOf('Slug')+1;
      if (!column) {column=headers.length+1;sheet.getRange(1,column).setValue('Slug');}
      sheet.getRange(foundRow,column).setValue(slug);
    }
  }
  sheet.getRange(foundRow, statusColumn).setValue(status);
  sheet.getRange(foundRow, reviewNotesColumn).setValue(safeCell_(note));
  SpreadsheetApp.flush();
  /**********************************************************
   * AUTHENTICATED AUDIT LOG
   **********************************************************/
  writeAuditLog_({
    vendorId:
      id,
    action:
      status,
    note:
      note,
    adminEmail:
      admin.email,
    adminGoogleId:
      admin.sub
  });
  Logger.log(
    'STATUS UPDATED: ' +
    id +
    ' => ' +
    status +
    ' by ' +
    admin.email
  );
  return json_({
    ok: true,
    id:
      id,
    status:
      status,
    row:
      foundRow,
    admin:
      admin.email,
    slug: slug,
    profilePath: slug ? 'vendors/' + slug + '/' : '',
    message:
      'Vendor status updated; publisher will synchronize automatically'
  });
}
/************************************************************
 * WRITE AUDIT LOG
 ************************************************************/
function writeAuditLog_(
  entry
) {
  const audit =
    getAuditSheet_();
  audit.appendRow([
    Utilities.formatDate(
      new Date(),
      'Asia/Kolkata',
      'yyyy-MM-dd HH:mm:ss'
    ),
    entry.vendorId || '',
    entry.action || '',
    safeCell_(entry.note || ''),
    entry.adminEmail || '',
    entry.adminGoogleId || ''
  ]);
  SpreadsheetApp.flush();
}
/************************************************************
 * UPLOAD FOLDER
 ************************************************************/
function getUploadFolder_() {
  const folders =
    DriveApp.getFoldersByName(
      PHOTO_FOLDER_NAME
    );
  if (
    folders.hasNext()
  ) {
    return folders.next();
  }
  return DriveApp.createFolder(
    PHOTO_FOLDER_NAME
  );
}
/************************************************************
 * SAVE IMAGE
 ************************************************************/
function saveFile_(
  folder,
  fileData,
  name
) {
  if (
    !fileData ||
    !fileData.data
  ) {
    return '';
  }
  try {
    const mime =
      fileData.type ||
      'image/jpeg';
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(mime)) throw new Error('Unsupported image type');
    let base64 =
      String(
        fileData.data
      );
    /*
     * Accept both:
     *
     * pure base64
     *
     * and
     *
     * data:image/jpeg;base64,XXXXX
     */
    if (
      base64.includes(',')
    ) {
      base64 =
        base64
          .split(',')
          .pop();
    }
    if (base64.length > 8 * 1024 * 1024) throw new Error('Image exceeds size limit');
    const bytes =
      Utilities.base64Decode(
        base64
      );
    const blob =
      Utilities.newBlob(
        bytes,
        mime,
        name +
        mimeExtension_(
          mime
        )
      );
    const file =
      folder.createFile(
        blob
      );
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return 'https://drive.google.com/thumbnail?id=' + encodeURIComponent(file.getId()) + '&sz=w1600';
  }
  catch (err) {
    Logger.log(
      'FILE ERROR: ' +
      err
    );
    return '';
  }
}
/************************************************************
 * MIME EXTENSION
 ************************************************************/
function mimeExtension_(
  mime
) {
  if (
    mime ===
    'image/png'
  ) {
    return '.png';
  }
  if (
    mime ===
    'image/webp'
  ) {
    return '.webp';
  }
  if (
    mime ===
    'image/gif'
  ) {
    return '.gif';
  }
  return '.jpg';
}
/************************************************************
 * ROW TO OBJECT
 ************************************************************/
function rowObject_(
  headers,
  row
) {
  const obj = {};
  headers.forEach(
    (header, index) => {
      obj[header] =
        row[index] || '';
    }
  );
  return obj;
}
/************************************************************
 * JSON RESPONSE
 ************************************************************/
function json_(
  data
) {
  return ContentService
    .createTextOutput(
      JSON.stringify(
        data
      )
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}

function slugify_(s) {
  const slug=String(s||'').normalize('NFKD').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return slug || 'vendor';
}
function safeCell_(value) {
  const s=String(value||'');return /^[=+@-]/.test(s) ? "'"+s : s;
}
function validateVendor_(v) {
  for (const k of ['businessName','ownerName','category','district','city','services']) {
    if (!String(v[k]||'').trim()) throw new Error('Required field missing: '+k);
  }
  for (const k of ['mobile','whatsapp']) {
    if (!/^(?:91)?[6-9][0-9]{9}$/.test(String(v[k]||'').replace(/\D/g,''))) throw new Error('Invalid phone: '+k);
  }
  const catalog=JSON.parse(RWG_CATALOG_JSON);
  if (!catalog.locations[v.district] || !catalog.locations[v.district].includes(v.city)) throw new Error('Invalid district/city');
  if (!catalog.categories.some(c=>c[0]===v.category)) throw new Error('Invalid category');
}
function publicVendor_(v) {
  const hidden=['Owner Name','Email','Review Notes','Registration Date'];
  const out={};Object.keys(v).filter(k=>!hidden.includes(k)).forEach(k=>out[k]=v[k]);return out;
}
const RWG_CATALOG_JSON = "{\"locations\": {\"Ajmer\": [\"Ajmer\", \"Kishangarh\", \"Nasirabad\", \"Pushkar\", \"Kekri\", \"Sarwar\"], \"Alwar\": [\"Alwar\", \"Rajgarh\", \"Ramgarh\", \"Thanagazi\", \"Laxmangarh\"], \"Balotra\": [\"Balotra\", \"Pachpadra\", \"Siwana\", \"Samdari\"], \"Banswara\": [\"Banswara\", \"Kushalgarh\", \"Bagidora\", \"Ghatol\", \"Garhi\"], \"Baran\": [\"Baran\", \"Anta\", \"Atru\", \"Chhabra\", \"Mangrol\", \"Shahbad\"], \"Barmer\": [\"Barmer\", \"Chohtan\", \"Dhorimanna\", \"Gudamalani\", \"Sheo\"], \"Beawar\": [\"Beawar\", \"Masuda\", \"Vijaynagar\", \"Raipur\", \"Jaitaran\"], \"Bharatpur\": [\"Bharatpur\", \"Bayana\", \"Nadbai\", \"Weir\", \"Roopwas\"], \"Bhilwara\": [\"Bhilwara\", \"Shahpura\", \"Asind\", \"Mandal\", \"Mandalgarh\", \"Jahazpur\", \"Gulabpura\"], \"Bikaner\": [\"Bikaner\", \"Nokha\", \"Deshnoke\", \"Lunkaransar\", \"Kolayat\", \"Khajuwala\"], \"Bundi\": [\"Bundi\", \"Lakheri\", \"Keshoraipatan\", \"Nainwa\", \"Hindoli\", \"Indragarh\"], \"Chittorgarh\": [\"Chittorgarh\", \"Nimbahera\", \"Kapasan\", \"Begun\", \"Rawatbhata\", \"Bari Sadri\"], \"Churu\": [\"Churu\", \"Ratangarh\", \"Sujangarh\", \"Sardarshahar\", \"Taranagar\", \"Rajgarh\"], \"Dausa\": [\"Dausa\", \"Bandikui\", \"Lalsot\", \"Mahwa\", \"Sikrai\"], \"Deeg\": [\"Deeg\", \"Kaman\", \"Nagar\", \"Kumher\", \"Pahari\"], \"Dholpur\": [\"Dholpur\", \"Bari\", \"Rajakhera\", \"Baseri\"], \"Didwana-Kuchaman\": [\"Didwana\", \"Kuchaman City\", \"Ladnun\", \"Makrana\", \"Parbatsar\", \"Nawa\"], \"Dungarpur\": [\"Dungarpur\", \"Sagwara\", \"Aspur\", \"Simalwara\"], \"Hanumangarh\": [\"Hanumangarh\", \"Nohar\", \"Bhadra\", \"Pilibanga\", \"Sangaria\", \"Rawatsar\"], \"Jaipur\": [\"Jaipur\", \"Chomu\", \"Sambhar\", \"Phulera\", \"Shahpura\", \"Jobner\", \"Dudu\", \"Kishangarh Renwal\"], \"Jaisalmer\": [\"Jaisalmer\", \"Pokaran\", \"Fatehgarh\"], \"Jalore\": [\"Jalore\", \"Bhinmal\", \"Sanchore\", \"Raniwara\", \"Ahore\"], \"Jhalawar\": [\"Jhalawar\", \"Bhawani Mandi\", \"Jhalrapatan\", \"Aklera\", \"Khanpur\", \"Manohar Thana\"], \"Jhunjhunu\": [\"Jhunjhunu\", \"Nawalgarh\", \"Chirawa\", \"Pilani\", \"Khetri\", \"Mandawa\", \"Udaipurwati\"], \"Jodhpur\": [\"Jodhpur\", \"Bilara\", \"Pipar City\", \"Bhopalgarh\", \"Osian\"], \"Karauli\": [\"Karauli\", \"Hindaun\", \"Todabhim\", \"Sapotra\"], \"Khairthal-Tijara\": [\"Khairthal\", \"Tijara\", \"Bhiwadi\", \"Kishangarh Bas\", \"Mundawar\"], \"Kota\": [\"Kota\", \"Ramganj Mandi\", \"Sangod\", \"Itawa\"], \"Kotputli-Behror\": [\"Kotputli\", \"Behror\", \"Neemrana\", \"Bansur\", \"Viratnagar\", \"Paota\"], \"Nagaur\": [\"Nagaur\", \"Merta City\", \"Degana\", \"Jayal\", \"Khinvsar\"], \"Pali\": [\"Pali\", \"Sojat\", \"Bali\", \"Sumerpur\", \"Marwar Junction\", \"Desuri\"], \"Phalodi\": [\"Phalodi\", \"Lohawat\", \"Dechu\", \"Bap\"], \"Pratapgarh\": [\"Pratapgarh\", \"Chhoti Sadri\", \"Arnod\", \"Dhariawad\"], \"Rajsamand\": [\"Rajsamand\", \"Nathdwara\", \"Amet\", \"Deogarh\", \"Bhim\", \"Kumbhalgarh\"], \"Salumber\": [\"Salumber\", \"Sarada\", \"Semari\", \"Jhallara\", \"Lasadiya\"], \"Sawai Madhopur\": [\"Sawai Madhopur\", \"Gangapur City\", \"Bonli\", \"Chauth Ka Barwara\"], \"Sikar\": [\"Sikar\", \"Fatehpur\", \"Neem Ka Thana\", \"Sri Madhopur\", \"Lachhmangarh\", \"Reengus\"], \"Sirohi\": [\"Sirohi\", \"Abu Road\", \"Mount Abu\", \"Pindwara\", \"Sheoganj\"], \"Sri Ganganagar\": [\"Sri Ganganagar\", \"Suratgarh\", \"Raisinghnagar\", \"Sri Karanpur\", \"Sadulshahar\", \"Anupgarh\"], \"Tonk\": [\"Tonk\", \"Malpura\", \"Niwai\", \"Deoli\", \"Todaraisingh\", \"Uniara\"], \"Udaipur\": [\"Udaipur\", \"Fatehnagar\", \"Bhinder\", \"Gogunda\", \"Kherwara\", \"Mavli\"]}, \"categories\": [[\"Wedding Venues\", \"wedding-venues\"], [\"Photographers & Films\", \"photographers-films\"], [\"Makeup Artists\", \"makeup-artists\"], [\"Decorators & Tent House\", \"decorators-tent-house\"], [\"Wedding Planners\", \"wedding-planners\"], [\"Caterers\", \"caterers\"], [\"Mehendi Artists\", \"mehendi-artists\"], [\"DJ & Entertainment\", \"dj-entertainment\"], [\"Anchors & Emcees\", \"anchors-emcees\"], [\"Wedding Rental Dresses\", \"wedding-rental-dresses\"], [\"Bridal Wear\", \"bridal-wear\"], [\"Groom Wear\", \"groom-wear\"], [\"Band, Dhol & Ghodi\", \"band-dhol-ghodi\"], [\"Pandit & Wedding Priest\", \"pandit-wedding-priest\"], [\"Other Wedding Service\", \"other-wedding-service\"]]}";
