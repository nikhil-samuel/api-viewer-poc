# API Viewer POC - Claims Submission Monitor

A minimal proof of concept for monitoring claim submissions from BGLA (Bupa Global Latin America).

## Overview

This application provides a simple interface to view claim submissions from BGLA's portal to Qantev's system. It shows the raw API requests and responses in a straightforward, minimal interface.

## Features

- List of claim submissions (POST /request)
- Expandable view to show raw request and response JSON data
- Basic document attachment information
- Simple status indication

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

- Next.js
- React
- Tailwind CSS for minimal styling

## Mock Data

This POC uses mock data to simulate API requests and responses based on the Swagger specification. In a production environment, this would connect to a backend service that logs actual API traffic between BGLA and Qantev systems.

## Design Philosophy

This POC follows a "Minimum Viable Product" approach, focusing only on:

1. Showing claim submissions (POST /request endpoint only)
2. Displaying raw JSON request and response data
3. Providing just enough context (timestamp, status code)
4. Indicating document attachments without displaying content

No advanced features, filtering, or complex UI components are included to keep the implementation as simple as possible.
