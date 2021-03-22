## PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    
    2. Go to http://localhost:8080 in your browser to view it.
    3. Make a POST call form Postman or similar to http://localhost:8080/shorten with body,
            ```
                {
                   "url": "http://example.com",
                   "shortcode": "example"
                }
            ```
     4. Fetch the shortcode from above response.
     5. Go to browser hit http://localhost:8080/<shortcode> , you will redirect to your Original URL
     6. For getting stats about your URL hit, http://localhost:8080/<shortcode>/stats from browser
