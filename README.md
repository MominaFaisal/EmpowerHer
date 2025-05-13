EmpowerHer is a web platform dedicated to women's empowerment, providing tools, resources, and a supportive community to help women thrive. The platform includes an e-commerce system with features like virtual try-on for products, cart management, and more, tailored to enhance the shopping experience while fostering empowerment.

Table of Contents
Features
Technologies
Installation
Usage
API Endpoints
Contributing
Features



Virtual Try-On: Preview products (e.g., clothing, accessories) using an image-based try-on feature powered by external APIs.
Cart Management: Add, update, delete, and fetch cart items for a seamless shopping experience.
User Authentication: Secure login and authorization for personalized features (assumed based on context).
Product Integration: Fetch product details from external APIs (e.g., weshop.ai).
Responsive Design: A user-friendly interface for desktop and mobile users.


Technologies
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for Cart and Product models)
Frontend: React.js (assumed for product-details.jsx and virtual try-on UI)
API Requests: Axios for external API calls
Version Control: Git, GitHub
External APIs: weshop.ai for product data, try-on API (e.g., for virtual try-on)


Installation

To set up the EmpowerHer project locally, follow these steps:

Clone the Repository:

git clone https://github.com/MominaFaisal/EmpowerHer.git
cd EmpowerHer

Install Dependencies:


For the backend:

cd server
npm install



For the frontend (if applicable):

cd client
npm install



Set Up Environment Variables:
Create a .env file in the server directory with the following:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
WESHOP_API_KEY=your_weshop_api_key
TRYON_API_URL=https://tryon-api.example.com


Replace placeholders with actual values.



Run the Application:





Start the backend server:

cd server
npm run dev



Start the frontend (if applicable):

cd client
npm run dev

The backend runs on http://localhost:5000, and the frontend (if included) runs on http://localhost:5173.


Usage
Access the Platform:
Open your browser and navigate to http://localhost:3000 (or the deployed URL).
Sign up or log in to access personalized features.

Virtual Try-On:
Upload an image and select a product to preview it virtually.
Example: Use the /api/shop/try-on endpoint with a POST request containing image and productId.
Manage Cart:
Add products to your cart via the UI or /api/shop/cart/add endpoint.
View, update, or delete cart items using the respective endpoints.
Explore Resources:
Access empowerment resources, such as articles or community features (assumed based on project description).

API Endpoints

Below are key API endpoints for the EmpowerHer platform (based on tryon-controller.js and assumed functionality):

Cart Management:
POST /api/shop/cart/add: Add a product to the cart.
Body: { userId, productId, quantity }
GET /api/shop/cart/:userId: Fetch cart items for a user.
PUT /api/shop/cart/update: Update cart item quantity.
Body: { userId, productId, quantity }
DELETE /api/shop/cart/:userId/:productId: Delete a cart item.
POST /api/shop/cart/clear/:userId: Clear the cart (internal function).


Virtual Try-On :
POST /api/shop/try-on: Process a virtual try-on request.
Body: { image, productId }
Requires authentication (e.g., JWT token).

For detailed API documentation, refer to the /docs folder (if available) or test endpoints using Postman.

Contributing

We welcome contributions to EmpowerHer! To contribute:
Fork the Repository:
Click the "Fork" button on the GitHub repository page.

Clone Your Fork:
git clone https://github.com/your-username/EmpowerHer.git

Create a Branch:

git checkout -b feature/your-feature-name


Make Changes:


Implement your feature or bug fix.

Follow the project’s coding standards (e.g., ESLint, Prettier).

Commit and Push:

git commit -m "Add your feature description"
git push origin feature/your-feature-name

