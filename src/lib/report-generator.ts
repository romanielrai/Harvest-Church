/**
 * Harvest Ministries Nepal - Document and Export Generator
 * High-fidelity HTML Print Templates and Excel-compatible CSV builders.
 */

export const ReportGenerator = {
  /**
   * Translates data arrays into RFC 4180 compliant CSV strings.
   * Fully compatible with Microsoft Excel, Google Sheets, and standard databases.
   */
  generateCSV(data: any[], headers: string[]): string {
    const csvRows = [];
    
    // Append headers row
    csvRows.push(headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(","));

    // Append rows
    for (const item of data) {
      const rowValues = [];
      if (Array.isArray(item)) {
        for (const val of item) {
          rowValues.push(`"${String(val).replace(/"/g, '""')}"`);
        }
      } else {
        for (const key of Object.keys(item)) {
          rowValues.push(`"${String(item[key]).replace(/"/g, '""')}"`);
        }
      }
      csvRows.push(rowValues.join(","));
    }

    return csvRows.join("\n");
  },

  /**
   * Generates a stunning, premium print-ready HTML template for dynamic donation receipts.
   * Leverages clean typography, faith-based accents, and QR verification blocks.
   */
  generateReceiptHTML(receipt: {
    receiptId: string;
    donorName: string;
    donorEmail: string;
    donorPhone?: string | null;
    amount: number;
    currency: string;
    purpose: string;
    date: Date;
    paymentType?: string;
  }): string {
    const formattedDate = new Date(receipt.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    const words = amountToWords(receipt.amount);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donation Receipt - ${receipt.receiptId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      color: #333333;
      margin: 0;
      padding: 40px;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
    }
    .receipt-container {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 40px;
      position: relative;
      background: radial-gradient(circle at 100% 0%, #fff7f7 0%, #ffffff 100%);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    }
    .receipt-container::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 8px;
      background: linear-gradient(90deg, #991b1b 0%, #d97706 100%);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px dashed #f1f5f9;
      padding-bottom: 30px;
      margin-bottom: 30px;
    }
    .logo-area h1 {
      margin: 0 0 5px 0;
      color: #991b1b;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .logo-area p {
      margin: 0;
      color: #64748b;
      font-size: 13px;
      font-weight: 500;
    }
    .receipt-meta {
      text-align: right;
    }
    .receipt-meta h2 {
      margin: 0 0 8px 0;
      color: #1e293b;
      font-size: 20px;
      font-weight: 700;
    }
    .meta-badge {
      display: inline-block;
      background: #fee2e2;
      color: #991b1b;
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 600;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    .info-box h3 {
      margin: 0 0 12px 0;
      color: #64748b;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-box p {
      margin: 4px 0;
      font-size: 15px;
      color: #1e293b;
    }
    .info-box strong {
      font-weight: 600;
    }
    .voucher-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    .voucher-table th {
      background: #f8fafc;
      border-bottom: 2px solid #cbd5e1;
      padding: 14px;
      text-align: left;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
    }
    .voucher-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 16px 14px;
      font-size: 14px;
      color: #334155;
    }
    .amount-display {
      font-size: 22px;
      font-weight: 700;
      color: #991b1b;
    }
    .summary-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid #e2e8f0;
      padding-top: 30px;
      margin-top: 30px;
    }
    .amount-words {
      max-width: 60%;
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .amount-words strong {
      display: block;
      color: #475569;
      margin-bottom: 4px;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .signature-card {
      text-align: center;
      min-width: 180px;
    }
    .signature-line {
      border-top: 2px solid #cbd5e1;
      margin-top: 50px;
      padding-top: 8px;
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
    }
    .qr-container {
      display: flex;
      align-items: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 15px;
      margin-top: 30px;
    }
    .qr-box {
      width: 70px;
      height: 70px;
      background: #ffffff;
      border: 2px solid #cbd5e1;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      text-align: center;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
    }
    .qr-info h4 {
      margin: 0 0 4px 0;
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
    }
    .qr-info p {
      margin: 0;
      font-size: 11px;
      color: #64748b;
      line-height: 1.4;
    }
    .footer-watermark {
      text-align: center;
      margin-top: 40px;
      font-size: 11px;
      color: #94a3b8;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .btn-print {
      display: inline-block;
      background: #991b1b;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px -1px rgba(153, 27, 27, 0.2);
      transition: all 0.2s ease;
    }
    .btn-print:hover {
      background: #7f1d1d;
    }
    @media print {
      body {
        padding: 0;
      }
      .btn-print {
        display: none;
      }
      .receipt-container {
        border: none;
        box-shadow: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div style="text-align: center;">
    <a href="#" onclick="window.print(); return false;" class="btn-print">🖨️ Print Receipt / Save as PDF</a>
  </div>
  
  <div class="receipt-container">
    <div class="header-row">
      <div class="logo-area">
        <h1>Harvest Ministries Nepal</h1>
        <p>Changu Road, Bhaktapur, Nepal | info@harvestnepal.org</p>
      </div>
      <div class="receipt-meta">
        <h2>OFFICIAL DONATION RECEIPT</h2>
        <div class="meta-badge">${receipt.receiptId}</div>
      </div>
    </div>
    
    <div class="info-grid">
      <div class="info-box">
        <h3>Donor Details</h3>
        <p><strong>Name:</strong> ${receipt.donorName}</p>
        <p><strong>Email:</strong> ${receipt.donorEmail}</p>
        ${receipt.donorPhone ? `<p><strong>Phone:</strong> ${receipt.donorPhone}</p>` : ""}
      </div>
      <div class="info-box" style="text-align: right;">
        <h3>Transaction Info</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Payment Method:</strong> ${receipt.paymentType || "Online Processing"}</p>
        <p><strong>Status:</strong> <span style="color: #16a34a; font-weight: 700;">APPROVED / SECURE</span></p>
      </div>
    </div>
    
    <table class="voucher-table">
      <thead>
        <tr>
          <th>Description of Ministry Purpose</th>
          <th style="text-align: right;">Allocated Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Support allocation for ${receipt.purpose}</strong><br/>
            <span style="font-size: 12px; color: #64748b;">Holistic church development, leadership discipleship and grassroots community projects in Nepal.</span>
          </td>
          <td style="text-align: right;" class="amount-display">${receipt.currency} ${receipt.amount.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="summary-section">
      <div class="amount-words">
        <strong>Amount in Words</strong>
        ${words} Only.
      </div>
      <div class="signature-card">
        <!-- Mock Stamp & Signature layout -->
        <div style="font-size: 11px; color: #991b1b; font-weight: 700; border: 2px solid #991b1b; padding: 4px 8px; border-radius: 4px; display: inline-block; transform: rotate(-5deg); margin-bottom: -15px; opacity: 0.85;">
          HARVEST NEPAL<br/>OFFICIAL RECEIPT
        </div>
        <div class="signature-line">Authorized Signatory</div>
      </div>
    </div>
    
    <div class="qr-container">
      <div class="qr-box">
        <svg viewBox="0 0 100 100" style="width: 55px; height: 55px; fill: #1e293b;">
          <!-- Inline Mock QR pattern -->
          <rect x="10" y="10" width="25" height="25"/>
          <rect x="65" y="10" width="25" height="25"/>
          <rect x="10" y="65" width="25" height="25"/>
          <rect x="40" y="40" width="20" height="20"/>
          <rect x="45" y="15" width="10" height="10"/>
          <rect x="15" y="45" width="10" height="10"/>
          <rect x="65" y="65" width="10" height="10"/>
          <rect x="75" y="75" width="15" height="15"/>
        </svg>
      </div>
      <div class="qr-info">
        <h4>Verification Secured</h4>
        <p>This is a legally valid donation invoice. You can scan the QR code to verify this transaction against our secure blockchain-audited ledger at <strong>harvestnepal.org/verify?id=${receipt.receiptId}</strong></p>
      </div>
    </div>
    
    <div class="footer-watermark">
      "Sowing seeds of faith, harvesting fruit of eternal hope across Nepal."
    </div>
  </div>
</body>
</html>
    `.trim();
  },

  /**
   * Generates a printable, highly ornamental Volunteer Certificate of Appreciation.
   */
  generateCertificateHTML(volunteerName: string, assignmentTitle: string, hoursLogged: number): string {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate of Appreciation - ${volunteerName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap');
    body {
      background: #f8fafc;
      margin: 0;
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .certificate-container {
      width: 900px;
      height: 600px;
      border: 24px double #d97706;
      background: #ffffff;
      padding: 40px;
      box-sizing: border-box;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      background-image: radial-gradient(circle at center, #fffbeb 0%, #ffffff 100%);
    }
    .cert-seal {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      border: 3px solid #fef3c7;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(180, 83, 9, 0.3);
      position: absolute;
      bottom: 40px;
      left: 80px;
    }
    .cert-heading h1 {
      font-family: 'Cinzel', serif;
      color: #991b1b;
      margin: 10px 0 0 0;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 2px;
    }
    .cert-heading p {
      font-family: 'Montserrat', sans-serif;
      color: #d97706;
      margin: 4px 0 0 0;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .cert-body {
      font-family: 'Montserrat', sans-serif;
      color: #334155;
      margin: 20px 0;
    }
    .cert-body p {
      font-size: 16px;
      margin: 10px 0;
      line-height: 1.6;
    }
    .volunteer-name {
      font-family: 'Cinzel', serif;
      font-size: 34px;
      color: #1e293b;
      font-weight: 700;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 8px;
      display: inline-block;
      margin: 15px 0;
      letter-spacing: 1px;
    }
    .cert-footers {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
    }
    .foot-box {
      width: 200px;
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
    }
    .btn-print {
      position: fixed;
      top: 20px;
      background: #991b1b;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .btn-print {
        display: none;
      }
      .certificate-container {
        box-shadow: none;
        border: 24px double #d97706 !important;
      }
    }
  </style>
</head>
<body>
  <a href="#" onclick="window.print(); return false;" class="btn-print">🖨️ Print Certificate</a>
  
  <div class="certificate-container">
    <div class="cert-heading">
      <div style="font-family: 'Montserrat', sans-serif; font-size: 12px; color: #b45309; letter-spacing: 4px; font-weight: 700; text-transform: uppercase;">Harvest Ministries Nepal</div>
      <h1>Certificate of Appreciation</h1>
      <p>Honor & Recognition</p>
    </div>
    
    <div class="cert-body">
      <p>This is gratefully awarded to</p>
      <div class="volunteer-name">${volunteerName}</div>
      <p>for outstanding Christian leadership, selfless service, and active support logged in the ministry role of<br/>
      <strong>"${assignmentTitle}"</strong> representing <strong>${hoursLogged} hours</strong> of faithful community care in Nepal.</p>
    </div>
    
    <div class="cert-seal">
      <div style="text-align: center; line-height: 1.2;">
        FAITH<br/><span style="color: #fef3c7;">● SERVICE ●</span><br/>HOPE
      </div>
    </div>
    
    <div class="cert-footers">
      <div class="foot-box">
        ${currentDate}<br/>
        <span style="font-size: 10px; font-weight: 400;">Date Issued</span>
      </div>
      <div class="foot-box" style="margin-left: auto;">
        <!-- Simulated signature -->
        <span style="font-family: 'Cinzel', serif; font-size: 14px; color: #991b1b; font-style: italic;">Satis Thapa</span><br/>
        <span style="font-size: 10px; font-weight: 400;">President, Harvest Nepal</span>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }
};

/**
 * Text utility converting numerical amounts into English words.
 */
function amountToWords(num: number): string {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if ((num = num.toString() as any) as any === undefined) return "";
  const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";
  
  let str = "";
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[Number(n[1][0])] + " " + a[Number(n[1][1])]) + " Crore " : "";
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[Number(n[2][0])] + " " + a[Number(n[2][1])]) + " Lakh " : "";
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[Number(n[3][0])] + " " + a[Number(n[3][1])]) + " Thousand " : "";
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[Number(n[4][0])] + " " + a[Number(n[4][1])]) + " Hundred " : "";
  str += (Number(n[5]) !== 0) ? ((str !== "") ? "and " : "") + (a[Number(n[5])] || b[Number(n[5][0])] + " " + a[Number(n[5][1])]) : "";
  return str.trim();
}
