import multer from 'multer';

const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,'uploaded/');
  },
  filename:function(req,file,callback){
    const name = file.originalname;
    callback(null,name); 
  }
});

const upload = multer({storage});

export default upload;
