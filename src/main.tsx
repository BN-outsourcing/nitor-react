import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./asset/font/BigDailyShort/stylesheet.css";
import "./asset/font/NeueHaasDisplay/stylesheet.css";
import 'swiper/css';
import { RecoilRoot } from 'recoil';
import './locales/i18n'; // 다국어 적용
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
)
