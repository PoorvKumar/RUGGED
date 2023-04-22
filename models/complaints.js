const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const complaints = new Schema({
  title: {
    type: String,
    required: true,
  },

  phoneno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  
 
  description:{
    type:String,
    required:true,
  },
  resolved:
  {
    type:Boolean,
    required:true,
  },
  userid:{
    type:Schema.Types.ObjectId,
    required:true,
  },

  
});



module.exports = mongoose.model("Complaints", complaints);
