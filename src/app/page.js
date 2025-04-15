'use client';

import { useState, useEffect } from 'react';
import { sampleRequests } from '../mockData/sampleRequests';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      // Filter to only show claim submissions (POST /request)
      const claimRequests = sampleRequests.filter(req => 
        req.method === 'POST' && req.endpoint === '/request');
      setRequests(claimRequests);
      setLoading(false);
    }, 800);
  }, []);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Claim Submissions API Viewer</h1>
      <p className="text-gray-600 mb-6">
        Simple view of claim submissions from BGLA. Click an item to view raw request/response data.
      </p>
      
      {loading ? (
        <div className="text-center py-10">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h2 className="font-medium">Claim Submissions ({requests.length})</h2>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li 
                key={request.id} 
                className={`p-4 ${expandedId === request.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
                onClick={() => toggleExpand(request.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">POST /request</span>
                    <span className="ml-3 text-sm text-gray-500">{formatTimestamp(request.timestamp)}</span>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded ${
                    request.statusCode >= 200 && request.statusCode < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {request.statusCode}
                  </span>
                </div>
                
                {expandedId === request.id && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Request:</h3>
                      <pre className="bg-gray-50 p-3 rounded overflow-auto text-xs">{JSON.stringify(request.request, null, 2)}</pre>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Response:</h3>
                      <pre className="bg-gray-50 p-3 rounded overflow-auto text-xs">{JSON.stringify(request.response, null, 2)}</pre>
                    </div>
                    
                    {request.request?.documents && request.request.documents.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Documents:</h3>
                        <div className="bg-gray-50 p-3 rounded text-xs">
                          <p>{request.request.documents.length} document(s) attached</p>
                          <p className="text-gray-500 italic">Document content not displayed</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
            
            {requests.length === 0 && (
              <li className="p-4 text-center text-gray-500">
                No claim submissions found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
