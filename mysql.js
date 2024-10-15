const mysql=require('mysql2');

const dbconfig={
host:'localhost',
user:'root',
password:'2005',
database:'db'
};

const con=mysql.createConnection(dbconfig);

con.connect((err) => {
if (err) {
console.log('Error connection');
return;
}
console.log('connected successfully');

const query0='insert into users(id,name,age) values(1,"abdul",19)';
con.query(query0,(err,result)=> {
if (err) {
console.log('Error insersting data');
return;
}
console.log('data inserted');
});

const query1='insert into users(id,name,age) values(2,"baasith",18)';
con.query(query1,(err,result)=> {
if (err) {
console.log('Error insersting data');
return;
}
console.log('data inserted');
});

const query2='select * from users';
con.query(query2,(err,result) => {
if (err) {
console.log('Error insersting data');
return;
}
console.log(result);
});

const query3='delete from users where id=2';
con.query(query3,(err,result) => {
if (err) {
console.log('Error insersting data');
return;
}
console.log(result);
});

const query4='update users set name="baasith" where id=1';
con.query(query4,(err,result) => {
if (err) {
console.log('Error insersting data');
return;
}
console.log(result);
});

con.end();
});