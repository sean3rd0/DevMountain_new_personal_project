import React from "react"
import Nav from "../Nav/Nav"

class Settings extends React.Component {
    constructor(){
        super()
    }

    render(){
        return (
            <div>
                <Nav 
                    history={this.props.history}
                />
                Settings
            </div>
        )
    }
}

export default Settings