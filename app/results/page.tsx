import Header from "../components/header";
import franceIMG from '../../asset/france.jpg';

export default function Results() {

    let items = [
        {name: "test"},
        {name: "test"},
        {name: "test"},
        {name: "test"},
        {name: "test"},
        {name: "test"},
        {name: "test"},
        {name: "test"},
    ];

    let properties = [
        {title: "test", description: "test", city: "Paris", country: "France", price: 150, max_guests: 2},
        {title: "test", description: "test", city: "Paris", country: "Angleterre", price: 350, max_guests: 8},
        {title: "test", description: "test", city: "Paris", country: "Norvège", price: 50, max_guests: 4},
        {title: "test", description: "test", city: "Paris", country: "Italie", price: 120, max_guests: 3},
        {title: "test", description: "test", city: "Paris", country: "France", price: 180, max_guests: 2},
        {title: "test", description: "test", city: "Paris", country: "Écosse", price: 150, max_guests: 2},
        {title: "test", description: "test", city: "Paris", country: "Suède", price: 160, max_guests: 1},
        {title: "test", description: "test", city: "Paris", country: "Espagne", price: 70, max_guests: 1},
    ];

    return (
        <div className="">
            <Header />
            <div className="flex justify-center items-center p-20">
                <div className="border border-black rounded p-4 space-x-4">
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="text" placeholder="Lieu"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="date" placeholder="Départ"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="date" placeholder="Arrivé"/>
                    <input className="border border-black rounded-md h-14 p-2 text-xl" type="number" placeholder="Personnes"/>
                    <button className="flex bg-blue-600 items-center border justify-center border-black rounded-full w-10 h-10" type="submit"><svg width="25px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                </div>
            </div>
            <div className="flex p-6 h-screen">
                {/* Filtre fixe */}
                <div className="border border-black w-1/6 h-screen sticky top-0 rounded-lg p-10 space-y-5 text-xl">
                    <div>
                        <input name="radio" type="radio" placeholder="croissant"/>
                        <label htmlFor="">Plus récent</label>
                    </div>
                    <div>
                        <input name="radio" type="radio" placeholder="décroissant"/>
                        <label htmlFor="">Moins récent</label>
                    </div>
                    <div>
                        <input type="checkbox" placeholder="piscine"/>
                        <label htmlFor="">Avec piscine</label>
                    </div>
                    <div className="">
                        Par équipements :
                        {
                            items.map((i, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" name="" id="" placeholder={i.name}/>
                                        <label htmlFor="">{i.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 w-32 h-10 rounded-md text-white" type="submit">Appliquer</button>
                    </div>
                </div>
                {/* Résultats */}
                <div className="border border-black w-5/6 h-full ml-6 overflow-y-auto rounded-lg p-6 space-y-5">
                    {
                        properties.map((i, index) => 
                            <div key={index} className="border border-black w-full rounded-lg h-16 flex items-center justify-between p-10 shadow-lg shadow-gray-400">
                                <div>
                                    <span>{i.title}</span>
                                </div>
                                <div>
                                    <span>{i.description}</span>
                                </div>
                                <div>
                                    <span>{i.price}</span>
                                </div>
                                <div>
                                    <span>{i.city}</span>
                                </div>
                                <div>
                                    <span>{i.country}</span>
                                </div>
                                <div>
                                    <span>{i.max_guests} personnes</span>
                                </div>
                                <div>
                                    <button className="bg-blue-500 w-24 h-10 rounded-md text-white" type="submit">Voir plus</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}