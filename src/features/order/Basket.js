import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { remove, update } from './basketSlice';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Basket = () => {
    const items = useSelector(state => state.basket.basket);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        let itemCount = 0;
        let totalPrice = 0;

        items.forEach(item => {
            itemCount += item.productAmount;
            totalPrice += item.price * item.productAmount;
        });

        setTotalItems(itemCount);
        setTotalPrice(totalPrice);
    }, [items]);

    const handleDelete = (productId) => {
        dispatch(remove(productId));
    };

    const handleAdd = (productId) => {
        dispatch(update({ _id: productId, productAmount: 1 }));
    };

    const handleRemove = (productId) => {
        dispatch(update({ _id: productId, productAmount: -1 }));
    };

    const handleCheckout = () => {
        if (!currentUser || !currentUser.token) {
            setOpenDialog(true);
        } else {
            navigate("/AddOrder", { state: { products: items } });
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <h2>פריטים בסל</h2>
            <div className="basket-container">
                {items && items.map(item => (
                    <Card key={item._id} className="basket-card">
                        <CardActions style={{ color: '#A76CED' }}>
                            <IconButton aria-label="add" onClick={() => handleAdd(item._id)}className="AddToAmount">
                                <AddIcon />
                            </IconButton>
                            <IconButton aria-label="delete"  onClick={() => handleDelete(item._id)}>
                                <DeleteIcon style={{ color: '#A76CED' }} />
                            </IconButton>

                            <IconButton aria-label="remove" onClick={() => handleRemove(item._id)}>
                                <RemoveIcon />
                            </IconButton>
                        </CardActions>
                        <CardContent className="basket-card-content">
                            <Typography variant="h5" component="h1">
                                {item.productName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                מחיר ליחידה: {item.price} ₪
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                כמות: {item.productAmount}
                            </Typography>
                            <Typography variant="body2" component="p">
                                מחיר סה"כ: {item.price * item.productAmount} ₪
                            </Typography>
                        </CardContent>
                        <CardMedia
                            style={{ width: "140px", height: "140px" }}
                            component="img"
                            image={item.PictureRouting[0]}
                            alt={item.productName}
                            className="basket-card-image"
                        />
                    </Card>
                ))}
                <div style={{marginLeft:"45%"}}>
                    <Button className="Fini" variant="contained" style={{ backgroundColor: '#A76CED', color: '#fff' }} onClick={handleCheckout}>
                        למעבר לתשלום
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <p style={{fontSize:"large"}}>מספר המוצרים בסל: {totalItems}</p>
                    <p style={{fontSize:"large"}}>המחיר הכולל של הסל: {totalPrice} ₪</p>
                </div>
            </div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"לא נרשמת לאתר"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        לסיום הזמנה עליך להירשם קודם
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        <Link to="/SignUp" style={{ textDecoration: 'none', color: 'inherit' }}>למעבר לדף ההרשמה</Link>
                    </Button>
                    <Button onClick={handleCloseDialog}>
                        <Link to="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>למעבר לדף התחברות</Link>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Basket;






