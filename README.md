# Universities Page 

## Description

This is a React-based frontend application designed to interact with a backend API. The application uses `.env` files for environment-specific configurations. Follow the steps below to set up and run the application.

---

## Features

- **React**: Built using React and modern web technologies.
- **Environment Variables**: Configurable using `.env` files for different environments.
- **Reusable Components**: Modular and scalable structure.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

- The project uses a `.env` file for configuration.
- A template file `.env.example` is included in the repository.
- Copy `.env.example` to `.env` and update the variables as needed:

```bash
cp .env.example .env
```

#### Example `.env` Variables

```plaintext
VITE_APP_API_URL=http://localhost:5000
VITE_APP_ENV=development
```

> **Note**: Replace the values with your actual configuration.

### 4. Start the Development Server

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:5173/](http://localhost:5173/).

---

## Available Scripts

### Run Development Server

```bash
npm run dev
```

Launches the app in development mode.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build/` folder.

---

## Folder Structure

```
├── src
│   ├── components   # Reusable React components
│   ├── pages        # Page components
│   ├── hooks        # Custom React hooks
│   ├── services     # API calls and utilities
│   ├── styles       # Global and component-specific styles
│   └── App.js       # Main app component
├── public
│   ├── index.html   # HTML template
│   └── favicon.ico  # App icon
├── .env.example      # Environment variable template
└── README.md         # Documentation
```

---

## Environment Variables

### Required Variables:

- `REACT_APP_API_URL`: Base URL of the backend API.
- `REACT_APP_ENV`: Application environment (`development`, `staging`, `production`).

### Optional Variables:

- `REACT_APP_FEATURE_FLAG`: Enable/disable specific features.

---

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```
2. **Serve the build**:
   Use any static server (e.g., `serve`, `nginx`) to serve the `build/` folder.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## Questions or Support

For any questions or issues, please contact the project maintainer.
