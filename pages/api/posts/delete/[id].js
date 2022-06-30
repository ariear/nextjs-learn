import db from '../../../../lib/db'

export default function DeleteHandler(req,res){
    if (req.method !== 'DELETE' ) return res.status(405).send()

    const {id} = req.query

    db('posts').where({id}).del().then(() => {
        res.status(200).json({
            message: 'Delete post successfully'
        })
    })
}