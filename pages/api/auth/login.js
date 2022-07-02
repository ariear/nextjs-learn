import db from '../../../lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default function Login(req,res){
    if (req.method !== 'POST') return res.status(405).end()

    const {email,password} = req.body

    db('users').where({email}).first().then(user => {
        if (!user) return res.status(401).end()

        bcrypt.compare(password,user.password).then(isPassword => {
            if (!isPassword) return res.status(401).end()
            
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, process.env.SECRET_OR_PUBLIC_KEY,{
                expiresIn: '7d'
            })

            res.status(200).json({
                message: 'Login succesfully',
                token
            })
        })

    })
}