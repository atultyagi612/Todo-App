const mongoose=require('mongoose');
const Todoschema=new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    email_:{
        type:String,
        required: true,
          },
    done:{
        type:String,
        required: true,
    }

});

module.exports=new mongoose.model("Todo",Todoschema);