'use client';

import { useState, useEffect } from 'react';
import { sampleRequests } from '../mockData/sampleRequests';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  useEffect(() => {
    // Simulate loading data from API
    // Only use POST /request claims for simplicity
    setTimeout(() => {
      const claimRequests = sampleRequests.filter(req => 
        req.method === 'POST' && req.endpoint === '/request');
      setRequests(claimRequests);
      setLoading(false);
    }, 800);
  }, []);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto pt-8 pb-16 px-4">
        <h1 className="text-2xl font-bold mb-6">Claims Queue <span className="inline-block bg-blue-500 text-white text-sm rounded-full px-2 py-0.5 ml-2">{requests.length}</span></h1>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin h-8 w-8 text-blue-500 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading claims...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((claim) => (
              <div key={claim.id} className="bg-white rounded-lg shadow">
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleExpand(claim.id)}
                >
                  <div className="mb-2 md:mb-0">
                    <div className="font-medium">{claim.request.request.custom_fields?.bank_account?.holder || 'Unknown'}</div>
                    <div className="text-sm text-gray-500">{claim.request.request_id}</div>
                  </div>
                  
                  <div className="mb-2 md:mb-0">
                    <div className="font-medium">Type</div>
                    <div className="text-sm text-gray-500">{claim.request.request_type === 'reimbursement' ? 'OPD Claim' : claim.request.request_type}</div>
                  </div>
                  
                  <div className="mb-2 md:mb-0">
                    <div className="font-medium">${parseFloat(claim.request.request.custom_fields?.invoice_amount || '500.00').toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Below Deductible Amount</div>
                  </div>
                  
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      <svg className="mr-1.5 h-2 w-2 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Pending
                    </span>
                  </div>
                </div>
                
                {expandedId === claim.id && (
                  <div className="border-t border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Request</h3>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-96">{JSON.stringify(claim.request, null, 2)}</pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Response</h3>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-96">{JSON.stringify(claim.response, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
