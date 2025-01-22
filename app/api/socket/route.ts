import { NextRequest } from "next/server";
import { Server } from "socket.io";

let io: Server | undefined

export default function GET(req: NextRequest) {
    if (!io) {
        console.log('Initializing WebSocket server...');
    
        // Initialiser le serveur Socket.IO uniquement une fois
        const httpServer: any = (req as any).socket.server; // Obtenir le serveur HTTP sous-jacent
        io = new Server(httpServer, {
          path: '/api/socket', // Chemin WebSocket
          cors: {
            origin: '*', // À adapter selon vos besoins pour limiter les origines autorisées
          },
        });
    
        // Gérer les connexions WebSocket
        io.on('connection', (socket) => {
          console.log('New client connected:', socket.id);
    
          // Écouter les messages envoyés par les clients
          socket.on('send_message', (message) => {
            console.log('Message received:', message);
    
            // Diffuser le message à tous les autres clients
            socket.broadcast.emit('receive_message', message);
          });
    
          // Gérer la déconnexion des clients
          socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
          });
        });
    }
}