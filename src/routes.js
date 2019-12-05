import React from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import ProfilePage from "./Components/ProfilePage/ProfilePage"

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:username/pages/:pagetitle" component={ProfilePage} />
    </Switch>
)