const { response } = require('express');
const { dbConnection } = require('../database/mysqlConfig');

const getTablesNames = () => {
  return new Promise((resolve, reject) => {
    dbConnection.query('SHOW TABLES', (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      const filteredResults = results
        .filter(result => !["contacto", "info", "trabajos"
          //  , "lab_g1", "lab_g2", "lab_g3"
        ].includes(result[`Tables_in_${process.env.DATABASE}`]))
        .map(obj => Object.values(obj)[0]);

      resolve(filteredResults);
    });
  });
};

const getProjects = async (req, res = response) => {
  try {
    const tablesNames = await getTablesNames();
    console.log(tablesNames);
    const projects = [];

    for (const tableName of tablesNames) {
      const dataQuery = `SELECT * FROM ${tableName}`;
      const infoQuery = `SELECT * FROM trabajos Where table_name='${tableName}'`;
      const info = await executeQuery(infoQuery);
      const data = await executeQuery(dataQuery);
      console.log(info[0]?.img);

      // console.log(results);
      projects.push({ img: info[0]?.img, name: info[0]?.title, table_name: tableName, category: info[0]?.category, data: [...data] });
    }

    // console.log(projects);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

const getOneProject = async (req, res = response) => {
  try {
    const tableName = req.params.tableName;
    console.log(tableName);
    const project = [];

    const dataQuery = `SELECT * FROM ${tableName}`;
    const infoQuery = `SELECT * FROM trabajos Where table_name='${tableName}'`;
    const info = await executeQuery(infoQuery);
    const data = await executeQuery(dataQuery);
    console.log(info[0]?.img);

    project.push({ img: info[0]?.img, name: info[0]?.title, table_name: tableName, category: info[0]?.category, data: [...data] });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


const getProjectsDataless = async (req, res = response) => {
  try {
    const tablesNames = await getTablesNames();
    console.log(tablesNames);
    const projects = [];

    for (const tableName of tablesNames) {
      const infoQuery = `SELECT * FROM trabajos Where table_name='${tableName}'`;
      const info = await executeQuery(infoQuery);
      const data = [];
      console.log(info[0]?.img);

      // console.log(results);
      projects.push({ img: info[0]?.img, name: info[0]?.title, table_name: tableName, category: info[0]?.category, data: [...data] });
    }

    // console.log(projects);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
}
const getProjectTracker = async (req, res = response) => {

  const infoQuery = `SELECT * FROM fic_tracker`;
  const info = await executeQuery(infoQuery);
  res.json(info);
}

const postProjectTracker = async (req, res = response) => {
  const { lat, lon, pat } = req.query;
  // console.log(req.query, typeof lat, typeof lon, typeof pat)
  const insertQuery = `INSERT INTO fic_tracker (lat, lon, pat) VALUES (${lat}, ${lon}, ${pat})`;

  const result = await executeQuery(insertQuery);
  return res.status(200).send(result);
}


const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};

module.exports = {
  getProjects,
  getOneProject,
  getProjectsDataless,
  getProjectTracker,
  postProjectTracker
};