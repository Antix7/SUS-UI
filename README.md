# UI for SUS, built in React

## Node.js server setup

In the [System-Udokumentowywania-Sprzetu-SUS](https://github.com/Antix7/System-Udokumentowywania-Sprzetu-SUS)
project, run `main.js`

Please note that the app will not function correctly when deployed to Github Pages
unless the server address in the `.env` file is set to a public server.

## Dependencies
The following programs must be installed in order for SUS-UI to work:

  node.js (version 18.12)
  npm (version 8.19)
We also use various node.js packages as listed in package.json

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the node.js packages requiered for the app to function.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run deploy`

Builds the app for production and commits it to the `gh-pages` branch.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The app can be then accessed at [https://antix7.github.io/SUS-UI](https://antix7.github.io/SUS-UI)
