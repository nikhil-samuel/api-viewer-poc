'use client';

import React, { useState } from 'react';

const JsonViewer = ({ data }) => {
  const [expanded, setExpanded] = useState(true);

  // Simple syntax highlighting with colors
  const formatJson = (obj) => {
    if (!obj) return '';
    
    const json = JSON.stringify(obj, null, 2);
    
    // Apply some basic syntax highlighting
    return json
      .replace(/"([^"]+)":/g, '<span style="color: #7c3aed;">\"$1\":</span>') // property keys
      .replace(/"([^"]+)"/g, '<span style="color: #059669;">\"$1\"</span>') // string values
      .replace(/\b(true|false)\b/g, '<span style="color: #db2777;">$1</span>') // booleans
      .replace(/\b(\d+)\b/g, '<span style="color: #2563eb;">$1</span>'); // numbers
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
        <span className="font-semibold">{expanded ? '▼ ' : '► '} JSON</span>
        <button 
          className="text-xs bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
          }}
        >
          Copy
        </button>
      </div>
      
      {expanded && (
        <pre 
          className="json-pretty text-sm mt-2 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: formatJson(data) }}
        />
      )}
    </div>
  );
};

export default JsonViewer;
