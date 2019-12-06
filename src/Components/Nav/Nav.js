import React from "react"
import "./Nav.css"
import {Link} from "react-router-dom"

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            leftDropdown: false, 
            rightDropdown: false
        }
    }

    render(){
        return (
            <nav className="row zOne">
                <div>
                    <div 
                        className="hamburger-menu"
                        onClick={() => this.setState({leftDropdown: !this.state.leftDropdown})}
                    >&#9776;</div>
                    <div className={this.state.leftDropdown ? "show-dropdown flex-it" : "hide-dropdown"}>
                        <Link 
                            className="plain-text"
                            to="/friends"
                        >Friends</Link>
                    </div>
                </div>
                <div>
                    <Link to="/feed"><div className="Nav-component-feed-link, link-like-blue-div">Feed</div></Link>
                </div>
                <div>
                    <div 
                        className="hamburger-menu"
                        onClick={() => this.setState({rightDropdown: !this.state.rightDropdown})}
                    >&#9776;</div>
                    <div 
                        className={this.state.rightDropdown ? "show-right-dropdown flex-it" : "hide-dropdown"}
                    >
                        <div>
                            <Link 
                                className="plain-text"
                                to={`/${this.props.personId}/pages/${this.props.pageId}`}
                            >View My Profile</Link>
                        </div>
                        <div>
                            <Link 
                                className="plain-text"
                                to="/settings"
                            >Settings</Link>
                        </div>
                        <div>
                            <Link 
                                className="plain-text"
                                to={`/`}
                            >Logout</Link>   
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav