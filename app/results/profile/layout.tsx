'use client'

import Header from "@/app/components/header"
import Sidebar from "@/app/components/profile/sidebar"
import { UserDetails } from "@/lib/useUser"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    return (
        <div className="">
            <Header />
            <h1 className="text-4xl font-bold flex justify-center items-center">Bienvenue {user.name} !</h1>
            <div className="flex">
                <div>
                    <Sidebar />
                </div>
                <main className="flex-1 p-6 bg-white">
                    {children}
                </main>
            </div>
        </div>
    )
}