const bcrypt = require('bcryptjs')

module.exports = {
    createAccount: async (req, res) => {
        const db = req.app.get('db')
        const {username, password, confirmPassword} = req.body

        let newlyCreatedAccount = await db.create_account({username, password, confirmPassword})
    }
}