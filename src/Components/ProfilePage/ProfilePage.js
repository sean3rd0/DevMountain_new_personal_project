import React from "react"
import axios from "axios"
import {connect} from "react-redux"
import {updateUserOnReduxState, updateCurrentPageOnReduxState, updatePostsOnCurrentPageOnReduxState, addNewPost} from "../../ducks/reducers/reducer"
import Nav from "../Nav/Nav"
import UserDisplay from "../UserDisplay/UserDisplay"
import PostTemplate from "../PostTemplate/PostTemplate"

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
            axios.get(`/api/pageid/${this.props.match.params.pageid}`)
            .then(response => {
                this.props.updateCurrentPageOnReduxState(response.data)
                this.props.updatePostsOnCurrentPageOnReduxState(response.data)
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

    render(){
        return (
            <div>
                <Nav 
                    user={this.props.user}
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