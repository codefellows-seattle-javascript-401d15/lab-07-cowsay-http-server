# Lab 07 - Cowsay HTTP server!
This is a lab assignment in CF401 where we have created an HTTP server that uses cowsay.

### Setup
- Clone this repo
- Run ```npm install``` in your terminal (make sure you're at the same filepath as the repo)
- Ensure you have something like HTTPie installed (that's what I used for this lab)
- Type ```npm start``` and in a separate terminal instance, you can run your commands

### Commands
- ```http :3000/``` returns 'hello world'
- ```http :3000/cowsay?text=<yourTextHere>``` cowsay will say your text
- ```http POST :3000/cowsay text=<yourTextHere>``` cowsay will say your text

### Terminal Commands
- ```npm start```       Starts server.js file with node
- ```npm run lint```    Lints the lab's code
- ```npm run test```    Runs the test file (Testing done with mocha, chai, and chai-http)
