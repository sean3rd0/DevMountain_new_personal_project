import React from "react"
import Nav from "../Nav/Nav" 
import axios from "axios"

class Feed extends React.Component {
    constructor(props){
        super(props) 

        this.state = {
            feed: []
        }
    } 

    componentDidMount = () => {
        axios
            .get(`/api/feed`)
            .then(response => {
                console.log('this is the Feed.js componentDidMount axios.get response.data: ', response.data)
                // this.setState({
                //     feed: [...response.data] // maybe don't spread it, or maybe leave it normal and don't even put it in brackets... idk until I see what comes back. 
                // })
            })
            .catch(err => {
                console.log('This is the error that came back from the Feed.js componentDidMount axios request: ', err)
            })
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