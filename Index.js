const instaCasette = require("./InstaCasette");

const insta = new instaCasette(process.env.USERNAME_IG, process.env.PASSWORD_IG);

const Gun = require("./GunDatabase");

//Gun.createUser("username007", 123, ["post 1", "post 2"], "biography", 10, 100, true, ["keyword 1"], ["comment 1"]);
Gun.getAllUsers();
//insta.getUrlList("onskoningshuis").then(data => console.log(data)).catch(error => console.log(error));

//insta.getUser().then(data => console.log(data)).catch(error => console.log(error));

// casette.reccomendUser({ tags=[], users=[] });
// casette.reccomentTags({ tags=[], users=[] });