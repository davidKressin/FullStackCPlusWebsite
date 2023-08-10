
const { Router } = require('express');
const { getProjects, 
    getOneProject,
    getProjectsDataless
} = require('../controllers/projects');

const router = Router();


router.get('/', getProjects);
router.get('/dataless', getProjectsDataless);
router.get('/:tableName', getOneProject);

// crear 

// actualizar

// Borrar 

module.exports = router;