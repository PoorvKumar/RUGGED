# RUGGED
RUGGED ia n E-commerce Platform for Buying and Selling Hiking,Camping🏕️ and Trekking🥾 equipments.

## Installations
Use the Node Package Manager(npm) to initialise the project and install the .

```bash
npm init
npm install express 
npm install sqlite3
npm install body-parser
npm install express-session
npm install ejs
```

## Usage
Starting the app
You can only see products and filter them if you are not logged in 
Once you log in you can access your cart and make new creaate new wishlists && add/delete products from cart /wishlist (cart appears as offcanvas on navbar) (while wishlist has a separate where you can create list and add any product to your list by toggling the heart icon on any product)
(also checking out of cart places your order directly which the admin decides to ship or not ship)
(there is also the reutrns and orders page which shows your orders along with their staus {NotShipped,Successful,Cancel})
(you can cancel your not shipped orders in not shipped page on returns and orders)
in Your dashboard you can update your profile and also change your password and apply for rugged+ membership
You can register as a Seller on become a Seller and then also access Seller Dashboard
in seller dashboard you see all your revenu, profits,customers,products and you can add new products by filling their form and you can also see and delete your own products and even add them to cart from there
When you are not already an influencer then after logging in you will see Become an Influencer in Accounts&List where you have to register for influencer and then you become the influencer and you can now access influencer dashboard also

There is a predetermined admin which can be access through the login detail given below->
email: poorvkumar14@gmail.com
paassword: Ironman3000

as an Admin you get some priveleges in your Admin Dashboard
-> You can see all the users and even delete them
-> You can see all the influencers and remove them
-> you can sell all sellers and even ban them 
-> you can see the order history of all the orders and decide to ship thhem or not and aso you can see all the successful orders and also the cancelled orders for which you can contact the seller
-> there is a contact us page on the website which can be accessed the footer links which has a form for filling complaints
-> as an Admin you get to see all those complaints and reply to those complaints and then if the issue is resolved you can mark it as resolved and then it goes to table below which shows resolved queries
```
node app.js 
```

