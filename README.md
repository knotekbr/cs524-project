# Introduction

This repo contains the source code and documentation for Project ALEX, the Fall 2023 CS 524 project.

# One-Time Setup

## 1. Install Node.js

Install Node version 18 by following the directions on the [Node.js website](https://nodejs.org/en). Alternatively consider using a node version manager like [nvm (for macOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows (for Windows)](https://github.com/coreybutler/nvm-windows).

Installing Node via a version manager is preferrable if you'll frequently be working with Node projects, but is not required within the scope of this project.

## 2. Install Postgres

Install Postgres version 15 by following the directions on the [PostgreSQL website](https://www.postgresql.org/). Be sure to note the Postgres username and password that you choose during the setup process.

## 3. Configure Environment

Create a new file in the `backend` directory called `.env` (`/backend/.env`) and paste these lines into it:

```
DB_USERNAME=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORD>

DB_HOST=localhost
DB_PORT=5432
DB_NAME=cs524

DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
```

Replace `<YOUR_USERNAME>` and `<YOUR_PASSWORD>` with the Postgres username/password you chose in step 2, then save the file.

## 4. Set Up Yarn

Install Yarn by opening a terminal and running the following commands once Node is installed:

```
corepack enable

corepack prepare yarn@stable --activate
```

Don't worry about which version of Yarn is installed by corepack. This project contains a distribution of the required version, which will be used automatically for all operations.

## 5. Install Dependencies

From a terminal opened in the project's root directory, run the following command to install the required Node packages:

```
yarn
```

**Note:** You will have to complete this step again whenever the dependency requirements change

## 6. Initialize Database

From the same terminal used in step 5, run this command: `yarn db:init`

# Running the Project

**Note:** All commands listed in this section should be run from a terminal opened at the project's root directory.

- To run the frontend and backend concurrently: `yarn dev`
- To run the backend standalone: `yarn backend dev`
- To run the frontend standalone: `yarn frontend dev`
