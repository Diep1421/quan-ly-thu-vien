import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'

export default function AdminHomePage() {
    return (
        <div className='flex h-screen overflow-x-hidden'>
            <SidebarAdmin />
            <div className='p-4 sm:ml-22 min-w-full w-full'>
                <Outlet />
            </div>
        </div>
    )
}
