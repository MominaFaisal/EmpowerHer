# **EmpowerHer**

**EmpowerHer** is a web platform dedicated to **women's empowerment**, providing **tools**, **resources**, and a **supportive community** to help women thrive. The platform includes an **e-commerce system** with features like **virtual try-on** for products, **cart management**, and more, tailored to enhance the shopping experience while fostering empowerment.

## **Table of Contents**

- [**Features**](#features)
- [**Technologies**](#technologies)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**API Endpoints**](#api-endpoints)
- [**Contributing**](#contributing)
- [**License**](#license)
- [**Contact**](#contact)

## **Features**

- **Virtual Try-On**: Preview products (e.g., clothing, accessories) using an **image-based try-on** feature powered by **external APIs**.
- **Cart Management**: **Add**, **update**, **delete**, and **fetch** cart items for a seamless shopping experience.
- **User Authentication**: **Secure login** and **authorization** for personalized features (assumed based on context).
- **Product Integration**: Fetch **product details** from **external APIs** (e.g., rapid api).
- **Responsive Design**: A **user-friendly interface** for **desktop** and **mobile** users.

## **Technologies**

- **Backend**: **Node.js**, **Express.js**
- **Database**: **MongoDB** (**Mongoose** for Cart and Product models)
- **Frontend**: **React.js** (assumed for product-details.jsx and virtual try-on UI)
- **API Requests**: **Axios** for external API calls
- **Version Control**: **Git**, **GitHub**
- **External APIs**: **weshop.ai** for product data, **try-on API** (e.g., for virtual try-on)

## **Installation**

To set up the **EmpowerHer** project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MominaFaisal/EmpowerHer.git
   cd EmpowerHer
   ```

2. **Install Dependencies**:
   - For the **backend**:
     ```bash
     cd server
     npm install
     ```
   - For the **frontend**:
     ```bash
     cd client
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a **.env** file in the **server** directory with the following:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     RAPID_API_KEY=your_rapid_api_key
     TRYON_API_URL=https://tryon-api.example.com
     ```
   - Replace **placeholders** with **actual values**.

4. **Run the Application**:
   - Start the **backend server**:
     ```bash
     cd server
     npm run dev
     ```
   - Start the **frontend**:
     ```bash
     cd client
     npm run dev
     ```
   - The **backend** runs on **`http://localhost:5000`**, and the **frontend** runs on **`http://localhost:3000`**.

## **Usage**

1. **Access the Platform**:
   - Open your **browser** and navigate to **`http://localhost:3000`** (or the **deployed URL**).
   - **Sign up** or **log in** to access **personalized features**.

2. **Virtual Try-On**:
   - **Upload an image** and **select a product** to preview it **virtually**.
   - Example: Use the **`/api/shop/try-on`** endpoint with a **POST** request containing **`image`** and **`productId`**.

3. **Manage Cart**:
   - **Add products** to your **cart** via the **UI** or **`/api/shop/cart/add`** endpoint.
   - **View**, **update**, or **delete** cart items using the respective **endpoints**.

4. **Explore Resources**:
   - Access **empowerment resources**, such as **articles** or **community features** (assumed based on project description).

## **API Endpoints**

Below are **key API endpoints** for the **EmpowerHer** platform (based on tryon-controller.js and assumed functionality):

### **Cart Management**

- **POST /api/shop/cart/add**: **Add** a product to the **cart**.
  - **Body**: `{ userId, productId, quantity }`
- **GET /api/shop/cart/:userId**: **Fetch** cart items for a **user**.
- **PUT /api/shop/cart/update**: **Update** cart item **quantity**.
  - **Body**: `{ userId, productId, quantity }`
- **DELETE /api/shop/cart/:userId/:productId**: **Delete** a **cart item**.
- **POST /api/shop/cart/clear/:userId**: **Clear** the **cart** (internal function).

### **Virtual Try-On**

- **POST /api/shop/try-on**: Process a **virtual try-on** request.
  - **Body**: `{ image, productId }`
  - Requires **authentication** (e.g., **JWT token**).

For **detailed API documentation**, refer to the **`/docs`** folder (if available) or test **endpoints** using **Postman**.

## **Contributing**

We **welcome contributions** to **EmpowerHer**! To contribute:

1. **Fork the Repository**:
   - Click the **"Fork"** button on the **GitHub repository** page.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/EmpowerHer.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**:
   - Implement your **feature** or **bug fix**.
   - Follow the project’s **coding standards** (e.g., **ESLint**, **Prettier**).

5. **Commit and Push**:
   ```bash
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Go to the **original repository** and create a **pull request**.
   - **Describe** your **changes** and **link** any **relevant issues**.

**Join our community** to **empower women** and create **positive change**! Together, let’s build a **more inclusive** and **equitable world**. 🌍


## **Contact**

For **questions** or **feedback**, please contact [**Momina Faisal**](mominafaisal59@gmail.com) or open an **issue** on the **GitHub repository**.
