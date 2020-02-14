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

    editPersonalSettings: async (req, res) => {
        const db = req.app.get('db')
        const {personid} = req.params 
        const person_id = personid
        const {firstname, lastname, profilePic} = req.body 

        // let individualPersonalSettingToEdit = ""

        if (firstname != undefined) {
            let individualPersonalSettingToEdit = firstname 
            let editedIndividualPersonalSetting = await db.edit_personal_setting({person_id, columnToUpdate: `firstname`, individualPersonalSettingToEdit}); 
            res.status(200).send(editedIndividualPersonalSetting)
        } 
        else if (lastname != undefined) {
            let individualPersonalSettingToEdit = lastname 
            let editedIndividualPersonalSetting = await db.edit_personal_setting({person_id, columnToUpdate: `lastname`, individualPersonalSettingToEdit}); 
            res.status(200).send(editedIndividualPersonalSetting)
        } 
        else if (profilePic != undefined) {
            let individualPersonalSettingToEdit = profilePic 
            console.log('person_id and individualPersonalSettingToUpdate: ', person_id, individualPersonalSettingToEdit)
            let editedIndividualPersonalSetting = await db.edit_personal_setting({person_id, columnToUpdate: `profile_pic`, individualPersonalSettingToEdit}); 
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