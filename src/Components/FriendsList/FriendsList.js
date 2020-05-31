import React from "react" 
import axios from "axios"
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
                console.log('this is the response.data: ', response.data)
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

                    console.log('this is the response.data: ', response.data)
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

    render() {
        let mappedListOfFriendsCurrentlyDisplayed = this.state.listOfFriendsCurrentlyDisplayed.map((individualFriend, indexOfIndividualFriend) => { 
            return (
                // <UserDisplay 
                //     key={indexOfIndividualFriend}
                //     /*super important to not forget: */isFriends={individualFriend.isFriends}/*true or false*/
                //     personId={individualFriend.person_id}
                //     username={individualFriend.username}
                //     firstname={individualFriend.firstname}
                //     lastname={individualFriend.lastname}
                //     profilePic={individualFriend.profile_pic}
                // />

                <div>
                    this is what it's returning for each iteration: {individualFriend}
                </div>
            )
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

export default FriendsList