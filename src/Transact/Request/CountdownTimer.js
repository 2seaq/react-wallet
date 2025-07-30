import * as React from 'react';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
    };

    this.handleExpired = this.handleExpired.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTimer = () => {
    if (this.state.seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      clearInterval(this.interval);
      this.handleExpired();
    }
  };


  handleExpired = () => {
    this.props.handleExpired();
  }

  render() {
    const { seconds } = this.state;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} seconds..`;

  }
}