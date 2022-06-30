import db from '../../../lib/db'

export default function(req,res) {
    if (req.method !== 'GET') res.status(405).end()

    db('posts').then(posts => {
        res.status(200).json({
            message: 'Post success rendered',
            data: posts
        })
    })
}