import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Fade, Box, IconButton } from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { CloseRounded as CloseRoundedIcon } from "@material-ui/icons";

const styles = (theme) => ({
  reminderBox: {
    // eslint-disable-next-line
    position: "-webkit-sticky" /* Safari */,
    // eslint-disable-next-line
    position: "sticky",
    width: "90%",
    margin: "5%",
    minWidth: "190px",
    zIndex: theme.customZIndex.reminder,
  },
  alert: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
    backgroundColor: theme.palette.primary.subDark,
    color: theme.palette.normalFontColor.primary,
  },
  alertIcon: {
    color: `${theme.palette.secondary.main} !important`,
  },
});

class StickyReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
    this.toggleReminder = this.toggleReminder.bind(this);
  }

  toggleReminder() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { classes, collapsible, stickyPosition, message } = this.props;
    const style = { [stickyPosition]: "5px" }; // posible value for stickyPosition prop: top, bottom, left, right
    const { visible } = this.state;

    return (
      <Box component="div" m={1} className={classes.reminderBox} style={style}>
        <Fade in={visible} timeout={800} mountOnEnter unmountOnExit>
          <Alert
            severity="warning"
            className={classes.alert}
            classes={{
              icon: classes.alertIcon,
            }}
            action={
              <span>
                {this.props.children} {/* Custom button */}
                {collapsible && (
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={this.toggleReminder}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                )}
              </span>
            }
          >
            {message}
          </Alert>
        </Fade>
      </Box>
    );
  }
}

export default withStyles(styles)(StickyReminder);
