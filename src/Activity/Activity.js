import * as React from 'react';
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Grid
} from '@mui/material';
import { WalletConsumer } from '../context/WalletContext';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


export default class Activity extends React.Component {
  mergeAndSortEvents(deposits, invoices, payments) {
    const allEvents = [
      ...deposits.map(item => ({
        timestamp: item.blockheight * 1000,
        description: item.txid.substring(0, 10),
        amountMsat: item.amount_msat,
        status: item.status,
        source: 'Deposit'
      })),
      ...payments.map(item => ({
        timestamp: item.timestamp,
        description: item.bolt11Description,
        amountMsat: item.amountMsat,
        status: item.status,
        source: 'Payment'
      })),
      ...invoices.map(item => ({
        timestamp: item.timestamp,
        description: item.description,
        amountMsat: item.amountMsat,
        status: item.status,
        source: 'Invoice'
      }))
    ];

    allEvents.sort((a, b) => new Date(Number(b.timestamp)) - new Date(Number(a.timestamp)));
    return allEvents;
  }

  render() {
    return (
      <WalletConsumer>
        {({ deposits, invoices, payments, availableBalance }) => {
          const events = this.mergeAndSortEvents(deposits, invoices, payments);
          //     console.log(events);
          //   console.log("PAYMENTS CJ DESCR " + payments[0].description);
          //   console.log("PAYMENTS CJ BOLTDE " + payments[0].bolt11Description);


          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,             // ✅ Fill available vertical space				
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              {/* Balance Section */}
              <Box sx={{ flex: '0 0 25%', textAlign: 'center', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Your balance
                </Typography>
                <Typography variant="h4">
                  {Number(availableBalance / 1000).toLocaleString()} sats
                </Typography>
                <Typography variant="body2" color="text.secondary">

                </Typography>
              </Box>

              {/* Activity Header */}
              <Box sx={{ flex: '0 0 5%', textAlign: 'left', ml: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Activity
                </Typography>
              </Box>
              <Box sx={{ height: 500, overflow: 'auto' }}>              {/* Events List */}
                {events.map((event, index) => (
                  <React.Fragment key={index}>
                    <HistoryEvent event={event} />
                    {index < events.length - 1 && (
                      <Divider sx={{ mx: 4, borderColor: '#0000000e' }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          );
        }}
      </WalletConsumer>
    );
  }
}

class HistoryEvent extends React.Component {
  getLabel(event) {

    let statenote = "";
    if (event.status === 'pending'){
      statenote = " - Pending"
    }

    if (!['success', 'pending', 'paid', 'confirmed'].includes(event.status)) {
      statenote = " - Failed"
    }
//    if (event.status === 'pending') return 'Pending...';

    const date = new Date(Number(event.timestamp));
    const now = new Date();

    const isYesterday =
      now.getDate() - date.getDate() === 1 &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear();

    if (isYesterday) return 'Yesterday';

  return (
    date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' at ' +
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }) +
    statenote
  );
  }

  renderIcon(event) {

    if (event.status == 'success' || event.status == 'paid' || event.status == 'confirmed') {
      if (event.source === 'Payment') {
        return (
          <Box sx={{ bgcolor: '#f3f3f3c9', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NorthIcon sx={{ fontSize: 18, color: '#0000008a' }} />
          </Box>
        );
      } else {
        return (
          <Box sx={{ bgcolor: '#d1fdd38e', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SouthIcon sx={{ fontSize: 18, color: '#43a048b7' }} />
          </Box>
        );
      }
    } else if (event.status == 'pending') {
      if (event.source === 'Payment') {
        return (
          <Box sx={{ bgcolor: '#d1f6fd8e', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NorthIcon sx={{ fontSize: 18, color: '#0613868a' }} />
          </Box>
        );
      } else {
        return (
          <Box sx={{ bgcolor: '#d1f6fd8e', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SouthIcon sx={{ fontSize: 18, color: '#0613868a' }} />
          </Box>
        );
      }
    } else {
      if (event.source === 'Payment') {
        return (
          <Box sx={{ bgcolor: '#86060618', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NorthIcon sx={{ fontSize: 18, color: '#8606068a' }} />
          </Box>
        );
      } else {
        return (
          <Box sx={{ bgcolor: '#86060618', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SouthIcon sx={{ fontSize: 18, color: '#8606068a' }} />
          </Box>
        );
      }
    }
  }

  render() {
    const { event } = this.props;
    const isOutgoing = event.source === 'Payment';
    const amount = Number(event.amountMsat / 1000).toLocaleString();
    let amountColor = isOutgoing ? '#000000ff' : '#43a047';
    let bgColor = isOutgoing ? '#f3f3f3c9' : '#d1fdd38e';

    if (!['success', 'pending', 'paid', 'confirmed'].includes(event.status)) {
      amountColor = '#d32f2f83'; // red for text
      bgColor = '#ffebee';     // light red for background (like MUI's error lighter tone)
    }
    return (
      <ListItem sx={{ py: 1, px: 3 }}>
        <ListItemAvatar>
            {this.renderIcon(event)}
        </ListItemAvatar>

        <ListItemText
          primary={
            <Grid container>
              <Grid item xs={7}>
                <Typography noWrap variant="body1" sx={{ fontWeight: 400, fontSize: 16 }}>
                  {event.description}
                </Typography>
              </Grid>
              <Grid item xs={5} textAlign="right">
                <Typography 
                  variant="body1"
                  sx={{ color: amountColor, fontWeight: 400, fontSize: 14 }}
                >
                  {isOutgoing ? '−' : '+'}{amount} sats
                </Typography>
              </Grid>
            </Grid>
          }
          secondary={
            <Grid container>
              <Grid item xs={12}>
                <Typography noWrap variant="caption" color="text.secondary">
                                    {this.getLabel(event)}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    );
  }

  formatTime(ts) {
    const date = new Date(Number(ts) * 1000);
    //const date = new Date(Number(ts));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
