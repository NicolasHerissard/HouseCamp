'use server'

import axios from "axios"

export async function GetMessagesById(sender_id: number, receiver_id: number) {
    try {
        let res = await axios.get(`http://localhost:3000/api/messages/byid?senderId=${sender_id}&receiverId=${receiver_id}`, {method: 'GET'})
        let data = await res.data
        return data
    }
    catch (err: any) {
        console.error(err)
    }
}

export async function SendMessage(sender_id: number, receiver_id: number, content: string) {
    try {
        let res = await axios.post(`http://localhost:3000/api/messages`, {sender_id: sender_id, receiver_id: receiver_id, content: content}, {method: 'POST'})
        let data = await res.data
        return data
    }
    catch (err: any) {
        console.error(err)
    }
}