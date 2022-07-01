import db from '../../../lib/db'
import authorization from '../../../middlewares/authorization'

export default function (req,res) {
    if (req.method !== 'POST') return res.status(405).end()

    const auth = authorization(req,res)
    if (!auth.name) return res.status(401).end()
    
    const { title , content } = req.body

    db('posts').insert({
        title,
        content
    }).then(results => {
        db('posts').where('id', results).first().then(post => {
            res.status(200).json({
                message: 'Post created succesfully',
                data: post
            })
        })
    }).catch(err => console.log(err) )
}