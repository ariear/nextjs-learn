import db from '../../../lib/db'
import authorization from '../../../middlewares/authorization'

export default function(req,res) {
    if (req.method !== 'GET') res.status(405).end()

    const auth = authorization(req,res)
    if (!auth.name) return res.status(401).end()
    
    db('posts').then(posts => {
        res.status(200).json({
            message: 'Post success rendered',
            data: posts
        })
    })
}