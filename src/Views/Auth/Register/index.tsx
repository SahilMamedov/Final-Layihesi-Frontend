import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFetchRegistersMutation } from "services/authServices";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Links } from "../../../Routes/Links";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Modal } from '@mantine/core';
import { ErrorMessage } from "../Login/styles";
import { extendedApi } from "services/basketServices";
import { useAppDispatch } from "Redux/hooks/hooks";
import {useTranslation} from "react-i18next"

const theme = createTheme();

interface State {
  password: string;
  showPassword: boolean;
}
export default function SignUp() {

  const {t} =useTranslation()

  const dispatch = useAppDispatch();

  const [opened, setOpened] = useState(true);

  const [errorMessage,setErrorMessage] = useState('')

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [postRegisterData, response] = useFetchRegistersMutation();
  const { isSuccess,error } = response;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("password", values.password);
    postRegisterData(data);
    

  };


  useEffect(()=>{
    if(error){
     if("data" in error){
        // @ts-ignore
       setErrorMessage(error.data)
     }
    }
   },[error])


  useEffect(() => {
    if (isSuccess) {
      dispatch(extendedApi.util.resetApiState())
      swal(
        `${t('SuccessfulRegistration')}`,
        "",
        "success"
      );
      navigate("/login");
    }
  }, [isSuccess]);

  const navigate = useNavigate();
  return (
   <>
  
    
    <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={t('Register')}
          overlayOpacity={0.7}
          closeOnClickOutside={false}
        >


           <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "f5f5f5",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('SignUp')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label={t('FirstName')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surName"
                  label={t('LastName')}
                  name="surName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('EmailAddress')}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={t('UserName')}
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FormControl sx={{ width: "46ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      {t('Password')}
                    </InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={t('Password')}
                    />
                  </FormControl>
                  <ErrorMessage>
                    {errorMessage}
                  </ErrorMessage>
                </div>
              </Grid>        
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('SignUp')}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to={Links.app.login}>
                 {t('AlreadyHaveAccountSignIn')}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </Modal>
   </>
  );
}
