NOTE : This is the backend part of the problem 3 from the Vecros Backend Engineer Assignment

Just do "npm install" then "node app.js" to start this app


What this API do =>

1. Simply Singup or Signin using username and password.

2. Then you can see all the products.

3. You can order products.

4. You can post products.

5. You can aslo check your order history.


==================================================================


* Signup => 

endpoint = /user/signup

data = 
{
    "username": "azadDhruv",
    "password": "123456"
}

method = post

==================================

* Signin =>

endpoint = /user/signin

data = 
{
    "username": "azadDhruv",
    "password": "123456"
}

method = post


=======================================================

* Search Products => 

endpoint = /products

method = get

===================================================

* Post Products =>

endpoint = /products

data = 
{
    "name": "Soda",
    "quantity": "2",
    "price": "$5.3"
}

method = post

=========================================================

* Place Order =>

endpoint = /products/order

data = 
{
    "id": "638dfaa14ffa38d6292a81ed", //id of product
    "quantity": "2"
}
method = post

=================================================================


* Order history

endpoint = /user/order/history

method= get

===========================================================================



Languages and Packages Used =>

1. JavaScript
2. NodeJS
3. ExpressJS
4. Bcrypt
5. MongoDB
6. Mongoose
7. express-session





