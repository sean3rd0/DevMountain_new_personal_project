import React from "react"
import {Link} from "react-router-dom"

const UserDisplay = (props) => {
    return (
        <div>
            <div>
                <img 
                    className="profile-pic" 
                    onClick={() => {props.handleUserDisplayClick(props.personId)}}
                    src={props.profilePic}
                    alt="A beautiful person."
                />
            </div>
            <div>
                <div 
                    onClick={() => {props.handleUserDisplayClick(props.personId)}}
                >{props.firstname} {props.lastname}</div>
                <div
                    onClick={() => {props.handleUserDisplayClick(props.personId)}}
                >{props.username}</div>
            </div>
        </div>
    )
}
export default UserDisplay