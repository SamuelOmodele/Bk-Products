import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin-dashboard/adminLayout';
import AdminOverview from './pages/admin-dashboard/overview/adminOverview';
import AdminOrders from './pages/admin-dashboard/orders/adminOrders';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
