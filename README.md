# CQA-POC (Calculation Query Application - Proof of Concept)

A modern web application built with **React**, **TypeScript**, and **Vite**, featuring an advanced spreadsheet interface with calculation capabilities, data visualization, and charting support powered by GrapeCity Spread Sheets.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Architecture](#architecture)
- [Component Details](#component-details)

## 🎯 Overview

CQA-POC is a Proof of Concept application designed to demonstrate advanced spreadsheet functionality integrated with React. It provides users with a familiar Excel-like interface while leveraging modern web technologies. The application supports multiple worksheet types including blank sheets, calculation sheets, and graph visualization sheets.

## ✨ Features

- **Multi-Sheet Support**: Create and manage multiple worksheets within a single workbook
  - Blank Sheet: Standard spreadsheet for data entry
  - Calculation Sheet: Dedicated sheet for formulas and calculations
  - Graph Sheet: Visualization of data using charts and graphs

- **Advanced Spreadsheet Capabilities**:
  - Cell editing and data manipulation
  - Formula support with automatic calculations
  - Data formatting and styling
  - Data import/export functionality

- **Data Visualization**:
  - Built-in charting support (Pie charts, Bar charts, and more)
  - Real-time chart updates
  - Multiple chart types for different data representations

- **Responsive UI**:
  - Clean and intuitive navigation bar with branding
  - Toolbar for common spreadsheet operations
  - Responsive layout that adapts to different screen sizes

- **Type Safety**: Full TypeScript support for better development experience and error prevention

## 🛠 Tech Stack

### Core Technologies
- **React** (17.0.2): UI library for building interactive components
- **TypeScript** (5.0.2): Typed superset of JavaScript for robust code
- **Vite** (4.4.5): Next-generation frontend build tool with fast HMR

### Spreadsheet & Charting
- **GrapeCity Spread Sheets** (19.0.0): Enterprise spreadsheet component
- **GrapeCity Spread Charts** (19.0.0): Advanced charting library
- **GrapeCity Spread Designer**: Visual designer for spreadsheet layouts
- **GrapeCity Spread IO**: Import/Export functionality
- **GrapeCity Spread Tables**: Table management utilities

### Additional Libraries
- **React Router DOM** (6.17.0): Client-side routing for multi-page navigation
- **React DOM** (17.0.2): React rendering library

### Development Tools
- **ESLint** (8.45.0): Code quality and linting
- **TypeScript ESLint**: TypeScript-specific linting rules
- **@vitejs/plugin-react**: Vite React plugin with Fast Refresh

## 📁 Project Structure

```
CQA-POC/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images and media files
│   │   └── logo.png
│   ├── common/
│   │   └── Navbar.tsx              # Navigation bar component
│   ├── components/
│   │   └── spreadsheet/
│   │       ├── Spreadsheet.tsx     # Main spreadsheet component
│   │       ├── SpreadsheetToolbar.tsx  # Toolbar for sheet operations
│   │       ├── charts.tsx          # Chart components and utilities
│   │       ├── graphSheet.tsx      # Graph sheet visualization
│   │       └── sheets/
│   │           ├── blankSheet.ts   # Blank sheet configuration
│   │           ├── calculationSheet.ts  # Calculation sheet setup
│   │           └── graphSheet.ts   # Graph sheet setup
│   ├── services/
│   │   └── spreadsheet.service.ts  # Spreadsheet service layer
│   ├── styles/
│   │   ├── Spreadsheet.css        # Spreadsheet styling
│   │   ├── App.css                # App-level styles
│   │   └── index.css              # Global styles
│   ├── App.tsx                     # Root application component
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts              # Vite environment types
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.node.json              # TypeScript config for Vite
├── vite.config.ts                  # Vite configuration
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore rules
└── README.md                        # This file
```

## 📦 Installation

### Prerequisites
- Node.js (14.0.0 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone or download the repository**
   ```bash
   cd CQA-POC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

3. **License Configuration**
   Some GrapeCity Spread components may require license keys. Ensure proper licensing is configured in your environment.

## 🚀 Available Scripts

### Development
Start the development server with hot module replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or another available port).

### Build for Production
Create an optimized production build:
```bash
npm run build
```
This command runs TypeScript type checking and builds with Vite for optimal performance.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Linting
Run ESLint to check code quality:
```bash
npm run lint
```
This checks all `.ts` and `.tsx` files and reports unused disable directives.

## 💻 Usage

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the provided local URL (typically `http://localhost:5173`)

3. The application will display:
   - **Navigation Bar**: Shows the CQA-POC branding and logo
   - **Spreadsheet Interface**: Three-sheet workbook with Blank, Calculation, and Graph sheets
   - **Toolbar**: Various tools for spreadsheet operations

### Using the Spreadsheet

- **Blank Sheet**: Enter and edit data freely in cells
- **Calculation Sheet**: Add formulas and calculations to process data
- **Graph Sheet**: Visualize data with built-in charting capabilities
- **Sheet Navigation**: Click on sheet tabs to switch between different sheets
- **Toolbar Operations**: Use toolbar buttons for common spreadsheet tasks

## 🏗 Architecture

### Component Hierarchy

```
App
├── Navbar (Navigation & Branding)
└── Content Area
    └── Spreadsheet
        ├── SpreadsheetToolbar (Operations)
        └── SpreadSheets (GrapeCity Component)
            ├── Worksheet (Blank Sheet)
            ├── Worksheet (Calculation Sheet)
            └── Worksheet (Graph Sheet)
```

### Data Flow

1. **Spreadsheet Component** initializes the workbook and sets up three sheets
2. **Sheet Configuration** files define the structure and initial data for each sheet type
3. **Service Layer** handles spreadsheet operations and data management
4. **UI Components** render and manage user interactions
5. **Styling** provides visual consistency across the application

### Key Components

#### Spreadsheet.tsx
- Main component managing the workbook
- Initializes three sheets with different configurations
- Manages state for the spread workbook instance

#### SpreadsheetToolbar.tsx
- Provides common spreadsheet operations
- Communicates with the spread instance for toolbar actions

#### Sheet Configuration Files
- **blankSheet.ts**: Sets up a basic worksheet
- **calculationSheet.ts**: Configures calculations and formulas
- **graphSheet.ts**: Sets up chart and visualization display

#### Navigation
- **Navbar.tsx**: Displays application branding and logo
- **React Router**: Handles client-side routing for potential multi-page expansion

## 🔧 Configuration

### TypeScript
Configuration files are provided for optimal TypeScript support:
- `tsconfig.json`: Main TypeScript configuration
- `tsconfig.node.json`: Configuration for Vite build files

### Vite
`vite.config.ts` configures:
- React plugin for JSX/TSX support
- HMR settings
- Build optimization

### ESLint
`.eslintrc.cjs` enforces code quality standards with:
- TypeScript ESLint rules
- React hooks best practices
- React refresh integration

## 🤝 Contributing

When contributing to this project:
1. Follow TypeScript best practices
2. Run `npm run lint` before committing
3. Ensure type safety with TypeScript
4. Keep components modular and reusable
5. Update documentation for significant changes

## 📝 License

Ensure compliance with GrapeCity Spread Sheets licensing requirements when using this application.

## 🐛 Troubleshooting

### Common Issues

**License Key Errors**: 
- Ensure GrapeCity Spread license keys are properly configured
- Check license validity and expiration

**Module Not Found Errors**:
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall if issues persist

**Build Failures**:
- Check TypeScript errors with `npm run lint`
- Ensure all dependencies are compatible with your Node.js version

## 📞 Support

For issues related to:
- **GrapeCity Spread**: Visit [GrapeCity Documentation](https://www.grapecity.com/spread/)
- **Vite**: Check [Vite Documentation](https://vitejs.dev/)
- **React**: Refer to [React Documentation](https://react.dev/)
