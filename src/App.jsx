import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Layout components
import Layout from './Components/Layout';

// Pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Campaign from './Pages/Campaign';
import Promoters from './Pages/Promoters';
import Leads from './Pages/Leads';
import Payouts from './Pages/Payouts';
import PlatformSetup from './Pages/PlatformSetup';
import AIAgent from './Pages/AIAgent';
// import Settings from './Pages/Settings';
// import Help from './Pages/Help';
import Register from './Pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/promoters" element={<Promoters />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/platform-setup" element={<PlatformSetup />} />
            <Route path="/ai-agent" element={<AIAgent />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
            {/* <Route path="/help" element={<Help />} /> */}
          </Route>
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Provider>
  );
};

export default App;