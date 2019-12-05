const bcrypt = require('bcryptjs')

module.exports = {
    createAccount: async (req, res) => {
        let db = req.app.get('db')
        let {username, password, confirmPassword} = req.body

        let username_already_exists = await db.check_username({username})
        username_already_exists = username_already_exists[0]

        if (username_already_exists) {
            res.status(409).send("Someone is already using this username. If it's you, click login instead :)")
        } else {
            if (password = confirmPassword) {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt)

                let newlyCreatedAccount = await db.create_account({username, password: hash})
                newlyCreatedAccount = newlyCreatedAccount[0]

                let usersFirstPage = await db.create_first_page({
                    personId: newlyCreatedAccount.person_id, 
                    pageTitle: `Default Page Title`
                })
                usersFirstPage = usersFirstPage[0]

                req.session.user = {...newlyCreatedAccount}

                const {user} = req.session

                res.status(200).send({user, usersFirstPage})
            } else {
                res.status(401).send(`The passwords didn't match; please type them in again.`)
            }
        }
    }
}