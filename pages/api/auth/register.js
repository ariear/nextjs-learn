import db from '../../../lib/db'
import bcrypt from 'bcryptjs'

export default function Register(req,res){
    if (req.method !== 'POST') return res.status(405).end()

    const {name,email,password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    db('users').insert({
        name,
        email,
        password: passwordHash
    }).then(id => {
        res.status(200).json({
            message: 'Register successfully'
        })
    })

}