import Upload from '../../../model/Upload'
export default async function handler(req, res) {
    const { pid } = req.query

    const upComing = await Upload.findOne({ _id: pid })

    res.status(200).json(upComing)



}