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
        axios
        .get(`/api/personid/${this.props.match.params.personid}/pageid/${this.props.match.params.pageid}`)
        .then(response => { 
            console.log('hit')
            if (response.data[0].post_id) {
                this.props.updatePostsOnCurrentPageOnReduxState(response.data)
            }
        })
        .catch(err => {console.log('this is the error that came back from the ProfilePage componentDidMount INNER axios.get request: ', err)})
    }
    

    handlePostSubmit = (postText, photoURL) => { 
        if (!photoURL) {
            axios.post(`/api/posts`, {
                personId: this.props.match.params.personid, 
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
            axios.post(`/api/posts`, {
                personId: this.props.match.params.personid, 
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


    handleUserDisplayClick = () => {
        console.log('this is the this.props.currentPage: ', this.props.currentPage, 'and this.props.user: ', this.props.user)
    }

    render(){
        //this.props.currentPage is not needed while I'm just experimenting with this little project. 
        let arrayOfDisplayedPosts = this.props.postsOnCurrentPage.map((individualPostObject, indexOfIndividualPostObject) => { 
            if (!individualPostObject.post_photo) {
                return (
                    <div className="ProfilePageIndividualPostWrappingDiv">
                        <div className="individualPost-UserDisplay" 
                            onClick={() => {this.handleUserDisplayClick()}}
                        >   
                        <UserDisplay 
                            key={indexOfIndividualPostObject} 
                            // isFollowing={}
                            profilePic={this.props.user.profilePic}
                            firstname={this.props.user.firstname} 
                            lastname={this.props.user.lastname}
                            username={this.props.user.username}
                            personId={this.props.user.personId}
                        />
                        </div>
                        <div className="individualPost-photo-and-text-div">
                            <div 
                                className="individualPost-post-text-div"
                            >
                                {individualPostObject.post_text}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="ProfilePageIndividualPostWrappingDiv">
                        <div className="individualPost-UserDisplay"
                            onClick={() => {this.handleUserDisplayClick()}}
                        >
                        <UserDisplay 
                            key={indexOfIndividualPostObject} 
                            // isFollowing={}
                            profilePic={this.props.user.profilePic}
                            firstname={this.props.user.firstname} 
                            lastname={this.props.user.lastname}
                            username={this.props.user.username}
                            personId={this.props.user.personId}                        
                        />
                        </div>
                        <div className="individualPost-photo-and-text-div">
                            <div 
                                className="individualPost-post-text-div"
                            >
                                {individualPostObject.post_text}
                            </div>
                            <img 
                                src={individualPostObject.post_photo}
                                alt="post-related"
                                width="350px"
                                height="250px"
                            />
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className="yellowww">
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                    // user={this.props.user}
                />
                <UserDisplay 
                    profilePic={this.props.user.profilePic}
                    firstname={this.props.user.firstname}
                    lastname={this.props.user.lastname}
                    username={this.props.user.username}
                    personId={this.props.user.personId}
                    onClick={() => {this.handleUserDisplayClick()}}
                />
                <PostTemplate 
                    handlePostSubmit={this.handlePostSubmit}
                />
                {arrayOfDisplayedPosts}
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