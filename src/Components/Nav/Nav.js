// import React from "react"
// import "./Nav.css"
// import {Link} from "react-router-dom"

// class Nav extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             leftDropdown: false, 
//             rightDropdown: false
//         }
//     }

//     render(){
//         return (
//             <nav className="row zOne">
//                 <div>
//                     <div 
//                         className="hamburger-menu"
//                         onClick={() => this.setState({leftDropdown: !this.state.leftDropdown})}
//                     >&#9776;</div>
//                     <div className={this.state.leftDropdown ? "show-dropdown flex-it" : "hide-dropdown"}>
//                         <Link 
//                             className="plain-text"
//                             to="/friends"
//                         >Friends</Link>
//                     </div>
//                 </div>
//                 <div>
//                     <Link to="/feed"><div className="Nav-component-feed-link, link-like-blue-div">Feed</div></Link>
//                 </div>
//                 <div>
//                     <div 
//                         className={this.state.rightDropdown ? "right-hamburger-side-of-nav" : "unopened-right-hamburger"}
//                         className="hamburger-menu"
//                         onClick={() => this.setState({rightDropdown: !this.state.rightDropdown})}
//                     >&#9776;</div>
//                     <div 
//                         className={this.state.rightDropdown ? "show-right-dropdown flex-it" : "hide-dropdown"}
//                     >
//                         <div>
//                             <Link 
//                                 className="plain-text"
//                                 to={`/${this.props.personId}/pages/${this.props.pageId}`}
//                             >View My Profile</Link>
//                         </div>
//                         <div>
//                             <Link 
//                                 className="plain-text"
//                                 to="/settings"
//                             >Settings</Link>
//                         </div>
//                         <div>
//                             <Link 
//                                 className="plain-text"
//                                 to={`/`}
//                             >Logout</Link>   
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         )
//     }
// }

// export default Nav



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

    handleUserProfilePictureClick = () => { 
        // console.log(this.props.currentPagePersonId, this.props.user.personId)
        // if (
        //     ! this.props.currentPagePersonId === this.props.user.personId 
        //     && 

        // ) {
        //     alert('USER is NOT viewing THEIR own PROFILE page. ')
        // } else {
            alert('this')
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
            display: flex; 
            width: 50%; 
            height: 100%;
            align-items: center;
            justify-content: space-between;
        `

        const NavProfilePictureSide = styled.div`
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
                            src={this.props.profilePic}
                            alt="Profile Picture"
                            width="60"
                            height="60"
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
        currentPagePersonId: reduxState.reducer.currentPage.personId
    }
}

const mapDispatchToProps = {
    updateCurrentPageOnReduxState: updateCurrentPageOnReduxState, 
    updatePostsOnCurrentPageOnReduxState: updatePostsOnCurrentPageOnReduxState
}

export default connect(mapStateToProps)(Nav)