'use client';

import React, { useState, useMemo } from 'react';
import RequestDetail from './RequestDetail';

const RequestList = ({ requests }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [filterEndpoint, setFilterEndpoint] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Get unique endpoints and statuses for filter options
  const endpoints = useMemo(() => {
    const unique = [...new Set(requests.map(req => req.endpoint))];
    return unique.sort();
  }, [requests]);
  
  const statuses = useMemo(() => {
    const unique = [...new Set(requests.map(req => req.statusCode.toString().charAt(0) + 'xx'))];
    return unique.sort();
  }, [requests]);
  
  // Filter requests based on selected filters
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // Filter by endpoint
      if (filterEndpoint && !req.endpoint.includes(filterEndpoint)) {
        return false;
      }
      
      // Filter by status code category (2xx, 4xx, etc.)
      if (filterStatus) {
        const statusPrefix = req.statusCode.toString().charAt(0) + 'xx';
        if (statusPrefix !== filterStatus) {
          return false;
        }
      }
      
      return true;
    });
  }, [requests, filterEndpoint, filterStatus]);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Get status code color
  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 text-green-800';
    if (statusCode >= 400 && statusCode < 500) return 'bg-red-100 text-red-800';
    if (statusCode >= 500) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Endpoint</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={filterEndpoint}
            onChange={(e) => setFilterEndpoint(e.target.value)}
          >
            <option value="">All Endpoints</option>
            {endpoints.map(endpoint => (
              <option key={endpoint} value={endpoint}>{endpoint}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No API requests found with the selected filters.
                </td>
              </tr>
            ) : (
              filteredRequests.map(request => (
                <React.Fragment key={request.id}>
                  <tr 
                    className={`expandable-row ${expandedId === request.id ? 'bg-blue-50' : ''}`}
                    onClick={() => toggleExpand(request.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className={`inline-block px-2 py-1 rounded ${
                        request.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                        request.method === 'POST' ? 'bg-green-100 text-green-800' :
                        request.method === 'PATCH' ? 'bg-yellow-100 text-yellow-800' :
                        request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.endpoint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(request.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-block px-2 py-1 rounded ${getStatusColor(request.statusCode)}`}>
                        {request.statusCode}
                      </span>
                    </td>
                  </tr>
                  {expandedId === request.id && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <RequestDetail request={request} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
