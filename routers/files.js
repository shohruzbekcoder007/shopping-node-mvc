const upload = require('../middleware/image_upload')
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Grid = require('gridfs-stream')

let gfs
const conn = mongoose.connection

let bucket
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "photos"
  });
})

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('photos')
    console.log("connection made successfully");
})

router.post('/uploadimg', upload.single('file'), async (req, res) => {

    if(req.file === undefined) return res.send("file tanlang")
    
    const imageUrl = `http://localhost:8080/v1/file/${req.file.filename}`

    const user_id = req.user._id

    await User.findOneAndUpdate({_id: user_id}, { $set: {profile_img: imageUrl} })

    return res.send(imageUrl)
    
})

router.get('/:filename', async (req, res) => {
    const file = await gfs.files.findOne({filename: req.params.filename})
    const readStream = bucket.openDownloadStream(file._id);
    readStream.pipe(res)
})

router.delete('/:filename', async (req, res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename})
        res.send("success")
    } catch (error) {
        res.send('file is not deleted')
    }
})

module.exports = router