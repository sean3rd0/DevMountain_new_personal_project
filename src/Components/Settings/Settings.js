import React from "react"
import Nav from "../Nav/Nav"
import axios from "axios"
import "./Settings.css"
import {connect} from "react-redux" 
import {updateUserOnReduxState} from "../../ducks/reducers/reducer"

class Settings extends React.Component {
    constructor(){
        super() 
        
        this.state = {
            editFirstnameInput: "", 
            editFirstnameButton: false, 

            editLastnameInput: "", 
            editLastnameButton: false, 

            editProfilePicInput: "", 
            editProfilePicButton: false 
        }
    }
    
    
    handleEditInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }




    //I was going to do it this way but I don't have enough time 
    //to figure out how to make the correct axios request based on 
    //which input the clicked button was next to. 
    //Maybe I can figure that out later 
    //but right now I just need to get this done. 

    // handleEditSubmitButtonClick = (event, valueOfEditedInputOnState) => { 
    //     this.state[[event.target.name]] === false ? 
    //     this.setState({
    //         [event.target.name]: true
    //     }) 
    //     : 
    //     {

    //     }
    // }

    handleEditSubmitFirstnameButtonClick = () => {
        console.log('this is how this.state.editFirst... is received: ', this.state.editFirstnameInput)
        this.state.editFirstnameButton ? 
        // console.log('this is editFirstnameInputOnState: ', editFirstnameInputOnState) 
            this.state.editFirstnameInput ?
            axios.put(`/api/personid/${this.props.match.params.personid}/settings`, {
                firstname: this.state.editFirstnameInput
            })
            .then(response => {
                console.log('this is the response from the handleeditsubmitfirstnamebuttonclick: ', response)
                this.setState({
                    editFirstnameInput: "", 
                    editFirstnameButton: false
                })
            }) 
            : 
            alert('You must type something in order to submit :)')
        :
        this.setState({
            editFirstnameButton: true
        })
    }





    render(){ 
        let firstname = "(no first name)"
        if (this.props.user.firstname == true) (firstname = this.props.user.firstname);

        let lastname = "(no last name)"
        if (this.props.user.lastname == true) (lastname = this.props.user.lastname);

        let profilePic = "(no profile picture)"
        if (this.props.user.profilePic == true) (profilePic = this.props.user.profilePic); 
        
        return (
            <div>
                <Nav 
                    history={this.props.history}
                /> 
                <h3 className="settings-title">
                    Settings
                </h3>
                <div className="settings-list-container">
                    <div className="individual-settings-containers">
                        <text>Username: {this.props.user.username}</text>
                    </div>
                    <div className="individual-settings-containers">
                        <text>First Name: 
                            <text className="individual-setting-text">
                                {
                                    this.state.editFirstnameButton === false ? 
                                    firstname 
                                    : 
                                    <input 
                                        name="editFirstnameInput"
                                        onChange={event => this.handleEditInputChange(event)}
                                    />
                                }
                            </text>
                        </text>
                        <button 
                            name="editFirstnameButton"
                            className="edit-button" 
                            // onClick={event => this.handleEditSubmitButtonClick(event, this.state.editFirstnameInput)}
                            onClick={this.handleEditSubmitFirstnameButtonClick}
                        >
                            {
                                this.state.editFirstnameButton === false ? 
                                `Edit` 
                                :
                                `Submit`
                            }
                        </button>
                    </div>
                    <div className="individual-settings-containers">
                        <text>Last Name: 
                            <text className="individual-setting-text">
                                {
                                    this.state.editLastnameButton === false ? 
                                    lastname 
                                    : 
                                    <input 
                                        name="editLastnameInput"
                                        onChange={event => this.handleEditInputChange(event)}
                                    />
                                }
                            </text>
                        </text>
                        <button 
                            name="editLastnameButton"
                            className="edit-button" 
                            // onClick={event => this.handleEditSubmitButtonClick(event, this.state.editLastnameInput)}
                            onClick={() => console.log(`You haven't set up the Lastname or ProfilePic buttons' onClick events yet. `)}
                        >
                            {
                                this.state.editLastnameButton === false ? 
                                `Edit` 
                                :
                                `Submit`
                            }
                        </button>
                    </div>
                    <div className="individual-settings-containers">
                        <text>Profile Picture: 
                            <text className="individual-setting-text">
                                {
                                    this.state.editProfilePicButton === false ? 
                                    profilePic 
                                    : 
                                    <input
                                        name="editProfilePicInput"
                                        onChange={event => this.handleEditInputChange(event)}
                                    />
                                }
                            </text>
                        </text>
                        <button 
                            name="editProfilePicButton"
                            className="edit-button" 
                            // onClick={event => this.handleEditSubmitButtonClick(event, editProfilePicInput)}
                            onClick={() => console.log(`You haven't set up the Lastname or ProfilePic buttons' onClick events yet. `)}
                        >
                            {
                                this.state.editProfilePicButton === false ? 
                                `Edit` 
                                :
                                `Submit`
                            }
                        </button>
                    </div>
                </div> 
            </div>
        )
    }
} 

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.reducer.user
    }
} 

const mapDispatchToProps = {
    updateUserOnReduxState: updateUserOnReduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)