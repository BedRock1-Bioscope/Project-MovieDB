var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var DirectorSchema = new mongoose.Schema({
    dir_name: {type: String,required:true,unique:true},
    dir_dob: {type: String,required:true},
    dir_tmark: {type: String},
    dir_nat: {type: String,required:true},
    dir_awards: {type: String},
    dir_thumb: {type: String}
});
DirectorSchema.plugin(uniqueValidator);
   //virtual for Director URL
   DirectorSchema
   .virtual('url')
   .get(function(){
       return '/admin/director/'+this._id;
   });

//export module
   module.exports=mongoose.model('Director',DirectorSchema);

   