'use client'

import { Property } from "@/app/api/properties/route"
import Header from "@/app/components/header"
import { getPropertiesById } from "@/lib/db/properties/byId"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Details({params}: {params: {id: string}}) {

    const [property, setProperty] = useState<Property>()

    async function fetchProperty() {
        const data = await getPropertiesById(parseInt(params.id))
        setProperty(data)
    }

    useEffect(() => {
        fetchProperty()
    }, [])

    return (
        <div>
            <Header />
        </div>
    )
}