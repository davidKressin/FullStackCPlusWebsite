
const { Router } = require('express');
const { getProjects, 
    getOneProject,
    getProjectsDataless,
    postProjectTracker,
    getProjectTracker
} = require('../controllers/projects');

const router = Router();


router.get('/', getProjects);
router.get('/dataless', getProjectsDataless);
router.get('/:tableName', getOneProject);


// crear 
// http://factoriaccp.xyz/fic_salud/tracker/scripts/get.php?&lat=%f&lon=%f&pat=%f/
// http://superusuario.cl/api/projects/post/tracker/?&lat=%f&lon=%f&pat=%f&batt=%f

router.get('/post/tracker', postProjectTracker);
router.get('/get/tracker', getProjectTracker);
router.get('/prueba', (req,res)=> res.send("Probando"));

// actualizar

// Borrar 

module.exports = router;