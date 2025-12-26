import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useApiConfigStore } from './store/apiConfigStore.ts';


useApiConfigStore.setState({
  enableAuth: false,
});



createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
