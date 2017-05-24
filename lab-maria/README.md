#About
This is a small class assignment for Codefellows Coding Bootcamp that utilizes the JavaScript [cowsay][https://github.com/piuccio/cowsay] re-write
Make curl or httpie requests in your terminal to talk to Cows. Also Beavis.

##Installation:

* clone this repository and ``cd`` into it
* run ``npm i``


## To Use:

* Start the server using ``npm start`` in one terminal
* In separate terminal. make POST requests..
  ⋅⋅⋅with curl: ``curl -H "Content-Type: application/json" -X POST -d '{"text": "mooo"}' http://localhost:3000/cowsay``
  ⋅⋅⋅with httpie: ``http post :3000/cowsay text=mooo``
* Replace 'cowsay' with 'beavis' to get beavis instead
