
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    // url: 'mongodb://127.0.0.1:27017/shopping',
    url: 'mongodb+srv://mdbadmin:12333456@cluster0.ksjp1qk.mongodb.net/shopping?retryWrites=true&w=majority',
    // url: 'mongodb+srv://forhumoyun_aka:forhumoyun_aka@cluster0.ycg5joo.mongodb.net/shoping?retryWrites=true&w=majority',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser:true
    },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"]

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-any-name-${file.originalname}`
            return filename
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    }
})

module.exports = multer({ storage })