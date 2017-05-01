![cf](https://i.imgur.com/7v5ASc8.png) Lab 07 Cowsay HTTP
======

# About
This program allows users to render a cow image that "speaks" a custom message. The program utilizes REST principles to POST and GET a cow image output, given custom user input. This program runs in the user's terminal on `localhost:3000`. Please enjoy!

# Directions
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.
3. In a separate terminal tab, run cowsay program.
  * To run POST, type into command line:
  ```
  http post :3000/cowsay text='<message>'
  ```
* To run GET, type into command line:
```
http get :3000/cowsay?text='<message>'
```

* Improper requests will render a 'Bad Request' cow.
* Empty requests, such as `:3000/` will render a `Hello World` output
