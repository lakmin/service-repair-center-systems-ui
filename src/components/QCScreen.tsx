import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface QCScreenProps {
  onNavigate: (view: any) => void;
}

export default function QCScreen({ onNavigate }: QCScreenProps) {
  const [qcChecks, setQcChecks] = useState([
    { id: 1, item: 'All service steps verified', checked: true, issue: false },
    { id: 2, item: 'Oil level confirmed', checked: true, issue: false },
    { id: 3, item: 'Filter installation verified', checked: true, issue: false },
    { id: 4, item: 'Brake system checked', checked: true, issue: false },
    { id: 5, item: 'All detailing steps reviewed', checked: false, issue: false },
    { id: 6, item: 'Exterior finish quality', checked: false, issue: false },
    { id: 7, item: 'Interior cleanliness', checked: false, issue: false },
    { id: 8, item: 'Before/After photos uploaded', checked: false, issue: true },
    { id: 9, item: 'Repairs completed as specified', checked: true, issue: false },
    { id: 10, item: 'Test drive completed', checked: false, issue: false },
  ]);

  const [notes, setNotes] = useState('');

  const toggleCheck = (id: number) => {
    setQcChecks(qcChecks.map(check => 
      check.id === id ? { ...check, checked: !check.checked } : check
    ));
  };

  const checkedItems = qcChecks.filter(c => c.checked).length;
  const totalItems = qcChecks.length;
  const issueCount = qcChecks.filter(c => c.issue).length;
  const allChecked = checkedItems === totalItems;

  return (
    <div className="flex h-screen">
      <Sidebar currentView="qc" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Quality Control</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Job Card #JC-2024-00156</span>
                <span>•</span>
                <span>Toyota Camry 2021 - REG: ABC-1234</span>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-600">Checked Items</div>
                    <div className="text-gray-900">{checkedItems}/{totalItems}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    issueCount > 0 ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    <AlertCircle size={24} className={issueCount > 0 ? 'text-red-600' : 'text-green-600'} />
                  </div>
                  <div>
                    <div className="text-gray-600">Issues Found</div>
                    <div className={issueCount > 0 ? 'text-red-600' : 'text-green-600'}>
                      {issueCount} {issueCount === 1 ? 'issue' : 'issues'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-gray-600">QC Status</div>
                    <div className={allChecked ? 'text-green-600' : 'text-orange-600'}>
                      {allChecked ? 'Ready' : 'In Progress'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QC Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-gray-900 mb-6">Quality Control Checklist</h2>
              
              <div className="space-y-3">
                {qcChecks.map((check) => (
                  <div
                    key={check.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      check.issue
                        ? 'border-red-200 bg-red-50'
                        : check.checked
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={check.checked}
                        onChange={() => toggleCheck(check.id)}
                        className="w-5 h-5 text-[#1A73E8] rounded focus:ring-[#1A73E8] cursor-pointer"
                      />
                      <span className={`text-gray-900 ${check.checked ? 'line-through' : ''}`}>
                        {check.item}
                      </span>
                    </div>

                    {check.issue && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        <AlertCircle size={16} />
                        <span className="text-sm">Missing</span>
                      </div>
                    )}

                    {check.checked && !check.issue && (
                      <CheckCircle size={20} className="text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QC Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h2 className="text-gray-900 mb-4">QC Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any quality control notes or observations..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent resize-none"
                rows={6}
              />
            </div>

            {/* Issues Alert */}
            {issueCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-red-900 mb-2">Action Required</h3>
                    <p className="text-red-700">
                      There {issueCount === 1 ? 'is' : 'are'} {issueCount} outstanding {issueCount === 1 ? 'issue' : 'issues'} that need to be resolved before QC approval.
                      Please address the highlighted items above.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => onNavigate('detailing-workflow')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Detailing
              </button>

              <button
                onClick={() => onNavigate('billing')}
                className={`px-8 py-3 rounded-lg transition-all ${
                  allChecked && issueCount === 0
                    ? 'bg-[#1A73E8] text-white hover:bg-[#1557B0]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!allChecked || issueCount > 0}
              >
                Approve QC & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
