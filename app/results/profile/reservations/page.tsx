'use client'

import { UserDetails } from "@/lib/useUser"
import { useEffect, useState } from "react"
import { Property } from "@/app/api/properties/route"
import { getBookingsByUserId } from "@/lib/db/bookings"
import { Booking } from "@/lib/db/models/booking"

export default function Reservations() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user')!)
    const [bookings, setBookings] = useState<Booking[]>([])

    async function FetchBookings() {
        const data = await getBookingsByUserId(user.id)
        setBookings(data)
    }

    useEffect(() => {
        FetchBookings()
    })

    return (
        <div>
            <div className="flex flex-col w-2/3 space-y-4 bg-white p-8 shadow-lg rounded-lg">
                <h1>Mes logements</h1>
                <div className="overflow-y-auto max-h-[500px]">
                    {
                        bookings?.length > 0 ? 
                        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                                    <th className="py-2 px-4 border border-gray-200">Titre</th>
                                    <th className="py-2 px-4 border border-gray-200">Date Départ</th>
                                    <th className="py-2 px-4 border border-gray-200">Date Retour</th>
                                    <th className="py-2 px-4 border border-gray-200">Prix total</th>
                                    <th className="py-2 px-4 border border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                >
                                    <td className="py-2 px-4 border border-gray-200">{b.property.title}</td>
                                    <td className="py-2 px-4 border border-gray-200">
                                    {b.check_in_date.toString()}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-200">{b.check_out_date.toString()}</td>
                                    <td className="py-2 px-4 border border-gray-200">{b.total_price}</td>
                                    <td className="py-2 px-4 border border-gray-200">
                                        <button className="bg-blue-500 hover:bg-blue-600 w-28 h-10 rounded-md text-white">Supprimer</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table> : 
                        <p>Aucune réservations trouvées</p>
                    }
                </div>
            </div>
        </div>
    )
}