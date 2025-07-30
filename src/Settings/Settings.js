import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import CloseIcon from '@mui/icons-material/Close';

import General from './Settings/General';
import Onchain from './Settings/Onchain';
import Activitylog from './Settings/Activitylog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const componentMap = {
  General: General,
  Onchain: Onchain,
  'Activity Log': Activitylog,
};

const settingsOptions = Object.keys(componentMap);

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      activeSetting: null,
    };
  }

  handleOpen = (setting) => {
    this.setState({ dialogOpen: true, activeSetting: setting });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false, activeSetting: null });
  };

  render() {
    const { dialogOpen, activeSetting } = this.state;
    const ActiveComponent = activeSetting ? componentMap[activeSetting] : null;

    return (
      <Box
        sx={{
          maxWidth: 480,
          mx: 'auto',
          px: 2,
          pt: 3,
          pb: 4,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Settings
        </Typography>

        <List disablePadding>
          {settingsOptions.map((label, index) => (
            <React.Fragment key={label}>
              <ListItemButton
                sx={{ px: 1, py: 2, borderRadius: 1 }}
                onClick={() => this.handleOpen(label)}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: '1rem' }}
                />
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <ChevronRightIcon fontSize="small" />
                </ListItemIcon>
              </ListItemButton>
              {index !== settingsOptions.length - 1 && (
                <Divider component="li" sx={{ mx: 1, borderColor: '#eee' }} />
              )}
            </React.Fragment>
          ))}
        </List>


        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              px: 2,
            }}
          >
            {/* Back button on the left */}
            <IconButton
              onClick={this.handleClose}
              sx={{
                position: 'absolute',
                left: 8,
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem', // Use theme.typography.body2 size
                gap: 0.5,              // Space between icon and text
              }}
            >
              <ChevronLeftIcon fontSize="small" />
              <span style={{ fontSize: '1rem' }}>Back</span>
            </IconButton>

            {/* Centered title */}
            <Typography variant="h6" component="div">
              {activeSetting}
            </Typography>
          </DialogTitle>

          <DialogContent dividers>
            {ActiveComponent && <ActiveComponent />}
          </DialogContent>
        </Dialog>

      </Box>
    );
  }
}
