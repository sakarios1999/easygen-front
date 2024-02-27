import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { RootState } from "../../store/store";
import { push } from "redux-first-history";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { loginActions } from "./landing.slice";

/**
 * These are styles imported form feature module
 */
import style from "./landing.module.css";
import { Login, SignIn } from "./landing.type";
import { Button } from "@mui/material";

type ReduxProps = ConnectedProps<typeof connector>;

const LandingComponent = (props: ReduxProps) => {
  const { logIn, push, register } = props;

  const theme = createTheme();

  const [isLoading, setLoading] = useState(false);
  const [isFormDisplaying, setFormDisplaying] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must be 8 characters long, include a letter, a number, and a special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        const res: any = await logIn({
          username: values.email,
          password: values.password,
        });
        if (res?.payload?.data?.userResponse?.token !== (undefined || "")) {
          push("dashboard");
        } else {
          console.log("login error: unknown");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Failed to Login", err);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must be 8 characters long, include a letter, a number, and a special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        const reg: any = await register({
          email: values.email,
          name: values.name,
          password: values.password,
        });
        console.log(reg);
        const res: any = await logIn({
          username: values.email,
          password: values.password,
        });
        if (res?.payload?.data?.userResponse?.token !== (undefined || "")) {
          push("dashboard");
        } else {
          console.log("login error: unknown");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Failed to Login", err);
      }
    },
  });

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be 8 characters long, include a letter, a number, and a special character"
      )
      .required("Password is required"),
  });

  const handleRegistration = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      setLoading(true);
      // Simulate API call
      console.log(values);
      actions.setSubmitting(false);
      setLoading(false);
      // On successful registration, you might want to auto-login the user or navigate to a different page
    } catch (error) {
      // Handle registration error
      setLoading(false);
      console.error("Registration failed", error);
    }
  };

  /**
   * i18n translation function.
   * Takes namespace/s as params and nothing for default.
   */
  const { t } = useTranslation(["landing"]); // Make sure namespace is added to locales

  /**
   * useEffect performs side-effects on component rendering.
   * It takes a function for side-effects and a dependency list.
   * When dependency list is empty, useEffect runs each time the component rerenders
   * Adding variables to the dependency list will cause useEffect to run each time a variable changes
   */
  useEffect(() => {
    // Write your side-effects here
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2023/12/en_homepage_header.webp?w=1085&ssl=1)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 30,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!isFormDisplaying ? (
              <>
                <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t("SIGN_IN")}
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={loginFormik.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    error={
                      loginFormik.touched.email &&
                      Boolean(loginFormik.errors.email)
                    }
                    helperText={
                      loginFormik.touched.email && loginFormik.errors.email
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    error={
                      loginFormik.touched.password &&
                      Boolean(loginFormik.errors.password)
                    }
                    helperText={
                      loginFormik.touched.password &&
                      loginFormik.errors.password
                    }
                  />
                  <LoadingButton
                    color="primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isLoading}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t("SIGN_IN_CAPITAL")}
                  </LoadingButton>
                  <Button
                    color="error"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      setFormDisplaying(true);
                    }}
                  >
                    {t("REGISTER_CAPITAL")}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                  <HowToRegIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t("REGISTER")}
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={registerFormik.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    value={registerFormik.values.name}
                    onChange={registerFormik.handleChange}
                    error={
                      registerFormik.touched.name &&
                      Boolean(registerFormik.errors.name)
                    }
                    helperText={
                      registerFormik.touched.name && registerFormik.errors.name
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={registerFormik.values.email}
                    onChange={registerFormik.handleChange}
                    error={
                      registerFormik.touched.email &&
                      Boolean(registerFormik.errors.email)
                    }
                    helperText={
                      registerFormik.touched.email && registerFormik.errors.email
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={registerFormik.values.password}
                    onChange={registerFormik.handleChange}
                    error={
                      registerFormik.touched.password &&
                      Boolean(registerFormik.errors.password)
                    }
                    helperText={
                      registerFormik.touched.password &&
                      registerFormik.errors.password
                    }
                  />
                  <LoadingButton
                    color="primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isLoading}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t("REGISTER_CAPITAL")}
                  </LoadingButton>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  push,
  register: loginActions.register,
  logIn: loginActions.logIn,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LandingComponentRedux = connector(LandingComponent);

export { LandingComponentRedux as LandingComponent };
