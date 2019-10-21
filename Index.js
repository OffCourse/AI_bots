const instaCasette = require("./InstaCasette");

const insta = new instaCasette("c4453830", "werty2468!");

insta.getUser().then(data => console.log(data)).catch(error => console.log(error));

// casette.reccomendUser({ tags=[], users=[] });
// casette.reccomentTags({ tags=[], users=[] });