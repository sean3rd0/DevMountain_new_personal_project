import React from "react" 
import styled from "styled-components"
// import {Link} from "react-router-dom"
import axios from "axios";
import {connect} from "react-redux"
import "./Nav.css" 
import {updateCurrentPageOnReduxState, updatePostsOnCurrentPageOnReduxState} from "../../ducks/reducers/reducer"


class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showLeftMenu: false, 
            showRightMenu: false
        }
    }

    leftMenuToggle = () => {
        this.setState({
            showLeftMenu: !this.state.showLeftMenu
        })
    }

    rightMenuToggle = () => {
        this.setState({
            showRightMenu: !this.state.showRightMenu
        })
    } 

    handleUserProfilePictureClick = (userPersonId, clickedPersonId) => {
        // if (userPersonId === clickedPersonId) {
        //     this.props.history.push(`/${userPersonId}/pages/${this.props.currentPage.pageId}`)
        // } else { 
            axios
                .get(`/api/landingpage/personid/${clickedPersonId}`)
                .then(response => {
                    this.props.updateCurrentPageOnReduxState(response.data)
                    axios
                        .get(`/api/personid/${clickedPersonId}/pageid/${response.data.landing_page_id}`)
                        .then(response => {
                            // if (response.data[0].post_id) {
                                this.props.updatePostsOnCurrentPageOnReduxState(response.data)
                            // }
                        })
                        .catch(err => {
                            console.log('this is the error that came back from the Nav.js handleUserProfilePictureClick INNER axios.get request: ', err)
                        })
                    console.log('this is the handleUserProfilePictureClick axios.get request response.data.landing_page_id: ', response.data.landing_page_id)
                    this.props.history.push(`/${clickedPersonId}/pages/${response.data.landing_page_id}`)
                })
                .catch(err => {
                    console.log('This is the error that came back from the Nav.js handleUserProfilePictureClick fn OUTER axios.get request: ', err)
                })
        // }
    }

    handleFriendsButtonClick = () => {
        this.props.history.push(`/${this.props.user.personId}/friends`)
    }

    handleFeedButtonClick = () => {
        this.props.history.push(`/${this.props.user.personId}/feed`)
    }

    handleSettingsButtonClick = () => {
        this.props.history.push(`/${this.props.user.personId}/settings`)
    }

    handleLogoutButtonClick = () => {
        axios.post('/api/logout')
        .then(
            this.props.history.push('/')
        )
    }


    render(){
        const NavComponent = styled.div`
            background: #263169;
            height: 80px;
            display: flex; 
            align-items: center;
            justify-content: space-between; 
            padding: 0 2.5vw; 
            margin: 0 0 20px; 
        ` 
        const ProfilePicAndMenu = styled.div`
            background: #263169;
            display: flex; 
            width: 50%; 
            height: 100%;
            align-items: center;
            justify-content: space-between;
        `

        const NavProfilePictureSide = styled.div`
            background: #263169;
            display: flex; 
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        `

        const ProfilePictureCircle = styled.img`
            background: gray; 
            border-radius: 50%;
            height: 70px; 
            width: 70px;
        `

        return(
            <NavComponent className="Nav-component-wrapping-div">
                <div className="navbar-menu">
                        <button className="navbar-buttons" onClick={this.handleFriendsButtonClick}>Friends</button>
                        <button className="navbar-buttons" onClick={this.handleFeedButtonClick}>Feed</button>
                </div>
                <div className="navbar-icon" onClick={this.leftMenuToggle}>
                    &#9776;
                </div>
                <div className={
                    this.state.showLeftMenu ? 
                    'left-menu menu left-slide' 
                    : 
                    'left-menu menu'
                }>
                    <button onClick={this.handleFriendsButtonClick}>Friends</button>
                    <button onClick={this.handleFeedButtonClick}>Feed</button>
                </div>
                <ProfilePicAndMenu>
                    <NavProfilePictureSide className="Nav-component-profile-pic-container">
                        <ProfilePictureCircle  
                            onClick={this.handleUserProfilePictureClick}
                            src={this.props.profilePic}//I need to get the currentPage person_id's profilePic and stuff, not the users as it is in this props down below. 
                            alt="Profile Picture"
                            width="60"
                            height="60"
                            onClick={() => {this.handleUserProfilePictureClick(this.props.user.personId, this.props.user.personId)}}
                        />
                    </NavProfilePictureSide>
                    <div className="navbar-menu">
                        <button className="navbar-buttons" onClick={this.handleSettingsButtonClick}>Settings</button>
                        <button className="navbar-buttons" onClick={this.handleLogoutButtonClick}>Logout</button>
                    </div>
                    <div className="navbar-icon" onClick={this.rightMenuToggle}>
                        &#9776;
                    </div>
                    <div className={
                        this.state.showRightMenu ? 
                        'right-menu menu right-slide' 
                        : 
                        'right-menu menu'
                    }>
                        <button onClick={this.handleSettingsButtonClick}>Settings</button>
                        <button onClick={this.handleLogoutButtonClick}>Logout</button>
                    </div>       
                </ProfilePicAndMenu>
            </NavComponent>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.reducer.user, 
        profilePic: reduxState.reducer.user.profilePic, 
        currentPage: reduxState.reducer.currentPage
    }
}

const mapDispatchToProps = {
    updateCurrentPageOnReduxState: updateCurrentPageOnReduxState, 
    updatePostsOnCurrentPageOnReduxState: updatePostsOnCurrentPageOnReduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)