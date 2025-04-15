'use client';

import { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { sampleRequests } from '../mockData/sampleRequests';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      setRequests(sampleRequests);
      setLoading(false);
    }, 800);
  }, []);
  
  return (
    <div>
      <section className="py-4">
        <h1 className="text-2xl font-bold mb-2">API Viewer</h1>
        <p className="text-gray-600 mb-4">
          Monitor API requests between BGLA and Qantev systems. This tool shows incoming requests, 
          their responses, and attached document metadata.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700">
            <span className="font-bold">Note:</span> This viewer only shows metadata about documents. 
            The actual document content is not rendered in this interface.
          </p>
        </div>
      </section>
      
      {loading ? (
        <div className="text-center py-10">
          <svg className="inline-block animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading API requests...</p>
        </div>
      ) : (
        <>
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">API Requests ({requests.length})</h2>
              <p className="text-sm text-gray-500">Click on a row to expand request and response details</p>
            </div>
            
            <RequestList requests={requests} />
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium mb-2">About This POC</h2>
            <p className="text-gray-600">
              This proof of concept demonstrates how the API viewer might look and function. In a production environment, 
              this would connect to a backend service that logs actual API traffic between BGLA and Qantev systems.
            </p>
            <p className="text-gray-600 mt-2">
              Currently using mock data to simulate API requests and responses based on the Swagger specification.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
