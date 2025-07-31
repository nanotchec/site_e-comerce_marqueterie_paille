# Atelier France-Pascale : Site E-commerce sur-mesure pour Artisan d'Art

Ce projet est la construction d'une plateforme e-commerce complète et haut de gamme pour une artisane spécialisée en marqueterie de paille. L'objectif est de créer une vitrine numérique qui non seulement reflète la qualité et l'unicité de ses créations, mais qui est également optimisée pour la performance, le référencement (SEO) et la conversion.

Le site se compose de deux parties principales : une boutique en ligne élégante et intuitive pour les clients, et un panel d'administration puissant et sécurisé pour la gestion complète de l'activité.

**(placeholder : Insérer ici un GIF animé ou une capture d'écran montrant la navigation sur la page d'accueil et une page produit)**

---

## ✨ Fonctionnalités Clés

### 🛍️ Partie Publique (Boutique)

- **Optimisation SEO Avancée** :
  - **Server-Side Rendering (SSR) & Static Site Generation (SSG)** avec Next.js pour des temps de chargement records et une indexation parfaite par les moteurs de recherche.
  - **Schémas JSON-LD** générés dynamiquement pour chaque page (Produit, Catégorie, Article de blog, etc.) pour enrichir les résultats de recherche (rich snippets).
  - **Sitemap dynamique** et `robots.txt` optimisés.

- **Expérience Utilisateur Intuitive** :
  - **Navigation fluide** grâce à l'App Router de Next.js 14.
  - **Design responsive** et moderne avec Tailwind CSS.
  - **Panier d'achat interactif** et persistant, développé avec React Context et `localStorage`.
  - **Optimisation des images** (`next/image`) pour un affichage rapide sans perte de qualité (formats WebP/AVIF).

- **Catalogue Dynamique** :
  - Pages de catégories et de produits générées dynamiquement à partir de la base de données.
  - Moteur de recherche et filtres (à venir).

### ⚙️ Panel d'Administration Sécurisé

- **Authentification Robuste** :
  - Système de connexion sécurisé basé sur **JWT (JSON Web Tokens)**.
  - Les tokens sont stockés dans des **cookies `HttpOnly`** pour se prémunir contre les attaques XSS.
  - **Middleware de protection** des routes pour restreindre l'accès aux utilisateurs authentifiés et autorisés.

- **Gestion Complète** :
  - **CRUD** (Create, Read, Update, Delete) complet pour les **Produits**, **Catégories**, et **Modes de livraison**.
  - **Gestion des commandes** : suivi des statuts, consultation des détails.
  - **Gestion des utilisateurs** et de leurs rôles (Admin, Éditeur, etc.).

- **Dashboard Analytique** :
  - Visualisation des données de vente, des produits populaires et de l'audience.
  - Graphiques interactifs développés avec `recharts`.

---

## 🏗️ Architecture Technique

Le projet est construit sur une architecture moderne, découplée et performante, entièrement basée sur l'écosystème JavaScript/TypeScript.

```mermaid
graph TD
    subgraph "Navigateur Client"
        A[Utilisateur]
    end

    subgraph "Serveur Vercel / Next.js"
        B(Next.js App Router)
        C{Frontend SSR/SSG}
        D[API Routes]
        E(Middleware JWT)
    end

    subgraph "Base de Données"
        F[Prisma ORM]
        G[(MySQL)]
    end
    
    A -- Visite le site --> B
    B -- Rend les pages --> C
    C -- Affiche à --> A
    
    A -- Actions (ex: Ajout au panier) --> D
    D -- Valide la requête --> E
    E -- Protège les routes admin --> D
    
    D -- Interroge/Modifie les données --> F
    F -- Dialogue avec --> G

    style A fill:#D6EAF8
    style B fill:#D1F2EB
    style G fill:#FCF3CF
```

---

## 🛠️ Stack Technologique

| Domaine         | Technologie                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**   | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                                    |
| **Frontend**    | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                                         |
| **Styling**     | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                      |
| **Langage**     | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                          |
| **Base de données** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)                                          |
| **ORM**         | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)                                       |
| **Auth**        | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                                      |
| **Déploiement**   | ![OVH](https://img.shields.io/badge/OVH-123F6B?style=for-the-badge&logo=ovh&logoColor=white)                                        |

---

## 🚀 Installation et Lancement

Pour lancer le projet en local, suivez ces étapes :

1.  **Clonez le repository :**
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```

3.  **Configurez les variables d'environnement :**
    - Copiez le fichier `.env.example` et renommez-le en `.env`.
    - Remplissez les informations nécessaires, notamment l'URL de votre base de données MySQL et vos clés d'API.
    ```
    # .env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="votre_secret_jwt_ici"
    # ... et les autres clés
    ```

4.  **Synchronisez la base de données :**
    Cette commande va créer les tables basées sur votre schéma Prisma.
    ```bash
    npx prisma db push
    ```
    
5.  **Créez un utilisateur admin (si nécessaire) :**
    Lancez le seeder pour créer les données initiales (catégories, utilisateur admin, etc.).
    ```bash
    npx prisma db seed
    ```

6.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```

Le site sera accessible à l'adresse `http://localhost:3000` et le panel d'administration à `http://localhost:3000/admin`.

---

## 🎯 Feuille de Route (Roadmap)

- [ ] **Intégration du paiement sécurisé** avec Stripe.
- [ ] Développement du **système de blog** complet (articles, catégories, commentaires).
- [ ] Mise en place d'un **formulaire multi-étapes pour les demandes de création sur-mesure**.
- [ ] Finalisation des pages statiques (À propos, Contact, etc.).
- [ ] Déploiement de la version 1.0 sur Vercel.
