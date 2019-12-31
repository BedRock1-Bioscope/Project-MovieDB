var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//const beautifyUnique = require('mongoose-beautiful-unique-validation');
var ActorSchema = new mongoose.Schema({
    act_name: {type:String,unique:true,required:true},
    act_id: String,
    act_dob: String,
    act_abt: String,
    act_nat: String,
    act_awards: String,
    act_thumb: String
   });
   ActorSchema.plugin(uniqueValidator);
  // ActorSchema.plugin(beautifyUnique);

   //virtual for movie URL
   ActorSchema
   .virtual('url')
   .get(function(){
       return '/admin/actor/'+this._id;
   });

   //export 
   module.exports=mongoose.model('Actor',ActorSchema);

