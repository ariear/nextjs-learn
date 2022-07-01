import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [status,setStatus] = useState('normal')
    
    const registerHandle = (e) => {
        e.preventDefault();
        
        setStatus('loading')
        axios.post('/api/auth/register', fields).then(results => {
            if (results.status === 200) {
                setStatus('success')
                console.log(results);
            }
        }).catch(err => console.log(err) )
    }

    return (
        <div>
            <p className="text-3xl">Register</p>

            <form onSubmit={ registerHandle } >
                <div className="flex flex-col w-[400px] justify-center mx-auto" >
                    <input type="text" value={fields.name} onChange={(e) => setFields({...fields, name: e.target.value})} placeholder="Name" className="py-2 px-3 rounded-md border mb-3" />
                    <input type="email" value={fields.email} onChange={(e) => setFields({...fields, email: e.target.value})} placeholder="Email" className="py-2 px-3 rounded-md border mb-3" />
                    <input type="password" value={fields.password} onChange={(e) => setFields({...fields, password: e.target.value})} placeholder="Password" className="py-2 px-3 rounded-md border mb-3" />
                    <button className="py-2 px-6 rounded-lg bg-blue-400 font-medium text-white">Register</button>
                    <p className='font-medium'>Output : {status}</p>
                </div>
            </form>
        </div>
    )
}