import db from '../../../../lib/db'
import authorization from '../../../../middlewares/authorization'

export default function ProxyHandler(req,res) {
    if (req.method !== 'PUT') return res.status(405).end()

    const auth = authorization(req,res)
    if (!auth.name) return res.status(401).end()
    
    const {id} = req.query
    const {title,body} = req.body

    db('posts').where({id}).update({
        title,
        body
    }).then(results => {
        db('posts').where({id}).first().then(post => {
            res.status(200).json({
                message: 'Post success updated',
                data: post
            })
        })
    }).catch(err => console.log(err) )
}