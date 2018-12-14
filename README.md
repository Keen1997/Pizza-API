## TheNodeJSMasterClass-Homework Assignment 2

*You are building the API for a pizza-delivery company. Don't worry about a frontend, just build the API. Here's the spec from your project manager:*

1. *New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.*

2. *Users can log in and log out by creating or destroying a token.*

3. *When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system).*

4. *A logged-in user should be able to fill a shopping cart with menu items*

5. *A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards*

### To start the server

```
node index.js
```

#### To create user
```
method : post
path : users
```
*example*
```
localhost:3000/users
{
	"firstname" : "fname",
	"lastname" : "lname",
	"email" : "test@test.com",
	"password" : "ThisIsAPassword",
	"address" : "InMyHome",
	"tosAgreement" : true
}
```

#### To delete user
```
method : delete
path : users
```
*example*
```
localhost:3000/users?localhost:3000/users?email=test@test.com
```

#### To create token
```
method : post
path : tokens
```
*example*
```
localhost:3000/tokens
{
	"email" : "test@test.com",
	"password" : "ThisIsAPassword"
}
```

#### To delete token
```
method : delete
path : tokens
```
*example*
```
localhost:3000/tokens?id=phxcnyd6giu19s9y32wp
```

#### To see menu
```
method : get
path : menus
```
*example*
```
localhost:3000/menus?email=test@test.com
```

#### To create cart
```
method : post
path : carts
```
*example*
```
localhost:3000/carts
{
	"email" : "test@test.com",
	"menuSelects" : [
		{"id" : "01", "number" : 1},
		{"id" : "02", "number" : 2},
		{"id" : "07", "number" : 3}
	]
}
```

#### To delete cart
```
method : delete
path : carts
```
*example*
```
localhost:3000/carts?email=test@test.com
```

#### To order (payment && send email after payment)
```
method : post
path : orders
```
*example*
```
localhost:3000/orders
{
	"email" : "test@test.com",
	"paymentBrand" : "visa"
}
```

#### NOTE
*This api can crud users tokens carts and can see the menu, payment with send email after payment*
<br>
*You can find another request in my code*

#### NOTE2
*Key the stripe and mailgun in lib/config.js before you use it.*
