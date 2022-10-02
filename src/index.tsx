import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './colors.css';
import 'antd/dist/antd.less'

import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

