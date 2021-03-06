import React, { useState } from 'react'
import { authPage } from '../../middlewares/authorizationpage'
import axios from 'axios'
import Router from 'next/router'

export const getServerSideProps = async (ctx) => {
    const token = authPage(ctx)

    return {
        props: {
            token
    }}
}

const CreatePost = (props) => {
    const [fields,setFields] = useState({
        title: '',
        content: ''
    })

    const addPostHandler = async (event) => {
        event.preventDefault();
        
        await axios.post('/api/posts/create', fields,{
            headers:{
                Authorization: 'Bearer ' + props.token
            }
        })
        
        Router.push('/posts')
    }

    return (
        <div>
            <p className='text-xl font-semibold'>Add Post</p>
            <form onSubmit={addPostHandler} >
                <div className='flex flex-col justify-center w-[400px] m-5' >
                    <input type="text" value={fields.title} onChange={(e) => setFields({...fields, title: e.target.value}) } placeholder='title' className='py-2 px-3 rounded-md border mb-3' />
                    <textarea cols="30" value={fields.content} onChange={(e) => setFields({...fields, content: e.target.value}) } rows="10" placeholder='content' className='py-2 px-3 rounded-md border mb-3' ></textarea>
                    <button className='py-2 px-5 rounded-md bg-blue-400 text-white'>Tambah</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost