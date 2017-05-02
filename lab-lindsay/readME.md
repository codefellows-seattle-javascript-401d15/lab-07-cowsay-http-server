## Lab 07 Cowsay HTTP Server
  This program allows users to get and post messages with cowsay when the server is running.

## Directions
* Run the command `$ npm i -S cowsay` in terminal to save and install cowsay
* Open a new tab in Terminal and run `$ nodemon server.js`
* In the original tab run the command `$ curl -H "Content-Type: application/json" -X POST -d '{"text": "moo!"}' http://localhost:3000/cowsay` to show the message 'moo!' from the cow in the terminal.
