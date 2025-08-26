import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import test utilities for development
if (import.meta.env.DEV) {
  import('./utils/testFallback').then(module => {
    (window as any).testFallback = {
      runTests: module.runFallbackTests,
      testEndpoint: module.testEndpointFallback,
      testLocal: module.testLocalFallback
    };
    console.log('🧪 Fallback test utilities loaded. Use window.testFallback.runTests() to test.');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
