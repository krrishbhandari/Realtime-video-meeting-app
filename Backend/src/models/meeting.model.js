import mongoose , {Schema}  from "mongoose";

const meetingSchema = new Schema({
    user_id:{
        type: String,
    },
    meetingCode:{
        type: String , 
        required : true,
    },
    date:{
        type: Date,
        default: Date.now ,
        required : true
    },
    messages:{
        type: Array,
        default: []
    }
})

const Meeting = mongoose.model("Meeting"  , meetingSchema);
export {Meeting};