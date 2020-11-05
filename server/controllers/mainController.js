module.exports = {
    submitPost: async (req, res) => {
        const db = req.app.get('db')
        const {personId, pageId, postText, postPhoto} = req.body

        let newPost = await db.submit_post({personId, pageId, postText, postPhoto})
        newPost = newPost[0]

        res.status(200).send(newPost)
    },

    getCurrentUser: async (req, res) => {
        const db = req.app.get('db')
        const {personid} = req.params

        let currentUser = await db.get_current_user({personId: personid})
        currentUser = currentUser[0]

        res.status(200).send(currentUser)
    }, 

    getCurrentPage: async (req, res) => {
        const db = req.app.get('db')
        const {personid, pageid} = req.params 

        let pageId = pageid
        let doesThisPageHavePosts = await db.check_page_for_posts({pageId})
        
        if (!doesThisPageHavePosts[0]) {
            let currentPageWhichDoesNotHaveAnyPosts = await db.get_current_page_which_does_not_have_any_posts({pageId})
            
            // currentPageWhichDoesNotHaveAnyPosts = currentPageWhichDoesNotHaveAnyPosts[0]
            console.log("whichDoesNot: ", currentPageWhichDoesNotHaveAnyPosts)
            res.status(200).send(currentPageWhichDoesNotHaveAnyPosts)
        } else {
            let currentPageAndItsTenMostRecentPosts = await db.get_current_page({
                personId: personid, 
                pageId: pageid
            })
            console.log("andItsTen: ", currentPageAndItsTenMostRecentPosts)
            res.status(200).send(currentPageAndItsTenMostRecentPosts)
        }
        
    }, 

    // *
    // *
    // * 
    // * 
    // * 
    // * 
    // *
    // *
        displayFriends: async (req, res) => {
            const db = req.app.get('db')
            const {searchParameterFromInput} = req.params 
            console.log('this is searchParameterFromInput: ', searchParameterFromInput)
        
        if (searchParameterFromInput === undefined) {
            let firstTenResultsOfFriends = await db.get_first_ten_friends({searchParameterFromInput: "%"})
            console.log('mainCtrl.js displayFriends firstTenResultsOfFriends: ', firstTenResultsOfFriends)

            // let checkIfFollowing = await

            res.status(200).send(firstTenResultsOfFriends)
        } else {
            let firstTenResultsOfFriendsFromSearch = await db.get_first_ten_friends({searchParameterFromInput})
            console.log('mainCtrl.js displayFriends firstTenResultsOfFriendsFromSearch: ', firstTenResultsOfFriendsFromSearch)
            res.status(200).send(firstTenResultsOfFriendsFromSearch)
        }
        // res.status(200).send('HEY HEY HEY this was the searchParemeter on mainCtrl: ', searchParameterFromInput)
    },
    // *
    // *
    // * 
    // * 
    // * 
    // *     

    followingOrNotFollowing: async (req, res) => {
        const db = req.app.get('db') 
        const {userPersonId, individualFriendPersonId} = req.params 

        isTheCurrentUserFollowingThisPerson = await db.is_the_current_user_following_this_person({userPersonId: userPersonId, individualFriendPersonId: individualFriendPersonId})
        isTheCurrentUserFollowingThisPerson = isTheCurrentUserFollowingThisPerson[0] 

        console.log('THIS IS isTheCurrentUserFollowingThisPerson: ', isTheCurrentUserFollowingThisPerson)
        if(isTheCurrentUserFollowingThisPerson){
            res.status(200).send(isTheCurrentUserFollowingThisPerson)
        } else {
            isTheCurrentUserFollowingThisPerson = "User is not following this person"
            console.log('THIS IS isTheCurrentUserFollowingThisPerson: ', isTheCurrentUserFollowingThisPerson)
            res.status(200).send(isTheCurrentUserFollowingThisPerson)
        }
    }, 

    getFeed: async (req, res) => {
        const db = req.app.get('db')

        let tenMostRecentFeedPosts = await db.get_ten_most_recent_feed_posts() 
        console.log('this is tenMostRecentFeedPosts: ', tenMostRecentFeedPosts)

        res.status(200).send(tenMostRecentFeedPosts)
    }, 

    getClickedPersonsLandingPage: async (req, res) => {
        const db = req.app.get('db') 
        const {personid} = req.params 

        let personId = personid 

        let clickedPersonsLandingPageId = await db.get_page_id({personId})
        clickedPersonsLandingPageId = clickedPersonsLandingPageId[0]

        res.status(200).send(clickedPersonsLandingPageId)
    },

    editPersonalSettings: async (req, res) => {
        const db = req.app.get('db')
        const {personid} = req.params 
        const person_id = personid
        const {firstname, lastname, profilePic} = req.body 

        // let individualPersonalSettingToEdit = ""

        if (firstname != undefined) {
            let individualPersonalSettingToEdit = `${firstname}` 
            let editedIndividualPersonalSetting = await db.edit_firstname_setting({person_id, individualPersonalSettingToEdit}); 
            res.status(200).send(editedIndividualPersonalSetting)
        } 
        else if (lastname != undefined) {
            let individualPersonalSettingToEdit = `${lastname}` 
            let editedIndividualPersonalSetting = await db.edit_lastname_setting({person_id, individualPersonalSettingToEdit}); 
            res.status(200).send(editedIndividualPersonalSetting)
        } 
        else if (profilePic != undefined) {
            let individualPersonalSettingToEdit = `${profilePic}`
            let editedIndividualPersonalSetting = await db.edit_profile_pic_setting({person_id, individualPersonalSettingToEdit}); 
            res.status(200).send(editedIndividualPersonalSetting)
        }
        else {
            res.status(412).send('Input fields must BEGIN with and CONTAIN at least one letter (A-Z or a-z). ')
        } 


        //I think I need to do the things below within the above^ if-statement block of code. 

        // console.log('this is individPersonalSettingToEdit', individualPersonalSettingToEdit)

        // editedIndividualPersonalSetting = await db.

        // res.status(200).send('this is individualPersonalSettingToEdit', individualPersonalSettingToEdit)
    }

}