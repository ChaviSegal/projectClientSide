import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { addProduct } from './productApi';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const AddNewProduct = () => {
    const basket = useSelector((state) => state.basket.basket);
    const [formData, setFormData] = useState({
        productName: '',
        descripttion: '',
        PictureRouting: '',
        category: '',
        compani: '',
        price: ''
    });
    let user = useSelector((state) => state.user.currentUser)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct({ productName: formData.productName, descripttion: formData.descripttion, PictureRouting: formData.PictureRouting, category: formData.category, compani: formData.compani, price: formData.price }, user.token);
    };

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
        <Container maxWidth="md" >
            <Typography variant="h4" gutterBottom textAlign="center">
                מילוי פרטי מוצר
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction="column" alignItems="center" >
                    <ThemeProvider theme={theme}>
                        <Grid item xs={12} style={{ width: "60%" }}>
                            <TextField
                                fullWidth
                                label="שם מוצר"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                style={{ width: "60%", fontSize: "1rem" }}
                            />
                        </Grid>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <TextField
                            fullWidth
                            label="תיאור"
                            name="descripttion"
                            value={formData.descripttion}
                            onChange={handleChange}
                            variant="outlined"
                            style={{ width: "60%", fontSize: "1rem" }}
                        />
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <TextField
                            fullWidth
                            label="תמונה"
                            name="PictureRouting"
                            value={formData.PictureRouting}
                            onChange={handleChange}
                            variant="outlined"
                            style={{ width: "60%", fontSize: "1rem" }}
                        />
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <TextField
                            fullWidth
                            label="סוג"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            style={{ width: "60%", fontSize: "1rem" }}
                        />
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <TextField
                            fullWidth
                            label="חברה"
                            name="compani"
                            value={formData.compani}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            style={{ width: "60%", fontSize: "1rem" }}
                        />
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <TextField
                            fullWidth
                            label="מחיר"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            style={{ width: "60%", fontSize: "1rem" }}
                        />
                    </Grid>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>

                    <Grid item xs={12} style={{ width: "60%" }}>
                        <Button /*style={{ width: "100%", padding: "3%", backgroundColor: "rgb(224, 193, 186)", color: "white" }}*/ type="submit" variant="contained" color="primary"
                            style={{ width: "20%", fontSize: "1rem", backgroundColor: '  #A76CED', color: '#fff' }} 
                        >
                            הוסף
                        </Button>
                    </Grid>
                    </ThemeProvider>
                </Grid>
            </form>
        </Container>
    );
};

export default AddNewProduct;
