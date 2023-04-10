const getDb = require("../utilities/databasemon").getDb;
class Product {
  constructor(title, price, description, discount, imageURL) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.discount = discount;
    this.imageURL = imageURL;
  }
  save() {
    const db = getDb();
    return db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
