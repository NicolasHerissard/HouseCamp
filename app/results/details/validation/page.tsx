'use client'

import Header from "@/app/components/header"

export default function Validation() {
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center p-20">
                <div className="flex flex-col border p-5 w-full h-full">
                    <h1 className="text-2xl font-bold text-gray-800">Validation de votre réservation</h1>
                    <p className="text-gray-700">Votre réservation a bien été prise en compte</p>
                    <p className="text-gray-700">Vous pouvez revoir votre réservation dans l'onglet "Mes réservations" sur votre profil</p>
                    <button onClick={() => {window.location.href = '/results/profile/informations'}} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Retourner à mon profil</button>
                </div>
            </div>
        </div>
    )
}