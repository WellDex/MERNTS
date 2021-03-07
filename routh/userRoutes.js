const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../modules/User')
const auth = require('../middleware/authMiddleware')
const router = Router()
const mongoose = require('mongoose')

//  /api/user/
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)

        res.json(user)

    } catch (e) {
        res.status(500).json({message: 'myServer error ' + e})
    }
})

//  /api/user/all
router.get('/all', auth, async (req, res) => {
    try {
        const users = await User.find({})
        const newUser = users.filter((u) => String(u._id) !== req.user.userId)

        res.json(newUser)

    } catch (e) {
        res.status(500).json({message: 'myServer error ' + e})
    }
})

//  /api/user/update
router.post(
    '/update',
    auth,
    [
        check('name', 'Минимальное количество 4 символа')
            .isLength({min: 4, max: 24}),
        check('lastName', 'Минимальное количество 4 символа')
            .isLength({min: 4, max: 24}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при изминении профиля'
                })
            }

            const {name, lastName, password} = req.body


            const user = await User.findById(req.user.userId)

            user.name = name
            user.lastName = lastName
            user.password = password

            await user.save()

            res.status(201).json({message: 'Профиль обновлен'})

        } catch (e) {
            res.status(500).json({message: 'myServer error ' + e})
        }
    }
)

//  /api/user/updatePassword
router.post(
    '/updatePassword',
    auth,
    [
        check('password', 'Минимальная длина пароля 6 символов, максимальна - 24').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при изминении профиля'
                })
            }

            const {password} = req.body


            const user = await User.findById(req.user.userId)

            user.password = await bcrypt.hash(password, 12)

            await user.save()

            res.status(201).json({message: 'Профиль обновлен'})

        } catch (e) {
            res.status(500).json({message: 'myServer error ' + e})
        }
    }
)

//  /api/user/delete
router.delete('/delete', auth, async (req, res) => {
    try {
        const id = req.body.id || req.user.userId

        const user = await User.findById(id)

        await user.delete()

        res.status(201).json({message: 'Пользователь удален'})

    } catch (e) {
        res.status(500).json({message: 'myServer error ' + e})
    }
})

//  /api/user/changeStatus
router.post('/changeStatus', async (req, res) => {
    try {
        const user = await User.findById(req.body.id)

        user.status = !user.status

        await user.save()

        res.status(201).json({message: 'Статус изменен'})

    } catch (e) {
        res.status(500).json({message: 'myServer error ' + e})
    }
})

module.exports = router