This project is a monorepo consisting of a client (frontend Next.js) and a server (backend Nest.js). Follow the steps below to get the project running on your local machine.

1.  Clone the Repository

        git clone git@github.com:Anastasiya-AntonenkoA/ts-form-creator.git

        cd ts-form-creator

2.  Install Dependencies

    Run this command in the root directory:

        npm install

    (This will install all necessary packages for both the frontend and backend using npm workspaces).

3.  Run the Project

    You can start both applications simultaneously from the root folder:

        npm run dev

    Frontend: http://localhost:3000

    Backend (GraphQL): http://localhost:3001/graphql

# Tech Stack

Frontend: Next.js 14 (App Router), CSS Modules, Apollo Client.

Backend: Nest.js, GraphQL (Apollo Driver), TypeScript.

Validation: Client-side and Server-side checks for data integrity.

Type Safety: End-to-end typing with TypeScript and GraphQL Code Generator.

# Project Structure

    packages/client — Frontend application (Next.js 14, Apollo Client).

    packages/server — Backend API (Nest.js, GraphQL).
