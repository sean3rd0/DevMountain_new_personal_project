import React from "react" 
import axios from "axios" 
import {connect} from "react-redux"
import Nav from "../Nav/Nav"
import UserDisplay from "../UserDisplay/UserDisplay"

class FriendsList extends React.Component {
    constructor() {
        super()

        this.state = {
            searchFriendsInput: "",
            listOfFriendsCurrentlyDisplayed: [], 
            searchPageNumber: 1
        }
    }

    componentDidMount = () => {
        axios 
            .get(`/api/friendAndUserList`)
            .then(response => {
                this.setState({
                    listOfFriendsCurrentlyDisplayed: response.data
                })
            })
            .catch(err => {
                console.log('This is the error that came back from the FriendsList.js componentDidMount function axios.get request: ', err)
            })
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearchButtonClick = () => {
        this.state.searchFriendsInput ? 
            axios
                .get(`/api/friendAndUserList/${this.state.searchFriendsInput}`)
                .then(response => {
                    //In the render method below, 
                    //make an axios request for each displayed user
                    //WHY?
                    //To see if the user's personId comes up as 
                    //one of the req.session.user's people they follow in the budr_two_followers table. 
                    //If they are followed by the req.session.user, 
                    //display the text "following." 
                    //If they are not, display a button that says "Follow" which, when clicked, makes an axios request to add them to the user's following list. 

                    console.log('this is the FriendsList.js handleSearchButtonClick axios.get request response.data: ', response.data)
                    this.setState({
                        listOfFriendsCurrentlyDisplayed: response.data
                    })
                })
                .catch(err => {
                    console.log('This is the error that came back from the FriendsList.js handleSearchButtonClick function axios.get request: ', err)
                })
        : 
            alert('There must be something typed into the search bar in order for it to search for something.')
    }

    handleFollowButtonClick = (individualFriendPersonId) => { // this is a new part so it may not work like i want it to
        //axios post request where you send the individualFriendPersonId parameter over and add it as a new row in the budr_two_following_list db scheme. 
    }

    handleUserDisplayClick = (userPersonId, clickedPersonId) => {
        if (userPersonId === clickedPersonId) {
            this.props.history.push(`/${userPersonId}/pages/${this.props.currentPage.pageId}`)
        } else { 
            axios
                .get(`/api/pages/personid/${clickedPersonId}`)
                .then(response => {
                    console.log('this is the handleUserDisplayClick axios.get request response: ', response.data.landing_page_id)
                    this.props.history.push(`/${clickedPersonId}/pages/${response.data.landing_page_id}`)
                })
                .catch(err => {
                    console.log('This is the error that came back from the FriendsList.js handleUserDisplayClick fn axios.get request: ', err)
                })
        }
    }

    render() {
        let mappedListOfFriendsCurrentlyDisplayed = this.state.listOfFriendsCurrentlyDisplayed.map((individualFriend, indexOfIndividualFriend) => { 
            axios 
                .get(`/api/userRelationship/${this.props.user.personId}/${individualFriend.person_id}`)
                .then(response => {
                    if (response.data === "User is not following this person") {
                        individualFriend.isFollowing = false
                    } else {
                        individualFriend.isFollowing = true //if I was doing multiple pages and landing pages etc., I would need to use the response.data (the page_id and override_page_id). 
                    }
                }) 
                .catch(err => {
                    console.log('There was an error, but this is individualFriend: ', individualFriend)
                    console.log('This is the error that came back from the FriendsList.js render method mappedListOfFriendsCurrentlyDisplayed axios.get request: ', err)
                })

                if (!individualFriend.isFollowing) {
                    return (
                        <div
                            key={indexOfIndividualFriend}
                        >
                            <div
                                onClick={() => {this.handleUserDisplayClick(this.props.user.personId, individualFriend.person_id)}}
                            >
                            {/* <div onClick={() => {this.handleUserDisplayClick(this.props.user.personId, individualFriend.person_id)}}>hey</div> */}
                                <UserDisplay 
                                    key={indexOfIndividualFriend}
                                    isFollowing={individualFriend.isFollowing}/*true or false*/
                                    personId={individualFriend.person_id}
                                    username={individualFriend.username}
                                    firstname={individualFriend.firstname}
                                    lastname={individualFriend.lastname}
                                    profilePic={individualFriend.profile_pic}
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={() => this.handleFollowButtonClick(individualFriend.personId)} // this is a new part so it may not work like i want it to
                                >
                                Follow</button>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={indexOfIndividualFriend}
                        >
                            <div
                                onClick={() => {this.handleUserDisplayClick(this.props.user.personId, individualFriend.person_id)}}
                            >
                            // <div onClick={() => {this.handleUserDisplayClick(this.props.user.personId, individualFriend.person_id)}}>hey</div>
                                <UserDisplay 
                                    key={indexOfIndividualFriend}
                                    isFollowing={individualFriend.isFollowing}/*true or false*/
                                    personId={individualFriend.person_id}
                                    username={individualFriend.username}
                                    firstname={individualFriend.firstname}
                                    lastname={individualFriend.lastname}
                                    profilePic={individualFriend.profile_pic}
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={() => {this.handleFollowButtonClick(individualFriend.person_id)}} // this is a new part so it may not work like i want it to
                                    >
                                Unfollow</button>
                            </div>
                            {/* <div>
                                this is what it's returning for each iteration: {individualFriend}
                            </div> */}
                        </div>
                    )
                }
        })

        // let numberOfPagesOfFriendsToChooseFrom = this.
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                />
                <div className="search-friends-bar-wrapping-div">
                    Find Friends! 
                    <div className="friends-search-bar-and-search-button">
                        <input 
                            name="searchFriendsInput" 
                            placeholder="JaneDough123"
                            onChange={(event) => {this.handleInputChange(event)}}
                        /> 
                        <button 
                            onClick={this.handleSearchButtonClick}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="list-of-friends-wrapping-div">
                    ${mappedListOfFriendsCurrentlyDisplayed}
                </div>
                <div className="list-of-friends-page-number-bar-wrapping-div">
                    This is where the page numbers go
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.reducer.user, 
        currentPage: reduxState.reducer.currentPage
    }
}

const mapDispatchToProps = {

}

export default connect (mapStateToProps, mapDispatchToProps)(FriendsList)