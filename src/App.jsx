import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Components/Layout';
import Campaign from './Pages/Campaign';
import AiAgent from './Pages/AiAgent';
import PlatformSetup from './Pages/PlatformSetup';
import Promoters from './Pages/Promoters';
import Leads from './Pages/Leads';
import Payouts from './Pages/Payouts';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaign" element={<Campaign />} /> 
        <Route path="/ai-agent" element={<AiAgent />} /> 
        <Route path="/platform-setup" element={<PlatformSetup />} /> 
        <Route path="/promoters" element={<Promoters />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/payouts" element={<Payouts />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;