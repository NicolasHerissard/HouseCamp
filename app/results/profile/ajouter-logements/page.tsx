'use client'



export default function AjouterLogements() {
    return (
        <div className="flex">
            {/* Création du logement */}
            <div className="flex flex-col space-y-4 p-14 text-xl">
                <h1>Ajouter un logement</h1>
                <div className="grid grid-cols-2 space-y-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du logement</label>
                    <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Nom du logement" />
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Description"></textarea>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                    <select name="city" title="Ville" id="" className="text-sm font-medium block">
                        <option value="">Aucun</option>
                    </select>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input type="text" name="address" id="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Adresse" />
                    <label htmlFor="picture" className="block text-sm font-medium text-gray-700">Photo du logement</label>
                    <input type="file" name="picture" id="picture" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    <button className="bg-blue-500 w-32 rounded-md text-sm p-2 text-white" type="submit">Ajouter mon logement</button>
                </div>
            </div>

            {/* Liste de mes logements */}
            <div className="flex flex-col space-y-4 p-14 text-xl">
                <h1>Mes logements</h1>
            </div>
        </div>
    )
}