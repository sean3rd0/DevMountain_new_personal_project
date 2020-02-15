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
        
        let currentPageAndItsTenMostRecentPosts = await db.get_current_page({personId: personid})
        // console.log('this is currentPageAndItsTenMostRecentPosts BEFORE getting it at index 0: ', currentPageAndItsTenMostRecentPosts)
        
        res.status(200).send(currentPageAndItsTenMostRecentPosts)
    }, 

    getFeed: async (req, res) => {
        const db = req.app.get('db')

        let tenMostRecentFeedPosts = await db.get_ten_most_recent_feed_posts() 
        console.log('this is tenMostRecentFeedPosts: ', tenMostRecentFeedPosts)

        res.status(200).send(tenMostRecentFeedPosts)
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