'use client'

import Header from "../components/header";
import { useState, useEffect } from "react";
import { getProperties } from "@/lib/db/properties";
import { Property } from "../api/properties/route";
import { Equipment } from "@/lib/db/models/equipment";
import { getAllEquipments } from "@/lib/db/equipments/getAll";

export default function Results() {

    const [properties, setProperties] = useState<Property[]>([])
    const [equipments, setEquipments] = useState<Equipment[]>([])

    const [sortASC, setSortASC] = useState(false)
    const [sortDESC, setSortDESC] = useState(false)
    const [city, setCity] = useState("")

    async function fetchProperties(sortASC: boolean, sortDESC: boolean, city: string) {
        const data = await getProperties(city)
        setProperties(data)
    }

    async function fetchEquipments() {
        const data = await getAllEquipments()
        setEquipments(data)
    }

    async function handleSearch() {
        fetchProperties(sortASC, sortDESC, city)
    }

    useEffect(() => {
        fetchProperties(false, false, city)
        fetchEquipments()
    }, [])

    return (
        <div className="">
            <Header />
            <div className="flex justify-center items-center p-20">
                <div className="border border-black rounded p-4 space-x-4 flex items-center">
                    <input value={city} onChange={(e) => {setCity(e.target.value); fetchProperties(false, false, e.target.value)}} className="border border-black rounded-md h-14 p-2 text-xl" type="text" placeholder="Lieu"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="date" placeholder="Départ"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="date" placeholder="Arrivé"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="number" placeholder="Personnes"/>
                    <button onClick={handleSearch} className="flex items-center border justify-center border-black rounded-full w-10 h-10" type="submit"><svg width="25px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                </div>
            </div>
            <div className="flex p-6 h-screen">
                {/* Filtre fixe */}
                <div className="border border-black w-1/6 h-auto sticky top-0 rounded-lg p-10 space-y-5">
                    <div className="space-x-3">
                        <input onChange={(e) => {setSortDESC(e.target.checked); setSortASC(false)}} name="radio" type="radio" placeholder="croissant"/>
                        <label htmlFor="">Plus récent</label>
                    </div>
                    <div className="space-x-3">
                        <input onChange={(e) => {setSortASC(e.target.checked); setSortDESC(false)}} name="radio" type="radio" placeholder="décroissant"/>
                        <label htmlFor="">Moins récent</label>
                    </div>
                    <div className="">
                        Par équipements :
                        {
                            equipments.map((i, index) => {
                                return (
                                    <div key={index} className="space-x-3">
                                        <input type="checkbox" name="" id="" placeholder={i.name}/>
                                        <label htmlFor="">{i.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleSearch} className="bg-blue-500 w-32 h-10 rounded-md text-white" type="submit">Appliquer</button>
                    </div>
                </div>
                {/* Résultats */}
                <div className="border border-black w-5/6 h-full ml-6 overflow-y-auto rounded-lg p-6 space-y-5">
                    {
                        properties.length > 0 ? properties.map((i, index) => 
                            <div key={index} className="border border-black w-full rounded-lg h-16 flex items-center justify-between p-10 shadow-md shadow-gray-400 hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                <div className="flex flex-col w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800">{i.title}</h3>
                                    <p className="text-sm text-gray-500">{i.description}</p>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className="text-lg font-medium text-gray-700">{i?.price?.toString()} € / nuit</span>
                                    <span className="text-sm text-gray-500">{i.city}, {i.country}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-sm text-gray-500">{i.max_guests} personnes</span>
                                    <button onClick={() => {window.location.href = `/results/details/${i.id}`}} className="mt-2 bg-blue-500 w-28 h-10 rounded-md text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out" type="submit">Voir plus</button>
                                </div>
                            </div>
                        ) : 
                        <p>Aucune propriétées trouvées</p>
                    }
                </div>
            </div>
        </div>
    )
}