'use client'

import { Property } from "@/app/api/properties/route"
import Header from "@/app/components/header"
import { getPropertiesById } from "@/lib/db/properties/byId"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { addBooking } from "@/lib/db/bookings/ajouter"
import { UserDetails } from "@/lib/useUser"

export default function Details({params}: {params: {id: string}}) {

    const user: UserDetails = JSON.parse(localStorage.getItem("user")!)
    const [property, setProperty] = useState<Property>()
    const [checkInDate, setCkeckInDate] = useState<string>()
    const [checkOutDate, setCkeckOutDate] = useState<string>()
    const [totalPrice, setTotalPrice] = useState<number>()
    const router = useRouter()

    async function fetchProperty() {
        const data = await getPropertiesById(parseInt(params.id))
        setProperty(data)
    }

    async function AjouterReservations() {
        if(property?.price && property.max_guests && checkInDate && checkOutDate) 
        {
            let formattedDateIn = `${checkInDate}T00:00:00Z`
            let formattedDateOut = `${checkOutDate}T00:00:00Z`
            let count = property.price * property.max_guests
            setTotalPrice(count)
            if (totalPrice) {
                await addBooking(user.id, parseInt(params.id), formattedDateIn, formattedDateOut, totalPrice)
                router.push('/results/details/validation')
            }
        }        
    }

    useEffect(() => {
        fetchProperty()
    }, [])

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center p-20">
                <div className="flex flex-col border p-5 w-full h-full">
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
                            <input value={checkInDate} onChange={(e) => setCkeckInDate(e.target.value)} type="date" name="date_in" id="date_in" className="border border-gray-300 rounded-lg p-2 text-lg" placeholder="Date de départ"/>
                            <input value={checkOutDate} onChange={(e) => setCkeckOutDate(e.target.value)} type="date" name="date_out" id="date_out" className="border border-gray-300 rounded-lg p-2 text-lg" placeholder="Date de retour"/>
                            <button onClick={AjouterReservations} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Réserver maintenant</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}