import { UserDetails } from "@/lib/useUser"

export default function Sidebar() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    return (
        <div className="">
            <div className="flex flex-col p-5 space-y-4">
                <button className="" onClick={() => {window.location.href = '/results'}}>Retour à l'accueil</button>
            </div>
            <div className="flex flex-col p-8">
                <div className="border border-black w-44 bg-purple-100 h-auto flex flex-col justify-between p-6 space-y-8 rounded-lg">
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-2xl font-bold">Mon compte</h1>
                        <a href="/results/profile/ajouter-logements">Ajouter un logement</a>
                        <a href="#">Mes favoris</a>
                        <a href="/results/profile/reservations">Mes Réservations</a>
                        <a href="#">Mes messages</a>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-2xl font-bold">Mon profil</h1>
                        <a href="/results/profile/informations">Modifier mes informations</a>
                        <a href="#">Modifier le mot de passe</a>
                        <a href="/results/profile/supprimer-compte">Supprimer mon compte</a>
                    </div>
                </div>
            </div>
        </div>
    )
}