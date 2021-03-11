import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  async componentDidMount() {
    const data = await axios.get("/api/entries");
    console.log("data:", data);
  }

  render() {
    return (
      <div>
        <h1>This is a test. See if entries are in console.log</h1>
      </div>
    );
  }
}

export default App;
