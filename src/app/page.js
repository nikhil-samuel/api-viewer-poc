'use client';

import { useState, useEffect } from 'react';
import { sampleRequests } from '../mockData/sampleRequests';

export default function Home() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  useEffect(() => {
    // Filter only POST /request claims
    const claimRequests = sampleRequests.filter(req => 
      req.method === 'POST' && req.endpoint === '/request');
    
    // Simulate loading data from API
    setTimeout(() => {
      setClaims(claimRequests);
      setLoading(false);
    }, 500);
  }, []);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Claims Queue {claims.length > 0 && <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 ml-2">{claims.length}</span>}</h1>
      
      {loading ? (
        <div className="text-center py-10">
          <p>Loading claims...</p>
        </div>
      ) : (
        <div className="space-y-2">
          {claims.map(claim => (
            <div key={claim.id} className="border rounded-lg overflow-hidden">
              <div 
                className="grid grid-cols-4 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(claim.id)}
              >
                <div>
                  <div className="font-medium">{claim.request.request?.policy_id || 'Unknown Policy'}</div>
                  <div className="text-sm text-gray-500">{claim.request.request_id || 'Unknown ID'}</div>
                </div>
                <div>
                  <div className="font-medium">{claim.request.request_type || 'Unknown Type'}</div>
                  <div className="text-sm text-gray-500">{formatDate(claim.timestamp)}</div>
                </div>
                <div>
                  <div className="font-medium">${claim.request.request?.custom_fields?.hospitalization?.is_hospitalization ? '1,200.00' : '600.00'}</div>
                  <div className="text-sm text-gray-500">Amount</div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    claim.statusCode >= 200 && claim.statusCode < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    Response: {claim.statusCode}
                  </span>
                </div>
              </div>
              
              {expandedId === claim.id && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">API Request:</h3>
                    <pre className="bg-white p-3 rounded text-xs overflow-auto max-h-60">{JSON.stringify(claim.request, null, 2)}</pre>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">API Response:</h3>
                    <pre className="bg-white p-3 rounded text-xs overflow-auto max-h-60">{JSON.stringify(claim.response, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
