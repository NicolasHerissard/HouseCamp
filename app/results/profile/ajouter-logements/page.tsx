'use client'

import { useState, useEffect } from "react"
import { Ville } from "@prisma/client"
import { Property } from "@/app/api/properties/route"
import { getVilles } from "@/lib/db/villes/france"
import { getPropertiesById } from "@/lib/db/users/properties/byId"
import { UserDetails } from "@/lib/useUser"
import { addProperty } from "@/lib/db/properties/ajouter"
import { deleteProperty } from "@/lib/db/properties/supprimer"
import { getAllEquipments } from "@/lib/db/equipments/getAll"
import { Equipment } from "@/lib/db/models/equipment"
import { createPropertiesImage } from "@/lib/db/propertiesImage"

export default function AjouterLogements() {

    // const [villes, setVilles] = useState<Ville[]>([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState(0)
    const [maxGuests, setMaxGuests] = useState(0)
    const [picture, setPicture] = useState("")

    const [properties, setProperties] = useState<Property[]>([])
    const [property, setProperty] = useState([])
    const [equipments, setEquipments] = useState<Equipment[]>([])
    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    async function fetchProperties() {
        const data = await getPropertiesById(user.id)
        setProperties(data)
    }

    async function AjouterProperty() {
        if(name.length > 0 && description.length > 0 && city.length > 0 && country.length > 0 && price > 0 && maxGuests > 0) {
            let res = await addProperty(user.id, name, description, city, country, address, price, maxGuests)
            fetchProperties()
            setName("")
            setDescription("")
            setCity("")
            setCountry("")
            setAddress("")
            setPrice(0)
            setMaxGuests(0)
            
            await createPropertiesImage(res.id, picture)
        }
        else {
            
        }
    }

    async function AjouterImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files![0]
        if(file) {
            let reader = new FileReader()

            reader.onload = () => {
                setPicture(reader.result as string)
            }

            reader.readAsDataURL(file)

        }
    }

    async function ListesEquipments() {
        const data = await getAllEquipments()
        setEquipments(data)
        console.log(data)
    }

    async function SupprimerProperty(id: string) {
        await deleteProperty(parseInt(id))
        fetchProperties()
    }

    // async function fetchVilles(ville: string) {
    //     const data = await getVilles()
    //     console.log(data)
    //     setVilles(data)
    // }

    useEffect(() => {
        fetchProperties()
        ListesEquipments()
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        <input
                        value={city}
                        onChange={(e) => {setCity(e.target.value)}}
                        type="text"
                        name="city"
                        id="city"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Ville"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Pays
                        </label>
                        <input
                        value={country}
                        onChange={(e) => {setCountry(e.target.value)}}
                        type="text"
                        name="country"
                        id="country"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Pays"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Adresse
                        </label>
                        <input
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        type="text"
                        name="address"
                        id="address"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Adresse"
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
                        value={price}
                        onChange={(e) => {setPrice(parseInt(e.target.value))}}
                        type="number"
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
                        value={maxGuests}
                        onChange={(e) => {setMaxGuests(parseInt(e.target.value))}}
                        type="number"
                        name="maxGuests"
                        id="maxGuests"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Personnes"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="equipments"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Equipements
                        </label>
                        <select name="equipments" id="equipments" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            <option value="">Sélectionnez un équipement</option>
                            {equipments.length > 0 ? equipments.map((e, index) => {
                                return (
                                    <option key={index} value={e.id}>{e.name}</option>
                                )
                                }) : 
                                <option value=""></option>
                            }
                        </select>
                    </div>
                    <div>
                        <label
                        htmlFor="picture"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Photo du logement
                        </label>
                        <input
                        onChange={AjouterImage}
                        accept="image/*"
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
                onClick={AjouterProperty}
                >
                Ajouter mon logement
                </button>
            </div>

            {/* Liste de mes logements */}
            <div className="flex flex-col w-2/3 space-y-4 bg-white p-8 shadow-lg rounded-lg">
                <h1>Mes logements</h1>
                <div className="overflow-y-auto max-h-[500px]">
                    {
                        properties.length > 0 ? 
                        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                                    <th className="py-2 px-4 border border-gray-200">Titre</th>
                                    <th className="py-2 px-4 border border-gray-200">Description</th>
                                    <th className="py-2 px-4 border border-gray-200">Ville</th>
                                    <th className="py-2 px-4 border border-gray-200">Pays</th>
                                    <th className="py-2 px-4 border border-gray-200">Adresse</th>
                                    <th className="py-2 px-4 border border-gray-200">Prix</th>
                                    <th className="py-2 px-4 border border-gray-200">Personnes</th>
                                    <th className="py-2 px-4 border border-gray-200">Actions</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((propertie, index) => (
                                <tr
                                    onClick={() => window.location.href = (`/results/profile/modifier-logements/${propertie.id}`)}
                                    key={index}
                                    className={`hover:bg-gray-50 cursor-pointer ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                >
                                    <td className="py-2 px-4 border border-gray-200">{propertie.title}</td>
                                    <td className="py-2 px-4 border border-gray-200">
                                    {propertie.description}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-200">{propertie.city}</td>
                                    <td className="py-2 px-4 border border-gray-200">{propertie.country}</td>
                                    <td className="py-2 px-4 border border-gray-200">{propertie.address}</td>
                                    <td className="py-2 px-4 border border-gray-200">
                                    {propertie.price?.toString()} €
                                    </td>
                                    <td className="py-2 px-4 border border-gray-200">
                                    {propertie.max_guests}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-200">
                                        <button onClick={() => {SupprimerProperty(propertie?.id?.toString()!)}} className="bg-blue-500 hover:bg-blue-600 w-28 h-10 rounded-md text-white">Supprimer</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table> : 
                        <p>Aucune propriétées trouvées</p>
                    }
                </div>
            </div>
        </div>
    )
}