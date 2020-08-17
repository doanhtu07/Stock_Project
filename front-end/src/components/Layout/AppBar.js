import React, { createRef } from "react";
<<<<<<< HEAD
import { isEmpty } from "lodash";
=======
import { isEmpty, isEqual, pick } from "lodash";
>>>>>>> master
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { userAction } from "../../redux/storeActions/actions";

import { redirectToPage } from "../../utils/PageRedirectUtil";
import { logoutUser } from "../../utils/UserUtil";

<<<<<<< HEAD
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

=======
import SearchFieldLayout from "../Search/SearchFieldLayout";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import VideogameAssetRoundedIcon from "@material-ui/icons/VideogameAssetRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

>>>>>>> master
const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.appBarBlue.main,
<<<<<<< HEAD
    height: "60px",
  },
  menuButton: {
    height: "fit-content",
    width: "fit-content",
    padding: 0,
  },
  avatarIcon: {
    height: "40px",
    width: "40px",
    [theme.breakpoints.down("xs")]: {
      height: "30px",
      width: "30px",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    minHeight: "60px",
  },
  logo: {
    height: "50px",
    [theme.breakpoints.down("xs")]: {
      height: "30px",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  navbarButton: {
    color: "white",
    fontSize: "small",
    [theme.breakpoints.down("xs")]: {
      fontSize: "smaller",
    },
    textTransform: "none",
  },
  leftNavbarGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuPaper: {
    backgroundColor: theme.palette.menuBackground.main,
    color: "white",
    minWidth: "160px",
  },
  endMenuItem: {
    marginBottom: "5px",
=======
    height: theme.customHeight.appBarHeight,
    [theme.breakpoints.down("xs")]: {
      height: theme.customHeight.appBarHeightSmall,
    },
  },
  menuButton: {
    height: "fit-content",
    width: "fit-content",
    padding: 0,
    margin: "8px",
    marginRight: "16px",
    "& .MuiIconButton-colorPrimary": {
      color: "white",
    },
  },
  secondaryMenuButton: {
    height: "fit-content",
    width: "fit-content",
    padding: 0,
    margin: "8px",
    "& .MuiIconButton-colorPrimary": {
      color: "white",
    },
  },
  normalIcon: {
    height: "35px",
    width: "35px",
    [theme.breakpoints.down("xs")]: {
      height: "25px",
      width: "25px",
    },
    color: "white",
    "&:hover": {
      background: theme.palette.appBarButtonBackground.gradient,
      borderRadius: "50%",
    },
  },
  avatarIcon: {
    height: "35px",
    width: "35px",
    [theme.breakpoints.down("xs")]: {
      height: "25px",
      width: "25px",
    },
    color: "white",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: theme.customHeight.appBarHeight,
    minHeight: theme.customHeight.appBarHeight,
    [theme.breakpoints.down("xs")]: {
      height: theme.customHeight.appBarHeightSmall,
      minHeight: theme.customHeight.appBarHeightSmall,
    },
    padding: 0,
  },
  leftNavbarGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  rightNavbarGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuPaper: {
    backgroundColor: theme.palette.menuBackground.main,
    color: "white",
    minWidth: "160px",
  },
  endMenuItem: {
    marginBottom: "5px",
  },
  accountMenuItem: {
    fontSize: "medium",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.875rem",
      minHeight: "40px",
    },
>>>>>>> master
  },
});

class PersistentAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.accountAnchorRef = createRef(null);
    this.gameAnchorRef = createRef(null);
  }
<<<<<<< HEAD

  state = {
    openAccountMenu: false,
    openGameMenu: false,
  };

  prevOpenAccountMenu = false;
  prevOpenGameMenu = false;

  toggleAccountMenu = () => {
    this.setState({
      openAccountMenu: true,
    });
  };

  toggleGameMenu = () => {
    this.setState({
      openGameMenu: true,
    });
  };

=======

  state = {
    openAccountMenu: false,
    openGameMenu: false,
  };

  prevOpenAccountMenu = false;
  prevOpenGameMenu = false;

  toggleAccountMenu = () => {
    this.setState({
      openAccountMenu: true,
    });
  };

  toggleGameMenu = () => {
    this.setState({
      openGameMenu: true,
    });
  };

>>>>>>> master
  handleClose = (event) => {
    this.setState({
      openAccountMenu: false,
      openGameMenu: false,
    });
  };

  handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({
        openAccountMenu: false,
        openGameMenu: false,
      });
    }
  };

  logout = () => {
    logoutUser()
      .then(() => {
        this.props.mutateUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
=======
  disableIfHasNotFinishedSettingUpAccount = () => {
    return !this.props.userSession.hasFinishedSettingUp;
  };

>>>>>>> master
  reFocusWhenTransitionMenu = () => {
    if (this.prevOpenAccountMenu && !this.state.openAccountMenu) {
      this.accountAnchorRef.current.focus();
    }

    if (this.prevOpenGameMenu && !this.state.openGameMenu) {
      this.gameAnchorRef.current.focus();
    }

    this.prevOpenAccountMenu = this.state.openAccountMenu;
    this.prevOpenGameMenu = this.state.openGameMenu;
  };

  componentDidMount() {
<<<<<<< HEAD
=======
    // console.log("mountAppBar");
>>>>>>> master
    this.reFocusWhenTransitionMenu();
  }

  componentDidUpdate() {
<<<<<<< HEAD
    this.reFocusWhenTransitionMenu();
  }

=======
    // console.log("updateAppBar");
    this.reFocusWhenTransitionMenu();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const compareKeys = ["avatarUrl", "hasFinishedSettingUp"];
    const nextPropsCompare = pick(nextProps.userSession, compareKeys);
    const propsCompare = pick(this.props.userSession, compareKeys);
    return (
      !isEqual(nextPropsCompare, propsCompare) ||
      !isEqual(nextState, this.state)
    );
  }

>>>>>>> master
  render() {
    const { classes, userSession } = this.props;

    const { openAccountMenu, openGameMenu } = this.state;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
<<<<<<< HEAD
          <img
            src="/bibliko.png"
            alt="Bibliko"
            className={classes.logo}
            onClick={() => {
              redirectToPage("/", this.props);
            }}
          />
          <Grid className={classes.leftNavbarGrid}>
            <Button
              className={classes.navbarButton}
=======
          <Grid className={classes.leftNavbarGrid}>
            <SearchFieldLayout />
          </Grid>
          <Grid className={classes.rightNavbarGrid}>
            <IconButton
              title="Game"
              className={classes.secondaryMenuButton}
>>>>>>> master
              ref={this.gameAnchorRef}
              aria-controls={openGameMenu ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.toggleGameMenu}
<<<<<<< HEAD
            >
              Game
            </Button>
            <Popper
              open={openGameMenu}
              anchorEl={this.gameAnchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
=======
              disableRipple
            >
              <VideogameAssetRoundedIcon className={classes.normalIcon} />
            </IconButton>
            <Popper
              open={openGameMenu}
              anchorEl={this.gameAnchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
>>>>>>> master
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper className={classes.menuPaper}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList
                        autoFocusItem={openGameMenu}
                        id="menu-list-grow"
                        onKeyDown={this.handleListKeyDown}
                      >
<<<<<<< HEAD
                        <MenuItem dense disabled>
                          Transactions
                        </MenuItem>
                        <MenuItem dense>Buy Stocks</MenuItem>
                        <MenuItem dense>Trading History</MenuItem>
                        <MenuItem dense className={classes.endMenuItem}>
                          Pending Orders
                        </MenuItem>

                        <MenuItem dense disabled>
                          List
                        </MenuItem>
                        <MenuItem dense>Watchlist</MenuItem>
                        <MenuItem
                          dense
                          onClick={() => {
                            redirectToPage("/companies", this.props);
                          }}
                          className={classes.endMenuItem}
                        >
                          Companies
                        </MenuItem>

                        <MenuItem dense disabled>
                          Explore
                        </MenuItem>
=======
                        <MenuItem disabled>Transactions</MenuItem>
                        <MenuItem
                          dense
                          disabled={this.disableIfHasNotFinishedSettingUpAccount()}
                        >
                          Buy Stocks
                        </MenuItem>
                        <MenuItem
                          dense
                          disabled={this.disableIfHasNotFinishedSettingUpAccount()}
                        >
                          Trading History
                        </MenuItem>
                        <MenuItem
                          dense
                          disabled={this.disableIfHasNotFinishedSettingUpAccount()}
                          className={classes.endMenuItem}
                        >
                          Pending Orders
                        </MenuItem>

                        <MenuItem disabled>List</MenuItem>
                        <MenuItem
                          dense
                          onClick={() => {
                            redirectToPage("/watchlist", this.props);
                          }}
                        >
                          Watchlist
                        </MenuItem>
                        <MenuItem dense>Companies</MenuItem>

                        <MenuItem disabled>Explore</MenuItem>
>>>>>>> master
                        <MenuItem dense>Charts</MenuItem>
                        <MenuItem
                          dense
                          onClick={() => {
                            redirectToPage("/ranking", this.props);
                          }}
<<<<<<< HEAD
=======
                          disabled={this.disableIfHasNotFinishedSettingUpAccount()}
>>>>>>> master
                        >
                          Ranking
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
<<<<<<< HEAD
            <Button className={classes.navbarButton}>Education</Button>
            <Button className={classes.navbarButton}>About Us</Button>
            <IconButton
              color="inherit"
              component="span"
              edge="end"
=======
            <IconButton
              title="Education"
              className={classes.secondaryMenuButton}
              disableRipple
            >
              <MenuBookRoundedIcon className={classes.normalIcon} />
            </IconButton>
            <IconButton
              title="About Us"
              className={classes.secondaryMenuButton}
              disableRipple
            >
              <InfoRoundedIcon className={classes.normalIcon} />
            </IconButton>
            <IconButton
>>>>>>> master
              className={classes.menuButton}
              ref={this.accountAnchorRef}
              aria-label="Account Menu"
              aria-controls={openAccountMenu ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.toggleAccountMenu}
              disableRipple
            >
              {isEmpty(userSession.avatarUrl) ? (
                <AccountCircleRoundedIcon className={classes.avatarIcon} />
              ) : (
                <Avatar
                  className={classes.avatarIcon}
                  src={userSession.avatarUrl}
                />
              )}
            </IconButton>
            <Popper
              open={openAccountMenu}
              anchorEl={this.accountAnchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper className={classes.menuPaper}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList
                        autoFocusItem={openAccountMenu}
                        id="menu-list-grow"
                        onKeyDown={this.handleListKeyDown}
                      >
<<<<<<< HEAD
                        <MenuItem>Account Settings</MenuItem>
                        <MenuItem
                          onClick={() => {
                            redirectToPage("/accountSummary", this.props);
                          }}
                        >
                          Portfolio
                        </MenuItem>
                        <MenuItem onClick={this.logout}>Log Out</MenuItem>
=======
                        <MenuItem
                          className={classes.accountMenuItem}
                          onClick={() => {
                            redirectToPage("/setting", this.props);
                          }}
                        >
                          Account Settings
                        </MenuItem>
                        <MenuItem
                          className={classes.accountMenuItem}
                          onClick={() => {
                            redirectToPage("/accountSummary", this.props);
                          }}
                          disabled={this.disableIfHasNotFinishedSettingUpAccount()}
                        >
                          Portfolio
                        </MenuItem>
                        <MenuItem
                          className={classes.accountMenuItem}
                          onClick={this.logout}
                        >
                          Log Out
                        </MenuItem>
>>>>>>> master
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  userSession: state.userSession,
});

const mapDispatchToProps = (dispatch) => ({
  mutateUser: () => dispatch(userAction("logout")),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(PersistentAppBar)));
