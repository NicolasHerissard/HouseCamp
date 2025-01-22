'use client'

import { Property } from "@/app/api/properties/route"
import { getPropertiesById } from "@/lib/db/properties/byId"
import { updateProperty } from "@/lib/db/properties/modifier"
import { useEffect, useState } from "react"

export default function ModifierLogements({params}: {params: {id: string}}) {

    const [properties, setProperties] = useState<Property>()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState(0)
    const [maxGuests, setMaxGuests] = useState(0)
    const [picture, setPicture] = useState("")

    async function GetProperties() {
        let res = await getPropertiesById(parseInt(params.id))
        setProperties(res)
    }
 
    async function UpdateProperties() {
        if(title.length > 0 && description.length > 0 && maxGuests > 0 && country.length > 0 && address.length > 0) {
          let res = await updateProperty(parseInt(params.id), title, description, price, city, maxGuests, country, address)
          console.log(res)
        }
    }

    useEffect(() => {
        GetProperties()
        if(properties?.title && properties?.description && properties?.max_guests && properties?.country && properties?.address && properties.price) {
          setTitle(properties?.title)
          setDescription(properties?.description)
          setMaxGuests(properties?.max_guests)
          setCountry(properties?.country)
          setAddress(properties?.address)
          setPrice(properties?.price)
      }
    }, [])

    return (
        <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Modifier la propriété</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Adresse</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Ville</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Pays</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Personnes</label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Prix (par nuit)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={UpdateProperties}
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sauvegarder
      </button>
    </main>
    )
}