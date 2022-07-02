import db from "../../../../lib/db"
import authorization from "../../../../middlewares/authorization"

export default async function handlerdetail(req,res) {
    if (req.method !== 'GET') return res.status(405).end()

    const auth = authorization(req,res)
    if (!auth.name) return res.status(401).end()

    const {id} = req.query
    db('posts').where({id}).first().then(results => {
        res.status(200).json(results)
    })
}