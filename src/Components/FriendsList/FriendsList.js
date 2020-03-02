import React from "react" 
import axios from "axios"
import Nav from "../Nav/Nav"
import UserDisplay from "../UserDisplay/UserDisplay"

class FriendsList extends React.Component {
    constructor() {
        super()

        this.state = {
            searchFriendsInput: "",
            listOfFriendsCurrentlyDisplayed: []
        }
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
                    this.setState({
                        listOfFriendsCurrentlyDisplayed: response
                    })
                })
        : 
            alert('There must be something typed into the search bar in order for it to search for something.')
    }

    render() {
        let mappedListOfFriendsCurrentlyDisplayed = this.state.listOfFriendsCurrentlyDisplayed.map((individualFriend, indexOfIndividualFriend) => {
            return (
                <UserDisplay 
                    key={indexOfIndividualFriend}
                    /*super important to not forget: */isFriends={individualFriend.isFriends}/*true or false*/
                    personId={individualFriend.person_id}
                    username={individualFriend.username}
                    firstname={individualFriend.firstname}
                    lastname={individualFriend.lastname}
                    profilePic={individualFriend.profile_pic}
                />
            )
        })
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                />
                <div className="search-friends-bar-wrapping-div">
                    Search for friends! 
                    <div className="friends-search-bar-and-search-button">
                        <input 
                            name="searchFriendsInput" 
                            placeholder="JaneDoe123"
                            onChange={(event) => {this.handleInputChange(event)}}
                        /> 
                        <button 
                            onClick={this.handleSearchButtonClick}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendsList