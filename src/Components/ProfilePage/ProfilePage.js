import React from "react"
import axios from "axios"
import {connect} from "react-redux"

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftDropdown: false, 
            rightDropdown: false
        }
    }

    render(){
        return (
            <div>
                ProfilePage
            </div>
        )
    }
}

// const mapStateToProps = (reduxState) => {

// }

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

export default ProfilePage