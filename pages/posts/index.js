import axios from "axios"
import { authPage } from "../../middlewares/authorizationpage"

export const getServerSideProps = async (ctx) => {
    const token = authPage(ctx)
    
    const postReq = await axios.get('http://localhost:3000/api/posts', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return { props: {
        posts: postReq.data.data
    } }
}

const PostIndex = (props) => {

    return (
        <div>
            <p className="text-3xl font-semibold">Post</p>
            {
                props.posts.map((post, index) => (
                        <div key={index} >
                            <p>{post.title}</p>
                        </div>
                ))
            }
        </div>
    )
}

export default PostIndex