// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Upload from '../../model/Upload'
import dbConnect from '../../mongodb/db'


dbConnect()
export default function handler(req, res) {
    if (req.method === "GET") {
        fetchallImages(req, res)
    }
    if (req.method === "POST") {
        saveallImages(req, res)
    }
}
const fetchallImages = (req, res) => {


    Upload.find().then(data => {
        res.status(200).json(data)
    })
}
const saveallImages = async(req, res) => {

    const { imagename, owner, category, description, imageUrl } = req.body
    if (!imagename || !owner || !category || !description || !imageUrl) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    const newAddedImage = await new Upload({
        imagename,
        owner,
        category,
        description,
        imageUrl
    }).save()
    await res.status(200).json({
        success: true,
        message: "Image Uploaded Successfully !!",
        newAddedImage
    })
}