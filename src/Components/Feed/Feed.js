import React from "react"
import Nav from "../Nav/Nav" 
import PostTemplate from "../PostTemplate/PostTemplate" 
import IndividualPost from "../IndividualPost/IndividualPost"
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
                this.setState({
                    feed: [...response.data] // maybe don't spread it, or maybe leave it normal and don't even put it in brackets... idk until I see what comes back. 
                })
            })
            .catch(err => {
                console.log('This is the error that came back from the Feed.js componentDidMount axios request: ', err)
            })
    }

    render(){ 
        let mapOfPostsOnState = this.state.feed.map((individualPost, indexOfIndividualPost) => {
            return (
                <IndividualPost 
                    key={indexOfIndividualPost}
                    postId={individualPost.post_id} 
                    pageId={individualPost.page_id}
                    postText={individualPost.post_text}
                    postPhoto={individualPost.post_photo}
                    personId={individualPost.person_id}
                    username={individualPost.username}
                    firstname={individualPost.firstname}
                    lastname={individualPost.lastname}
                    profilePic={individualPost.profile_pic}
                />
            )
        })
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                />
                <PostTemplate />
                {mapOfPostsOnState}
            </div>
        )
    }
}

export default Feed