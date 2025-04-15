'use client';

import { useState, useEffect } from 'react';
import { sampleRequests } from '../mockData/sampleRequests';
import JsonViewer from '../components/JsonViewer';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      // Filter to only show POST /request claims
      const claimRequests = sampleRequests.filter(req => 
        req.method === 'POST' && req.endpoint === '/request');
      setRequests(claimRequests);
      setLoading(false);
    }, 500);
  }, []);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Get response status color
  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 text-green-800';
    if (statusCode >= 400 && statusCode < 500) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // Extract policy ID if available in the request
  const getPolicyId = (request) => {
    return request?.request?.policy_id || 
           request?.request?.request?.policy_id || 
           'Unknown';
  };
  
  // Extract amount if available
  const getAmount = (request) => {
    // This would need to be adjusted based on actual data structure
    // For now using a simple mock approach
    if (request.id === 'req-001') return '$1,200.00';
    if (request.id === 'req-002') return '$600.00';
    return '$0.00';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Claims Queue <span className="bg-blue-500 text-white text-sm rounded-full px-2 py-1 ml-2">{requests.length}</span></h1>
      
      {loading ? (
        <div className="text-center py-4">
          <p>Loading claims...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {requests.map(request => (
            <div key={request.id} className="border-b border-gray-200 py-4">
              <div 
                className="grid grid-cols-3 gap-4 cursor-pointer"
                onClick={() => toggleExpand(request.id)}
              >
                <div>
                  <div className="font-medium">{getPolicyId(request)}</div>
                  <div className="text-sm text-gray-500">{request.request.request_id}</div>
                </div>
                
                <div>
                  <div className="font-medium">{request.request.request_type}</div>
                  <div className="text-sm text-gray-500">{formatTimestamp(request.timestamp)}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">{getAmount(request)}</div>
                  <div className="text-sm text-gray-500">Amount</div>
                  <span className={`mt-1 inline-block px-2 py-1 rounded text-xs ${getStatusColor(request.statusCode)}`}>
                    Response: {request.statusCode}
                  </span>
                </div>
              </div>
              
              {expandedId === request.id && (
                <div className="mt-4 bg-gray-50 p-4 rounded text-sm">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Request JSON:</h3>
                    <pre className="bg-white p-3 rounded border overflow-auto max-h-96">
                      {JSON.stringify(request.request, null, 2)}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Response JSON:</h3>
                    <pre className="bg-white p-3 rounded border overflow-auto max-h-96">
                      {JSON.stringify(request.response, null, 2)}
                    </pre>
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
