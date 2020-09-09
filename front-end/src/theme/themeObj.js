const theme = {
  customWidth: {
    maxSearchFieldWithLogo: "360px",
    maxSearchFieldWidth: "235px",

    redirectingPaper: "90%",
  },
  customHeight: {
    appBarHeight: "60px",
    appBarHeightSmall: "50px",

    redirectingPaper: "200px",
  },
  customMargin: {
    topLayout: "80px",
    topLayoutSmall: "70px",
  },
  customZIndex: {
    reminder: 10,
    countdown: 5,
    floatingActionButton: 5,
    appBar: 1100, // This is already embedded in .MuiAppBar-root
    searchFieldContainer: 1000,
    searchMenu: 1200,
  },
  palette: {
    primary: {
      main: "#2196f3",
    },

    backgroundBlue: {
      main: "#619FD7",
    },

    appBarButtonBackground: {
      gradient: "linear-gradient(#66CCFF 20%, #6666FF 50%)",
    },

    paperBackground: {
      main: "#1E1E1E",
      onPage: "rgba(46, 44, 48, 1)",
      deepBlueTable: "rgba(26,22,75,1)",
      gradient: "linear-gradient(180deg, #1E1E1E 0%, #180B66 100%)",
    },

    tableBackground: {
      gradient: "linear-gradient(180deg, #1b163d 0%, #180f56 100%)",
    },

    menuBackground: {
      main: "#303030",
    },

    appBarBlue: {
      main: "#180B66",
    },

    barButton: {
      main: "linear-gradient(45deg, #2196f3, #03b6fc)",
    },

    subText: {
      main: "rgba(5, 5, 5, 1)",
    },

    succeed: {
      main: "#209A54",
    },

    fail: {
      main: "#DC3D4A",
    },

    gradientPaper: {
      main:
        "linear-gradient(180deg, #300B66 0%, rgba(255,255,255,0) 70%),linear-gradient(180deg, #FF3747 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, #FFFFFF 50%, rgba(255,255,255,0) 100%), #9ED2EF",
    },

    type: "light",
  },

  overrides: {
    // Mui Pickers
    MuiPickersToolbar: {
      root: {
        backgroundColor: "#000033",
        color: "#3399FF",
      },
      dateTitleContainer: {
        color: "white",
      },
    },

    MuiPickersCalendarHeader: {
      root: {
        backgroundColor: "#3399FF",
        marginTop: "0px",
        marginBottom: "0px",
        minHeight: "50px",
        maxHeight: "50px",
        color: "white",
      },
      monthTitleContainer: {
        color: "black",
      },
    },
    MuiPickersCalendar: {
      daysHeader: {
        backgroundColor: "#000066",
        "& span": {
          color: "white",
        },
      },
      root: {
        backgroundColor: "#000066",
      },
    },
    MuiPickersArrowSwitcher: {
      iconButton: {
        backgroundColor: "unset",
      },
    },

    MuiPickersYear: {
      yearButton: {
        "&:hover": {
          backgroundColor: "#3399FF",
        },
        "&$selected": {
          backgroundColor: "#3399FF",
        },
        "&$disabled": {
          color: "rgba(255,255,255,0.2)",
          backgroundColor: "rgba(255,255,255,0.02)",
        },
      },
    },
    MuiPickersMonth: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(51, 153, 255, 0.4)",
          color: "white",
        },
        "&.Mui-selected": {
          color: "#3399FF",
        },
      },
    },
    MuiPickersDay: {
      root: {
        color: "white",
        border: "unset",
        backgroundColor: "rgba(255,255,255,0.2)",
        transition: "unset",
        "&:hover": {
          backgroundColor: "rgba(51, 153, 255, 0.7)",
          "&.Mui-selected": {
            backgroundColor: "rgba(51, 153, 255, 0.7)",
          },
        },
        "&:focus": {
          backgroundColor: "rgba(51, 153, 255, 0.9)",
          "&.Mui-selected": {
            backgroundColor: "rgba(51, 153, 255, 0.9)",
          },
        },
        "&$selected": {
          backgroundColor: "#3399FF",
        },
        "&$disabled": {
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
        },
        // "&$today": {
        //   border: "unset",
        // },
      },
      today: {
        border: "unset",
        "&:not(.Mui-selected)": {
          border: "unset",
        },
      },
    },
    MuiPickersYearSelection: {
      root: {
        backgroundColor: "#000066",
        margin: "none",
        color: "white",
      },
    },
    MuiPickersMonthSelection: {
      root: {
        backgroundColor: "#000066",
        margin: "none",
        color: "white",
        width: "unset",
      },
    },

    MuiFormHelperText: {
      root: {
        color: "#3399FF",
      },
    },

    MuiPickersBasePicker: {
      pickerViewLandscape: {
        padding: "none",
        backgroundColor: "#303030",
      },
      pickerView: {
        backgroundColor: "#303030",
      },
    },
    MuiPickersModalDialog: {
      dialogAction: {
        backgroundColor: "#000033",
        "& button": {
          color: "#3399FF",
          "&:hover": {
            backgroundColor: "rgba(51, 153, 255, 0.2)",
          },
        },
      },
    },

    MuiPickersCalendarView: {
      viewTransitionContainer: {
        backgroundColor: "#000066",
      },
    },
    MuiPickersMobileKeyboardInputView: {
      root: {
        backgroundColor: "#000066",
      },
    },
    // Mui Pickers
  },
};

export default theme;
