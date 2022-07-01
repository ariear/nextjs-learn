import db from '../../../../lib/db'
import authorization from '../../../../middlewares/authorization'

export default function DeleteHandler(req,res){
    if (req.method !== 'DELETE' ) return res.status(405).send()

    const auth = authorization(req,res)
    if (!auth.name) return res.status(401).end()
    
    const {id} = req.query

    db('posts').where({id}).del().then(() => {
        res.status(200).json({
            message: 'Delete post successfully'
        })
    })
}