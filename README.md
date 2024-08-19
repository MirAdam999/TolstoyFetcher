# Fetcher - Home Assignment for Tolstoy Application

## About

Fetcher is a simple web application that allows users to input between 1 to 10 URLs and fetch metadata for each. The app retrieves the title, description, and image associated with the URL. If no image is available in the HTML header, the app generates a screenshot of the page, which may take a few extra seconds. If no metadata is found for a given URL, an appropriate error message is displayed.

### Backend

The backend is built with Node.js and provides a single API endpoint to fetch metadata using the `metascraper` library. If no image is found, the `puppeteer` library is used to capture a screenshot. The backend includes input validation, ensuring that requests are properly formatted, non-empty, and limited to 10 URLs per request. It also implements rate limiting (5 requests per second) and uses Helmet for enhanced security.

### Frontend

The frontend is a single-page React application with a simple, user-friendly design. The interface starts with three input fields, allowing users to add up to 10 fields, along with a "Fetch" button. The results are displayed directly beneath the corresponding input fields.

### Tests

The project includes unit tests for both the backend and frontend:

- **Backend:** Utilizes Jest for testing. Tests are located in `node-tolstoy/tests/index.test.js`.
- **Frontend:** Utilizes Jest and React Testing Library. Tests are located in `react-tolstoy/src/comps/tests/Fetcher.test.js`.

### Deployment 
The app is currently deployed for demo and evaluation purposes as follows:

- **Backend:** The backend is running in a Docker container on a personal server, accessible via Ngrok.
- **Frontend:** The frontend is hosted on GitHub Pages.

## Live Demo:
https://mirshukhman.github.io/TolstoyFetcher/ 

## Set Up 
To set up on your local system:

**1. Clone from git repo** 

Set up an empty directory, open git bash in the directory, and run:
  - git clone https://github.com/MirShukhman/TolstoyFetcher

**2. Setup Server** 

Navigate to 'node-tolstoy' directory in the terminal and run:
  - npm install express axios express-rate-limit helmet metascraper metascraper-image metascraper-title metascraper-description cors puppeteer
  - node index.js
    
 The server should be up and running.

**3. Setup Frontend**

Navigate to 'react-tolstoy' directory in the terminal and run:
  - npm install
  - npm start
    
Now you have the server and the client running on the local machine.
Navigate to http://localhost:3000 in your browser to check it out.

**4. Tests**
 - Backend: navigate to 'node-tolstoy' directory in the terminal and run: npx jest
 - Frontend: navigate to 'react-tolstoy' directory in the terminal and run: npm test


Created By Mir Shukhman
