# API Viewer POC

A proof of concept for an API Viewer to monitor claims submissions from BGLA (Bupa Global Latin America).

## Overview

This application provides a simple interface to monitor API requests between BGLA's portal and Qantev's system, focusing on claims submissions. It allows developers and support staff to view incoming API requests, inspect their content, and monitor the system's responses.

## Features

- View a list of all incoming API requests
- See detailed request and response data in JSON format
- Expandable/collapsible views for better readability
- Basic filtering and sorting capabilities
- Document metadata display (without rendering document content)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nikhil-samuel/api-viewer-poc.git
cd api-viewer-poc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Stack

- Next.js 14
- React
- Tailwind CSS for styling
- React JSON View for formatting JSON data

## Mock Data

This POC uses mock data to simulate API requests and responses. In a production environment, this would connect to a backend service that logs actual API traffic.

## Screenshots

[Coming soon]
