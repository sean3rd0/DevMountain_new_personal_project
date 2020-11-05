const bcrypt = require('bcryptjs')

module.exports = {
    createAccount: async (req, res) => {
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount HIT)
        let db = req.app.get('db')
        let {username, password, confirmPassword, profilePic} = req.body
        let profile_pic = profilePic

        let usernameAlreadyExists = await db.check_username({username}) 
        // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount usernameAlreadyExists, and at index 0: ', usernameAlreadyExists, usernameAlreadyExists[0])
        usernameAlreadyExists = usernameAlreadyExists[0]

        if (usernameAlreadyExists) {
            res.status(409).send("Someone is already using this username. If it's you, click login instead :)")
        } else {
            if (password = confirmPassword) {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt)

                let newlyCreatedAccount = await db.create_account({username, password: hash, profile_pic})
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount newlyCreatedAccount, and at index 0: ', newlyCreatedAccount, newlyCreatedAccount[0])
                newlyCreatedAccount = newlyCreatedAccount[0]

                let usersFirstPage = await db.create_first_page({
                    personId: newlyCreatedAccount.person_id, 
                    pageTitle: `Default Page Title`
                }) 
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount usersFirstPage, and at index 0: ', usersFirstPage, usersFirstPage[0])
                usersFirstPage = usersFirstPage[0]

                req.session.user = {...newlyCreatedAccount}
                req.session.landingPage = usersFirstPage
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount req.session.user: ', req.session.user)
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount req.session.landingPage: ', req.session.landingPage)

                const {user} = req.session

                res.status(200).send({user, usersFirstPage})
            } else {
                res.status(401).send(`The passwords didn't match; please type them in again. `)
            }
        }
    }, 

    login: async (req, res) => { 
        // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js createAccount HIT)
        let db = req.app.get('db')
        let {username, password} = req.body 
        // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO authCtrl.js login username & password from the req.body: ', username, password)
        
        let usernameAlreadyExists = await db.check_username({username})
        usernameAlreadyExists = usernameAlreadyExists[0] 
        // usernameAlreadyExists should now be an object, like this: { username: 'Greg' }

        if(!usernameAlreadyExists){
            res.status(401).send(`There is no profile with this username. `)
        } else { 
            let userCredentials = await db.get_user_credentials({username}) 
            userCredentials = userCredentials[0] 
            // console.log('this is userCredentials, which you can use to get the users ID to use in the check_for_posts_on_landing_page function: ', userCredentials)

            const authenticated = bcrypt.compareSync(password, userCredentials.password) 

            if (authenticated) {
                delete userCredentials.password 

                let {person_id} = userCredentials 

                let landingPageHasPosts = await db.check_for_posts_on_landing_page({person_id}) 
                //this function^ is to make sure there are posts, so that if there are you can do the normal get_landing_page function
                //and if there arent, you can INSTEAD do another function so that the return doesn't come up as an empty array. 

                landingPageHasPosts = landingPageHasPosts[0] 
                //if landingPageHasPosts is truthy, it now looks like this: {post_id: 57}

                if (landingPageHasPosts) { 
                    let landingPageInfo = await db.get_landing_page_and_posts({person_id}) 
                    console.log('authCtrl.js login landingPageInfo, and at index 0: ', landingPageInfo, landingPageInfo[0])
                    landingPageInfo = landingPageInfo

                    req.session.user = userCredentials //see other budr authCtrl login code... you also respond with the user's landing page... 
                    req.session.landingPage = landingPageInfo
                    console.log('authCtrl.js login req.session.landingPage: ', req.session.landingPage)
    
                    res.status(200).send({user: req.session.user, landingPage: req.session.landingPage})
                } else {
                    let landingPageInfo = await db.get_landing_page_only({person_id})
                    console.log('authCtrl.js login landingPageInfo: ', landingPageInfo)
    
                    req.session.user = userCredentials //see other budr authCtrl login code... you also respond with the user's landing page... 
                    req.session.landingPage = landingPageInfo
                    console.log('authCtrl.js login req.session.user: ', req.session.user)
                    console.log('authCtrl.js login req.session.landingPage: ', req.session.landingPage)
    
                    res.status(200).send({user: req.session.user, landingPage: req.session.landingPage})
                }
            } else {
                res.status(401).send(`Password is incorrect. `)
            }
        }
    }, 

    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send('The user has now been logged out. ')
    }
}