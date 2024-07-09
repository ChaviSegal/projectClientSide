import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import List from './features/product/List';
import Details from './features/product/Details';
import Home from './Home'
// import Login from './Login';
import Toys from './features/product/Toys';
import Basket from './features/order/Basket';
import SafetySeats from './features/product/SafetySeats'
import Furniture from './features/product/Furniture'
import Carriages from './features/product/Carriages'
import BathAndBabyCare from './features/product/BathAndBabyCare'
import FeedingAndPacifiers from './features/product/FeedingAndPacifiers';
import TextilesAndFashion from './features/product/TextilesAndFashion';
import Login from './features/user/Login';
import SignUp from './features/user/SignUp';
import { useDispatch } from "react-redux";
import { userIn } from "./features/user/userSlice";
import { useEffect } from "react";
import AddOrder from './features/order/AddOrder';
import AddNewProduct from './features/product/AddNewProduct';
import OrdersList from './features/order/OrdersList';
// import ResponsiveDialog from "./features/product/Dialog"
import "./features/product/Products.css"
import NavBar from './NavBar';
import { Dialog } from '@mui/material';
import SmallBasket from './features/order/SmallBasket';
import ProtectedRouteForManager from './ProtectedRouteForManager';
import ProtectedRouteForUser from './ProtectedRouteForUser';
import EditProduct from './features/product/EditProduct';

// import NavBar from './NavBar';

function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u) {
      dispatch(userIn(JSON.parse(u)));
    }
  }, []);
  return (
    <div className="App">
      <NavBar  />
      <Routes>
        <Route path="/basket" element={<Basket />} />
        <Route path="/Login" element={<Login />} />


        <Route path="/SignUp" element={<SignUp />} />
        <Route path="list" element={<List />}>

          <Route path=":id" element={<Details />}>
            <Route path='' element={<SmallBasket />} />
          </Route>
      </Route>
      <Route path="/Carriages" element={<Carriages />} >
        <Route path=":id" element={<Details />} />

      </Route>
      <Route path="/Furniture" element={<Furniture />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/safetySeats" element={<SafetySeats />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/toys" element={<Toys />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/BathAndBabyCare" element={<BathAndBabyCare />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/FeedingAndPacifiers" element={<FeedingAndPacifiers />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/TextilesAndFashion" element={<TextilesAndFashion />} >
        <Route path=":id" element={<Details />} />
      </Route>
      <Route path="/" element={<Home />} />

      <Route path="/AddOrder" element={<ProtectedRouteForUser><AddOrder /></ProtectedRouteForUser>} />
      <Route path="/AddNewProduct" element={<ProtectedRouteForManager><AddNewProduct /></ProtectedRouteForManager>} />
      <Route path="/AllOrders" element={<ProtectedRouteForManager><OrdersList /></ProtectedRouteForManager>} />
      <Route path="/EditProduct" element={<ProtectedRouteForManager><EditProduct /></ProtectedRouteForManager>} />



    </Routes>
    </div >
  );
}

export default App;
