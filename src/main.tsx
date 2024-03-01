import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./asset/font/BigDailyShort/stylesheet.css";
import "./asset/font/NeueHaasDisplay/stylesheet.css";
import 'swiper/css';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
