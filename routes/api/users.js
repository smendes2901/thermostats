const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../config/keys')
const passport = require('passport')
const { Notification } = require('../../utils/notifications')
//Load Input Validation...
const { validateRegisterInput } = require('../../validator/register')
const { validateLoginInput } = require('../../validator/login')

// Load user model...
const User = require('../../models/User')

router.post('/register', (req, res) => {

    validateRegisterInput(req.body).then(() => {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).json('A user with this email already exists')
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser
                            .save()
                            .then(user => {
                                return res.status(200).json(user)
                            })
                            .catch(err => {
                                return res.status(400).json(err.message)
                            })
                    })
                })
            }
        }).catch(err => {
            return res.status(400).json(err.message)
        })
    }).catch(err => {
        return res.status(400).json(err.message)
    })

})

router.post('/login', (req, res) => {

    validateLoginInput(req.body).then(() => {

        const email = req.body.email
        const password = req.body.password

        User.findOne({
            email
        }).then(user => {
            if (!user) {
                return res.status(401).json('email not found')
            }
            //check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //User matched.....
                    const payload = {
                        id: user.id,
                        name: user.name,
                    } // JWT Payload
                    //Sign Token....
                    jwt.sign(
                        payload,
                        key.secretOrKey, {
                        expiresIn: 3600
                    },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer  ' + token,
                            })
                        }
                    )
                } else {
                    return res.status(401).json('password is incorrect')
                }
            }).catch(err => {
                return res.status(401).json(err.message)
            })
        })
    }).catch(err => {
        return res.status(401).json(err.message)
    })
})

//@route : /api/users/current
//@desc: used for returning current logged in user
//@access: private
router.get(
    '/current',
    passport.authenticate('jwt', {
        session: true
    }),
    (req, res) => {
        res.json(req.user)
    }
)

//@route: /api/users/current_session
//@desc: used for general testing

module.exports = router