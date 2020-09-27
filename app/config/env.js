const env = {
  database: 'sql12367585',
  username: 'sql12367585',
  password: 'XzlSiCACTz',
  host: 'sql12.freemysqlhosting.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// const env = {
//   database: 'df1tq1806bi4ql',
//   username: 'kmrcarqbuakhre',
//   password: '7a80dfdd6487225eb813f48895c5cd8647b67d6d378f28504102cd0e7e3c157a',
//   host: 'ec2-52-207-124-89.compute-1.amazonaws.com',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

module.exports = env;