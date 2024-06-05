

const adminMiddleware = async (req, res, next) => {
    try {
        console.log(req.user)
    } catch (error) {
        next(error)
    }
}