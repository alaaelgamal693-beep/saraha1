export const response = ( {res, status =200, data , message = "done"}) =>{
    res.status(status).json({
        message,
        data
    })
}