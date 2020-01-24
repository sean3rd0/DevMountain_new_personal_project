import React from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import ProfilePage from "./Components/ProfilePage/ProfilePage"
import Feed from "./Components/Feed/Feed"

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:personid/pages/:pageid" component={ProfilePage} />
        <Route path="/:personid/feed" component={Feed} />
    </Switch>
)