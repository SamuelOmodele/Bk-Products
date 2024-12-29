import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin-dashboard/adminLayout';
import AdminOverview from './pages/admin-dashboard/overview/adminOverview';
import AdminOrders from './pages/admin-dashboard/orders/adminOrders';
import AdminProducts from './pages/admin-dashboard/products/adminProducts';
import AllProducts from './pages/admin-dashboard/all-products/allProducts';
import AddProduct from './pages/admin-dashboard/add-product/addProduct';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path='orders' element={<AdminOrders />} />
          
          <Route path='products' element={<AdminProducts />}>
            <Route index element={<AllProducts />} />
            <Route path='add' element={<AddProduct />} />
          </Route>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
