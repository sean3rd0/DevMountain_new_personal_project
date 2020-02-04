import React from "react"
import Nav from "../Nav/Nav"

class Feed extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <Nav 
                    history={this.props.history}
                />
                Feed
            </div>
        )
    }
}

export default Feed