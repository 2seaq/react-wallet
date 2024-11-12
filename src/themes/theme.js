import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',      // Custom primary color
      light: '#F7931A',     // Custom lighter shade
      dark: '#F7931A',      // Custom darker shade
      contrastText: '#F7931A', // Custom text color for buttons, etc.
    },
    secondary: {
      main: '#F7931A',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#F7931A',
      secondary: '#F7931A',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Set your desired background color
          color: '#F7931A',              // Optional: text color for contrast
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Custom elevation using box-shadow

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
          padding: '10px 20px', // Custom padding
          textTransform: 'none', // Remove uppercase transformation
          fontSize: '1rem', // Custom font size
          fontWeight: 600, // Make font bold
        },
        containedPrimary: {
          backgroundColor: '#F7931A', // Primary button background
          '&:hover': {
            backgroundColor: '#388E3C', // Darker shade on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#FF5722', // Secondary button background
          '&:hover': {
            backgroundColor: '#E64A19', // Darker shade on hover
          },
        },
        outlinedPrimary: {
          borderColor: '#F7931A', // Primary outline color
          color: '#F7931A',
          '&:hover': {
            borderColor: '#F7931A', // Darker border on hover
            backgroundColor: 'rgba(255, 87, 34, 0.04)', // Light green hover effect
          },
        },
        outlinedSecondary: {
          borderColor: '#F7931A', // Secondary outline color
          color: '#F7931A',
          '&:hover': {
            borderColor: '#F7931A', // Darker border on hover
            backgroundColor: 'rgba(255, 87, 34, 0.04)', // Light red hover effect
          },
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
          borderRadius: '0px', // Rounded corners for ListItem
          marginBottom: '2px', // Space between ListItems
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
          backgroundColor: '#ffffff', // Background color for TextField
          borderRadius: 0, // Rounded corners
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
