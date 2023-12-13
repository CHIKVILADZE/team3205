Description
This project is an application that allows users to search for information based on email and optional number parameters. It consists of a React frontend and an Express backend.

Installation and Setup
Backend
Clone the repository.
Install dependencies using npm install.
Start the server with npm start.
Frontend
Clone the repository.
Install dependencies using npm install.
Run the frontend with npm start.
Backend
The backend is built using Express.js and handles user searches based on email and number.

Endpoints
/search: Searches users based on email and number.
Query Parameters:
email: The user's email (required)
number: The user's number in the format XX-XX-XX (optional)
Responses:
200 OK: Returns matching user(s)
400 Bad Request: Errors in query parameters
404 Not Found: No users found
Frontend
The frontend is developed with React and includes a form for users to input email and number parameters for searching.

Usage
Enter a valid email address in the email input field.
Optionally, input a number in the format XX-XX-XX.
Click "Submit" to perform the search.
Components
FormComponent: Contains the form for inputting email and number.
TableComponent: Displays the search results in a table format. Formats the number in XX-XX-XX pattern.
Folder Structure
bash
Copy code
/
  /backend              # Backend files
    - server.js         # Express server setup
    - data.json         # User data
  /frontend             # Frontend files
    - src/
      - components/     # React components
        - FormComponent.js
        - TableComponent.js
Data Format
The user data is stored in data.json in the backend and consists of an array of objects with email and number fields.# team3205
