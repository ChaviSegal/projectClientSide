import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import SmallBasket from "../order/SmallBasket";
import { useDispatch, useSelector } from "react-redux";
import { userIn } from "./userSlice";
import { useForm } from "react-hook-form";
import { login } from "./userApi";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';


const Login = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let { register, handleSubmit, formState: { errors }, } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUpLink, setShowSignUpLink] = useState(false);

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
            width: "20%",
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

  const save = (data) => {
    login(data)
      .then((res) => {
        alert("הצליח להתחבר  ");
        dispatch(userIn(res.data));
        setTimeout(() => {
          // מעבר לדף הרשימה (LIST) לאחר 3 שניות
          navigate("/List");
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          if (err.response.data.message === "please send email user name and password") {
            setErrorMessage("אחד או יותר מהפרטים חסרים.");
          } else if (err.response.data.message === "user does not exist") {
            setErrorMessage("המשתמש אינו קיים. האם תרצי להירשם?");
            setShowSignUpLink(true);
          } else if (err.response.data.message === "user password is incorrect") {
            setErrorMessage("הסיסמה שגויה.");
          } else if (err.response.data.message === "user name does not match") {
            setErrorMessage("שם המשתמש אינו תואם ");
            setShowSignUpLink(true);
          }
        } else if (err.response.status === 400) {
          if (err.response.data.type === "invalid operation" && err.response.data.message === "cannot sign in user") {
            setErrorMessage("אחד או יותר הפרטים שהזנת שגויים");
          }
        } else {
          setErrorMessage("אירעה שגיאה בעת התחברות. נסי שוב מאוחר יותר.");
        }
        console.log(err);
      });


  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };




  return (
    <>

      <form onSubmit={handleSubmit(save)} className="LogInForm">
      <h1>פרטי התחברות</h1>
        <div>
          <ThemeProvider theme={theme}>
            <TextField id="email" label="מייל" variant="outlined" {...register("email", { required: { value: true, message: "*מייל הוא שדה חובה" } })} />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <TextField id="username" label="שם משתמש" variant="outlined" {...register("userName", { required: { value: true, message: "*שם הוא שדה חובה" } })} />
            {errors.userName && <div><span style={{ color: "red" }}>{errors.userName.message}</span></div>}
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ marginTop: '20px' }}>
              <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="סיסמה"
                {...register("password", { required: { value: true, message: "*סיסמא הוא שדה חובה" } })}
              />
            </FormControl>
          </ThemeProvider>
        </div>
        <div>
          <Button type="submit" className="prevPage" variant="contained" style={{ backgroundColor: '  #A76CED', color: '#fff', width: "10%", height: "5%", fontSize: "large" }}>  התחבר</Button>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
        <div>
          {showSignUpLink && (
            <div>
              <Link to="/SignUp">הירשם</Link>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;






