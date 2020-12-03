import React from "react"
import Nav from "../Nav/Nav"
import axios from "axios"
import "./Settings.css"
import {connect} from "react-redux" 
import {updateUserOnReduxState/*, getReduxState*/} from "../../ducks/reducers/reducer"

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

    componentDidMount = () => {
        axios
            .get(`/api/personid/${this.props.match.params.personid}`)
            .then(response => {
                this.props.updateUserOnReduxState(response.data)
            })
            .catch(err => {
                console.log('this is the error that came back from the ProfilePage componentDidMount OUTER axios.get request: ', err)
            })
    }

    componentDidUpdate = () => {
        axios
            .get(`/api/personid/${this.props.match.params.personid}`)
            .then(response => {
                this.props.updateUserOnReduxState(response.data)
            })
            .catch(err => {
                console.log('this is the error that came back from the ProfilePage componentDidMount OUTER axios.get request: ', err)
            })
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
        !this.state.editFirstnameButton ? 
            this.setState({
                editFirstnameButton: true
            }) 
        : 
        !this.state.editFirstnameInput ? 
            alert('You must type something in order to submit :)') 
        : 
        this.state.editFirstnameInput.match(/^[A-Za-z]+$/) ? 
            axios
                .put(`/api/personid/${this.props.match.params.personid}/settings`, {
                    firstname: this.state.editFirstnameInput
                })
                .then(response => {
                    this.setState({
                        editFirstnameInput: "", 
                        editFirstnameButton: false
                    })
                }) 
                .catch(err => {
                    console.log('SETTINGS.JS 90 this is the error that came back from the axios request in the Settings.js handleEditSubmitFirstnameButtonClick function: ', err)
                })
        : 
        alert('Names must BEGIN with and CONTAIN at least one letter (A-Z or a-z). ')
    }

    handleEditSubmitLastnameButtonClick = () => {
        !this.state.editLastnameButton ? 
            this.setState({
                editLastnameButton: true
            }) 
        : 
        !this.state.editLastnameInput ? 
            alert('You must type something in order to submit :)') 
        : 
        this.state.editLastnameInput.match(/^[A-Za-z]+$/) ? 
            axios
                .put(`/api/personid/${this.props.match.params.personid}/settings`, {
                    lastname: this.state.editLastnameInput
                })
                .then(response => {
                    this.setState({
                        editLastnameInput: "", 
                        editLastnameButton: false
                    })
                }) 
                .catch(err => {
                    console.log('this is the error that came back from the axios request in the Settings.js handleEditSubmitLastnameButtonClick function: ', err)
                })
        : 
        alert('Names must BEGIN with and CONTAIN at least one letter (A-Z or a-z). ')
    }

        handleEditSubmitProfilePicButtonClick = () => {
            let validURL = function (str) {
                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                return !!pattern.test(str);
            }
            !this.state.editProfilePicButton ? 
                this.setState({
                    editProfilePicButton: true
                })
            : 
                !this.state.editProfilePicInput ? 
                    alert('You must type something in order to submit :)') 
                : 
                    !validURL(this.state.editProfilePicInput) ? 
                        alert('The input accepts a photo URL. ')
                        // this.state.editProfilePicInput.
                    : 
                        axios
                            .put(`/api/personid/${this.props.match.params.personid}/settings`, {
                                profilePic: this.state.editProfilePicInput
                            })
                            .then(response => {
                                this.setState({
                                    editLastnameInput: "", 
                                    editLastnameButton: false
                                })
                            }) 
                            .catch(err => {
                                console.log('this is the error from axios.put in the Settings.js handleEditSubmitProfilePicButtonClick function: ', err)
                            })
        } 

        




    render(){ 
        let firstname = "(no first name)"
        if (this.props.user.firstname) {firstname = this.props.user.firstname};

        let lastname = "(no last name)"
        if (this.props.user.lastname) {lastname = this.props.user.lastname};

        // let profilePic = "(no profile picture)"
        // if (this.props.user.profilePic) {profilePic = this.props.user.profilePic}; 
        
        return (
            <div>
                <Nav 
                    className="entire-nav-component"
                    history={this.props.history}
                /> 
                <h3 className="settings-title">
                    Settings
                </h3>
                <div className="settings-list-container">
                    <div className="individual-settings-containers">
                        <div>Username: {this.props.user.username}</div>
                    </div>
                    <div className="individual-settings-containers">
                        <div>First Name: 
                            <div className="individual-setting-div">
                                {
                                    this.state.editFirstnameButton === false ? 
                                    // console.log('firstname on settings.js 262: ', firstname)
                                    firstname 
                                    : 
                                    <input 
                                        name="editFirstnameInput"
                                        onChange={event => this.handleEditInputChange(event)}
                                    />
                                }
                            </div>
                        </div>
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
                        <div>Last Name: 
                            <div className="individual-setting-div">
                                {
                                    this.state.editLastnameButton === false ? 
                                    lastname 
                                    : 
                                    <input 
                                        name="editLastnameInput"
                                        onChange={event => this.handleEditInputChange(event)}
                                    />
                                }
                            </div>
                        </div>
                        <button 
                            name="editLastnameButton"
                            className="edit-button" 
                            // onClick={event => this.handleEditSubmitButtonClick(event, this.state.editLastnameInput)}
                            onClick={this.handleEditSubmitLastnameButtonClick}
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
                        <div>Profile Picture:</div>
                        {
                            this.state.editProfilePicButton === false ? 
                                <img 
                                className="individual-setting-div name-display-profile-picture" 
                                src={this.props.user.profilePic} 
                                alt='A beautiful person' 
                                />
                            : 
                                <input
                                    name="editProfilePicInput"
                                    onChange={event => this.handleEditInputChange(event)}
                                />
                        }
                        <button 
                            name="editProfilePicButton"
                            className="edit-button" 
                            // onClick={event => this.handleEditSubmitButtonClick(event, editProfilePicInput)}
                            onClick={this.handleEditSubmitProfilePicButtonClick}
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
    updateUserOnReduxState: updateUserOnReduxState/*, 
    getReduxState: getReduxState*/
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)