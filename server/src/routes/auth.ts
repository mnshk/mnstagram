import { Router } from 'express'
import { signup, passwordReset, login } from '../controllers/auth.js'

const router = Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/passwordReset', passwordReset)

export default router