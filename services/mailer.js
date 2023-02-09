const sgMail = require('@sendgrid/mail'),
      config = require("./config"),
      Product = require("./database/products");

sgMail.setApiKey(config.mailerApiKey);

const constructMail = function(productInfo, user) {
    const mailContent = {
        to: config.mailerAddress, 
        from: config.mailerAddress, 
        subject: 'Email notification: Buy order',
        text: `
        Customer Name: ${user.firstName}
        Product Name: ${productInfo.name}
        Product Description: ${productInfo.description}
        Product Price: ${productInfo.price}
        Product Shipping Fee: ${productInfo.shipping}
        Product SKU: ${productInfo.sku}
        Product Model: ${productInfo.model}
        Product Manufacturer: ${productInfo.manufacturer}
        Product URL: ${productInfo.url}`
    }

    return mailContent;
}

const sendMail = async (productId, user) => {
    let productInfo = await Product.getProduct(productId);
    let response;

    if(productInfo){
        const msg = {
            to: config.mailerAddress, 
            from: config.mailerAddress, 
            subject: 'Email notification: Buy order',
            text: `
            Customer Name: ${user.firstName}
            Product Name: ${productInfo.name}
            Product Description: ${productInfo.description}
            Product Price: ${productInfo.price}
            Product Shipping Fee: ${productInfo.shipping}
            Product SKU: ${productInfo.sku}
            Product Model: ${productInfo.model}
            Product Manufacturer: ${productInfo.manufacturer}
            Product URL: ${productInfo.url}`
        };

        response = sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
                console.log(msg);
                return {
                    text: `${productInfo.name} has been ordered!`
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    text: `Error while sending mail.`
                };
            })
    }
    else{
        response = {
            text: `Product not found.`
        };
        
    }
    return response;
}   

module.exports = {
    sendMail
}