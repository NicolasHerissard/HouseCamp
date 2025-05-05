'use client'

import { GetMessagesById } from "@/lib/db/messages/byid"
import { Messages } from "@/lib/db/models/messages"
import { getUsers } from "@/lib/db/users"
import { UserDetails } from "@/lib/useUser"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { SendMessage } from "@/lib/db/messages/byid"

const socket = io("http://localhost:3000", {
    path: "/api/socket",
})

export default function EMessages() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)
    const [messages, setMessages] = useState<Messages[]>([])
    const [users, setUsers] = useState<UserDetails[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [receivedId, setReceivedId] = useState(0)
    const [error, setError] = useState("")
    const [menuOpen, setMenuOpen] = useState(null);

    async function AfficherMessages(received_id: number) {
        if(received_id != user.id || received_id != 0) {
            let res = await GetMessagesById(user.id, received_id)
            setMessages(res)
            AfficherErreur("")
            setReceivedId(received_id)

            AfficherMessages(received_id)
        }
        else {
            setMessages([])
            AfficherErreur("Vous ne pouvez pas envoyer de message à vous-même.")
        }
    }

    async function GetUsers() {
        let res = await getUsers()
        setUsers(res)
    }

    async function AfficherErreur(erreur: string) {
        if(erreur != "") {
            setError(erreur)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    async function EnvoyerMessage() {
        if (!receivedId) {
            AfficherErreur("Veuillez sélectionner un utilisateur pour envoyer un message.");
            return;
        }
    
        if (newMessage.trim() === "") {
            return;
        }
    
        const message: Messages = {
            sender_id: user.id,
            receiver_id: receivedId,
            content: newMessage,
            created_at: new Date(),
        };
    
        try {
            const savedMessage = await SendMessage(user.id, receivedId, newMessage);
            if (savedMessage) {
                socket.emit("send_message", savedMessage);
                setMessages((prev) => [...prev, savedMessage]);
                setNewMessage("");
                AfficherErreur("");
            } else {
                AfficherErreur("Erreur lors de l'envoi du message. Veuillez réessayer.");
            }
        } catch (err) {
            console.error("Erreur d'envoi de message :", err);
            AfficherErreur("Une erreur s'est produite. Veuillez réessayer.");
        }
    }

    useEffect(() => {
        GetUsers()
        
        socket.on("connect", () => {
            console.log("Socket connecté :", socket.id);
        });
    
        // Écoute des messages reçus en temps réel
        socket.on("receive_message", (message: Messages) => {
            setMessages((prev) => [...prev, message]);
        });
    
        // Gère les erreurs de socket
        socket.on("connect_error", (err) => {
            console.error("Erreur de connexion au socket :", err);
            setError("Erreur de connexion au serveur. Veuillez réessayer.");
        });
    
        return () => {
            socket.disconnect();
            console.log("Socket déconnecté");
        };
    }, [])

    return (
        <div className="p-4">
            {error && <div className="bg-red-500 text-white p-4 rounded-lg">{error}</div>}
            <div className="h-96 overflow-y-auto flex flex-col space-y-2">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`relative flex ${msg.sender_id == user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.sender_id == user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                      {msg.content}
                    </div>
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-800"
                      onClick={() => {}}
                    >
                      ...
                    </button>
                    {menuOpen === index && (
                      <div className="absolute top-0 right-0 mt-6 bg-white border rounded shadow-lg z-10">
                        <button
                          className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() => {}}
                        >
                          Modifier
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() => {}}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex mt-4">
                <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border p-2 flex-1"
                />
                <button onClick={EnvoyerMessage} className="ml-2 p-2 bg-blue-500 text-white">
                Send
                </button>
            </div>
            <div className="flex items-center mt-4 space-x-4">
                <label htmlFor="user-select" className="text-sm font-medium text-gray-700">
                    Sélectionner un utilisateur :
                </label>
                <div className="relative">
                    <select
                        id="user-select"
                        onChange={(e) => {
                            AfficherMessages(parseInt(e.target.value));
                        }}
                        className="block w-full rounded-lg border border-gray-300 bg-white p-2 pr-8 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        title="Sélectionner un utilisateur"
                    >
                        <option value="">Sélectionner un utilisateur</option>
                        {
                            users.map((u, index) => {
                                if(u.id != user.id) {
                                    return (
                                        <option key={index} value={u.id}>
                                            {u.name}
                                        </option>
                                    )
                                }
                            })
                        }
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}