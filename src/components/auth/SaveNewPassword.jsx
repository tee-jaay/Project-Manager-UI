import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { Card } from "@mui/material";
import useStyles from "./styles.js";
import { getAuthPages } from "../../store/authPageSlice";
import { useEffect } from "react";

const SaveNewPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { authPage } = useSelector((state) => state.authPage);
  const bgImageUrl = authPage && authPage?.[0][3].imgUrl;

  const [password, setPassword] = useState(null);

  const { currentUser, pending, error } = useSelector((state) => state.user);

  if (currentUser) {
    history.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("password", password);
  };

  useEffect(() => {
    dispatch(getAuthPages());
  }, [dispatch]);

  return (
    <Box
      className={classes.root}
      sx={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Box>
          <Card className={classes.paper} raised sx={{ padding: "32px 24px" }}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Save New Password
            </Typography>
            <form
              onSubmit={handleSubmit}
              className={classes.formSignIn}
              noValidate
            >
              {pending ? (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="false"
                    autoFocus
                    size="small"
                    disabled={true}
                    type="password"
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="retype-password"
                    label="Retype password"
                    name="retype-password"
                    autoComplete="false"
                    autoFocus
                    size="small"
                    disabled={true}
                    type="password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={true}
                    sx={{ marginY: "8px" }}
                  >
                    Reset Password
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="false"
                    type="password"
                    size="small"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="retype-password"
                    label="Retype password"
                    name="retype-password"
                    autoComplete="false"
                    type="password"
                    size="small"
                  />

                  {!pending && error && (
                    <Alert severity="error">Passwords did not match!</Alert>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    sx={{ marginY: "8px" }}
                  >
                    Save Password
                  </Button>
                </>
              )}
              <Grid container>
                <Grid item xs>
                  <span style={{ color: "#606060" }}>Remember password?</span>
                  <Link
                    href="/#/auth/sign-in"
                    variant="body2"
                    sx={{ marginLeft: "8px" }}
                  >
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
};
export default SaveNewPassword;
