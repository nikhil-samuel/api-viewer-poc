'use client';

import React from 'react';
import JsonViewer from './JsonViewer';
import DocumentMetadata from './DocumentMetadata';

const RequestDetail = ({ request }) => {
  const hasRequestBody = request.method !== 'GET' && Object.keys(request.request || {}).length > 0;
  
  // Extract documents if they exist in the request body
  const documents = request.request?.documents || [];
  
  // Format method with color
  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PATCH': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Request Details</h3>
          <div className="mt-2 space-y-2">
            <div className="flex">
              <span className="font-medium w-24">ID:</span>
              <span>{request.id}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Method:</span>
              <span className={`px-2 py-1 rounded ${getMethodColor(request.method)}`}>
                {request.method}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Endpoint:</span>
              <span>{request.endpoint}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Timestamp:</span>
              <span>{new Date(request.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Status:</span>
              <span className={`px-2 py-1 rounded ${
                request.statusCode >= 200 && request.statusCode < 300 ? 'bg-green-100 text-green-800' :
                request.statusCode >= 400 && request.statusCode < 500 ? 'bg-red-100 text-red-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {request.statusCode}
              </span>
            </div>
          </div>
        </div>
        
        {documents.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">Documents</h3>
            <DocumentMetadata documents={documents} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {hasRequestBody && (
          <div>
            <h3 className="text-lg font-medium mb-2">Request Body</h3>
            <JsonViewer data={request.request} />
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-2">Response Body</h3>
          <JsonViewer data={request.response} />
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
