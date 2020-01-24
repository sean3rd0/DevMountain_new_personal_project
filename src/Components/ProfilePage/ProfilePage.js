import React from "react"
import axios from "axios"
import {connect} from "react-redux"
import {updateUserOnReduxState, updateCurrentPageOnReduxState, updatePostsOnCurrentPageOnReduxState, addNewPost} from "../../ducks/reducers/reducer"
import Nav from "../Nav/Nav"
import UserDisplay from "../UserDisplay/UserDisplay"
import PostTemplate from "../PostTemplate/PostTemplate"
import "./ProfilePage.css"

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftDropdown: false, 
            rightDropdown: false
        }
    }

    componentDidMount = () => {
        axios.get(`/api/personid/${this.props.match.params.personid}`)
        .then(response => {
            this.props.updateUserOnReduxState(response.data)
            axios.get(`/api/personid/${this.props.match.params.personid}/pageid/${this.props.match.params.pageid}`)
            .then(response => {
                this.props.updateCurrentPageOnReduxState(response.data[0]/*is there more that I need to specify than just response.data? like response.data.blahblahblah?*/)
                this.props.updatePostsOnCurrentPageOnReduxState(response.data/*is there more that I need to specify than just response.data? like response.data.blahblahblah?*/)
            })
            .catch(err => {console.log('this is the error that came back from the ProfilePage componentDidMount INNER axios.get request: ', err)})
        })
        .catch(err => {console.log('this is the error that came back from the ProfilePage componentDidMount OUTER axios.get request: ', err)})
    } 

    handlePostSubmit = (postText, photoURL) => {
        axios.post(`/api/posts`, {
            personId: this.props.user.personId, 
            pageId: this.props.currentPage.pageId, 
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

    handleFriendsButtonClick = () => {
        console.log('friends clicked')
    }

    handleFeedButtonClick = () => {
        console.log('feed clicked')
    }

    handleSettingsButtonClick = () => {
        console.log('settings clicked')
    }

    handleLogoutButtonClick = () => {
        console.log('logout clicked')
    }

    render(){
        //this.props.currentPage is not needed while I'm just experimenting with this little project. 
        let arrayOfDisplayedPosts = this.props.postsOnCurrentPage.map((individualPostObject, indexOfIndividualPostObject) => {
            return (
                <div className="ProfilePageIndividualPostWrappingDiv">
                    <div className="individualPost-UserDisplay">
                    <UserDisplay 
                        profilePic={this.props.user.profilePic}
                        firstname={this.props.user.firstname}
                        lastname={this.props.user.lastname}
                        username={this.props.user.username}
                        personId={this.props.user.personId}
                    />
                    </div>
                    <div className="individualPost-photo-and-text-div">
                        <div className="individualPost-post-text-div">
                            {individualPostObject.post_text}
                        </div>
                        <img 
                            src={individualPostObject.post_photo}
                            alt="a photo related to this post"
                        />
                    </div>
                </div>
            )
        })
        return (
            <div className="yellowww">
                <Nav 
                    user={this.props.user}
                    handleFriendsButtonClick={this.handleFriendsButtonClick}
                    handleFeedButtonClick={this.handleFeedButtonClick}
                    handleSettingsButtonClick={this.handleSettingsButtonClick}
                    handleLogoutButtonClick={this.handleLogoutButtonClick}
                />
                <UserDisplay 
                    profilePic={this.props.user.profilePic}
                    firstname={this.props.user.firstname}
                    lastname={this.props.user.lastname}
                    username={this.props.user.username}
                    personId={this.props.user.personId}
                />
                <PostTemplate 
                    handlePostSubmit={this.handlePostSubmit}
                />
                {arrayOfDisplayedPosts}
                <div className="yellowww">hellowwwww</div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.reducer.user, 
        currentPage: reduxState.reducer.currentPage, 
        postsOnCurrentPage: reduxState.reducer.postsOnCurrentPage
    }
}

const mapDispatchToProps = {
    updateUserOnReduxState: updateUserOnReduxState, 
    updateCurrentPageOnReduxState: updateCurrentPageOnReduxState, 
    updatePostsOnCurrentPageOnReduxState: updatePostsOnCurrentPageOnReduxState,
    addNewPost: addNewPost
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)