
const { Router } = require('express');
const { getProjects, 
    getOneProject,
    getProjectsDataless,
    postProjectTracker
} = require('../controllers/projects');

const router = Router();


router.get('/', getProjects);
router.get('/dataless', getProjectsDataless);
router.get('/:tableName', getOneProject);


// crear 
// http://factoriaccp.xyz/fic_salud/tracker/scripts/get.php?&lat=%f&lon=%f&pat=%f/

router.get('/post/tracker', postProjectTracker);

// actualizar

// Borrar 

module.exports = router;