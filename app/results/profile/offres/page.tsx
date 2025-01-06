'use client'

import Header from "@/app/components/header"
import Sidebar from "@/app/components/profile/sidebar"
import { UserDetails } from "@/lib/useUser"
import { useEffect, useState } from "react"
import { Property } from "@/app/api/properties/route"
import { getPropertiesById } from "@/lib/db/properties/byId"

export default function Offres() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)
    const [properties, setProperties] = useState<Property[]>([])

    async function getProperties() {
        let data = await getPropertiesById(user.id)
        setProperties(data)
    }

    useEffect(() => {
        
    })

    return (
        <div>
            Offres
        </div>
    )
}