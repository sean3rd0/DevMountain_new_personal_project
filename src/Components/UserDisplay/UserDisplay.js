import React from "react"
// import {Link} from "react-router-dom" 
import "./UserDisplay.css"

const UserDisplay = (props) => { 
    return (
        <div className="userDisplayWrappingDiv">
            <div>
                <img 
                    className="profile-pic" 
                    // onClick={() => {props.handleUserDisplayClick(props.personId)}}
                    src={props.profilePic}
                    alt="A beautiful person."
                />
            </div>
            <div>
                <div 
                    className="UserDisplayInnerParts UsernamePartOfUserDisplay"
                    // onClick={() => {props.handleUserDisplayClick(props.personId)}}
                >{props.username}</div>
                <div 
                    className="UserDisplayInnerParts"
                    // onClick={() => {props.handleUserDisplayClick(props.personId)}}
                >{props.firstname} {props.lastname}</div>
            </div>
        </div>
    )
}
export default UserDisplay