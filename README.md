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

1. Open the web app using command <code> node app.js </code> in your directory command line and open server at http://localhost:3000/ in your browser 
2. If you are not logged in, you can only see products and filter them.
3. To access your cart and create new wishlists, log in to your account.
4. After logging in, the cart will appear as off-canvas on the navbar, and you can add/delete products from your cart/wishlist.
5. To create a wishlist, go to the wishlist page and create a new list. You can add any product to your list by toggling the heart icon on any product.
6. Checking out of the cart places your order directly. The admin decides whether to ship it or not.
7. There is also the returns and orders page, which shows your orders along with their status (NotShipped, Successful, Cancel).
8. To cancel your not shipped orders, go to the not shipped page on returns and orders.
9. In your dashboard, you can update your profile and change your password. You can also apply for rugged+ membership.
10. To register as a seller, go to become a seller and then access the seller dashboard.
11. In the seller dashboard, you can see all your revenue, profits, customers, and products. You can add new products by filling their form and delete your own products. You can even add them to the cart from there.
12. If you are not already an influencer, after logging in, you will see Become an Influencer in Accounts&List. Register for influencer to become an influencer and access the influencer dashboard.
13. To access the admin dashboard, use the login details given below:  <br>
        <code>email: web@master.com <br>
        password: Master@123</code><br>
14. In the admin dashboard, you can see all the users and even delete them. You can see all the influencers and remove them. You can also sell all sellers and even ban them.
15. You can see the order history of all the orders and decide to ship them or not. You can see all the successful orders and also the cancelled orders for which you can contact the seller.
16. There is a contact us page on the website which can be accessed from the footer links. It has a form for filling complaints.
17. As an admin, you get to see all those complaints and reply to them. If the issue is resolved, you can mark it as resolved, and then it goes to the table below, which shows resolved queries.


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
email: web@master.com
paassword: Master@123

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

