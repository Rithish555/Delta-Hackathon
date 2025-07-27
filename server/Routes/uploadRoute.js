import express from 'express'
import upload from '../fileMiddle.js';
import { createproject,getprojects,getitems,uploadfile,getfiledata,modifycontent,approvefile} from '../Controllers/uploadController.js';
const router = express.Router();

router.post('/proj',createproject);
router.get('/projects/data',getprojects);
router.get('/parent/:id',getitems);
router.post('/file',upload.single('fileupl'),uploadfile);
router.post('/filedata',getfiledata);
router.patch('/changes',modifycontent);
router.patch('/approve',approvefile);

export default router;