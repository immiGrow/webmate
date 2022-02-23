export default async function tokenCheck(req, res, next) {
    try {
        const { cookies } = req
        const jwt = cookies.AuthToken;
        if (!jwt) {
            res.json({
                success: false,
                message: "First You Log In"
            })
        }

        res.json({
            success: true,
            jwt
        })
        console.log(jwt)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Occured some error"
        })
    }


}