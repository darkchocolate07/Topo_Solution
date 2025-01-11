# Topo Technical Assessment

## Overview

This project showcases the integration of Python and JavaScript to process, visualize, and manage data through a modular, scalable, and testable architecture. The solution is designed to handle datasets in various formats (JSON, CSV, PDF, and PPT) and includes functionality for backend API management and interactive data visualizations on the frontend.

Key Components:
    1. Data Processing with Python:
        A Python module processes datasets using custom ingestion and processing pipelines.
        Datasets in different formats (JSON, CSV, PDF, and PPT) are ingested, normalized, and unified into a single JSON file.
        The data processing follows Object-Oriented Programming (OOP) principles for modularity and reusability.

    2. Backend Server with Node.js:
        A Node.js server acts as the API layer, serving the processed data to the frontend.
        The server uses Express.js for routing and CORS for cross-origin compatibility.
        The backend dynamically runs the Python script to regenerate the unified dataset when necessary.

    3.Frontend Visualizations:
        The frontend is built with HTML, CSS, and JavaScript to display interactive data visualizations.
        Chart.js is used to create various types of charts:
        Bar Chart for top earners in the dataset.
        Pie Chart for revenue contributions by activity.
        Line Chart for revenue trends over quarters.
        Users can interact with dropdowns to filter and view specific data.

    4. Testing Frameworks:
        Python: Unit and integration tests are implemented using pytest to validate data processing and ingestion.
        JavaScript: Unit tests for the frontend and API are written using Jest, with support for the jsdom environment to simulate DOM elements during testing.
        Mocking techniques are employed to isolate and test frontend components like Chart.js.
---

Setup Instructions

Prerequisites

- **Node.js**: Ensure Node.js 16+ and npm are installed.

Steps to Set Up Locally 


1. For running the backend and frontend :
    Install the dependencies using: npm install
    To start the server : npm start
    You will be able to access the frontend on http://localhost:3000/

    To see the API calls use : http://localhost:3000/api/data and http://localhost:3000/api/data/{file_type} format

2. Run test :
    For testing data ingestion,processing and integration - pytest Data_tests\
    For API calls and Visualization - npm test    (Important make sure the backend is running for this tests)




Solution Overview : 

Topo Technical Assessment
├── DataHandler/              # Python classes for data ingestion and processing
├── Data_tests/               # Python unit and integration tests
├── Visualizer/               # JavaScript classes for rendering charts
├── VisualizerAPI_tests/      # JavaScript tests for API and visualizations
├── datasets/                 # Input datasets (JSON, CSV, PDF, PPT)
├── node_modules/             # Node.js dependencies
├── main.py                   # Python script for dataset processing
├── index.html                # Frontend HTML
├── jest.config.js            # Jest configuration
├── package.json              # Node.js project configuration
├── script.js                 # JavaScript script for frontend
├── server.js                 # Node.js server
├── styles.css                # Frontend CSS
└── unified_dataset.json      # Output unified dataset





    

