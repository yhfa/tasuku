export const Regex = {


  firstName: /^[a-zA-Z]*$/,
  lastName: /^[a-zA-Z]*$/,
  team: /^[a-zA-Z]*$/,
  EngOnly: /^[a-zA-Z\s.\-_@]*$/,
  //github or linkedin
  workProfile:
    /^(http(s)?:\/\/)?(www\.)?linkedin\.com\/(pub|in|profile)|^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/,
  //faceBook or Twitter
  socialProfile:
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})|(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/,
  // phoneNumber: /^(2)?(010|011|012|015)[0-9]{8}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  arabicLanguageOnly: /^[\u0621-\u064A0-9\-,*,x,X,.\s ]+$/,
  emptyString: /^\\s+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  phoneNumber: /^\+[1-9]\d{1,14}$/gim,
  QRCode: /^\d{6,8}$/g,
};
