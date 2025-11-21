import { Outlet } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'

function AdminDashboard() {
    return (
        <>
            <section className='max-w-[1200px] mx-auto md:flex gap-8'>
                <AdminNav />
                <Outlet />
            </section >
        </>

    )
}

export default AdminDashboard