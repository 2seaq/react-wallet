import * as React from 'react';
import QRCode from "react-qr-code";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { WalletConsumer } from '../context/WalletContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <WalletConsumer>
        {({ address }) => (
          <Box
            display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" height="75vh" width="100%" pt={4}	>
            <Accordion sx={{ width: '90%' }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Wallet Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Mode
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: '90%' }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Deposit Address</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  On Chain Deposit
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '20%', bgcolor: '' }}>
                  <Typography variant="h6" gutterBottom>Wallet Settings</Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '55%', bgcolor: '' }}>
                  Onchain Bitcoin Address. Deposit funds here.<br /><br />
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "80%", width: "80%" }}
                    value={address}
                    viewBox={`0 0 256 256`}
                  /><br /><br />
                  <TextField
                    id="outlined-read-only-input"
                    label="BTC Address"
                    value={address}
                    InputProps={{
                      readOnly: true,
                    }}
                  /><br />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '25%', bgcolor: '' }}>
              <Typography>
                Osys Wallet v0.1<br />
              </Typography>
            </Box>
          </Box>
        )}
      </WalletConsumer>
    )
  }
}