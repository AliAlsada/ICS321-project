const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to the DB
const db = new  sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE, 
(err) => {
        if (err) return console.log(err.message);
        else console.log('connected to the SQLlite database');
});




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
        country TEXT
        )`;
        db.run(sql);
        
        // PACKAGE
sql = `CREATE TABLE IF NOT EXISTS PACKAGE (
        barcode INTEGER PRIMARY KEY AUTOINCREMENT,
        delivery_date  TEXT,
        weight  DECIMAL,
        distenation  TEXT,
        receiver_ID  INTEGER NOT NULL,
        sender_ID  INTEGER NOT NULL,
        locationNum  INTEGER NOT NULL,
        retail_ID  INTEGER NOT NULL,
        price DECIMAL,
        length DECIMAL,
        depth DECIMAL,
        height DECIMAL,
        FOREIGN KEY (sender_ID) REFERENCES CUSTOMER(customer_id),
        FOREIGN KEY (receiver_ID) REFERENCES CUSTOMER(customer_id),
        FOREIGN KEY (locationNum) REFERENCES LOCATION(location_num),
        FOREIGN KEY (retail_ID) REFERENCES RETAIL_CENTER(retail_ID)
        )`; 
        db.run(sql);

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
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        UNIQUE (username),
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
        city TEXT,
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

db.all("select name from sqlite_master where type='table'", function (err, tables) {
        console.log(tables);
    });




