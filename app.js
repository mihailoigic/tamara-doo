const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'tamara.co.rs',
    user: 'tamaraco_mihailo',
    password: 'TamaraDoo94',
    database: 'tamaraco_db'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
});

// pool.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });

const app = express();

//Get users
app.get('/users', (req, res)=>{
    let sql = 'SELECT * FROM menadzer';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE tamaraco_db';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('DB created...');
    });
});

//Get products
app.get('/products', (req, res)=>{
    let sql = 'SELECT * FROM products';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Products fetched...');
    });
});

//Get product
app.get('/product/:id', (req, res)=>{
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Product fetched...');
    });
});

//Update product
app.get('/update-product/:id', (req, res)=>{
    let sql = `UPDATE products SET name = '${'kupaci'}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Product updated...');
    });
});

//Delete post
app.get('/delete-product/:id', (req, res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Product deleted...');
    });
});

app.listen('3306', ()=>{
    console.log('Server started on port 3306');
});