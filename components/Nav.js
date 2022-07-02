import Link from "next/link"
import Cookie from 'js-cookie'
import Router from 'next/router'

const Nav = () => {
    const LogoutHandle = () => {
        Cookie.remove('token')

        Router.replace('/auth/login')
    }
    return (
        <nav className="bg-blue-400 py-3 px-4 flex items-center justify-between">
            <p className="text-xl text-white">Bang Nauval</p>
            <div className="flex items-center">
            <p><Link href="/posts/create" ><a className="text-white font-medium mr-4">Create Post</a></Link></p>
            <button onClick={LogoutHandle} className="py-2 px-6 rounded-md bg-red-400 font-medium text-white">Logout</button>
            </div>
        </nav>
    )
}

export default Nav