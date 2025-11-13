module.exports = {
  // Tells ESLint this is the root config and stops searching parents
  root: true, 
  
  // 1. Specify the TypeScript parser
  parser: "@typescript-eslint/parser", 

  // 2. Define environments (globals for browser, Node, and Jest)
  env: {
    browser: true,
    node: true,
    jest: true
  },
  
  // 3. Parser Options for ES Modules and JSX
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  
  // 4. Plugins required for your setup
  plugins: [
    "@typescript-eslint",
    "react", // For React rules
    "react-hooks", // For React Hooks rules
    "jsx-a11y" // For accessibility rules
  ],
  
  // 5. Extend the necessary rule sets
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", 
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  
  // 6. Custom rules and overrides
  rules: {
    // This setting is needed to avoid unnecessary warnings when using React 17+
    "react/jsx-uses-react": "off", 
    "react/react-in-jsx-scope": "off",
    
    // Add any specific rules from your previous configuration here
    // e.g., "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  
  // 7. Settings for plugins (e.g., React version)
  settings: {
    react: {
      version: 'detect', // Auto-detects the installed React version
    },
  },
};