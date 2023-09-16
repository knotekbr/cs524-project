# Introduction

This repo contains the source code and documentation for Project ALEX, the Fall 2023 CS 524 project.

# One-Time Setup

## Backend

### 1. Install Python

Install Python version 3.11 by following the directions on the official [Python website](https://www.python.org/).

### 2. Initialize a Virtual Environment

From a terminal opened in the `backend/` directory, run the following command to initialize a Python virtual environment:

```
py -3 -m venv .venv
```

When this process finishes, activate your new virtual environment by running the appropriate command for your OS:

```
# Windows
.venv\Scripts\activate

# macOS/Linux
.venv/bin/activate
```

### 3. Install Dependencies

From the same terminal used for step 2, run the following command to install the required Python packages:

```
pip install -r requirements.txt
```

ℹ️ **Note:** You will have to complete this step again whenever the backend package requirements change

## Frontend

### 1. Install Node

Install Node version 18.17 by following the directions on the official [Node.js website](https://nodejs.org/en). Alternatively consider using a node version manager like [nvm (for macOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows (for Windows)](https://github.com/coreybutler/nvm-windows).

Installing Node via a version manager is preferrable if you'll frequently be working with Node projects, but is not required within the scope of this project.

### 2. Set Up Yarn Package Manager

Install Yarn by opening a terminal and running the following commands once Node is installed:

```
corepack enable

corepack prepare yarn@stable --activate
```

Don't worry about which version of Yarn is installed by corepack. This project contains a distribution of the required version, which will be used automatically for all operations.

### 3. Install Dependencies

From a terminal opened in the `frontend/` directory, run the following command to install the required Node packages:

```
yarn
```

ℹ️ **Note:** You will have to complete this step again whenever the frontend package requirements change

# Running the Project

To run the project, open two terminal instances: one in the `backend/` directory, and one in the `frontend/` directory.

## Backend

In the `backend/` terminal, activate the Python virtual environment by running the appropriate command for your OS:

```
# Windows
.venv\Scripts\activate

# macOS/Linux
.venv/bin/activate
```

If package requirements have changed since you last ran the app, install the latest dependencies by running:

```
pip install -r requirements.txt
```

Start the backend app by running:

```
flask run
```

The terminal will print the IP address of the backend development server, which you can enter into your web browser. Press `Ctrl + C` in the terminal at any time to shut down the server.

## Frontend

In the `frontend/` terminal, if package requirements have changed since you last ran the app, install the latest dependencies by running:

```
yarn
```

Start the frontend app by running:

```
yarn dev
```

The terminal will print the IP address of the frontend development server, which you can enter into your web browser. Press `Ctrl + C` in the terminal at any time to shut down the server.
