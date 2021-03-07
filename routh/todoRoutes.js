const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Todo = require('../modules/Todo')
const auth = require('../middleware/authMiddleware')
const router = Router()

//  /api/todo/create
router.post(
    '/create',
    auth,
    [
        check('name', 'Максимальное количество символов - 60')
            .isLength({max: 60}).isString(),
        check('description', 'Максимальное количество символов - 120')
            .isLength({max: 120}).isString()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при создании todo'
                })
            }

            const {name, description} = req.body

            const cand = await Todo.findOne({name})

            if (cand) {
                return res.json({todo: cand})
            }

            const todo = new Todo({name, description, owner: req.user.userId})

            await todo.save()

            res.status(201).json({message: 'Todo создан', todo}) // return data todo

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

//  /api/todo/
router.get('/', auth, async (req, res) => {
    try {
        const id = req.body.id || req.user.userId
        const todos = await Todo.find({owner: id})

        res.json(todos)

    } catch (e) {
        res.status(500).json({message: 'Server error ' + e})
    }
})

//  /api/todo/userTodo
router.post(
    '/userTodo',
    async (req, res) => {
        try {
            const todos = await Todo.find({owner: req.body.id})

            res.json(todos)

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

//  /api/todo/toogleCondition
router.post(
    '/toggleCondition',
    [
        check('id', 'Отсутствует id todo')
            .isLength({min: 1}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные todo'
                })
            }

            const {id} = req.body

            const todo = await Todo.findById(id)

            todo.isCondition = !todo.isCondition

            if (todo.isCondition) {
                todo.dateEx = new Date()
            } else {
                todo.dateEx = null
            }

            await todo.save()

            res.status(201).json({message: 'Todo обновлен', todo})

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

//  /api/todo/update
router.post(
    '/update',
    auth,
    [
        check('id', 'Отсутствует id todo')
            .isLength({min: 1}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные todo'
                })
            }

            const {id, name, description, isCondition, dateEx} = req.body

            const todo = await Todo.findById(id)

            todo.name = name
            todo.description = description
            todo.isCondition = isCondition
            todo.dateEx = dateEx

            await todo.save()

            res.status(201).json({message: 'Todo обновлен', todo})

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

//  /api/todo/delete
router.delete(
    '/delete',
    [
        check('id', 'Отсутствует id todo')
            .isLength({min: 1}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные todo'
                })
            }

            const {id} = req.body

            const todo = await Todo.findById(id)

            await todo.delete()

            res.status(201).json({message: 'Todo удален'})

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

//  /api/todo/deleteAll
router.delete(
    '/deleteAll',
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            await Todo.deleteMany(Todo.find({owner: req.user.userId}))

            res.status(201).json({message: 'Todo удалены'})

        } catch (e) {
            res.status(500).json({message: 'Server error ' + e})
        }
    }
)

module.exports = router