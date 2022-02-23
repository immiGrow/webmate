import mongoose from "mongoose";


const UploadImageDetails = new mongoose.Schema({
    imagename: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    }

});
export default mongoose.models.Upload || mongoose.model("Upload", UploadImageDetails)