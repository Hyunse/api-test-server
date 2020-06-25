let express = require('express'),
  sql = require('mssql'),
  router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  getPerson();
  res.send('success');
});

function getPerson() {
  var config = {
    user: '',
    password: '',
    server: '', // it can be servername if connecting directly with sqlserver or can be replace by RDS end point
    database: '',
  };

  sql.connect(config, function (err) {
    var request = new sql.Request();
    if (err) {
      console.log(err);

      return;
    }

    request.query(
      `select * from Person.Person where FirstName = 'Ken'`,
      function (err, recordset) {
        if (err) {
          console.log(err);
        } else {
          console.log(recordset);
        }

        sql.close();
      }
    );
  });
}

module.exports = router;
