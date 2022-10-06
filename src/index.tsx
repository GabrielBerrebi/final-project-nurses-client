import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import 'antd/dist/antd.less'
import AppRouter from './components/AppRouter/AppRouter';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppRouter/>
    </React.StrictMode>
);

