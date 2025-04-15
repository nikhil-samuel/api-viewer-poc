'use client';

import React, { useState } from 'react';

const DocumentMetadata = ({ documents }) => {
  const [expanded, setExpanded] = useState(true);
  
  if (!documents || documents.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded mb-4">
        <p className="text-gray-500 italic">No documents attached</p>
      </div>
    );
  }
  
  // Format file size (mock for the POC)
  const getFileSize = (file) => {
    if (typeof file === 'string' && file.includes('MB')) {
      return file.match(/\d+\.\d+MB/)[0];
    }
    return '1.0MB'; // Default mock size
  };
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="font-semibold">
          {expanded ? '▼ ' : '► '} Documents ({documents.length})
        </span>
      </div>
      
      {expanded && (
        <div className="mt-2 space-y-3">
          {documents.map((doc, index) => (
            <div 
              key={index} 
              className="document-metadata flex items-start p-3 rounded"
            >
              <div className="bg-blue-100 p-2 rounded mr-3">
                <span 
                  className={`
                    inline-block w-8 h-8 text-center leading-8 rounded 
                    ${doc.document_type === 'invoice' ? 'bg-green-500' : ''}
                    ${doc.document_type === 'medical_record' ? 'bg-blue-500' : ''}
                    ${doc.document_type === 'prescription' ? 'bg-purple-500' : ''}
                    ${doc.document_type === 'other' ? 'bg-gray-500' : ''}
                    text-white font-bold
                  `}
                >
                  {doc.document_type === 'invoice' ? 'I' : ''}
                  {doc.document_type === 'medical_record' ? 'M' : ''}
                  {doc.document_type === 'prescription' ? 'P' : ''}
                  {doc.document_type === 'other' ? 'O' : ''}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {doc.document_type.charAt(0).toUpperCase() + doc.document_type.slice(1).replace('_', ' ')}
                </div>
                <div className="text-gray-500 text-sm">
                  Size: {getFileSize(doc.file)}
                </div>
                <div className="text-gray-500 text-xs italic mt-1">
                  {typeof doc.file === 'string' ? doc.file : '[binary data not shown]'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentMetadata;
