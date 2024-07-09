import { height } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { deleteProduct } from "./productApi";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import { Container, Typography, TextField, Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ListItem = ({ one }) => {
  const [imageSrc, setImageSrc] = useState(one.PictureRouting[0]);
  const [hasMultipleImages, setHasMultipleImages] = useState(one.PictureRouting.length > 1);

  const changeImage = () => {
    if (hasMultipleImages) {
      setImageSrc(one.PictureRouting[1]);
    }
  };

  const resetImage = () => {
    setImageSrc(one.PictureRouting[0]);
  };

  useEffect(() => {
    setHasMultipleImages(one.PictureRouting.length > 1);
  }, [one.PictureRouting]);

  const user = useSelector((state) => state.user.currentUser);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClickOpenDeleteDialog = (productId) => {
    setSelectedProductId(productId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteProduct(selectedProductId, user.token);
    setOpenDeleteDialog(false);
  };

  return (<>
    <div className="productCard">
      
      <Link style={{ textDecoration: "none" }} to={"" + one._id}>
        <div className="productImage" style={{ width: "100%", height: "100%", }}>
          <img
            src={imageSrc}
            alt={`Product Image`}
            style={{ width: "340px", height: "280px" }}
            onMouseOver={changeImage}
            onMouseOut={resetImage}
          />
        </div>
      </Link>
      <div className="productDetails" style={{ width: "100%", height: "30%" }}>
        <div className="productName" style={{ color: '#A76CED' }}>{one.productName}</div>
        <div className="productPrice">{one.price} ₪</div>

      </div>


      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogContent >
          <DialogContentText >
            ?האם למחוק מוצר זה לצמיתות
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#A76CED', color: '#fff' }} onClick={handleCloseDeleteDialog} color="primary">
            ביטול
          </Button>
          <Button style={{ backgroundColor: '#A76CED', color: '#fff' }} onClick={handleConfirmDelete} color="primary" autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    {user && user.role == "ADMIN" && <div className="aditAndDeleteButtons" style={{ display: "flex" }}>
      <div style={{marginButton:"7%"}}>
      <Link to="/EditProduct">
        <Button className="aditAdnDeleteButton" style={{ backgroundColor: '#A76CED', color: '#fff' }}>עריכה</Button>
        </Link>
      <Button className="aditAdnDeleteButton" onClick={() => { handleClickOpenDeleteDialog(one._id) }} style={{ color: "black" }}>מחק</Button>
      </div>
    </div>}
  </>);
};

export default ListItem;
