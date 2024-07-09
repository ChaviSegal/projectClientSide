import { addOrder } from "./orderApi";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';
import { useEffect } from "react";
import Button from '@mui/material/Button';


const AddOrder = ({ products }) => {
  const items = useSelector(state => state.basket.basket);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const currentUser = useSelector(state => state.user.currentUser);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const save = (data) => {
    if (currentUser && currentUser.token) {
      data.products = products;
      addOrder({ ...data, products: items }, currentUser.token)
        .then((res) => {
          alert("הצליח להוסיף הזמנה");
          console.log(res);
        })
        .catch((err) => {
          alert("לא הצליח להוסיף" + err.response.data.message);
          console.log(err);
        });
    } else {
      alert("לסיום הזמנה עליך להתחבר ראשית");
      // כאן תוכלי להפנות את המשתמש לדף התחברות או לדף הרשמה
    }
  };

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      padding: '10px',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '80%', // רוחב הטבלה - 80% מרוחב הדף
    margin: '10px auto', // מרווח בצדדים של הטבלה
  }));


  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(113, 57, 204)",
      },
      text: {
        primary: "rgb(113, 57, 204)",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "15%",
            marginBottom: "10px",
          },
          input: {
            padding: "20%",
            height: "20%",
            boxSizing: "border-box",
            "&::before": {
              borderBottom: "2px solid rgb(113, 57, 204)",
            },
            "&::after": {
              borderBottom: "2px solid rgb(113, 57, 204)",
            },
          },
          outlinedInput: {
            padding: "20px",
          },
        },
      },
    },
  });


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: "5%" }}>
        <div style={{ width: '50%', marginRight: "10%" }}>
          <div className="TableContainer" >
            <TableContainer >
              <Table aria-label="customized table" style={{ width: '100%', height: '5%', border: "solid", borderWidth: "0.2px", borderColor: " #666" }}>
                <TableHead>
                  <TableRow>
                  </TableRow>
                  <TableRow >
                    <TableCell align="right" style={{ fontSize: "large" }}>ס"הכ</TableCell>
                    <TableCell align="right" style={{ fontSize: "large" }}>מחיר מוצר</TableCell>
                    <TableCell align="right" style={{ fontSize: "large" }}>כמות</TableCell>
                    <TableCell align="right" style={{ fontSize: "large" }}>שם המוצר</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items && items.map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{item.price * item.productAmount} ₪</TableCell>
                      <TableCell align="right">{item.price} ₪</TableCell>
                      <TableCell align="right">{item.productAmount}</TableCell>
                      <TableCell align="right">{item.productName}</TableCell>
                      <TableCell align="right"><img src={item.PictureRouting[0]} alt={item.productName} style={{ width: '30px', height: '30px' }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <p style={{ marginRight: "50%" }}>
              <span style={{ fontSize: "larger" }} >סך הכל להזמנה זו:  </span>₪    {totalPrice}
            </p>
          </div>
        </div>
        <div style={{ width: '50%' }}>
          <div style={{ marginRight: '10px' }}>
            <form onSubmit={handleSubmit(save)}>
              <div className="AdressInput">
                <ThemeProvider theme={theme}>
                  <TextField
                    id="outlined-basic"
                    label=" :כתובת להזמנה"
                    variant="outlined"
                    {...register("orderAdress")}
                    style={{ width: "40%", fontSize: "1rem" }} />
                </ThemeProvider>
              </div>
              <Button type="submit" className="prevPage" variant="contained" style={{ width: "20%", fontSize: "1rem", backgroundColor: '  #A76CED', color: '#fff' }} value="סיים הזמנה" >  שליחת הזמנה</Button>

              {/* <input type="submit" value="סיים הזמנה" /> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );

};
export default AddOrder;