# Simple Notes

A simple Notes application that uses React / Typescript on the front with json-server to locally run a little database

## Installation and running locally

Pull down the repo and run `'npm install'`. You can use `'npm start'`to spin up the json-server and run the frontend via vite.

Alternatively you can run both `'npm dev'` and `'npm server'` to start both vite and json-server

## potential port issue

If you get a cors error it will probably be due to the port on your local machine being used. To fix this you will need to change the port number in package.json in these two locations:

```
11: "server": "json-server --watch db.json --port 5000",
12: "start": "concurrently \"vite\"  \"json-server --watch db.json --port 5000\""
```

You will then need to update the port variable located in the in the api.tsx file. src -> api.tsx.

```
3: const port = 5000;
```
