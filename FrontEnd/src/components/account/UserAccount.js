import React, { useContext, useState } from "react";
import UserContext from "../../auth/UserContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "../../common/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import LocationApi from "../../api/api";
import { useHistory } from "react-router-dom";
import useStyles from "./../theme";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.neudesic.com/about/contact/">
        Nudesic Office Data
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function UserAccount() {
  var classes = useStyles();
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserContext);

  const [formErrors, setFormErrors] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [formData, setFormData] = useState({
    ...currentUser.user[0],
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console

    let result = await callEditUser(formData);
    if (result.sucess) {
      history.push("/dashboard");
      setCurrentUser(result.user)
    } else {
      console.log("Error logging in");
      setFormErrors(result.errors);
    }
  };

  async function callEditUser(newData) {
    try {
      let result = await LocationApi.editUser(newData);
      return { success: true, user: result };
    } catch (errors) {
      console.log("edit user failed", errors);
      return { success: false, errors };
    }
  }

  function handleEditInfo(evt) {
    evt.preventDefault();
    setEditUser(!editUser);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          className={classes.userBox}
        >
          <Typography component="h1" variant="h5">
            My Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            className={classes.userBox1}

          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  disabled={!editUser}
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editUser}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!editUser}
                />
              </Grid>
            </Grid>
            {editUser ? (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.userSubmitBtn}
                >
                  Submit My Info
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.userSubmitBtn}
                  onClick={handleEditInfo}
                  color="error"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.userSubmitBtn}
                onClick={handleEditInfo}
                sx={{mt:2}}
              >
                Edit My Info
              </Button>
            )}
          </Box>
        </Box>
        <Copyright className={classes.userCopyRight} sx={{mt:2}}/>
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}
      </Container>
    </ThemeProvider>
  );
}

export default UserAccount;
