# Educational Website Project

This is a React + TypeScript educational website featuring multiple languages (i18n support), section navigation, card interactivity, language switching, and responsive design. The project has been successfully deployed to Vercel.

## Setup and Installation

This project uses React 19.1 with TypeScript and includes internationalization (i18n) support for multiple languages:
- English
- Hindi
- Marathi 

**Note:** Due to dependency conflicts between TypeScript 4.9.5 and newer React/i18Next packages, you need to use the `--legacy-peer-deps` flag for installation.

### Installation

```bash
# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Install compatible versions of i18next packages
npm install i18next@23.7.15 react-i18next@14.0.5 i18next-browser-languagedetector@7.1.0 --legacy-peer-deps

# Fix ajv related errors
npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment with Vercel

This project includes a `vercel.json` configuration file that handles dependency issues during deployment. Follow these steps to deploy to Vercel:

### Live Demo

The application is deployed and accessible at:
https://apala-mahesh-6kih32hrr-laxmikant2002s-projects.vercel.app

### 1. Install Vercel CLI globally

```bash
npm install -g vercel
```

### 2. Fix dependency issues (Required before deployment)

Due to conflicts between TypeScript 4.9.5 and newer i18next packages, you need to downgrade the i18next packages:

```bash
# Remove current i18next packages
npm uninstall i18next react-i18next i18next-browser-languagedetector

# Install compatible versions with legacy-peer-deps
npm install i18next@23.7.15 react-i18next@14.0.5 i18next-browser-languagedetector@7.1.0 --legacy-peer-deps

# Fix ajv dependency issues
npm install ajv-keywords@5.1.0 --legacy-peer-deps
```

### 3. Login to Vercel

```bash
vercel login
```

You will be prompted to authenticate through a browser.

### 4. Deploy the application

```bash
# Navigate to your project directory if needed
cd path/to/your/project

# Build locally first to verify it works
npm run build

# Deploy with production flag
vercel --prod
```

### Handling Dependency Issues

The `vercel.json` file is configured to use `--legacy-peer-deps` during installation to resolve TypeScript and React dependency conflicts:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "installCommand": "npm install --legacy-peer-deps",
        "buildCommand": "npm run build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/robots.txt",
      "dest": "/robots.txt"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Legacy Commands

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Features

- Multi-language support (English, Hindi, Marathi)
- Responsive navigation with scroll animations
- Interactive issue cards
- Smooth section navigation
- Contact form
- Mobile-friendly design

## Troubleshooting

### Cannot find module 'ajv/dist/compile/codegen'
```bash
npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps
```

### i18next TypeScript version conflicts
```bash
# Remove current i18next packages
npm uninstall i18next react-i18next i18next-browser-languagedetector

# Install compatible versions
npm install i18next@23.7.15 react-i18next@14.0.5 i18next-browser-languagedetector@7.1.0 --legacy-peer-deps
```

### Vercel deployment failures
If deployment fails even with vercel.json configuration:

1. Build the app locally first:
```bash
npm run build
```

2. If the local build succeeds, deploy with:
```bash
vercel --prod
```

3. If problems persist, try deploying from the GitHub repository by connecting your repository to Vercel in the Vercel dashboard.

For all dependency issues, always use the `--legacy-peer-deps` flag when installing packages.
