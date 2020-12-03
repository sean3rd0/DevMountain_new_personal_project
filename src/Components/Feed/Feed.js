import React from "react"
import Nav from "../Nav/Nav" 
import PostTemplate from "../PostTemplate/PostTemplate" 
import IndividualPost from "../IndividualPost/IndividualPost" 
import {connect} from "react-redux"
import {updatePostsOnCurrentPageOnReduxState, updateCurrentPageOnReduxState} from "../../ducks/reducers/reducer"
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

    handlePostSubmit = (postText, photoURL) => { 
        //would need an axios.get request right here to get the right pageId for the following axios.post requests. 
        if (!photoURL) {
            axios
                .post(`/api/posts`, {
                    personId: this.props.user.personId, 
                    pageId: this.props.match.params.pageid, 
                    postText
                })
                .then(response => {
                    this.props.addNewPost({
                        personId: response.data.personId, 
                        pageId: response.data.pageId, 
                        postText: response.data.postText
                    })
                })
                .catch(err => {
                    console.log('this is the error that came from the axios.post request in the handlePostSubmit function on ProfilePage.js: ', err)
                })
        } else {
            axios
                .post(`/api/posts`, {
                    personId: this.props.user.personId, 
                    pageId: this.props.match.params.pageid, 
                    postText, 
                    postPhoto: photoURL
                })
                .then(response => {
                    this.props.addNewPost({
                        personId: response.data.personId, 
                        pageId: response.data.pageId, 
                        postText: response.data.postText, 
                        postPhoto: response.data.postPhoto
                    })
                })
                .catch(err => {
                    console.log('this is the error that came from the axios.post request in the handlePostSubmit function on ProfilePage.js: ', err)
                })
        }
    }

    handlePostClick = (clickedPersonId) => {
        axios
            .get(`/api/landingpage/personid/${clickedPersonId}`)
            .then(response => {
                this.props.updateCurrentPageOnReduxState(response.data);
                axios
                    .get(`/api/personid/${clickedPersonId}/pageid/${response.data.landing_page_id}`)
                    .then(response => {
                        // if (response.data[0].post_id) {
                            this.props.updatePostsOnCurrentPageOnReduxState(response.data)
                        // }
                    })
                    .catch(err => {
                        console.log('This is the error that came back from the Feed.js handlePostClick fn INNER axios.get request')
                    })
                this.props.history.push(`/${clickedPersonId}/pages/${response.data.landing_page_id}`)
            })
            .catch(err => {
                console.log('This is the error that came back from the Feed.js handlePostClick fn OUTER axios.get request: ', err)
            })
    }

    render(){ 
        let mapOfPostsOnState = this.state.feed.map((individualPost, indexOfIndividualPost) => {
            return (
                <div 
                    onClick={() => this.handlePostClick(individualPost.person_id)}
                >
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
                </div>
            )
        })
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                />
                {/* <PostTemplate 
                    // there would be a this.handlePostSubmit here... but I'm just taking out the submit post feature on Feed.js for the sake of time. 
                    handlePostSubmit={this.handlePostSubmit}
                /> */}
                {mapOfPostsOnState}
            </div>
        )
    }
}

// const mapStateToProps = reduxState => {
//     return {

//     }
// }

const mapDispatchToProps = {
    updateCurrentPageOnReduxState, 
    updatePostsOnCurrentPageOnReduxState
}

export default connect(null, mapDispatchToProps)(Feed)