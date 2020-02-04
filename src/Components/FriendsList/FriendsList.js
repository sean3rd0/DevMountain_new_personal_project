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
                    history={this.props.history}
                />
                FriendsList
            </div>
        )
    }
}

export default FriendsList