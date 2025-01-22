'use client'

import Header from "../components/header";
import { useState, useEffect } from "react";
import { getProperties } from "@/lib/db/properties";
import { Property } from "../api/properties/route";
import { Equipment } from "@/lib/db/models/equipment";
import { getAllEquipments } from "@/lib/db/equipments/getAll";
import { UserDetails } from "@/lib/useUser";
import { useRouter } from "next/navigation";

export default function Results() {

    const [properties, setProperties] = useState<Property[]>([])
    const [equipments, setEquipments] = useState<Equipment[]>([])
    const user: UserDetails = JSON.parse(localStorage.getItem('user')!)
    const router = useRouter()

    const [sortDirection, setSortDirection] = useState<string>("asc")
    const [city, setCity] = useState("")

    async function fetchProperties(sortDirection: string, city: string) {
        const data = await getProperties(sortDirection, city)
        setProperties(data)
    }

    async function fetchEquipments() {
        const data = await getAllEquipments()
        setEquipments(data)
    }

    async function handleSearch() {
        fetchProperties(sortDirection, city)
    }

    useEffect(() => {
        if(user.id != null) {
            fetchProperties(sortDirection, city)
            fetchEquipments()
        } else {
            router.push('/login')
        }
    }, [])

    return (
        <div className="bg-gray-100 min-h-screen">
        <Header />
        {/* Barre de recherche */}
        <div className="flex justify-center items-center p-10">
            <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 space-x-4 flex items-center">
            <input
                value={city}
                onChange={(e) => {
                setCity(e.target.value);
                fetchProperties(sortDirection, e.target.value);
                }}
                className="border border-gray-300 rounded-md h-12 p-3 text-lg w-52 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
                placeholder="Lieu"
            />
            <input
                className="border border-gray-300 rounded-md h-12 p-3 text-lg w-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="date"
                placeholder="Départ"
            />
            <input
                className="border border-gray-300 rounded-md h-12 p-3 text-lg w-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="date"
                placeholder="Arrivé"
            />
            <input
                className="border border-gray-300 rounded-md h-12 p-3 text-lg w-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="number"
                placeholder="Personnes"
            />
            <button
                onClick={handleSearch}
                className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12 hover:bg-blue-600 transition-all duration-200"
                type="submit"
            >
                <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
            </button>
            </div>
        </div>

        {/* Contenu principal */}
        <div className="flex px-6 gap-6">
            {/* Barre latérale */}
            <aside className="bg-white border border-gray-300 w-1/5 h-auto sticky top-0 rounded-lg shadow-md p-6 space-y-6">
            <div className="space-y-3">
                <div className="space-x-3">
                <input
                    onChange={(e) => {
                    setSortDirection(e.target.checked ? "desc" : "asc");
                    }}
                    name="radio"
                    type="radio"
                />
                <label className="text-gray-700">Plus récent</label>
                </div>
                <div className="space-x-3">
                <input
                    onChange={(e) => {
                    setSortDirection(e.target.checked ? "asc" : "desc");
                    }}
                    name="radio"
                    type="radio"
                />
                <label className="text-gray-700">Moins récent</label>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 mb-3">Par équipements :</h3>
                {equipments.map((i, index) => (
                <div key={index} className="space-x-3">
                    <input type="checkbox" id={`equipment-${index}`} />
                    <label htmlFor={`equipment-${index}`} className="text-gray-700">
                    {i.name}
                    </label>
                </div>
                ))}
            </div>
            <div className="flex items-center justify-center">
                <button
                onClick={handleSearch}
                className="bg-blue-500 w-32 h-10 rounded-md text-white hover:bg-blue-600 transition-all duration-200"
                >
                Appliquer
                </button>
            </div>
            </aside>

            {/* Résultats */}
            <div className="bg-white border border-gray-300 w-4/5 h-full rounded-lg shadow-md p-6 overflow-y-auto space-y-5">
            {properties.length > 0 ? (
                properties.map((i, index) => (
                <div
                    key={index}
                    className="border border-gray-300 bg-gray-50 w-full rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between"
                >
                    <div className="flex flex-col w-1/4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {i.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{i.description}</p>
                    </div>
                    <div className="flex-1 flex flex-col">
                    <span className="text-lg font-medium text-gray-700">
                        {i?.price?.toString()} € / nuit
                    </span>
                    <span className="text-sm text-gray-500">
                        {i.city}, {i.country}
                    </span>
                    </div>
                    <div className="flex flex-col text-right">
                    <span className="text-sm text-gray-500">
                        {i.max_guests} personnes
                    </span>
                    <button
                        onClick={() => {
                        window.location.href = `/results/details/${i.id}`;
                        }}
                        className="mt-2 bg-blue-500 w-28 h-10 rounded-md text-white hover:bg-blue-600 transition-all duration-200"
                        type="submit"
                    >
                        Voir plus
                    </button>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-700">Aucune propriété trouvée</p>
            )}
            </div>
        </div>
        </div>
    )
}