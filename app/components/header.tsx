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
            <header className="flex justify-between items-center p-5">
                <div>
                    <h1 className="font-bold text-3xl">HouseCamp</h1>
                </div>
                <div className="flex space-x-4">
                    <button title="Notifications" className="flex items-center border justify-center border-black rounded-full w-10 h-10">
                        <svg width="27px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_159)"> <rect width="24" height="24" fill="white"></rect> <path d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19" stroke="#000000" stroke-linejoin="round"></path> <path d="M12 5V3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_15_159"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                    </button>

                    <button title={user.email} onClick={() => router.push('/results/profile/informations')} className="flex items-center border justify-center border-black rounded-full w-10 h-10">
                        <svg width="25px" height="64px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1 fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;</style></defs><circle cx="12" cy="7.25" r="5.73"></circle><path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path></g></svg>
                    </button>

                    {
                        user && <button title="Déconnexion" onClick={handleLogout} className="flex items-center border justify-center border-black rounded-full w-10 h-10">
                                <svg width="30px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                            </button>
                    }
                </div>
            </header>
        )
}