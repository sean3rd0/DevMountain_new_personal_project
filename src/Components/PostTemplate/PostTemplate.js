import React from "react"
// import axios from "axios"

class PostTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addPhoto: false, 
            postTextarea: "",
            photoURL: ""
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePhotoDecision = () => {
        this.setState({
            addPhoto: !this.state.addPhoto, 
            photoURL: ""
        })
    }

    handleSubmit = (postTextarea, photoURL) => {
        this.props.handlePostSubmit(postTextarea, photoURL)
        this.setState({
            addPhoto: false, 
            postTextarea: "", 
            photoURL: ""
        })
    }

    render(){
        if (!this.state.addPhoto) {
            return (
                <div>
                    <div className="flex-it">
                        <textarea
                            name="postTextarea"
                            onChange={event => {this.handleInputChange(event)}}
                            placeholder="What do you want to share?"
                            value={this.state.postTextarea}
                        />
                        <div className="post-template-button-row">
                            <button
                                onClick={this.handlePhotoDecision}
                            >Add Pic</button>
                            <button
                                onClick={() => {this.handleSubmit(this.state.postTextarea, this.state.photoURL)}}
                            >Post</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <textarea
                            name="postTextarea"
                            onChange={event => {this.handleInputChange(event)}}
                            placeholder="What do you want to share?"
                            value={this.state.postTextarea}
                        />
                    </div>
                    <div className="flex-it">
                        <input
                            name="photoURL"
                            onChange={event => {this.handleInputChange(event)}}
                            value={this.state.photoURL}
                        />
                        <div className="post-template-button-row">
                            <button
                                onClick={this.handlePhotoDecision}
                            >Cancel Pic</button>
                            <button
                                onClick={() => {this.handleSubmit(this.state.postTextarea, this.state.photoURL)}}
                            >Post</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default PostTemplate