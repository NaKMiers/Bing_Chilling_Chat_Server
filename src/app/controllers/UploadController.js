const multer = require('multer')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/images')
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name)
   },
})
const upload = multer({ storage }).single('file')

class UploadController {
   // [POST]: /uploads
   uploadImage = async function (req, res) {
      console.log('uploadImage')

      upload(req, res, async err => {
         try {
            res.status(200).json('File Uploaded')
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      })
   }
}

module.exports = new UploadController()
