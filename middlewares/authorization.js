import jwt from 'jsonwebtoken'

export default function authorization(req,res){
    const {authorization} = req.headers
    if (!authorization) return res.status(401).end()

    const authSplit = authorization.split(' ')
    const [tokenType, tokenValue] = [authSplit[0], authSplit[1]]

    if (tokenType !== 'Bearer') return res.status(401).end()

    try {
        return jwt.verify(tokenValue, process.env.SECRET_OR_PUBLIC_KEY)
    } catch (error) {
        return res.status(401).end()
    }
} 