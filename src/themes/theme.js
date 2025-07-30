import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7931A',      // Custom primary color
      light: '#F7931A',     // Custom lighter shade
      dark: '#F7931A',      // Custom darker shade
      contrastText: '#000000', // Custom text color for buttons, etc.
    },
    secondary: {
      main: '#F7931A',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#000000', //F7931A
      //   secondary: '#F7931A',
    },
  },
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',     // SF Pro on macOS/iOS
      'BlinkMacSystemFont',
      '"Segoe UI"',        // Windows
      'Roboto',            // Android
      '"Helvetica Neue"',  // Older iOS/macOS
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          margin: 0,
          padding: 0,
          //       overflow: 'hidden',
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
          //     overflow: 'hidden',
        },
        '#root': {
          height: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#F7931A', // Primary button background
          borderRadius: 6, // Rounded corners
          padding: '10px 50px', // Custom padding
          textTransform: 'none', // Remove uppercase transformation
          fontSize: '1.3rem', // Custom font size
          fontWeight: 400, // Make font bold
          '&:hover': {
            backgroundColor: '#e07c00', // A slightly darker orange
            color: '#FFFFFF', // Keep text white
          },
          '&.Mui-disabled': {
            backgroundColor: '#FFFFFF',  // 🔥 white background for disabled
            color: '#A0A0A0',            // optional: greyed-out text
            border: '1px solid #ccc',    // optional: add border if needed
          },
        },
      },
      variants: [
        {
          props: { variant: 'keypad' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: 6,
            padding: '15px 8px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1.5rem', // 👈 Increase this for bigger text

            '&:hover': {
              backgroundColor: '#f0f0f0',
              color: '#000000',
              fontWeight: 900,
            },
          },
        },
        {
          props: { variant: 'copy' },
          style: {
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: 6,
            textTransform: 'none',
            padding: '6px 16px',
            fontWeight: 500,
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: '#999',
              color: '#000', // Ensure it stays black
            },
            '&:focus': {
              backgroundColor: '#fff',
              color: '#000', // Prevent text from turning white
              outline: 'none',
            },
            '&:active': {
              backgroundColor: '#eaeaea', // Optional: subtle press effect
              color: '#000',
            },
          },
        },
      ],
    },


    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          paddingTop: 20,     // Custom top padding
          paddingBottom: 40,  // Custom bottom padding
          minWidth: 0,
          flex: 1,
          flexDirection: 'column',
          borderTop: '1px solid #00000015', // Replace #ccc with desired color
        },
        label: {
          fontSize: 14,
          paddingTop: 8,     // Custom top padding          
          transition: 'none',
          '&.Mui-selected': {
            fontSize: 14,
            //       fontWeight: 'bold',
          },
        },
        iconOnly: {
          // Optional: if you use icons without labels
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 30, // Larger icons globally
        },
      },
    },


    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.6rem', // Custom font size
          color: '#F7931A', // Default label color
          '&.Mui-active': {
            color: '#F7931A', // Active step label color
          },
          '&.Mui-completed': {
            color: '#F7931A', // Completed step label color
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#fde5c9', // Default icon color
          '&.Mui-active': {
            color: '#F7931A', // Active step icon color
          },
          '&.Mui-completed': {
            color: '#F7931A', // Completed step icon color
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#fde5c9',   // Sets default divider color
          borderWidth: 1,           // Sets default thickness
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadow
          backgroundColor: '#FFFFFF', // Light background color
          border: '1px solid #F7931A', // Border around each accordion
          borderRadius: '8px', // Rounded corners
          margin: '8px 0', // Space between accordions
          '&:before': {
            display: 'none', // Remove default before pseudo-element
          },
          '&.Mui-expanded': {
            margin: '8px 0', // Adjust spacing when expanded
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Background for the summary (header)
          borderRadius: '8px', // Match the outer accordion border radius
          minHeight: '48px', // Minimum height for the summary
          '&.Mui-expanded': {
            minHeight: '48px', // Keep height consistent when expanded
          },
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0', // Adjust margin when expanded
          },
        },
        expandIconWrapper: {
          color: '#F7931A', // Custom color for the expand icon
          '&.Mui-expanded': {
            transform: 'rotate(180deg)', // Rotate icon on expansion
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '16px', // Padding inside the details area
          backgroundColor: '#FFFFFF', // Background for details content
          borderTop: '1px solid #F7931A', // Divider line on top of details
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#F7931A', // Set custom color (primary blue in this example)
        },
        circle: {
          strokeLinecap: 'round', // Makes the ends of the circular stroke rounded
        },
      },
      defaultProps: {
        thickness: 5, // Set the default thickness of the circle
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // Set a light grey background for ListItems
          padding: '0px 8px', // Adjust padding for ListItem
          //         borderRadius: '0px', // Rounded corners for ListItem
          //        marginBottom: '2px', // Space between ListItems
          boxShadow: 'none',      // <-- Add this
          '&:hover': {
            backgroundColor: '#e0e0e0', // Hover effect: lighter grey
          },
          '&.Mui-selected': {
            backgroundColor: '#d0d0d0', // Background color when selected
          },
          '&.MuiListItem-button': {
            padding: '10px 14px', // Button-like behavior for ListItems
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before, &:after': {
            borderBottom: 'none', // Remove underline before and after focus
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none', // Remove hover underline
          },
        },
        input: {
          textAlign: 'center', // Optional: center text
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc', // Default border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F7931A', // Border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F7931A', // Border color when focused
          },
          borderRadius: 0, // Rounded corners for the outlined border
        },
        input: {
          padding: '6px 6px', // Padding inside the input
          fontSize: '1rem', // Custom font size for the input text
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-20%', // Position the label in the center
          color: '#F7931A', // Default label color
          width: '100%', // Ensures the label takes full width of the TextField
          transformOrigin: 'center', // Center the transformation point
          fontSize: '0.875rem', // Custom font size for the label
          '&.Mui-focused': {
            color: '#F7931A', // Label color when focused
          },
        },
      },
    },
  },
});

export default theme;
