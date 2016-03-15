'use strick';
module.exports= function(app){

	app.use('/users',require('../api/user'));//it point to (index.js) in user folder
};
