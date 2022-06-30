import db from '../../../lib/db'

export default function (req,res) {
    if (req.method !== 'POST') return res.status(405).end()

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