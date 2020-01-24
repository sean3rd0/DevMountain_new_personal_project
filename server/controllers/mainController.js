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
        console.log('this is currentPageAndItsTenMostRecentPosts BEFORE getting it at index 0: ', currentPageAndItsTenMostRecentPosts)
        
        res.status(200).send(currentPageAndItsTenMostRecentPosts)
    }

}