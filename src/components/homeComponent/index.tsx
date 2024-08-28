//This is a public page that shows public content. People don’t need to log in to view this page.

import { Component } from "react";
import UserService from "../../services/user.service";
import "./style.css";
import Button from "@mui/material/Button/Button";
import { ArrowForward } from "@mui/icons-material";

type Props = {};

type State = {
  content: string;
};
const handleClick = () => {
  alert("Button clicked!");
};
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <h6 className="hero-heading">
          Securely Manage and Transfer Your
          <br className="hidden md:block" />
          Intellectual Property on the Blockchain.{" "}
        </h6>

        <div className="button-container">
          <p className="subtext">
            Secure, Transparent, and Efficient IP Solutions Powered by
            Blockchain Technology{" "}
          </p>{" "}
          <Button
            onClick={() => (window.location.href = "/login")}
            variant="outlined"
            endIcon={<ArrowForward />}
          >
            Get started
          </Button>
        </div>
      </div>
    );
  }
}
//  <h3>{this.state.content}</h3>
