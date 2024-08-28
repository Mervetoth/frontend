import { Component } from "react";
import { Navigate } from "react-router-dom";
import IUser from "../../types/user.types";
import authService from "../../services/auth.service";
import { Avatar, Button } from "@mui/material";
import avatar from "../../assets/images/mervet.jpg";
import "./style.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import uploadIcon from "../../assets/images/icons/upload-icon.png";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent", // This removes the background color
  boxShadow: "none", // This removes any shadow
}));
type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
};

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
    };
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      this.setState({ currentUser: currentUser, userReady: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="body-space">
        {this.state.userReady ? (
          <div className="main-div">
            <div className="space-between-container  ">
              {" "}
              <div className="title-div">
                <h3 className="title">Personal info</h3>
                <h3 className="subsubtitle">
                  Update your profile photo and personal details here .
                </h3>
              </div>
              <Button variant="contained" startIcon={<AddRoundedIcon />}>
                Save changes
              </Button>
            </div>

            <hr className="hr"></hr>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>Name</Item>
              </Grid>
              <Grid item xs={8}>
                <Item className="space-between-container  ">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    variant="outlined"
                    value={currentUser.firstName}
                  />
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    variant="outlined"
                    value={currentUser.lastName}
                  />
                </Item>
              </Grid>
            </Grid>
            <hr className="hr"></hr>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>Email address</Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <TextField
                    className="textfield2"
                    id="outlined-basic"
                    variant="outlined"
                    value={currentUser.email}
                  />
                </Item>
              </Grid>
            </Grid>
            <hr className="hr"></hr>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>
                  Profile photo{" "}
                  <p className="subsubtitle">
                    This will be diplayed in your profile .
                  </p>
                </Item>
              </Grid>

              <Grid item xs={8}>
                <Item>
                  <div className="space-between-container ">
                    <Avatar
                      alt="Mervet"
                      src={avatar}
                      sx={{ width: 80, height: 80 }}
                    />
                    <div className="upload-photo-div ">
                      <img
                        src={uploadIcon}
                        alt="Upload Icon"
                        className="icon"
                      />
                      <p>
                        <strong>Click to upload </strong>or drag and drop
                        <br></br>
                        SVG,PNG or JPG (max. 800*400px)
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>

            <hr className="hr"></hr>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>Phone Number</Item>
              </Grid>
              <Grid item xs={8}>
                <Item className="space-between-container  ">
                  <TextField
                    className="textfield2"
                    id="outlined-basic"
                    variant="outlined"
                    value={currentUser.phoneNumber}
                  />
                </Item>
              </Grid>
            </Grid>
            <hr className="hr"></hr>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>Wallet address</Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <TextField
                    className="textfield2"
                    id="outlined-basic"
                    variant="outlined"
                    value="Not confirmed !"
                  />
                  <a
                    href="https://example.com/confirm-wallet-address"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small-link"
                  >
                    * You need to confirm your wallet address at first
                  </a>
                </Item>
              </Grid>
            </Grid>
          </div>
        ) : null}
      </div>
    );
  }
}
