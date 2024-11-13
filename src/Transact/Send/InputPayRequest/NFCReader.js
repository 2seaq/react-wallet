import * as React from 'react';
import ContactlessIcon from '@mui/icons-material/Contactless';
import { Icon } from '@mui/material';
import NfcIcon from '@mui/icons-material/Nfc';
import { Box, Typography } from '@mui/material';

export default class NFCReader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reading: false,
      message: '',
      NFCEnabled: false
    };
    this.handleNFCRead = this.handleNFCRead.bind(this);
    this.handleNFCErrors = this.handleNFCErrors.bind(this);
  }

  componentDidMountOLD() {
    if ('NDEFReader' in window) {
      this.nfcReader = new NDEFReader();
      this.nfcReader.onerror = this.handleNFCErrors;
    } else {
      this.setState({ message: 'Web NFC is not supported in this browser.' });
    }
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
        console.error('Error starting NFC scan: ', error);
        this.setState({ message: 'Error starting NFC scan. Please try again.' });
      }
    } else {
      this.setState({ NFCEnabled: false });
      this.setState({ message: 'Web NFC is not supported in this browser.' });
    }
  }

  componentWillUnmount() {
    if (this.nfcReader) {
      //    this.nfcReader.stop();
    }
  }

  handleNFCRead(event) {
    const { records } = event.message;
    let textData = '';
    records.forEach(record => {
      if (record.recordType === 'text') {
        const textDecoder = new TextDecoder(record.encoding);
        //        setMessage(textDecoder.decode(record.data));
        textData = textDecoder.decode(record.data);
      }
    });
    this.setState({ message: `NFC Tag read success: ${textData}` });
    this.props.onRead(textData);
  }

  handleNFCErrors(error) {
    console.error('Error reading NFC: ', error);
    this.setState({ message: 'Error reading NFC. Please try again.' });
  }

  startReading = async () => {
    try {
      await this.nfcReader.scan();
      this.nfcReader.onreading = this.handleNFCRead;
      this.setState({ reading: true, message: 'Scanning for NFC tags...' });
    } catch (error) {
      console.error('Error starting NFC scan: ', error);
      this.setState({ message: 'Error starting NFC scan. Please try again.' });
    }
  };

  stopReading = async () => {
    try {
      await this.nfcReader.stop();
      this.setState({ reading: false, message: 'NFC scan stopped.' });
    } catch (error) {
      console.error('Error stopping NFC scan: ', error);
      this.setState({ message: 'Error stopping NFC scan. Please try again.' });
    }
  };

  render() {
    const { reading, message } = this.state;

    return (
      <Box alignItems="center" justifyContent="center"  sx={{ width: '100%', pb: 1 }}>
        {this.state.NFCEnabled
          ? <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%'}}>
            <Icon style={{ fontSize: 30}}><ContactlessIcon style={{ fontSize: 30}} /></Icon>
          </Box>
          :    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>       <Typography
          sx={{
            fontSize: '0.6rem', // Very small font size
          }}
        >
          {message}
        </Typography></Box>
        }
      </Box>
    );
  }
}
