/* global NDEFReader */
/* global define */
import * as React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import ContactlessIcon from '@mui/icons-material/Contactless';

export default class NFCReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reading: false,
      message: '',
      NFCEnabled: false
    };
  }

  async componentDidMount() {
    if ('NDEFReader' in window) {
      this.setState({ NFCEnabled: true });
      try {
        this.nfcReader = new NDEFReader();
        await this.nfcReader.scan();
        this.nfcReader.onreading = this.handleNFCRead;
        this.setState({ reading: true, message: 'Scanning for NFC tags...' });
      } catch (error) {
        console.error('Error starting NFC scan:', error);
        this.setState({ message: 'Error starting NFC scan. Please try again.' });
      }
    } else {
      this.setState({ NFCEnabled: false, message: 'Web NFC is not supported in this browser.' });
    }
  }

  componentWillUnmount() {
    // Clean up logic could be extended in future if needed
  }

  handleNFCRead = (event) => {
    const { records } = event.message;
    let textData = '';
    records.forEach(record => {
      if (record.recordType === 'text') {
        const textDecoder = new TextDecoder(record.encoding);
        textData = textDecoder.decode(record.data);
      }
    });
    this.setState({ message: `NFC Tag read success: ${textData}` });
    this.props.onRead(textData);
  };

  render() {
    const { message, NFCEnabled } = this.state;

    return (
      <Box alignItems="center" justifyContent="center" sx={{ width: '100%', pb: 1 }}>
        {NFCEnabled ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Icon style={{ fontSize: 30 }}>
              <ContactlessIcon style={{ fontSize: 30 }} />
            </Icon>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}>{message}</Typography>
          </Box>
        )}
      </Box>
    );
  }
}
