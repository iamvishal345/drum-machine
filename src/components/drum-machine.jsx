import React from "react";
import DrumPad from "./drum-pad";
import DrumControls from "./drum-controls";
import { drumPadObj } from "../static/drumpadObject";
class DrumMachine extends React.Component {
  constructor() {
    super();
    this.state = {
      display: "   ",
      drumStatus: true,
      volume: 50,
    };
  }
  setNode = (value) => {
    this.setState({ display: value });
  };
  handleDrumStatus = () =>
    this.setState((prevState) => {
      return { drumStatus: !prevState.drumStatus, display: "" };
    });
  handleVolumeChange = (e) => {
    this.setState({
      volume: e.target.value,
      display: `Volume: ${e.target.value}`,
    });
  };
  render() {
    return (
      <div id="drum-machine">
        <div className="pad-bank">
          {Object.keys(drumPadObj).map((key) => {
            return (
              <DrumPad
                key={key}
                name={key}
                drumStatus={this.state.drumStatus}
                value={drumPadObj[key]}
                handleClick={this.setNode}
                volume={this.state.volume}
              />
            );
          })}
        </div>
        <DrumControls
          display={this.state.display}
          value={this.state.volume}
          drumStatus={this.state.drumStatus}
          handleDrumStatus={this.handleDrumStatus}
          handleVolumeChange={this.handleVolumeChange}
        />
      </div>
    );
  }
}
export default DrumMachine;
