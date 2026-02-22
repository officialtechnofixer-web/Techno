import { Button } from './ui/button';
import { Download, Printer } from 'lucide-react';

interface QuotationItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface QuotationTemplateProps {
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

// Format phone number to include +91 prefix if not present
const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  // If it starts with 91 and has 10 more digits, add + prefix
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  // If it already has country code, format it properly
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  // Return as is if it doesn't match expected formats
  return phone;
};

export function QuotationTemplate({
  quotationNumber,
  date,
  customerName,
  customerEmail,
  customerPhone,
  items,
  subtotal,
  taxRate,
  taxAmount,
  total,
  notes,
}: QuotationTemplateProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text content for the PDF
    const content = `
      QUOTATION
      =========
      
      Quotation #: ${quotationNumber}
      Date: ${date}
      
      Bill To:
      ${customerName}
      ${customerEmail}
      ${customerPhone}
      
      Items:
      ${items.map((item, index) =>
      `${index + 1}. ${item.description} - ${item.quantity} x $${item.rate} = $${item.amount}`
    ).join('\n')}
      
      Subtotal: $${subtotal.toFixed(2)}
      Tax (${taxRate}%): $${taxAmount.toFixed(2)}
      Total: $${total.toFixed(2)}
      
      Notes: ${notes || 'N/A'}
    `;

    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotation-${quotationNumber}.txt`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6">
      {/* Header with Logo and Title */}
      <div className="flex justify-between items-start mb-8 border-b-2 border-blue-600 pb-4">
        <div className="flex items-center">
          <img
            src="/src/utils/temp.webp"
            alt="Company Logo"
            className="h-16 w-auto mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">TECHNO FIXER</h1>
            <p className="text-sm text-gray-600">Your Trusted Technology Solutions Partner</p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-xl font-bold text-blue-600">QUOTATION</h2>
          <p className="text-sm"><span className="font-medium">#:</span> {quotationNumber}</p>
          <p className="text-sm"><span className="font-medium">Date:</span> {date}</p>
        </div>
      </div>

      {/* Bill From and Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-2">Bill From:</h3>
          <p className="font-medium">TECHNO FIXER</p>
          <p className="text-sm">123 Tech Street, City</p>
          <p className="text-sm">Email: info@technofixer.com</p>
          <p className="text-sm">Phone: +91 12345 67890</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-2">Bill To:</h3>
          <p className="font-medium">{customerName}</p>
          <p className="text-sm">+91 {customerPhone}</p>
          <p className="text-sm">{formatPhoneNumber(customerPhone)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
          <p className="text-gray-800">{customerName}</p>
          <p className="text-gray-600">{customerEmail}</p>
          <p className="text-gray-600">+91 {customerPhone}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-gray-700 mb-2">From:</h3>
          <p className="text-gray-800">TECHNO FIXER</p>
          <p className="text-gray-600">info@technofixer.com</p>
          <p className="text-gray-600">+91 12345 67890</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-right">Quantity</th>
                <th className="py-2 px-4 text-right">Rate</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-right">{item.quantity}</td>
                  <td className="py-3 px-4 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Tax ({taxRate}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-300 mt-2 pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
          <p className="text-gray-800">{customerName}</p>
          <p className="text-gray-600">{customerEmail}</p>
          <p className="text-gray-600">+91 {customerPhone}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-gray-700 mb-2">From:</h3>
          <p className="text-gray-800">TECHNO FIXER</p>
          <p className="text-gray-600">info@technofixer.com</p>
          <p className="text-gray-600">+91 12345 67890</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-right">Quantity</th>
                <th className="py-2 px-4 text-right">Rate</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-right">{item.quantity}</td>
                  <td className="py-3 px-4 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Tax ({taxRate}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-300 mt-2 pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
          <p className="text-gray-600 whitespace-pre-line">{notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Terms & Conditions</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• This quotation is valid for 30 days</li>
              <li>• 50% advance payment required</li>
              <li>• Balance on completion</li>
              <li>• Additional charges may apply for changes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Bank Details</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><span className="font-medium">Account:</span> TECHNO FIXER</p>
              <p><span className="font-medium">Bank:</span> Your Bank Name</p>
              <p><span className="font-medium">A/C #:</span> 1234 5678 9012 3456</p>
              <p><span className="font-medium">IFSC:</span> ABCD0123456</p>
            </div>
          </div>
        </div>

        <div className="text-center py-4 mt-4">
          <p className="text-xs text-gray-500">
            Thank you for choosing TECHNO FIXER
          </p>
          <p className="text-xs text-gray-500">
            support@technofixer.com | +91 12345 67890
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4 print:hidden">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="px-4 py-2 text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 rounded"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button
          onClick={handlePrint}
          className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  );
};

export default QuotationTemplate;
