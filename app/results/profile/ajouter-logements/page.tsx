'use client'

import { useState, useEffect } from "react"
import { Ville } from "@prisma/client"
import { Property } from "@/app/api/properties/route"
import { getVilles } from "@/lib/db/villes/france"
import { getPropertiesById } from "@/lib/db/properties/byId"
import { UserDetails } from "@/lib/useUser"

export default function AjouterLogements() {

    // const [villes, setVilles] = useState<Ville[]>([])
    const [properties, setProperties] = useState<Property[]>([])
    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    async function fetchProperties() {
        const data = await getPropertiesById(user.id)
        setProperties(data)
    }

    // async function fetchVilles(ville: string) {
    //     const data = await getVilles()
    //     console.log(data)
    //     setVilles(data)
    // }

    useEffect(() => {
        fetchProperties()
    }, [])

    return (
        <div className="flex">
            {/* Création du logement */}
            <div className="flex flex-col w-1/3 space-y-6 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800">Ajouter un logement</h1>
                <div className="grid grid-cols-1 gap-6">
                <div>
                    <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Nom du logement
                    </label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Nom du logement"
                    />
                </div>
                <div>
                    <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Description
                    </label>
                    <textarea
                    name="description"
                    id="description"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Description"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Ville
                    </label>
                    <select
                    name="city"
                    title="Ville"
                    id="city"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                    <option value="">Aucun</option>
                    </select>
                </div>
                <div>
                    <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Pays
                    </label>
                    <input
                    type="text"
                    name="country"
                    id="country"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Pays"
                    />
                </div>
                <div>
                    <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Prix / nuit
                    </label>
                    <input
                    type="text"
                    name="price"
                    id="price"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Prix"
                    />
                </div>
                <div>
                    <label
                    htmlFor="maxGuests"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Personnes
                    </label>
                    <input
                    type="text"
                    name="maxGuests"
                    id="maxGuests"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Personnes"
                    />
                </div>
                <div>
                    <label
                    htmlFor="picture"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Photo du logement
                    </label>
                    <input
                    type="file"
                    name="picture"
                    id="picture"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                </div>
                <button
                className="bg-blue-500 hover:bg-blue-600 w-full rounded-md text-sm p-2 text-white font-medium"
                type="submit"
                >
                Ajouter mon logement
                </button>
            </div>

            {/* Liste de mes logements */}
            <div className="flex flex-col space-y-4 p-14 text-xl">
                <h1>Mes logements</h1>
                {
                    properties.length > 0 ? 
                    <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="py-2 px-4 border border-gray-200">Titre</th>
                            <th className="py-2 px-4 border border-gray-200">Description</th>
                            <th className="py-2 px-4 border border-gray-200">Ville</th>
                            <th className="py-2 px-4 border border-gray-200">Pays</th>
                            <th className="py-2 px-4 border border-gray-200">Prix</th>
                            <th className="py-2 px-4 border border-gray-200">Personnes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((propertie, index) => (
                            <tr
                                key={index}
                                className={`hover:bg-gray-50 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="py-2 px-4 border border-gray-200">{propertie.title}</td>
                                <td className="py-2 px-4 border border-gray-200">
                                {propertie.description}
                                </td>
                                <td className="py-2 px-4 border border-gray-200">{propertie.city}</td>
                                <td className="py-2 px-4 border border-gray-200">{propertie.country}</td>
                                <td className="py-2 px-4 border border-gray-200">
                                {propertie.price.toString()} €
                                </td>
                                <td className="py-2 px-4 border border-gray-200">
                                {propertie.max_guests}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table> : 
                    <p>Aucune propriétées trouvées</p>
                }
            </div>
        </div>
    )
}