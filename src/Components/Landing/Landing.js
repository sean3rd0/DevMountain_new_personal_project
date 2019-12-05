import React from "react"
import axios from "axios"
import {connect} from "react-redux"
import {updateUserOnReduxState, updateCurrentPageOnReduxState} from "../../ducks/reducers/reducer" 
import budrLogoPink from "../../budrLogoPink.png"
import style from "styled-components"

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
        axios.post(`/api/createAccount`, {username, password, confirmPassword})
        .then(response => {
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            this.props.updateUserOnReduxState(response.data.user)
            this.props.updateCurrentPageOnReduxState(response.data.usersFirstPage)
            this.props.history.push(`/${response.data.user.username}/pages/${response.data.usersFirstPage.page_title}`)
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

    render(){
        console.log('This is the inputs: ', this.state.usernameInput, this.state.passwordInput, this.state.confirmPasswordInput)
        const LinklikeBluediv = style.div`
            color: rgb(0, 132, 255);
        `
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
                        >Login</button>
                    </div>
                    <div className="mobile-flex">
                        <div>Haven't made an account yet? </div>
                        <LinklikeBluediv
                            onClick={() => {this.setState({createAccount: true})}}
                        >Create Account!</LinklikeBluediv>
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
                            value={this.state.usernameInput}
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
                            value={this.state.passwordInput}
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
                        <LinklikeBluediv
                            onClick={() => {this.setState({createAccount: false})}}
                        >Login!</LinklikeBluediv>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    updateUserOnReduxState: updateUserOnReduxState, 
    updateCurrentPageOnReduxState: updateCurrentPageOnReduxState
}

export default connect(null, mapDispatchToProps)(Landing)