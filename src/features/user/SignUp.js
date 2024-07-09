import { useForm } from "react-hook-form";
import { addUser } from "./userApi";
import { useDispatch, useSelector } from "react-redux";
import { userIn } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from '@mui/material';



const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const currentUser = useSelector(state => state.user.currentUser);
  const [userName, setUserName] = useState(null);
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

  useEffect(() => {
    if (currentUser !== null) {
      setUserName(currentUser.userName);
    } else {
      setUserName("שלום אורח");
    }
  }, [currentUser]);

  const save = (data) => {
    addUser(data)
      .then((res) => {
        alert("הצליח להוסיף משתמש");
        dispatch(userIn(res.data));
        setTimeout(() => {
          // מעבר לדף הרשימה (LIST) לאחר 3 שניות
          navigate("/LIST");
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        alert("לא הצליח להרשם" + err.response.data.message);
        console.log(err);
      });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (<>
      <form onSubmit={handleSubmit(save)} className="LogInForm" >
        <h1>פרטי הרשמה</h1>
        <div>
          <ThemeProvider theme={theme}>
            <TextField id="outlined-basic" label="מייל" variant="outlined"{...register("email", { required: { value: true, message: "*מייל הוא שדה חובה" }, })} />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <TextField id="outlined-basic" label="שם משתמש" variant="outlined"{...register("userName", { required: { value: true, message: "*שם הוא שדה חובה" }, })} />        {errors.userName && (
              <div>
              <span style={{ color: "red" }}>
                {errors.userName.message}
              </span>
              </div>
            )}
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ marginTop: '20px' }}>
              <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
                {...register("password", { required: { value: true, message: "*סיסמא הוא שדה חובה" }, })}              />
            </FormControl>

          </ThemeProvider>
        </div>
        <div>
        <Button type="submit" className="prevPage" variant="contained" style={{ backgroundColor: '  #A76CED', color: '#fff' ,width:"10%",height:"5%",fontSize:"large"}}>  הירשם</Button>
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
  </>);
};

export default SignUp;
