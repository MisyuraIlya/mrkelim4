import { alpha, createTheme, lighten, darken } from '@mui/material'
import { red } from '@mui/material/colors'
require('../../../global.js')

export const themeColors = {
  primary: settings?.primaryColor,
  secondary: settings?.secondaryColor,
  success: '#30AC5A',
  warning: '#F3C521',
  error: '#C52A43',
  info: '#2196F3',
  black: '#223354',
  white: '#ffffff',
  primaryAlt: '#000C57',
  text: '#303545',
  asphalt: '#73727F',
}

export const themeSettings = {
  borderRadius: '6px',
}

export const colors = {
  gradients: {
    blue1: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
    blue4: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
    blue5: 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
    orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
    orange3: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
    purple3: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
    pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
    green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    green2: 'linear-gradient(to bottom, #00b09b, #96c93d)',
    black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    black2: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
  },
  shadows: {
    success:
      '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error:
      '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary:
      '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    warning:
      '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
    cardSm:
      '0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
    cardLg:
      '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)',
  },
  layout: {
    general: {
      bodyBg: '#f2f5f9',
    },
    sidebar: {
      background: themeColors.white,
      textColor: themeColors.secondary,
      dividerBg: '#f2f5f9',
      menuItemColor: '#242E6F',
      menuItemColorActive: themeColors.primary,
      menuItemBg: themeColors.white,
      menuItemBgActive: '#f2f5f9',
      menuItemIconColor: lighten(themeColors.secondary, 0.3),
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: darken(themeColors.secondary, 0.3),
    },
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.05),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
  secondary: {
    lighter: lighten(themeColors.secondary, 0.85),
    light: lighten(themeColors.secondary, 0.25),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2),
  },
  primary: {
    lighter: lighten(themeColors.primary, 0.85),
    light: lighten(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2),
  },
  success: {
    lighter: lighten(themeColors.success, 0.85),
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2),
  },
  warning: {
    lighter: lighten(themeColors.warning, 0.85),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2),
  },
  error: {
    lighter: lighten(themeColors.error, 0.85),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2),
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
}

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Noto Sans Hebrew", sans-serif',
    h2: {
      fontSize: '60px',
      lineHeight: '72px',
    },
    h3: {
      fontSize: '48px',
      lineHeight: '62px',
    },
    h4: {
      fontSize: '34px',
      lineHeight: '44px',
    },
    h5: {
      fontSize: '24px',
      lineHeight: '32px',
    },
    h6: {
      fontSize: '20px',
      lineHeight: '28px',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    subtitle2: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    caption: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 500,
    },
    overline: {
      fontSize: '12px',
      lineHeight: '32px',
    },
    button: {
      fontSize: '14px',
      lineHeight: '16px',
    },
  },
  palette: {
    background: {
      default: '#F6F7FB',
    },
    primary: {
      ...colors.primary,
    },
    secondary: {
      ...colors.secondary,
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#303545',
    },
  },
  components: {
    //HEADER
    MuiAppBar: {
      styleOverrides: {
        root: {
          // paddingTop: '15px',
          backgroundColor: '#fff',
          // color: '#303545',
          // iconColor: '#303545',
        },
      },
    },

    // TEXT FIELD
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 10,
    //       '& .MuiOutlinedInput-root': {
    //         '&:hover .MuiOutlinedInput-notchedOutline': {
    //           borderColor: 'transparent',
    //           border: 'none',
    //         },
    //         '& .MuiOutlinedInput-notchedOutline': {
    //           borderColor: 'transparent',
    //           border: 'none',
    //         },
    //       },
    //       '&:focus-within .MuiOutlinedInput-notchedOutline': {
    //         borderColor: 'transparent',
    //         border: 'none',
    //       },
    //     },
    //   },
    // },

    //Pagination
    MuiPagination: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          '& svg': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    // Table
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#ececec', // Set your desired background color for hover effect
          },
          '&:nth-child(even)': {
            backgroundColor: '#f5f5f5', // Set your desired background color for even rows
            '&:hover': {
              backgroundColor: '#ececec', // Set your desired background color for hover effect
            },
          },
        },
      },
    },
    // BUTTONS
    MuiButton: {
      styleOverrides: {
        root: {
          height: '50px',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '16px',
        },
      },
    },

    // TOGGLE GROUP
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          '&.Mui-selected': {
            backgroundColor: colors.primary.main,
            color: themeColors.white,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: darken(colors.primary.main, 0.2),
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          // Other styles for ToggleButton if needed
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 2px 10px 0px rgba(0, 0, 0, 0.05), 0px 7px 25px 0px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    // MODAL

    // MuiBackdrop: {
    //     styleOverrides: {
    //         root: {
    //             backgroundColor: alpha(
    //                 darken(themeColors.primaryAlt, 0.4),
    //                 0.2
    //             ),
    //             backdropFilter: "blur(2px)",

    //             "&.MuiBackdrop-invisible": {
    //                 backgroundColor: "transparent",
    //                 backdropFilter: "blur(2px)",
    //             },
    //         },
    //     },
    // },
    // MuiFormHelperText: {
    //     styleOverrides: {
    //         root: {
    //             textTransform: "none",
    //             marginLeft: 8,
    //             marginRight: 8,
    //             fontWeight: "bold",
    //         },
    //     },
    // },
    // MuiCssBaseline: {
    //     styleOverrides: {
    //         "html, body": {
    //             width: "100%",
    //             height: "100%",
    //         },
    //         body: {
    //             display: "flex",
    //             flexDirection: "column",
    //             minHeight: "100%",
    //             width: "100%",
    //             flex: 1,
    //         },
    //         "#__next": {
    //             width: "100%",
    //             display: "flex",
    //             flex: 1,
    //             flexDirection: "column",
    //         },
    //         html: {
    //             display: "flex",
    //             flexDirection: "column",
    //             minHeight: "100%",
    //             width: "100%",
    //             MozOsxFontSmoothing: "grayscale",
    //             WebkitFontSmoothing: "antialiased",
    //         },
    //         ".child-popover .MuiPaper-root .MuiList-root": {
    //             flexDirection: "column",
    //         },
    //         "#nprogress": {
    //             pointerEvents: "none",
    //         },
    //         "#nprogress .bar": {
    //             background: colors.primary.lighter,
    //         },
    //         "#nprogress .spinner-icon": {
    //             borderTopColor: colors.primary.lighter,
    //             borderLeftColor: colors.primary.lighter,
    //         },
    //         "#nprogress .peg": {
    //             boxShadow:
    //                 "0 0 15px " +
    //                 colors.primary.lighter +
    //                 ", 0 0 8px" +
    //                 colors.primary.light,
    //         },
    //         ":root": {
    //             "--swiper-theme-color": colors.primary.main,
    //         },
    //         code: {
    //             background: colors.info.lighter,
    //             color: colors.info.dark,
    //             borderRadius: 4,
    //             padding: 4,
    //         },
    //         "@keyframes pulse": {
    //             "0%": {
    //                 transform: "scale(.75)",
    //             },
    //             "20%": {
    //                 transform: "scale(1.1)",
    //             },
    //             "40%": {
    //                 transform: "scale(.75)",
    //             },
    //             "60%": {
    //                 transform: "scale(1.05)",
    //             },
    //             "80%": {
    //                 transform: "scale(.75)",
    //             },
    //             "100%": {
    //                 transform: "scale(.75)",
    //             },
    //         },
    //         "@keyframes ripple": {
    //             "0%": {
    //                 transform: "scale(.8)",
    //                 opacity: 1,
    //             },
    //             "100%": {
    //                 transform: "scale(2.8)",
    //                 opacity: 0,
    //             },
    //         },
    //         "@keyframes float": {
    //             "0%": {
    //                 transform: "translate(0%, 0%)",
    //             },
    //             "100%": {
    //                 transform: "translate(3%, 3%)",
    //             },
    //         },
    //     },
    // },
    MuiSelect: {
      styleOverrides: {
        select: {
          // padding: '10px 14px 10px 10px',
          // '&:focus': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
          // '&:hover': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
          // '&.Mui-focused': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
          // '&.Mui-error': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
          // '&.Mui-disabled': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
          // '&[aria-expanded="true"]': {
          //   backgroundColor: '#212121',
          //   color: '#ffffff',
          // },
          // '&.Mui-focused.Mui-error': {
          //   backgroundColor: 'rgba(0, 0, 0, 0)',
          // },
        },
        // icon: {
        //   fill: '#ffffff', // Set the color of the icon to white
        // },
      },
    },

    //MUI BADHE
    MuiBadge: {
      styleOverrides: {
        badge: {
          top: '5px',
          width: '22px',
          height: '22px',
          backgroundColor: themeColors.error,
          color: 'white',
        },
      },
    },

    // MuiChip: {
    //     styleOverrides: {
    //         colorSecondary: {
    //             background: colors.alpha.black[5],
    //             color: colors.alpha.black[100],

    //             "&:hover": {
    //                 background: colors.alpha.black[10],
    //             },
    //         },
    //         deleteIcon: {
    //             color: colors.error.light,

    //             "&:hover": {
    //                 color: colors.error.main,
    //             },
    //         },
    //     },
    // },
    // MuiOutlinedInput: {
    //     styleOverrides: {
    //         root: {
    //             "& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined":
    //                 {
    //                     paddingRight: 6,
    //                 },
    //             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                 borderColor: colors.alpha.black[50],
    //             },
    //             "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
    //                 borderColor: colors.primary.main,
    //             },
    //         },
    //     },
    // },

    // MuiTabs: {
    //     styleOverrides: {
    //         root: {
    //             height: 40,
    //             minHeight: 40,
    //             overflow: "visible",
    //             "@media (max-width: 600px)": {
    //                 position: "relative",
    //                 zIndex: 1,
    //                 display: "flex",
    //                 justifyContent: "center",
    //             },
    //         },
    //         scroller: {
    //             paddingTop: 1,
    //             "@media (max-width: 600px)": {
    //                 position: "relative",
    //                 zIndex: 1,
    //                 display: "flex",
    //                 justifyContent: "center",
    //             },
    //         },
    //         indicator: {
    //             top: 0,
    //             height: 38,
    //             minHeight: 38,
    //             borderRadius: 8,
    //             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
    //             background: "#fff",
    //         },
    //         scrollableX: {
    //             overflow: "visible !important",
    //         },
    //     },
    // },
    // MuiTab: {
    //     styleOverrides: {
    //         root: {
    //             padding: 0,
    //             height: 38,
    //             minHeight: 38,
    //             borderRadius: 6,
    //             transition: "color .2s",
    //             textTransform: "capitalize",

    //             "&.MuiButtonBase-root": {
    //                 minWidth: "auto",
    //                 paddingLeft: 20,
    //                 paddingRight: 20,
    //                 marginRight: 4,
    //             },
    //             "&.Mui-selected, &.Mui-selected:hover": {
    //                 color: themeColors.text,
    //                 zIndex: 5,
    //             },
    //             "&:hover": {
    //                 color: colors.alpha.black[100],
    //             },
    //         },
    //     },
    // },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: themeSettings.borderRadius,
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
  },
})

export default theme
