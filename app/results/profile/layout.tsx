'use client'

import Header from "@/app/components/header"
import Sidebar from "@/app/components/profile/sidebar"
import { UserDetails } from "@/lib/useUser"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    return (
        <div className="bg-gray-100 min-h-screen">
        <Header />
            <div className="p-7">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                Bienvenue {user.name} !
                </h1>
            </div>
            <div className="flex px-6 gap-6">
                <aside className="w-auto h-full bg-white rounded-lg shadow-md p-6">
                <Sidebar />
                </aside>

                <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
                {children}
                </main>
            </div>
        </div>
    )
}