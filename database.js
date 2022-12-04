const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to the DB
const db = new sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE,
        (err) => {
                if (err) return console.log(err.message);
                else console.log('connected to the SQLlite database');
        });
db.get("PRAGMA foreign_keys = ON")




// CUSTOMER     
sql = `CREATE TABLE IF NOT EXISTS CUSTOMER(
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT NOT NULL UNIQUE,
        Fname TEXT NOT NULL, 
        Lname TEXT NOT NULL, 
        phone INTEGER, 
        country TEXT, 
        city TEXT, 
        street TEXT, 
        IBAN TEXT UNIQUE)`;

db.run(sql);

        // EMPLOYEE
sql = `CREATE TABLE IF NOT EXISTS EMPLOYEE (
        employee_ID CHAR(10),
        Fname TEXT NOT NULL,
        Mname TEXT NOT NULL,
        Lname TEXT NOT NULL,
        salary DECIMAL NOT NULL,
        PRIMARY KEY (employee_ID)
        )`;
db.run(sql);

        // RETAIL_CENTER        
sql = `CREATE TABLE IF NOT EXISTS RETAIL_CENTER ( 
        retail_id  INTEGER PRIMARY KEY AUTOINCREMENT,
        type    TEXT,
        street  TEXT,
        city    TEXT NOT NULL
        )`;
        db.run(sql);

        // LOCATION
sql = `CREATE TABLE IF NOT EXISTS LOCATION( 
        location_num INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        country TEXT,
        city TEXT
        )`;
        db.run(sql);

        // PACKAGE
// sql = `CREATE TABLE IF NOT EXISTS PACKAGE (
//         barcode INTEGER PRIMARY KEY AUTOINCREMENT,
//         delivery_date  TEXT,
//         weight  DECIMAL,
//         distenation  TEXT,
//         receiver_ID  INTEGER NOT NULL,
//         sender_ID  INTEGER NOT NULL,
//         locationNum  INTEGER,
//         retail_ID  INTEGER,
//         price DECIMAL,
//         length DECIMAL,
//         depth DECIMAL,
//         height DECIMAL,
//         FOREIGN KEY (sender_ID) REFERENCES CUSTOMER(customer_id),
//         FOREIGN KEY (receiver_ID) REFERENCES CUSTOMER(customer_id),
//         FOREIGN KEY (locationNum) REFERENCES LOCATION(location_num),
//         FOREIGN KEY (retail_ID) REFERENCES RETAIL_CENTER(retail_ID)
//         )`; 
//         db.run(sql);

        // HISTORY
sql = `CREATE TABLE IF NOT EXISTS HISTORY( 
        barcode INTEGER NOT NULL,
        location_num INTEGER NOT NULL,
        time INTEGER NOT NULL,
        date TEXT NOT NULL,
        PRIMARY KEY   (barcode,location_num),
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode),
        FOREIGN KEY (location_num) REFERENCES LOCATION(location_num)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS TRANSPORTATION_EVENT( 
        schedule_num INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        delivery_route TEXT
        )`; 
        db.run(sql); 


sql = `CREATE TABLE IF NOT EXISTS SHIPPED_VIA( 
        barcode INTEGER NOT NULL,
        schedule_num INTEGER NOT NULL,
        PRIMARY KEY   (barcode,schedule_num),
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode),
        FOREIGN KEY (schedule_num) REFERENCES TRANSPORTATION_EVENT(schedule_num)
        )`; 
        db.run(sql);

sql = `CREATE TABLE IF NOT EXISTS ACCOUNT (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        UNIQUE (email)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS ADMIN_ACCOUNT (
        account_id INTEGER NOT NULL,
        employee_ID CHAR(10) NOT NULL,
        FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
        FOREIGN KEY (employee_ID) REFERENCES EMPLOYEE(employee_ID)
        PRIMARY KEY (account_id,employee_ID)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS USER_ACCOUNT (
        account_id INTEGER NOT NULL,
        customer_id INTEGER NOT NULL,
        FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
        FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id)
        PRIMARY KEY (account_id,customer_id)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS REMOVED_PACKAGES (
        barcode INTEGER NOT NULL,
        employee_id CHAR(10) NOT NULL,
        PRIMARY KEY (barcode,employee_id),
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode),
        FOREIGN KEY (employee_ID) REFERENCES EMPLOYEE(employee_ID)
        )`; 
        db.run(sql); 


sql = `CREATE TABLE IF NOT EXISTS UPDATED_ADD_PACKAGES (
        barcode INTEGER NOT NULL,
        employee_id CHAR(10) NOT NULL,
        PRIMARY KEY (barcode,employee_id),
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode),
        FOREIGN KEY (employee_ID) REFERENCES EMPLOYEE(employee_ID)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS REGULAR (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS CHEMICAL (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS FRAGILE (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS LIQUID (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS DELIVERED  (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS AVAILABLE  (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS LOST   (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS DELAYED  (
        barcode INTEGER NOT NULL,
        fines INTEGER,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS DAMAGED   (
        barcode INTEGER NOT NULL,
        FOREIGN KEY (barcode) REFERENCES PACKAGE(barcode)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS AIRPORT( 
        location_num INTEGER NOT NULL,
        FOREIGN KEY (location_num) REFERENCES LOCATION(location_num)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS PLANE( 
        location_num INTEGER NOT NULL,
        FOREIGN KEY (location_num) REFERENCES LOCATION(location_num)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS WAREHOUSE( 
        location_num INTEGER NOT NULL,
        street TEXT,
        FOREIGN KEY (location_num) REFERENCES LOCATION(location_num)
        )`; 
        db.run(sql); 

sql = `CREATE TABLE IF NOT EXISTS TRUCK( 
        location_num INTEGER NOT NULL,
        type TEXT,
        FOREIGN KEY (location_num) REFERENCES LOCATION(location_num)
        )`; 
        db.run(sql); 





// sql = `INSERT INTO CUSTOMER(Fname, Lname, phone, country, city, street, IBAN)  VALUES (?,?,?,?,?,?,?)`;
// db.run( sql, ["ali", "alsada", "547229959", "SA", "safwa", "bilal", "241231234134"], (err) => {
//         if (err) return console.log(err.message);
// });

// sql = `SELECT * FROM CUSTOMER`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => {console.log(row)});
// });

// db.run("DROP TABLE IF EXISTS PACKAGE");
// db.run("DROP TABLE IF EXISTS CUSTOMER");
// db.run("DROP TABLE IF EXISTS RETAIL_CENTER");
// db.run("DROP TABLE IF EXISTS LOCATION");
// db.run("DROP TABLE IF EXISTS EMPLOYEE");
// db.run("DROP TABLE IF EXISTS HISTORY");
// db.run("DROP TABLE IF EXISTS SHIPPED_VIA");
// db.run("DROP TABLE IF EXISTS TRANSPORTATION_EVENT");
// db.run("DROP TABLE IF EXISTS ACCOUNT");
// db.run("DROP TABLE IF EXISTS ADMIN_ACCOUNT");
// db.run("DROP TABLE IF EXISTS USER_ACCOUNT");
// db.run("DROP TABLE IF EXISTS UPDATED_ADD_PACKAGES");
// db.run("DROP TABLE IF EXISTS REGULAR");
// db.run("DROP TABLE IF EXISTS CHEMICAL");
// db.run("DROP TABLE IF EXISTS REMOVED_PACKAGES");
// db.run("DROP TABLE IF EXISTS LIQUID");
// db.run("DROP TABLE IF EXISTS DELIVERED");
// db.run("DROP TABLE IF EXISTS AVAILABLE");
// db.run("DROP TABLE IF EXISTS LOST");
// db.run("DROP TABLE IF EXISTS DELAYED");
// db.run("DROP TABLE IF EXISTS DAMAGED");
// db.run("DROP TABLE IF EXISTS AIRPORT");
// db.run("DROP TABLE IF EXISTS WAREHOUSE");
// db.run("DROP TABLE IF EXISTS TRUCK");
// db.run("DROP TABLE IF EXISTS PLANE");
// db.run("DROP TABLE IF EXISTS FRAGILE");



// // ---------------------print all tables names---------------------




// sql = `UPDATE PACKAGE SET receiver_ID = 5 WHERE barcode = 6`;
// db.run(sql);

// sql = `SELECT * FROM PACKAGE`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });

// sql = `SELECT * FROM CUSTOMER`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });

sql = `SELECT customer_id FROM CUSTOMER WHERE email = "ali-alsadah1941@hotmail.com"`;


const x = db.get(sql, (err, row) => {return row.customer_id})
console.log(x)



// sql = `DELETE FROM PACKAGE WHERE barcode = 5`
// db.run(sql);

// sql = `CREATE TABLE IF NOT EXISTS PACKAGE2 (
//         barcode INTEGER PRIMARY KEY AUTOINCREMENT,
//         delivery_date  TEXT,
//         weight  DECIMAL,
//         distenation  TEXT,
//         receiver_ID  INTEGER NOT NULL,
//         sender_ID  INTEGER NOT NULL,
//         locationNum  INTEGER,
//         retail_ID  INTEGER,
//         price DECIMAL,
//         length DECIMAL,
//         depth DECIMAL,
//         height DECIMAL,
//         FOREIGN KEY (sender_ID) REFERENCES CUSTOMER(customer_id),
//         FOREIGN KEY (receiver_ID) REFERENCES CUSTOMER(customer_id),
//         FOREIGN KEY (locationNum) REFERENCES LOCATION(location_num),
//         FOREIGN KEY (retail_ID) REFERENCES RETAIL_CENTER(retail_ID)
//         )`; 
//         db.run(sql);

// sql = `INSERT INTO PACKAGE2 (delivery_date, weight, distenation, receiver_ID, sender_ID, locationNum, retail_ID, price, length, depth, height)
//    SELECT delivery_date, weight, distenation, receiver_ID, sender_ID, locationNum, retail_ID, price, length, depth, height FROM PACKAGE`;
//    db.run(sql);
// sql = `DROP TABLE PACKAGE`;
// db.run(sql);
// sql = `ALTER TABLE PACKAGE3 RENAME TO PACKAGE`;
// db.run(sql);


// sql = `SELECT customer_id FROM USER_ACCOUNT WHERE account_id = ?`;
// db.all(sql, [1], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });

// sql = `SELECT * FROM USER_ACCOUNT`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });

// db.all("select name from sqlite_master where type='table'", function (err, tables) {
//         console.log(tables);
//     });

// let id = 1;
// let varai = "customer_id";
// sql = `SELECT ${varai} FROM USER_ACCOUNT WHERE account_id = ${id}`;

// db.get(sql, (err, row) => {
//     if (row !== undefined) {
//         console.log(row.customer_id)
//         return row;
//     }
// })





// let row1 = ['outlet', 'Dhahran'];
// let retail_centers = [row1]

// let placeholders = retail_centers.map((retail_centers) => '(?,?)').join(',');
// console.log(placeholders)

// // insert values into package retail center
// sql = `INSERT INTO RETAIL_CENTER(type, city) VALUES ` + placeholders;
// db.run(sql, retail_centers.flat(), function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });

// sql = `SELECT * FROM retail_center`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });



//insert values into package location
sql = `INSERT INTO LOCATION(name, country, city)  VALUES (?,?,?)`;
sql = `INSERT INTO AIRPORT(location_num)  VALUES (?)`;
sql = `INSERT INTO PLANE(location_num)  VALUES (?)`;
sql = `INSERT INTO TRUCK(location_num, type)  VALUES (?,?)`;
sql = `INSERT INTO WAREHOUSE(location_num, street)  VALUES (?,?)`;


// let airport1 = ['King Fahd International Airport', 'SA', "Dammam"];
// let airport2 = ['King Khalid International Airport', 'SA', "Riyadh"];
// let airport3 = ['King Abdulaziz International Airport', 'SA', "Jeddah"];

// let plane1 = ['F-16', 'SA', "Dammam"];
// let plane2 = ['F-17', 'SA', "Riyadh"];
// let plane3 = ['F-18', 'SA', "Jeddah"];

// let TRUCK1 = ['T1', 'SA', "Dammam"];
// let TRUCK2 = ['T2', 'SA', "Riyadh"];
// let TRUCK3 = ['T3', 'SA', "Jeddah"];

// let WAREHOUSE1 = ['W1', 'SA', "Dammam"];
// let WAREHOUSE2 = ['W2', 'SA', "Riyadh"];
// let WAREHOUSE3 = ['W3', 'SA', "Jeddah"];

// let locations = [airport1, airport2, airport3, plane1, plane2, plane3, TRUCK1, TRUCK2, TRUCK3, WAREHOUSE1, WAREHOUSE2, WAREHOUSE3]
// let placeholders = locations.map((locations) => '(?,?,?)').join(',');


// // insert values into location
// sql = `INSERT INTO LOCATION(name, country, city) VALUES ` + placeholders;
// db.run(sql, locations.flat(), function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });

// sql = `SELECT * FROM LOCATION`
// db.all(sql, [], (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });


// let TRUCK1 = [10, '2929, Bilal bn rbah'];
// let TRUCK2 = [11, '2900, jaber ibn hayan'];
// let TRUCK3 = [12, '2719, Park Avenue'];
// let trucks = [TRUCK1, TRUCK2, TRUCK3]

// sql = `INSERT INTO WAREHOUSE(location_num, street)  VALUES (?,?),(?,?),(?,?)`;
// db.run(sql, trucks.flat(), function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });

// sql = `SELECT * FROM FRAGILE`
// db.all(sql, (err, rows) => {
//         if (err) return console.log(err.message);
//         rows.forEach((row) => { console.log(row) });
// });


// //insert values into package


// sql = `INSERT INTO PACKAGE(delivery_date, weight, distenation, receiver_ID, sender_ID, locationNum, retail_ID, price, length, depth, height)  VALUES `;
// sql = `INSERT INTO REGULAR(barcode)  VALUES (?)`;
// sql = `INSERT INTO CHEMICAL(barcode)  VALUES (?)`;
// sql = `INSERT INTO FRAGILE(barcode)  VALUES (?)`;
// sql = `INSERT INTO DAMAGED(barcode)  VALUES (?)`;
// sql = `INSERT INTO Liquid(barcode)  VALUES (?)`;
// sql = `INSERT INTO DELAYED(barcode, fines)  VALUES (?, ?)`;



// // --------------------------------insert packages-----------------------------------
// let package1 = ["2022-12-7", 9, "safwa", 1, 3, 5, 2, 50, 12, 4, 6];
// let packages = [package1]

// let placeholders = packages.map((packages) => '(?,?,?,?,?,?,?,?,?,?,?)').join(',');
// sql = `INSERT INTO PACKAGE(delivery_date, weight, distenation, receiver_ID, sender_ID, locationNum, retail_ID, price, length, depth, height)  VALUES` + placeholders;

// db.run(sql, packages.flat(), function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });

// sql = `INSERT INTO Liquid(barcode) VALUES (?)`
// db.run(sql, [3], function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });




// //-----------------------INSERT to history--------------------------------
// sql = `INSERT INTO HISTORY(barcode, location_num, Time, date)  VALUES (?,?,?,?)`;
// db.run(sql, [3,11,"16:51:00","2022-12-02"], function(err) {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Rows inserted ${this.changes}`);
//       });


