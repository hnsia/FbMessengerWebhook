/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

const i18n = require("../i18n.config"),
      Product = require("./database/products");

module.exports = class Response {
  static genQuickReply(text, quickReplies) {
    let response = {
      text: text,
      quick_replies: []
    };

    for (let quickReply of quickReplies) {
      response["quick_replies"].push({
        content_type: "text",
        title: quickReply["title"],
        payload: quickReply["payload"]
      });
    }

    return response;
  }

  static genGenericTemplate(image_url, title, subtitle, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url,
              buttons: buttons
            }
          ]
        }
      }
    };
    return response;
  }

  static genRecurringNotificationsTemplate(
    image_url,
    title,
    notification_messages_frequency,
    payload
  ) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "notification_messages",
          title: title,
          image_url: image_url,
          notification_messages_frequency: notification_messages_frequency,
          payload: payload
        }
      }
    };
    return response;
  }

  static genImageTemplate(image_url, title, subtitle = "") {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url
            }
          ]
        }
      }
    };

    return response;
  }

  static genButtonTemplate(title, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: title,
          buttons: buttons
        }
      }
    };

    return response;
  }

  static genText(text) {
    let response = {
      text: text
    };

    return response;
  }

  static genTextWithPersona(text, persona_id) {
    let response = {
      text: text,
      persona_id: persona_id
    };

    return response;
  }

  static genPostbackButton(title, payload) {
    let response = {
      type: "postback",
      title: title,
      payload: payload
    };

    return response;
  }

  static genWebUrlButton(title, url) {
    let response = {
      type: "web_url",
      title: title,
      url: url,
      messenger_extensions: true
    };

    return response;
  }

  static genNuxMessage(user) {
    let welcome = this.genText(
      i18n.__("get_started.welcome", {
        userFirstName: user.firstName
      })
    );

    let guide = this.genText(i18n.__("get_started.guidance"));

    let curation = this.genQuickReply(i18n.__("get_started.help"), [
      {
        title: i18n.__("menu.suggestion"),
        payload: "CURATION"
      },
      {
        title: i18n.__("menu.help"),
        payload: "CARE_HELP"
      },
      {
        title: i18n.__("menu.product_launch"),
        payload: "PRODUCT_LAUNCH"
      }
    ]);

    return [welcome, guide, curation];
  }

  static genGreetingsResponse(user){
    const ResponsesToGreeting = ["How are you?", "I hope you're doing well", "I hope you're having a great day"];
    const RandomlySelectedResponse = ResponsesToGreeting[Math.floor(Math.random() * ResponsesToGreeting.length)];
    let response = {
      text: `Hi ${user.firstName} ! ${RandomlySelectedResponse}`
    };
    
    return response;
  }

  static async genProductDescriptionResponse(productId){
    let productDescription;
    try{
      productDescription = await Product.getProductDescription(productId);
    }
    catch (error){
      productDescription = "Error getting product."
    }
      
    let response = {
      text: `${productDescription}`
    };
    
    return response;
  }

  static async genProductPriceResponse(productId){
    let productPrice;
    try{
      productPrice = await Product.getProductPrice(productId);
    }
    catch (error){
      productPrice = "Error getting product."
    }
      
    let response = {
      text: `${productPrice}`
    };
    
    return response;
  }

  static async genProductShippingFeeResponse(productId){
    let productShippingFee;
    try{
      productShippingFee = await Product.getProductShippingFee(productId);
    }
    catch (error){
      productShippingFee = "Error getting product."
    }
      
    let response = {
      text: `${productShippingFee}`
    };
    
    return response;
  }
};
