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
            <div className="flex flex-col max-w-4xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-2">{property?.title}</h1>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Informations</h2>
                    <p className="text-gray-700 mt-2">
                        {property?.city}
                    </p>
                    <p className="text-gray-700 mt-2">
                        {property?.country}
                    </p>
                    <p className="text-gray-700 mt-2">
                        {property?.address}
                    </p>

                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Description</h2>
                    <p className="text-gray-700 mt-2">
                        {property?.description}
                    </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {property?.equipments?.length ? property?.equipments?.map((equipment, index) => (
                        <div key={index}><span className="font-medium">{equipment.name} :</span> Oui</div>
                    )) : <div>Aucun équipements spécifiés</div>}
                </div>
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">{property?.price?.toString()}€ / nuit</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Réserver maintenant</button>
                    </div>
                </div>
            </div>
        </div>
    )
}