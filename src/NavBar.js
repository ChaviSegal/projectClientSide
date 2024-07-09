import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { IconButton } from '@mui/material';
import SmallBasket from "./features/order/SmallBasket";
import { useDispatch, useSelector } from "react-redux";
import { userOut } from "./features/user/userSlice";
import { removeAllItems } from "./features/order/basketSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./features/product/Products.css"
import styled from 'styled-components';


const NavBar = () => {
    const [showSmallBasket, setShowSmallBasket] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);
    const [userName, setUserName] = useState(null);
    const dispatch = useDispatch();


    const StyledNavBar = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white; /* הוספתי צבע רקע לדוגמה */
    z-index: 1000;
  `;

    const handleUserLogout = () => {
        dispatch(userOut());
        dispatch(removeAllItems());
        localStorage.clear();
    };

    useEffect(() => {
        if (currentUser !== null) {
            setUserName(`שלום ${currentUser.userName}`);
        } else {
            setUserName("שלום אורח");
        }
    }, [currentUser]);

    return (
        <>
            <nav className="navbar" >
                <div className="container">
                    <img className="logo" src="../pictures/מוצצים.png" alt="logo" />
                    <div className="NavBarIcons">
                        <div>    {!currentUser && <Link className="loginLink" id="Login" to="/Login">התחבר לחשבון שלי</Link>}</div>

                        <div className="userName" style={{ color: '#A76CED' }}>{userName} </div>
                        <IconButton component={Link} to="/SignUp" disableRipple>
                            <AccountCircleIcon style={{ fontSize: 35, color: '#A76CED' }} />
                        </IconButton>
                        {currentUser && (
                            <IconButton onClick={handleUserLogout} disableRipple style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ExitToAppIcon style={{ fontSize: 35, color: '#A76CED' }} />
                                    <span style={{ fontSize: 17, color: "black" }}>התנתק</span>
                                </div>
                            </IconButton>
                        )}
                        <IconButton component={Link} to="/Basket" disableRipple
                            onMouseEnter={() => setShowSmallBasket(true)}
                            onMouseLeave={() => setShowSmallBasket(false)}
                            className="localGroceryStoreIcon">
                            <LocalGroceryStoreIcon style={{ fontSize: 35, color: '#A76CED' }} />
                        </IconButton>

                    </div>
                </div>
                <div className="links-container">
                    {/* <Link className="link" to="/Home">Home</Link> */}
                    <div className="linkimage">
                        <Link className="link" id="toys" to="/toys"> <img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/צעצועיםאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="toys" to="/toys">צעצועים</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="TextilesAndFashion" to="/TextilesAndFashion"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/טקסטילואופנהאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="TextilesAndFashion" to="/TextilesAndFashion">טקסטיל ואופנה</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="BathAndBabyCare" to="/BathAndBabyCare"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/אמבטוטיפולבתינוקאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="BathAndBabyCare" to="/BathAndBabyCare">אמבט וטיפול</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="FeedingAndPacifiers" to="/FeedingAndPacifiers"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/הנקהואוכלאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="FeedingAndPacifiers" to="/FeedingAndPacifiers">האכלה ומוצצים</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="Furniture" to="/Furniture"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/ריהוטאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="Furniture" to="/Furniture">ריהוט</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="carriages" to="/carriages"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/עגלותוטיולוניםאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="carriages" to="/carriages">עגלות וטיולונים</Link></div>
                    </div>
                    <div className="linkimage">
                        <Link className="link" id="safetySeats" to="/safetySeats"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/מושביבטיחותאייקון.png" alt="icon" /></Link>
                        <div><Link className="link" id="safetySeats" to="/safetySeats">מושבי בטיחות</Link></div>
                    </div>
                    {currentUser && currentUser.role === "ADMIN" && (
                        <>
                            <div className="linkimage">
                                <Link className="link" id="linkimage" to="/AddNewProduct"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/הוספתמוצראייקון.png" alt="icon" /></Link>
                                <div><Link className="link" id="linkimage" to="/AddNewProduct">הוספת מוצר חדש</Link></div>
                            </div>
                            <div className="linkimage">
                                <Link className="link" id="AllOrders" to="/AllOrders"><img className="icon" style={{ width: "70px", height: "70px" }} src="../pictures/כלההזמנות.png" alt="icon" /></Link>
                                <div><Link className="link" id="AllOrders" to="/AllOrders">כל ההזמנות</Link></div>
                            </div>
                        </>
                    )}
                </div>
                {showSmallBasket && <SmallBasket className="SmallBasket" />}
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default NavBar;

