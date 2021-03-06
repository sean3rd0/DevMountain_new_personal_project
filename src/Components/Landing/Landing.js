import React from "react"
import axios from "axios"
import {connect} from "react-redux"
import {updateUserOnReduxState, updateCurrentPageOnReduxState, updatePostsOnCurrentPageOnReduxState} from "../../ducks/reducers/reducer" 
import budrLogoPink from "../../budrLogoPink.png"

class Landing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            createAccount: false, 
            usernameInput: "", 
            passwordInput: "", 
            confirmPasswordInput: ""
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreate = (username, password, confirmPassword) => { 
        let profilePic = 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
        axios.post(`/api/createAccount`, {username, password, confirmPassword, profilePic})
        .then(response => { 
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            }) 
            this.props.updateUserOnReduxState(response.data.user)
            this.props.updateCurrentPageOnReduxState(response.data.usersFirstPage)
            this.props.history.push(`/${response.data.user.person_id}/pages/${response.data.usersFirstPage.page_id}`)
        })
        .catch(err => {
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            console.log('This is the error that came instead of a response from the axios request in the handleCreate function on Landing.js: ', err)
        })
    } 

    handleLogin = (username, password) => { 
        axios.post(`/api/login`, {username, password})
        .then(response => {
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            this.props.updateUserOnReduxState(response.data.user)
            this.props.updateCurrentPageOnReduxState(response.data.landingPage[0]) 
            // if (response.data.landingPage[0].post_id) {
                this.props.updatePostsOnCurrentPageOnReduxState(response.data.landingPage)
            // }
            this.props.history.push(`/${response.data.user.person_id}/pages/${response.data.landingPage[0].page_id}`)
        })
        .catch(err => {
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            console.log('This is the error that came instead of a response from the axios request in the handleLogin function on Landing.js: ', err)
        })
    }

    render(){
        if (!this.state.createAccount){
            return(
                <div className="landing-component-wrapping-div">
                    <img 
                        className="landing-component-budr-logo"
                        src={budrLogoPink}
                        alt="budr--there's a lot more to you."
                        height="300"
                        width="219"
                    /> 
                    <div className="flex-it">
                        <input 
                            className="inputs"
                            onChange={event => this.handleInputChange(event)}
                            name="usernameInput"
                            placeholder="JaneDoe1492"
                        />
                        <div>Username</div>
                    </div>
                    <div className="flex-it">
                        <input 
                            className="inputs"
                            onChange={event => this.handleInputChange(event)}
                            name="passwordInput"
                            placeholder="3x@mplPassw0rd"
                            type="password"
                        />
                        <div>Password</div>
                    </div>
                    <div>
                        <button 
                            className="bottom-margin" 
                            onClick={() => this.handleLogin(this.state.usernameInput, this.state.passwordInput)}
                        >Login</button>
                    </div>
                    <div className="mobile-flex">
                        <div>Haven't made an account yet? </div>
                        <div
                            className="link-like-blue-div"
                            onClick={() => {this.setState({createAccount: true})}}
                        >Create Account!</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="landing-component-wrapping-div">
                    <img 
                        className="landing-component-budr-logo"
                        src={budrLogoPink}
                        alt="budr--there's a lot more to you."
                        height="300"
                        width="219"
                    /> 
                    <div className="flex-it">
                        <input 
                            className="inputs"
                            onChange={event => this.handleInputChange(event)}
                            name="usernameInput"
                            placeholder="JaneDoe1492"
                        />
                        <div>Username</div>
                    </div>
                    <div className="flex-it">
                        <input 
                            className="inputs"
                            onChange={event => this.handleInputChange(event)}
                            name="passwordInput"
                            placeholder="3x@mplPassw0rd"
                            type="password"
                        />
                        <div>Password</div>
                    </div>
                    <div className="flex-it">
                        <input 
                            className="inputs"
                            onChange={event => this.handleInputChange(event)}
                            name="confirmPasswordInput"
                            placeholder="3x@mplPassw0rd"
                            type="password"
                            value={this.state.confirmPasswordInput}
                        />
                        <div>Confirm Password</div>
                    </div>
                    <div>
                        <button 
                            className="bottom-margin"
                            onClick={() => {this.handleCreate(this.state.usernameInput, this.state.passwordInput, this.state.confirmPasswordInput)}}
                        >Create</button>
                    </div>
                    <div className="mobile-flex">
                        <div>Already have an account? </div>
                        <div
                            className="link-like-blue-div"
                            onClick={() => {this.setState({createAccount: false})}}
                        >Login!</div>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    updateUserOnReduxState: updateUserOnReduxState, 
    updateCurrentPageOnReduxState: updateCurrentPageOnReduxState, 
    updatePostsOnCurrentPageOnReduxState: updatePostsOnCurrentPageOnReduxState
}

export default connect(null, mapDispatchToProps)(Landing)