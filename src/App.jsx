import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Components/Layout';
import Campaign from './Pages/Campaign';
import AiAgent from './Pages/AiAgent';
import PlatformSetup from './Pages/PlatformSetup';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaign" element={<Campaign />} /> 
        <Route path="/ai-agent" element={<AiAgent />} /> 
        <Route path="/platform-setup" element={<PlatformSetup />} /> 
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;