const instaCasette = require("./InstaCasette");

const insta = new instaCasette(process.env.USERNAME_IG, process.env.PASSWORD_IG);
insta.classifyUser("yeehaa");

//insta.getUrlList("chrisjulien").then().catch(error => console.log(error));

//insta.getUser().then(data => console.log(data)).catch(error => console.log(error));

// casette.reccomendUser({ tags=[], users=[] });
// casette.reccomentTags({ tags=[], users=[] });