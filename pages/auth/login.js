import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Cookie from 'js-cookie'
import { unauthPage } from '../../middlewares/authorizationpage'

export async function getServerSideProps(ctx){
    unauthPage(ctx)

    return {props: {}}
}

export default function Register() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [status,setStatus] = useState('normal')
    
    const loginHandler = (e) => {
        e.preventDefault();
        
        setStatus('loading')
        axios.post('/api/auth/login', fields).then(results => {
            if (results.status === 200) {
                setStatus('success')
                Cookie.set('token', results.data.token)

                Router.replace('/posts')
            }
        }).catch(err => console.log(err) )
    }

    return (
        <div>
            <p className="text-3xl">Login</p>

            <form onSubmit={ loginHandler } >
                <div className="flex flex-col w-[400px] justify-center mx-auto" >
                    <input type="email" value={fields.email} onChange={(e) => setFields({...fields, email: e.target.value})} placeholder="Email" className="py-2 px-3 rounded-md border mb-3" />
                    <input type="password" value={fields.password} onChange={(e) => setFields({...fields, password: e.target.value})} placeholder="Password" className="py-2 px-3 rounded-md border mb-3" />
                    <button className="py-2 px-6 rounded-lg bg-blue-400 font-medium text-white">Login</button>
                    <p className='font-medium'>Output : {status}</p>
                </div>
            </form>
        </div>
    )
}