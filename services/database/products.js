const db = require("./conn");

module.exports = class Product {
    static async getProductDescription(productId){
        let product = await this.getProduct(productId);
        
        return product.description;
    }

    static async getProductPrice(productId){
        let product = await this.getProduct(productId);
        
        return product.price;
    }

    static async getProductShippingFee(productId){
        let product = await this.getProduct(productId);
        
        return product.shipping;
    }

    static async getProduct(productId){
        let db_connect = db.getDb();
        let query = { sku: productId };

        const product = await db_connect
        .collection("products")
        .findOne(query);

        return product;
    }
}