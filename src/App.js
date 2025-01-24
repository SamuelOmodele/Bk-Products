import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin-dashboard/adminLayout';
import AdminOverview from './pages/admin-dashboard/overview/adminOverview';
import AdminOrders from './pages/admin-dashboard/orders/adminOrders';
import AdminProducts from './pages/admin-dashboard/products/adminProducts';
import AllProducts from './pages/admin-dashboard/all-products/allProducts';
import AddProduct from './pages/admin-dashboard/add-product/addProduct';
import EditProduct from './pages/admin-dashboard/edit-product/editProduct';
import ViewProduct from './pages/admin-dashboard/view-product/viewProduct';
import Delivery from './pages/admin-dashboard/delivery/delivery';
import Settings from './pages/admin-dashboard/settings/settings';
import SignIn from './pages/sign-in/signin';
import SignUp from './pages/sign-up/signup';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import About from './pages/about/about';
import Search from './pages/search/search';
import Contact from './pages/contact/contact';
import Error404 from './pages/error404/error404';
import ProductDetails from './pages/product-details/productDetails';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* -- CLIENT ROUTES --- */}
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product-detail' element={<ProductDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/contact' element={<Contact />} />

        {/* -- ADMIN DASHBOARD ROUTES -- */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />}>
            <Route index element={<AllProducts />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='view' element={<ViewProduct />} />
            <Route path='edit' element={<EditProduct />} />
          </Route>
          <Route path='delivery' element={<Delivery />} />
          <Route path='settings' element={<Settings />} />
          
        </Route>

        {/* -- SIGN IN & SIGN UP ROUTES -- */}
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>

        {/* -- PAGE NOT FOUND -- */}
        <Route path='*' element={<Error404 />}/>

      </Routes>
    </div>
  );
}

export default App;
