import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface QuotationItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface QuotationData {
  quotationNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: QuotationItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
}

export const generateQuotationPdf = (data: QuotationData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Add logo and header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text('TECHNO FIXER', margin, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text('Your Trusted Technology Solutions Partner', margin, yPos + 6);
  
  // Quotation info
  doc.setFontSize(14);
  doc.setTextColor(13, 110, 253);
  doc.setFont('helvetica', 'bold');
  doc.text('QUOTATION', pageWidth - margin, yPos, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setTextColor(33, 37, 41);
  doc.text(`#${data.quotationNumber}`, pageWidth - margin, yPos + 7, { align: 'right' });
  doc.text(`Date: ${data.date}`, pageWidth - margin, yPos + 14, { align: 'right' });
  
  yPos += 30;
  
  // Bill From / Bill To sections
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill From:', margin, yPos);
  doc.text('Bill To:', pageWidth / 2, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.text('TECHNO FIXER', margin, yPos + 7);
  doc.text('123 Tech Street, City', margin, yPos + 14);
  doc.text('Email: info@technofixer.com', margin, yPos + 21);
  doc.text('Phone: +1 (555) 123-4567', margin, yPos + 28);
  
  doc.text(data.customerName, pageWidth / 2, yPos + 7);
  doc.text(data.customerEmail, pageWidth / 2, yPos + 14);
  doc.text(data.customerPhone, pageWidth / 2, yPos + 21);
  
  yPos += 40;
  
  // Items table
  const tableColumn = ['#', 'Description', 'Qty', 'Rate', 'Amount'];
  const tableRows = data.items.map((item, index) => [
    (index + 1).toString(),
    item.description,
    item.quantity.toString(),
    `$${item.rate.toFixed(2)}`,
    `$${item.amount.toFixed(2)}`
  ]);
  
  (doc as any).autoTable({
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    headStyles: {
      fillColor: [248, 249, 250],
      textColor: [33, 37, 41],
      fontStyle: 'bold',
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.5
    },
    margin: { left: margin, right: margin },
    tableWidth: 'auto'
  });
  
  // Get the final Y position after the table
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // Totals
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal:', pageWidth - margin - 70, yPos, { align: 'right' });
  doc.text(`$${data.subtotal.toFixed(2)}`, pageWidth - margin, yPos, { align: 'right' });
  
  doc.text(`Tax (${data.taxRate}%):`, pageWidth - margin - 70, yPos + 7, { align: 'right' });
  doc.text(`$${data.taxAmount.toFixed(2)}`, pageWidth - margin, yPos + 7, { align: 'right' });
  
  doc.setFontSize(12);
  doc.text('Total:', pageWidth - margin - 70, yPos + 20, { align: 'right' });
  doc.text(`$${data.total.toFixed(2)}`, pageWidth - margin, yPos + 20, { align: 'right' });
  
  yPos += 40;
  
  // Notes
  if (data.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Notes:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 2 * margin);
    doc.text(splitNotes, margin, yPos + 5);
    yPos += splitNotes.length * 5 + 10;
  }
  
  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  // Terms & Conditions and Bank Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions', margin, yPos);
  doc.text('Bank Details', pageWidth / 2 + 20, yPos);
  
  doc.setFont('helvetica', 'normal');
  const terms = [
    '• This quotation is valid for 30 days',
    '• 50% advance payment required',
    '• Balance on completion',
    '• Additional charges may apply for changes'
  ];
  
  terms.forEach((term, index) => {
    doc.text(term, margin, yPos + 7 + (index * 4));
  });
  
  doc.text('Account: TECHNO FIXER', pageWidth / 2 + 20, yPos + 7);
  doc.text('Bank: Your Bank Name', pageWidth / 2 + 20, yPos + 12);
  doc.text('A/C #: 1234 5678 9012 3456', pageWidth / 2 + 20, yPos + 17);
  doc.text('IFSC: ABCD0123456', pageWidth / 2 + 20, yPos + 22);
  
  // Final footer
  yPos += 40;
  doc.setFontSize(8);
  doc.setTextColor(108, 117, 125);
  doc.text('Thank you for choosing TECHNO FIXER', pageWidth / 2, yPos, { align: 'center' });
  doc.text('support@technofixer.com | +1 (555) 123-4567', pageWidth / 2, yPos + 5, { align: 'center' });
  
  // Save the PDF
  doc.save(`quotation-${data.quotationNumber}.pdf`);
};
