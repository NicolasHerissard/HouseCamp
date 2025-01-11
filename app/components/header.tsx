import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { UserDetails } from "@/lib/useUser"

export default function Header() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    const router = useRouter()
    useEffect(() => {
        
    }, [])

    async function handleLogout() {
        await signOut({callbackUrl: '/'})
        localStorage.clear()
    }

    if(user === null) router.push('/login')
    else 
        return (
            <header className="flex justify-between items-center bg-white shadow-md px-6 py-4">
            {/* Logo */}
            <div>
                <h1 className="font-bold text-3xl text-gray-800">
                <a href="/" className="hover:text-blue-500 transition-colors">
                    HouseCamp
                </a>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex space-x-4">
                {/* Notifications */}
                <button
                title="Notifications"
                className="flex items-center justify-center border border-gray-300 rounded-full w-10 h-10 hover:bg-gray-100 transition"
                >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.5 19c-.604-.003-2.487-.003-3.883 0-.743 0-1.226-.782-.893-1.447l.854-1.708c.278-.555.422-1.167.422-1.788 0-1.143 0-2.286 0-3.056C6 9 7 5 12 5s6 4 6 5v3.056c0 .621.144 1.233.422 1.788l.854 1.708c.333.665-.15 1.447-.893 1.447h-3.882M9.5 19c0 2 .5 3 2.5 3s2.5-1 2.5-3m-5 0c1.562 0 5 0 5 0"
                    ></path>
                </svg>
                </button>

                {/* Profil */}
                <button
                title={user.email}
                onClick={() => router.push('/results/profile/informations')}
                className="flex items-center justify-center border border-gray-300 rounded-full w-10 h-10 hover:bg-gray-100 transition"
                >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"></path>
                </svg>
                </button>

                {/* Déconnexion */}
                {user && (
                <button
                    title="Déconnexion"
                    onClick={handleLogout}
                    className="flex items-center justify-center border border-gray-300 rounded-full w-10 h-10 hover:bg-gray-100 transition"
                >
                    <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H3m12 0l-3.5-3.5M12 12l-3.5 3.5M9 5V3c0-1 1-2 2-2h4c1 0 2 1 2 2v18c0 1-1 2-2 2H11c-1 0-2-1-2-2v-2"
                    ></path>
                    </svg>
                </button>
                )}
            </div>
        </header>
        )
}