import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "./productApi";
import { add, update } from '../order/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import SmallBasket from "../order/SmallBasket";
import { CssVarsProvider } from '@mui/material-next/styles';
import Button from '@mui/material-next/Button';
import IconButton from '@mui/material-next/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import 'animate.css';




const Details = () => {
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const basket = useSelector(state => state.basket.basket);
  const [showBasketPopup, setShowBasketPopup] = useState(false);
  const [hovered, setHovered] = useState(false);


  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };


  const handleAddToBasket = () => {
    const existingProduct = basket.find(item => item._id === product._id);
    if (existingProduct) {
      dispatch(update({ ...existingProduct, productAmount: amount }));
    } else {
      dispatch(add({ ...product, productAmount: amount }));
    }
    setShowBasketPopup(true);
  };

  const handleAdd = () => {
    setAmount(prevAmount => prevAmount + 1);
  };

  const handleRemove = () => {
    if (amount > 1) {
      setAmount(prevAmount => prevAmount - 1);
    }
  };

  let [product, setProduct] = useState(null);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getProductById(params.id)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        alert("לא ניתן לטעון את המוצרים");
        console.log("error");
      });
  }, []);

  const handleCloseBasketPopup = () => {
    setShowBasketPopup(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % product.PictureRouting.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + product.PictureRouting.length) % product.PictureRouting.length);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    // <Dialog open={true} onClose={() => navigate(-1)}>
    <div className="details-container" style={{ position: "fixed", top: 0, width: '100vw', height: '100vh', backgroundColor: "white" }}>
      <p className="prodDetailsAndButtons">
        <div className="productNameAndDescripttion" >
          <div className="prodName">{product.productName}</div>
          <div className="prodDescripttion" >{product.descripttion}</div>
        </div>

        <div className="leftSideOfDetails">
          <div className="order-controls">
            <div className="prodPrice" style={{ fontSize: "x-large" }}>{product.price}₪</div>
            <div className='removeAndAddToBasketButtons'>
              <IconButton aria-label="remove" onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              {amount}
              <IconButton aria-label="add" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </div>
            <CssVarsProvider>
              <Button variant="filled" onClick={handleAddToBasket} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: hovered ? '#fbc7da' : '#A76CED', color: '#fff', fontSize: "x-large", fontFamily: "Lucida Sans", width: "170px", height: "55px", marginLeft:"1.5%" }}>הוסף לסל</Button>
            </CssVarsProvider>

            <Button variant="filled" onClick={() => {
              navigate(-1)}} onMouseEnter = { handleMouseEnter } onMouseLeave = { handleMouseLeave }
              style = {{ backgroundColor: hovered ? '#A76CED' : '#fbc7da', color: '#fff', fontSize: "x-large", fontFamily: "Lucida Sans", width: "170px", height: "55px", MozUserFocus: "normal" }}>המשך לקנות</Button>

          <div className="quantity-controls">

          </div>
          <div className="picturesIcons">
            <img className="pictureIcon" src="../../pictures/תשלוםמאובטח.png" />
            <img className="pictureIcon" src="../../pictures/פריסהנרחבת.png" />
            <img className="pictureIcon" src="../../pictures/משלוחחינםבקניהמעל199שח.png" />
          </div>
        </div>
    </div>
      </p >
  <div className="prodPicture">
    <img src={product.PictureRouting[currentImageIndex]}
      alt={`Product Image ${currentImageIndex}`} className="prodImgePicture" />
    <div className="nextAndPrevButtons">
      {product.PictureRouting.length > 1 && (
        <div className="image-controls">
          <Button className="prev-button" onClick={handlePrevImage}>
            <img src="../../pictures/8666557_chevron_left_icon.png" alt="Previous" className="arrow-icon" />
          </Button>
          <div className="image-thumbnails">
            {product.PictureRouting.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`small-thumbnail ${index === currentImageIndex ? 'selected-thumbnail' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <Button className="next-button" onClick={handleNextImage} disableRipple>
            <img src="../../pictures/8666777_chevron_right_arrow_icon.png" alt="Next" className="arrow-icon" />
          </Button>
        </div>
      )}

    </div>
  </div>
{ showBasketPopup && <SmallBasket hasMargin={true} onClose={handleCloseBasketPopup} className="animate__animated animate__fadeInLeft" /> }
    </div >
    // </Dialog>
  );
};

export default Details;

