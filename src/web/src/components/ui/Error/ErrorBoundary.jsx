import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log("Error: ", error, info);
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops, an error occured!</h1>;
    }
    return this.props.children;
  }
}
