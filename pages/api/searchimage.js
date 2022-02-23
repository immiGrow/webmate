import Upload from '../../model/Upload';
export default async function searchImage(req, res) {

    if (req.method === "POST") {
        const { searchterm } = req.body
        const full = await Upload.find({ imagename: `${searchterm}` })
        res.status(200).json(full)

    }
}