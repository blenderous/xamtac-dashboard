# Readme

## How to setup local dev server

Follow the below steps to run a local dev server serving the dashboard application:

- Install packages using `npm install`
- Install `json-server` globally by running `npm install -g json-server`
- Run `npx json-server db.json` to start a database server on `localhost:3000`
- On another terminal, `cd` into the folder of the project and run `npm run dev`
- Open the development server on the url `http://localhost:5173/` to view the application

## Architechture

The project uses `vite` bundler along with `json-server` for creating a fake backend to serve data.
The application uses:

- `React.js` for front-end functionalities
- `react-router-dom` for routing
- `Typescript` to ensure type safety
- `Tailwind CSS` for styling
- `Shadcn` has been used to create interactive elements and overall look and feel of the application.

## Known issues

- The code for barchart with drilldown capability ignores type safety by using the `any` type.
- The graphs are not responsive if the width of the screen is less than 768px.
