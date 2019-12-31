var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var MovieSchema = new mongoose.Schema({
     mov_name: {type:String,unique:true,required:true},  
    mov_dir: String,
    mov_actor: String,
    mov_language: String,
    mov_reldate: String,
    mov_genre: String,
    mov_plot: String,
    mov_thumb: String
   });
   MovieSchema.plugin(uniqueValidator);

   //virtual for movie URL
   MovieSchema
   .virtual('url')
   .get(function(){
       return '/admin/movie/'+this._id;
   });

   //export 
   module.exports=mongoose.model('Movie',MovieSchema);

