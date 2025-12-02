import { useState } from 'react';
import { Download, Printer, Mail, MessageCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface BillingProps {
  onNavigate: (view: any) => void;
}

export default function Billing({ onNavigate }: BillingProps) {
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');

  const invoiceData = {
    invoiceNumber: 'INV-2024-00156',
    date: 'November 25, 2024',
    jobCardId: 'JC-2024-00156',
    customer: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
    },
    vehicle: {
      make: 'Toyota',
      model: 'Camry 2021',
      registration: 'ABC-1234',
      mileage: '45,230 km',
    },
  };

  const lineItems = [
    { category: 'Mechanical Services', items: [
      { name: 'Engine Oil Change', price: 45 },
      { name: 'Oil Filter Replacement', price: 15 },
      { name: 'Air Filter Replacement', price: 25 },
      { name: 'Brake Fluid Top-up', price: 20 },
    ]},
    { category: 'Detailing', items: [
      { name: 'Gold Package - Detailing', price: 150 },
    ]},
    { category: 'Repairs', items: [
      { name: 'Brake Pads Replacement (Front)', parts: 120, labour: 80 },
    ]},
  ];

  const calculateTotals = () => {
    let servicesTotal = 0;
    let partsTotal = 0;
    let labourTotal = 0;

    lineItems.forEach(category => {
      category.items.forEach(item => {
        if ('price' in item) {
          servicesTotal += item.price;
        } else {
          partsTotal += item.parts || 0;
          labourTotal += item.labour || 0;
        }
      });
    });

    const subtotal = servicesTotal + partsTotal + labourTotal;
    const discountAmount = (subtotal * discount) / 100;
    const afterDiscount = subtotal - discountAmount;
    const vat = afterDiscount * 0.15;
    const total = afterDiscount + vat;

    return { servicesTotal, partsTotal, labourTotal, subtotal, discountAmount, afterDiscount, vat, total };
  };

  const totals = calculateTotals();

  return (
    <div className="flex h-screen">
      <Sidebar currentView="billing" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Billing & Invoice</h1>
              <p className="text-gray-600">Generate and send invoice to customer</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Invoice Preview */}
              <div className="col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  {/* Invoice Header */}
                  <div className="flex justify-between mb-8 pb-6 border-b border-gray-200">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-[#1A73E8] rounded-lg flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-gray-900">ServicePro</span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <div>123 Workshop Street</div>
                        <div>Mechanics City, MC 12345</div>
                        <div>contact@servicepro.com</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-gray-900 mb-2">INVOICE</h2>
                      <div className="text-gray-600 text-sm space-y-1">
                        <div>Invoice #: {invoiceData.invoiceNumber}</div>
                        <div>Date: {invoiceData.date}</div>
                        <div>Job Card: {invoiceData.jobCardId}</div>
                      </div>
                    </div>
                  </div>

                  {/* Customer & Vehicle Info */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-gray-900 mb-3">Bill To</h3>
                      <div className="text-gray-700 space-y-1">
                        <div>{invoiceData.customer.name}</div>
                        <div>{invoiceData.customer.phone}</div>
                        <div>{invoiceData.customer.email}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-3">Vehicle Details</h3>
                      <div className="text-gray-700 space-y-1">
                        <div>{invoiceData.vehicle.make} {invoiceData.vehicle.model}</div>
                        <div>Registration: {invoiceData.vehicle.registration}</div>
                        <div>Mileage: {invoiceData.vehicle.mileage}</div>
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="mb-8">
                    <table className="w-full">
                      <thead className="border-b-2 border-gray-300">
                        <tr>
                          <th className="text-left py-3 text-gray-900">Description</th>
                          <th className="text-right py-3 text-gray-900">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {lineItems.map((category, idx) => (
                          <tr key={idx} className="group">
                            <td className="py-4">
                              <div className="text-gray-900 mb-2">{category.category}</div>
                              {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="text-gray-600 text-sm ml-4 mb-1">
                                  {'price' in item ? (
                                    `• ${item.name}`
                                  ) : (
                                    `• ${item.name} (Parts: $${item.parts}, Labour: $${item.labour})`
                                  )}
                                </div>
                              ))}
                            </td>
                            <td className="text-right py-4 text-gray-900">
                              ${category.items.reduce((sum, item) => 
                                'price' in item ? sum + item.price : sum + (item.parts || 0) + (item.labour || 0), 0
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="border-t-2 border-gray-300 pt-6">
                    <div className="flex justify-end">
                      <div className="w-80 space-y-3">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal</span>
                          <span>${totals.subtotal}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%)</span>
                            <span>-${totals.discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-700">
                          <span>VAT (15%)</span>
                          <span>${totals.vat.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-300 pt-3">
                          <span className="text-gray-900">Total</span>
                          <span className="text-gray-900">${totals.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {notes && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <div className="text-gray-700 mb-1">Notes:</div>
                      <div className="text-gray-600 text-sm">{notes}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0] flex items-center justify-center gap-2">
                      <Download size={20} />
                      Generate Invoice
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Printer size={20} />
                      Print
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Mail size={20} />
                      Email to Customer
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <MessageCircle size={20} />
                      Send via WhatsApp
                    </button>
                  </div>
                </div>

                {/* Discount */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Add Discount</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-700 mb-2">Discount %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                    {discount > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-green-700 text-sm">
                          Discount: ${totals.discountAmount.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Additional Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes for the invoice..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] resize-none"
                    rows={4}
                  />
                </div>

                {/* Continue */}
                <button
                  onClick={() => onNavigate('history')}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Complete & View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
