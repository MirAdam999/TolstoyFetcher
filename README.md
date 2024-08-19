Fetcher - home assigment for application at Tolstoy 

Simple Web App, allows users to input between 1 to 10 urls to fetch metadata for.
The user will input urls, and the app will return: title, description and image.
If no image is provided in the header of html, it will provide a screenshoot of the page (Witch will take several seconds longer).
If no metadata for the url given found, will display appropriate error. 

Backend:
 Simplistic Node.js app with single api function to fetch the data using metascraper library (and puppeteer library, if no image and fetches screenshoot), handles errors and returns sppropriate response. Checks that input is in appropriate format, not empty, and no longer then 10 urls per request. Limited up to 5 requests per second. Uses Helmet for security middleware. 

 Frontend: 
 Single-page app with simplistic, user friendly design. Starts off with 3 fields for input, allows user 