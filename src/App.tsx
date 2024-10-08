import React, { useContext, Component, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import IUser from "./types/user.types";

import Navbar from "./components/navbar/index";
import Loading from "./components/Loading spinner/Loading";
import { ThemeContext } from "./Theme";
// Lazily load route components
const Home = lazy(() => import("./components/homeComponent/index"));
const Login = lazy(() => import("./components/login/login.component"));
const Register = lazy(() => import("./components/register/register.component"));

const GetIntellectualProperties = lazy(
  () => import("./components/intellectualProperties/GetIntellectualProperties")
);
const DemandToTransferIP = lazy(
  () => import("./components/demandToTransferIP")
);
const ApproveTransferIP = lazy(() => import("./components/approveTransferIP"));
const Profile = lazy(
  () => import("./components/profileComponent/profile.component")
);
const BoardUser = lazy(() => import("./components/board-user.component"));
const BoardModerator = lazy(
  () => import("./components/board-moderator.component")
);
const BoardAdmin = lazy(() => import("./components/board-admin.component"));
type Props = {};

type State = {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <AppWrapper>
        <div className="App">
          <div className="mainContainer">
            <Navbar
              currentUser={currentUser}
              showModeratorBoard={showModeratorBoard}
              showAdminBoard={showAdminBoard}
              logOut={this.logOut}
            />

            <div className="mainContainer">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/user" element={<BoardUser />} />
                  <Route path="/mod" element={<BoardModerator />} />
                  <Route path="/admin" element={<BoardAdmin />} />
                  <Route
                    path="/approveTransferIP"
                    element={<ApproveTransferIP />}
                  />
                  <Route
                    path="/demandToTransferIP"
                    element={<DemandToTransferIP />}
                  />
                  <Route
                    path="/manage-ip"
                    element={<GetIntellectualProperties />}
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  return <div className={`App ${theme}`}>{children}</div>;
}

export default App;
