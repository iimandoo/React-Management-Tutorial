const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const { connect } = require('http2');
const upload = multer({dest:'./upload'});

/*
app.get('/api/customers', (req, res) => {
    res.send([{
        'id' : 1,
        'image': 'https://placeimg.com/64/64/1',
        'name' : '홍길동',
        'birthday' : '0318'
      },
      {
        'id' : 2,
        'image': 'https://placeimg.com/64/64/2',
        'name' : '다람쥐',
        'birthday' : '0408'
      },
      {
        'id' : 3,
        'image': 'https://placeimg.com/64/64/3',
        'name' : '개그맨',
        'birthday' : '1215'
      }]);
});
*/
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted=0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;

    // console.log("name:" + name);
    // console.log(birthday);
    let params = [image, name, birthday];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        });
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listen on port ${port}`));