import React from "react"
import {connect} from "react-redux"
import UserDisplay from "../UserDisplay/UserDisplay" 

export default function IndividualPost (props) { 
    if (!props.postPhoto) {
        return (
            <div className="IndividualPostWrappingDiv">
                <div className="individualPost-UserDisplay">
                <UserDisplay 
                    profilePic={props.profilePic}
                    firstname={props.firstname} 
                    lastname={props.lastname}
                    username={props.username}
                    personId={props.personId}
                />
                </div>
                <div className="individualPost-photo-and-text-div">
                    <div className="individualPost-post-text-div-container">
                        <div className="individualPost-post-text-div">
                        {props.postText}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
                    <div className="IndividualPostWrappingDiv">
                        <div className="individualPost-UserDisplay">
                        <UserDisplay 
                            profilePic={props.profilePic}
                            firstname={props.firstname} 
                            lastname={props.lastname}
                            username={props.username}
                            personId={props.personId}
                        />
                        </div>
                        <div className="individualPost-photo-and-text-div">
                            <div className="individualPost-post-text-div-container">
                                <div className="individualPost-post-text-div">
                                {props.postText}
                                </div>
                            </div>
                            <img 
                                className="post-photo"
                                src={props.postPhoto}
                                alt="post-related"
                                width="350px"
                                height="450px"
                            />
                        </div>
                    </div>
                )
    }
}