import { Component } from "react";
import { Navigate } from "react-router-dom";
import IUser from "../../types/user.types";
import authService from "../../services/auth.service";
import { Avatar } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import AbcIcon from "@mui/icons-material/Abc";
type Props = {};

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
          <div>
            <header className="jumbotron">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
              ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Gender:</strong> {currentUser.gender}
            </p>
            <p>
              <strong>Phone Number:</strong> {currentUser.phoneNumber}
            </p>
            <p>
              <strong>Wallet Address:</strong> {currentUser.walletAddress}
            </p>
            {currentUser.profileImageUrl && (
              <p>
                <strong>Profile Image:</strong>
                <img
                  src={currentUser.profileImageUrl}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              </p>
            )}
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
