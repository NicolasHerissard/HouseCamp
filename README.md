# HouseCamp

HouseCamp est une application web développée avec [Next.js](https://nextjs.org/) qui permet aux utilisateurs de gérer des logements, d'envoyer des messages et d'interagir avec d'autres fonctionnalités liées à la gestion immobilière.

## Fonctionnalités

- **Gestion des logements** : Ajouter, modifier et supprimer des logements.
- **Messagerie en temps réel** : Envoyer et recevoir des messages grâce à un système de WebSocket.
- **Support multi-utilisateurs** : Gestion des utilisateurs et des propriétés associées.
- **Interface utilisateur moderne** : Utilisation de Tailwind CSS pour un design réactif et épuré.

## Structure du projet

Voici un aperçu de la structure principale du projet :

### Dossiers principaux

- **`app/`** : Contient les pages et composants principaux de l'application.
- **`lib/`** : Contient les fonctions utilitaires et les interactions avec la base de données.
- **`prisma/`** : Définit le schéma de la base de données et les migrations associées.
- **`public/`** : Contient les fichiers statiques comme les images.

## Technologies utilisées

- **Framework** : [Next.js](https://nextjs.org/)
- **Base de données** : [Prisma](https://www.prisma.io/) avec MySQL
- **Style** : [Tailwind CSS](https://tailwindcss.com/)
- **WebSocket** : [Socket.IO](https://socket.io/)

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- MySQL

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone <url-du-repo>
   cd HouseCamp
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez la base de données et les tables :

   ```bash
   npx prisma migrate dev
   ```

4. Démarrez l'application :

   ```bash
   npm run dev
   ```

Accédez à l'application à l'adresse `http://localhost:3000`.