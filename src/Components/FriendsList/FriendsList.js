import React from "react"
import Nav from "../Nav/Nav"

class FriendsList extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                />
                FriendsList
            </div>
        )
    }
}

export default FriendsList