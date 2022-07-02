import React, { useState } from 'react'
import axios from "axios"
import { authPage } from "../../middlewares/authorizationpage"
import Link from 'next/link'
import Nav from '../../components/Nav'

export const getServerSideProps = async (ctx) => {
    const token = authPage(ctx)
    
    const postReq = await axios.get('http://localhost:3000/api/posts', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return { props: {
        token,
        posts: postReq.data.data
    } }
}

const PostIndex = (props) => {
    const [posts,setPosts] = useState(props.posts)

    const deleteHandler = async (id) => {
        const ask = confirm('Yakin mau menghapus?')
        if (ask) {
            await axios.delete(`/api/posts/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })

            const filterPosts = posts.filter(post => post.id !== id )
            setPosts(filterPosts)
        }
    }

    return (
        <div>
            <Nav />
            <p className="text-3xl font-semibold">Post</p>
            <div className="flex flex-wrap p-8">
            {
                posts.map((post, index) => (
                        <div key={index} className="border-2 rounded-lg w-[300px] m-2 p-3" >
                            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                            <p className="mb-3">{post.content}</p>
                            <div>
                                <button className="py-2 px-6 bg-yellow-400 rounded font-medium mr-3"><Link href={`/posts/edit/${post.id}`}><a>Edit</a></Link></button>
                                <button className="py-2 px-6 bg-red-400 text-white rounded font-medium" onClick={() => deleteHandler(post.id)} >Delete</button>
                            </div>
                        </div>
                ))
            }
            </div>
        </div>
    )
}

export default PostIndex