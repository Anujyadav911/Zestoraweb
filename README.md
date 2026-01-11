# 🍽️ Zestora - Modern Restaurant & Food Ordering Platform

<div align="center">

![Zestora Logo](frontend/public/logo.svg)

**A full-stack web application for restaurant management, menu browsing, and online reservations**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.5-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?logo=jest)](https://jestjs.io/)

[Live Demo](https://zestora.vercel.app) • [Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Testing](#-testing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Zestora** is a modern, responsive full-stack web application designed for restaurants to showcase their menu, manage reservations, and provide an exceptional online dining experience. Built with cutting-edge technologies, Zestora offers a seamless interface for customers to browse menus, add items to cart, and make table reservations.

### Key Highlights

- ✨ **Modern UI/UX**: Beautiful, responsive design that works seamlessly on all devices
- 🛒 **Shopping Cart**: Interactive cart system for menu item selection
- 📅 **Reservation System**: Complete booking functionality with form validation
- 🔒 **Robust Backend**: RESTful API with comprehensive error handling
- ✅ **Test Coverage**: Unit and integration tests using Jest & Supertest
- 🚀 **Production Ready**: Deployed on Vercel (Frontend) and Render (Backend)

---

## ✨ Features

### Frontend Features

- 🎨 **Hero Section**: Eye-catching landing page with call-to-action
- 📖 **About Section**: Restaurant information and story
- ⭐ **Qualities Showcase**: Highlights key features (Quality Food, Super Taste, Fast Delivery)
- 🍕 **Menu Display**: Categorized menu items (Breakfast, Lunch, Dinner)
- 🛒 **Shopping Cart**: Add/remove items with quantity management
- 👥 **Team Section**: Display restaurant team members
- 📅 **Reservation Form**: Complete booking system with validation
- 📱 **Responsive Design**: Mobile-first approach for all screen sizes
- 🎭 **Smooth Animations**: Enhanced user experience with scroll animations

### Backend Features

- 🔐 **RESTful API**: Clean, well-structured API endpoints
- 📊 **MongoDB Integration**: Efficient database management with Mongoose
- ✅ **Data Validation**: Comprehensive input validation and error handling
- 🛡️ **Error Middleware**: Centralized error handling system
- 🔒 **CORS Configuration**: Secure cross-origin resource sharing
- 📝 **Reservation Management**: Complete CRUD operations for reservations

### Testing Features

- 🧪 **Unit Tests**: Controller and model testing
- 🔌 **Integration Tests**: API endpoint testing with Supertest
- 📊 **Test Coverage**: Comprehensive test coverage for critical functionality

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI library |
| **Vite** | 7.0.4 | Build tool & dev server |
| **React Router DOM** | 7.7.1 | Client-side routing |
| **Axios** | 1.11.0 | HTTP client |
| **React Hot Toast** | 2.5.2 | Toast notifications |
| **React Icons** | 5.5.0 | Icon library |
| **React Scroll** | 1.9.3 | Smooth scrolling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express** | 5.1.0 | Web framework |
| **MongoDB** | 8.16.5 | Database (via Mongoose) |
| **Mongoose** | 8.16.5 | MongoDB ODM |
| **Validator** | 13.15.15 | Data validation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Dotenv** | 17.2.1 | Environment variables |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| **Jest** | 30.2.0 | Testing framework |
| **Supertest** | 7.2.2 | HTTP assertion library |

### Deployment

- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📁 Project Structure

```
Zestora/
│
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── images/         # Image files
│   │   └── svg/            # SVG icons
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── About.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Qualities.jsx
│   │   │   ├── Reservation.jsx
│   │   │   ├── Team.jsx
│   │   │   └── WhoAreWe.jsx
│   │   ├── context/        # React Context API
│   │   │   └── CartContext.jsx
│   │   ├── Pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Success.jsx
│   │   ├── App.jsx         # Main App component
│   │   ├── App.css         # Global styles
│   │   ├── main.jsx        # Entry point
│   │   └── restApi.json    # Static data
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js backend application
│   ├── controller/         # Route controllers
│   │   ├── reservation.js
│   │   └── reservation.test.js
│   ├── database/           # Database configuration
│   │   └── dbConnection.js
│   ├── error/              # Error handling
│   │   └── error.js
│   ├── models/             # Database models
│   │   ├── reservationSchema.js
│   │   └── reservationSchema.test.js
│   ├── routes/             # API routes
│   │   ├── reservationRoute.js
│   │   └── reservationRoute.test.js
│   ├── config/             # Configuration files
│   │   └── config.env
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   └── package.json
│
├── DEPLOYMENT.md           # Deployment guide
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB Atlas** account (for cloud database) or **MongoDB** installed locally
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Zestora.git
cd Zestora
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Step 4: Environment Configuration

#### Backend Configuration

Create a `.env` file in the `backend/config/` directory:

```bash
cd backend/config
touch config.env
```

Add the following environment variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
```

**Example MongoDB Atlas URI:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zestora?retryWrites=true&w=majority
```

#### Frontend Configuration (Optional)

If you need to change the API endpoint, update the base URL in your API service files (typically in `src/services/` or API configuration).

---

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |

### Frontend API Configuration

Update the API base URL in your frontend code to point to your backend server:

```javascript
// Example API configuration
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000';
```

---

## 💻 Usage

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory.

#### Start Backend (Production)

```bash
cd backend
npm start
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Endpoints

#### 1. Health Check

**GET** `/`

Check if the API is running.

**Response:**
```json
{
  "message": "Welcome to Zestora API"
}
```

#### 2. Create Reservation

**POST** `/reservation/send`

Create a new reservation/order.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main Street, City, State 12345",
  "date": "2024-12-31",
  "time": "19:00",
  "orderItems": [
    {
      "name": "Pizza",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "totalAmount": 25.98
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Order placed successfully!"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Please fill all the fields"
}
```

**Validation Rules:**

- `firstName`: Required, 3-30 characters
- `lastName`: Required, 3-30 characters
- `email`: Required, valid email format
- `phone`: Required, 7-10 digits
- `address`: Required, 10-200 characters
- `date`: Required, valid date
- `time`: Required
- `orderItems`: Optional, array of items
- `totalAmount`: Optional, number (default: 0)

---

## 🧪 Testing

### Run All Tests

```bash
cd backend
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Test Coverage Report

```bash
npm run test:coverage
```

### Test Structure

```
backend/
├── controller/
│   └── reservation.test.js      # Controller unit tests
├── routes/
│   └── reservationRoute.test.js # API integration tests
└── models/
    └── reservationSchema.test.js # Model validation tests
```

### Test Coverage

The project includes comprehensive test coverage for:

- ✅ Controller functions
- ✅ API endpoints
- ✅ Model validation
- ✅ Error handling
- ✅ Data validation

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set the **Root Directory** to `frontend`
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Deploy!

### Backend Deployment (Render)

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your repository
4. Set the **Root Directory** to `backend`
5. Configure environment variables:
   ```
   PORT=10000
   FRONTEND_URL=https://your-frontend.vercel.app
   MONGO_URI=your_mongodb_connection_string
   ```
6. Set build and start commands:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
7. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📸 Screenshots

### Homepage
*Screenshot of the homepage would go here*

### Menu Section
*Screenshot of the menu section would go here*

### Reservation Form
*Screenshot of the reservation form would go here*

> **Note**: Add your screenshots to showcase the application's UI/UX

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Anuj Yadav


---

## 🙏 Acknowledgments

- Design inspiration from modern restaurant websites
- React community for excellent documentation
- MongoDB Atlas for free tier database hosting
- Vercel and Render for free hosting services

---

## 📊 Project Status

✅ **Active Development** - The project is actively maintained and updated.

### Recent Updates

- ✅ Implemented comprehensive Jest unit testing
- ✅ Added API integration tests with Supertest
- ✅ Improved error handling and validation
- ✅ Enhanced UI/UX with smooth animations
- ✅ Optimized for production deployment

### Future Enhancements

- [ ] User authentication and authorization
- [ ] Admin dashboard for order management
- [ ] Real-time order tracking
- [ ] Payment integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode theme

---

<div align="center">

**Made with ❤️ by Anuj Yadav**

⭐ **Star this repo if you found it helpful!**

</div>
