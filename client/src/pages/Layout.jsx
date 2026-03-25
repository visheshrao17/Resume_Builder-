import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuthStore from '../stores/useAuthStore'
import Loader from '../components/Loader'
import Login from './Login'

const Layout = () => {

    const user = useAuthStore((s) => s.user)
    const loading = useAuthStore((s) => s.loading)

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {
                user ? (<div className='min-h-screen bg-gray-50'>
                    <Navbar />
                    <Outlet />
                </div>) : <Login />
            }
        </div>
    )
}

export default Layout