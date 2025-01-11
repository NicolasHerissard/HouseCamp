import { UserDetails } from "@/lib/useUser"

export default function Sidebar() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-5">
                <button
                className="text-blue-500 hover:underline flex items-center space-x-2"
                onClick={() => (window.location.href = '/results')}
                >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
                <span>Retour à l'accueil</span>
                </button>
            </div>

            <div className="flex justify-center p-8">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-8">
                {/* Mon compte */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">Mon compte</h1>
                    <ul className="space-y-2">
                    <li>
                        <a
                        href="/results/profile/ajouter-logements"
                        className="text-blue-500 hover:underline"
                        >
                        Ajouter un logement
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-500 hover:underline">
                        Mes favoris
                        </a>
                    </li>
                    <li>
                        <a
                        href="/results/profile/reservations"
                        className="text-blue-500 hover:underline"
                        >
                        Mes Réservations
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-500 hover:underline">
                        Mes messages
                        </a>
                    </li>
                    </ul>
                </div>

                {/* Mon profil */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">Mon profil</h1>
                    <ul className="space-y-2">
                    <li>
                        <a
                        href="/results/profile/informations"
                        className="text-blue-500 hover:underline"
                        >
                        Modifier mes informations
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-500 hover:underline">
                        Modifier le mot de passe
                        </a>
                    </li>
                    <li>
                        <a
                        href="/results/profile/supprimer-compte"
                        className="text-red-500 hover:underline"
                        >
                        Supprimer mon compte
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
    )
}