import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WalletConsumer } from '../../context/WalletContext';
import QRCode from "react-qr-code";
import { TextField } from '@mui/material';
export default class Onchain extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <WalletConsumer>
        {({ address }) => (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					height: '100%',
					justifyContent: 'center',
				}}
			>
				<Box sx={{ flex: '0 0 100%', p:1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

            <Typography>On Chain Settings</Typography>
				</Box>

				<Box sx={{ flex: '0 0 100%', p:1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

            <Typography
              variant="body1"
              sx={{ fontWeight: 400, fontSize: 12 }}
            >Onchain Bitcoin Address. Deposit funds here</Typography>
				</Box>

				<Box sx={{ flex: '1 1 100%', p:1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "80%", width: "80%" }}
              value={address}
              viewBox={`0 0 256 256`}
            />
				</Box>

				<Box sx={{ flex: '0 0 100%', p:3, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

            <TextField
              id="outlined-read-only-input"
              value={address}
              InputProps={{
                readOnly: true,
              }}
            />
				</Box>

          </Box>
        )}
      </WalletConsumer>
    )
  }
}