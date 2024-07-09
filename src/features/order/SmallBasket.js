import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useEffect, useState } from "react";
import 'animate.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const SmallBasket = ({ hasMargin, onClose }) => {
    const items = useSelector(state => state.basket.basket);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [open, setOpen] = useState(true);

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

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className='SmallBasket animate__animated animate__fadeInLeft' style={{ position: "fixed", top: 0, width: "22%", marginLeft: hasMargin ? "13%" : 0, marginTop: hasMargin ? "13%" : 0, height: "60vh", overflowY: "auto" }}>
            <div className="close-button-container">
            <IconButton onClick={handleClose} style={{ position: "absolute", top: 5, right: 5 }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <h2>פריטים בסל</h2>
            <div className="SmallBasket-container">
                {items && items.map(item => (
                    <Card key={item._id} className="basket-card" style={{ marginBottom: "10px", width: "100%", maxWidth: "90%", maxHeight: "150px" }}>
                        <CardContent className="basket-card-content" style={{ whiteSpace: "nowrap" }}>
                            <Typography variant="h6" component="h2" style={{ fontSize: "1rem" }}>
                                {item.productName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom style={{ fontSize: "0.8rem" }}>
                                כמות: {item.productAmount}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            style={{ width: "100%", height: "100px", objectFit: "contain" }}
                            component="img"
                            image={item.PictureRouting[0]}
                            alt={item.productName}
                            className="basket-card-image"
                        />
                    </Card>
                ))}
            </div>
            <div>
                <div>
                    <p style={{ fontSize: "0.9rem" }}>מספר המוצרים בסל: {totalItems}</p>
                    <p style={{ fontSize: "0.9rem" }}>המחיר הכולל של הסל: {totalPrice} ₪</p>
                </div>
            </div>
        </div>
    );
}

export default SmallBasket;



