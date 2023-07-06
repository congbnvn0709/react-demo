import { time } from "console";
import React from "react";

class Clock extends React.Component {
    state = {
        time: new Date()
    }
    updateTime = () => {
        this.setState({
            time: new Date()
        })
    }
    render() {
        return (
            <>
                <h2>
                    Time now {this.state.time.toLocaleTimeString()}
                </h2>
                <button onClick={this.updateTime} >UpdateTime</button>
            </>
        )
    }
}
export default Clock