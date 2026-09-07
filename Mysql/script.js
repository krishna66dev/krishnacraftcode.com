/* =========================================================================
   MySQL Interview Prep — script.js
   Vanilla JS. No frameworks, no build step.
   Architecture:
     - QUESTIONS         : full data array (complete: ids 1-100)
     - state             : { currentId, readIds:Set, searchTerm, theme }
     - render*           : pure-ish functions that paint the DOM from state
     - action functions   : mutate state then call the relevant render*
     - localStorage keys : 'mysqlReadQuestions', 'mysqlTheme', 'mysqlCurrentQuestion'
   ========================================================================= */

/* ============================= QUESTION DATA ============================ */
/* All 100 questions are now present (ids 1-100). See PART 7 for the final
   integration/debugging pass and checklist. */
const QUESTIONS = [
  {
    id: 1,
    category: "Basic",
    question: "What is MySQL?",
    shortAnswer: "MySQL ek open-source Relational Database Management System (RDBMS) hai jo data ko tables ke form me store karta hai aur SQL language use karta hai.",
    explanation: "Simple words me samjho: MySQL ek software hai jisme hum apna data organized tarike se rakhte hain — jaise Excel ki tarah rows aur columns me, lekin bahut zyada powerful aur large-scale applications ke liye banaya gaya hai. Ye client-server model par kaam karta hai: MySQL server data ko store aur manage karta hai, aur applications (PHP, Laravel, Node.js, etc.) us server se connect karke data read/write karte hain. MySQL free aur open-source hai (Oracle isko maintain karta hai), isliye startups se lekar bade enterprises tak sab isse use karte hain.",
    example: "Ek e-commerce website me MySQL 'products', 'orders', aur 'customers' jaisi tables store karta hai, aur website in tables se data fetch karke user ko dikhata hai.",
    sql: "-- Checking MySQL version\nSELECT VERSION();",
    output: "+-----------+\n| VERSION() |\n+-----------+\n| 8.0.36    |\n+-----------+",
    mistakes: "Beginners aksar MySQL aur SQL ko same samajh lete hain — MySQL ek database software hai, SQL uski query language hai. Dusri common galti: MySQL ko sirf 'website ke liye database' samajhna, jabki ye kisi bhi application (desktop, mobile backend, analytics) ke liye use ho sakta hai.",
    interviewDefinition: "MySQL is an open-source relational database management system that uses SQL to store, manage, and retrieve structured data efficiently in a client-server architecture."
  },
  {
    id: 2,
    category: "Basic",
    question: "What is a database?",
    shortAnswer: "Database data ka ek organized collection hai jise easily store, access, manage aur update kiya ja sakta hai.",
    explanation: "Database ko ek digital filing cabinet ki tarah socho, jaha data random tarike se nahi balki structured format me rakha jata hai — taaki hum jab chahe usse fast search kar sakein. Ek relational database (jaise MySQL) me data 'tables' me store hota hai, aur ye tables ek dusre se 'relationships' ke through connected ho sakte hain. Bina database ke, har application ko apna data plain text files me manually manage karna padta, jo slow aur error-prone hota.",
    example: "Ek school management system me 'students', 'teachers', aur 'classes' tables mil kar ek database banate hain, jisse pura school ka data organized rehta hai.",
    sql: "-- Listing all databases on the server\nSHOW DATABASES;",
    output: "+--------------------+\n| Database           |\n+--------------------+\n| information_schema |\n| mysql               |\n| school_db           |\n+--------------------+",
    mistakes: "Log 'database' aur 'table' ko interchangeably use karte hain, jabki database ek container hai jisme multiple tables hoti hain. Ek aur mistake: sochna ki ek application sirf ek hi database use kar sakta hai — actually ek server par multiple databases ban sakte hain.",
    interviewDefinition: "A database is a structured collection of data that is stored electronically and organized so it can be efficiently accessed, managed, and updated."
  },
  {
    id: 3,
    category: "Basic",
    question: "What is RDBMS? How is it different from DBMS?",
    shortAnswer: "RDBMS ek DBMS hai jo data ko related tables ke form me store karta hai aur tables ke beech relationships maintain karta hai, jabki DBMS ek general term hai jisme data relational format me hona zaroori nahi.",
    explanation: "DBMS (Database Management System) koi bhi software ho sakta hai jo data store aur manage kare — chahe wo file-based ho ya structured. RDBMS (Relational DBMS) ek step aage hai: yaha data rows aur columns wali tables me store hota hai, aur har table me ek primary key hoti hai jo unique identification deti hai. Tables ek dusre se foreign keys ke through relate hoti hain, jisse data duplication kam hoti hai aur integrity maintain rehti hai. MySQL, PostgreSQL, Oracle — ye sab RDBMS ke examples hain.",
    example: "Ek RDBMS me 'orders' table ka 'customer_id' column, 'customers' table ke 'id' column se relate hota hai — isse hume customer ka data baar-baar orders table me copy nahi karna padta.",
    sql: "-- Foreign key relationship example\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);",
    output: "Query OK, 0 rows affected\n(Table 'orders' created with a relationship to 'customers')",
    mistakes: "Beginners RDBMS aur DBMS ko same samajh lete hain. Yaad rakho: 'har RDBMS ek DBMS hai, lekin har DBMS RDBMS nahi hota' (jaise MongoDB ek DBMS hai lekin relational nahi hai).",
    interviewDefinition: "RDBMS is a type of DBMS that stores data in structured tables with defined relationships between them, enforced through primary and foreign keys, unlike a generic DBMS which may not maintain such relational structure."
  },
  {
    id: 4,
    category: "Basic",
    question: "What is the difference between SQL and MySQL?",
    shortAnswer: "SQL ek query language hai jo databases ke saath communicate karne ke liye use hoti hai, jabki MySQL ek software (RDBMS) hai jo us language ko implement karke actual database operations perform karta hai.",
    explanation: "SQL (Structured Query Language) ek standard language hai — jaise English ek language hai jo har jagah bol sakte ho. MySQL ek software product hai jo is language ko samajhta hai aur use karke data store, retrieve, update karta hai — jaise ek 'person' jo English bolta hai. Isi tarah PostgreSQL, SQL Server, Oracle bhi SQL language ko implement karte hain, lekin har ek ka apna thoda extra syntax (called 'dialect') hota hai.",
    example: "Same SQL query 'SELECT * FROM users;' MySQL, PostgreSQL, aur SQL Server — teeno me kaam karegi, kyunki ye standard SQL hai.",
    sql: "-- Standard SQL syntax that works across most RDBMS\nSELECT name, email FROM users WHERE id = 1;",
    output: "+-------+------------------+\n| name  | email            |\n+-------+------------------+\n| Rahul | rahul@example.com|\n+-------+------------------+",
    mistakes: "Interview me log inhe same bol dete hain jo turant galat jawab consider hota hai. Ek aur galti: MySQL-specific functions (jaise IFNULL) ko 'standard SQL' samajh lena, jabki ye MySQL ka apna extension hai.",
    interviewDefinition: "SQL is a standardized language used to communicate with relational databases, whereas MySQL is a specific database management system that implements SQL to store and manage data."
  },
  {
    id: 5,
    category: "Basic",
    question: "What are the main sub-languages of SQL (DDL, DML, DCL, TCL)?",
    shortAnswer: "SQL commands 4 categories me divide hote hain: DDL (structure define karta hai), DML (data manipulate karta hai), DCL (permissions control karta hai), aur TCL (transactions control karta hai).",
    explanation: "DDL (Data Definition Language) database ke 'structure' ko define karta hai — jaise CREATE, ALTER, DROP. DML (Data Manipulation Language) actual 'data' ke saath kaam karta hai — jaise INSERT, UPDATE, DELETE, SELECT. DCL (Data Control Language) user permissions handle karta hai — jaise GRANT, REVOKE. TCL (Transaction Control Language) transactions ko manage karta hai — jaise COMMIT, ROLLBACK, SAVEPOINT. In sab ko categorize karke samajhna interview me bahut common question hai.",
    example: "Jab hum table banate hain to DDL use hota hai (CREATE TABLE), aur jab us table me row insert karte hain to DML use hota hai (INSERT INTO).",
    sql: "-- DDL\nCREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50));\n\n-- DML\nINSERT INTO employees VALUES (1, 'Anita');\n\n-- DCL\nGRANT SELECT ON employees TO 'readonly_user'@'localhost';\n\n-- TCL\nCOMMIT;",
    output: "Query OK — table created, row inserted, permission granted, and transaction committed successfully.",
    mistakes: "Log SELECT ko kabhi-kabhi DDL bol dete hain, jabki ye DML ka part hai (data query karta hai). Isi tarah TRUNCATE ko DML samajh lena galat hai — TRUNCATE actually DDL category me aata hai kyunki ye table ka structure reset karta hai.",
    interviewDefinition: "SQL is divided into DDL (defines schema — CREATE, ALTER, DROP), DML (manipulates data — INSERT, UPDATE, DELETE, SELECT), DCL (manages permissions — GRANT, REVOKE), and TCL (controls transactions — COMMIT, ROLLBACK)."
  },
  {
    id: 6,
    category: "Basic",
    question: "What is a Primary Key?",
    shortAnswer: "Primary Key ek column (ya columns ka combination) hai jo table ke har row ko uniquely identify karta hai, aur ye NULL nahi ho sakta.",
    explanation: "Primary key ka kaam hai ye guarantee karna ki table me koi bhi do rows exactly same na ho — har row ka apna unique 'identity card' hota hai. Ek table me sirf ek hi primary key ho sakti hai (chahe wo single column ho ya multiple columns ka combination). MySQL automatically primary key column par ek unique index bana deta hai, jisse search fast ho jati hai.",
    example: "Ek 'students' table me 'roll_number' primary key ho sakta hai, kyunki har student ka roll number unique hota hai.",
    sql: "CREATE TABLE students (\n  roll_number INT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL\n);",
    output: "Query OK, 0 rows affected\n(Table created with 'roll_number' as the unique identifier)",
    mistakes: "Beginners primary key column me duplicate ya NULL value insert karne ki koshish karte hain, jo MySQL error de deta hai. Ek aur mistake: har column ko primary key bana dena — actually sirf ek meaningful unique column (ya composite) hi primary key honi chahiye.",
    interviewDefinition: "A primary key is a column or set of columns that uniquely identifies each row in a table, cannot contain NULL values, and automatically creates a unique index for fast lookups."
  },
  {
    id: 7,
    category: "Basic",
    question: "What is a Foreign Key?",
    shortAnswer: "Foreign Key ek column hai jo ek table ko dusre table ke primary key se link karta hai, taaki tables ke beech relationship banaye rakhi ja sake.",
    explanation: "Foreign key ka main purpose hai referential integrity maintain karna — matlab ye ensure karna ki child table me jo value hai wo parent table me actually exist karti ho. Agar koi is relationship ko todne ki koshish kare (jaise ek order create karna jiska customer_id kisi existing customer se match hi na kare), MySQL error de deta hai. Isse data consistent aur reliable rehta hai.",
    example: "'orders' table ka 'customer_id' column, 'customers' table ke 'id' column ko reference karta hai — bina valid customer ke koi order nahi ban sakta.",
    sql: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);",
    output: "Query OK, 0 rows affected\n(orders.customer_id is now constrained to valid customers.id values)",
    mistakes: "Log foreign key column ko primary key jaisa unique samajh lete hain — actually foreign key me duplicate values allowed hoti hain (ek customer ke multiple orders ho sakte hain). Ek aur common galti: parent table delete karne ki koshish karna jab child table me related rows exist karte hain, jisse constraint error aata hai.",
    interviewDefinition: "A foreign key is a column that references the primary key of another table, enforcing referential integrity between related tables so that only valid, existing parent records can be linked."
  },
  {
    id: 8,
    category: "Basic",
    question: "What is the difference between Primary Key and Unique Key?",
    shortAnswer: "Primary Key table me sirf ek hi ho sakti hai aur NULL allow nahi karti, jabki Unique Key multiple ho sakti hain aur ek NULL value allow kar sakti hain.",
    explanation: "Dono constraints ka goal same hai — duplicate values ko rokna — lekin kuch differences hain. Har table me sirf ek Primary Key ho sakti hai, lekin multiple Unique Keys ho sakti hain. Primary key columns kabhi NULL nahi ho sakte, jabki unique key column me MySQL ek NULL value allow karta hai (kyunki NULL ko 'unknown' mana jata hai, do unknowns 'duplicate' nahi hote). Dono par automatically index create hota hai.",
    example: "'users' table me 'id' primary key ho sakta hai (auto-increment), aur 'email' column unique key ho sakta hai — taaki koi do users same email se register na kar sake.",
    sql: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  email VARCHAR(100) UNIQUE\n);",
    output: "Query OK, 0 rows affected\n(users.id is the primary key, users.email enforces uniqueness)",
    mistakes: "Beginners sochte hain ki unique key bhi NULL allow nahi karega — actually MySQL me unique key column me ek NULL value allowed hai. Dusri galti: ek table me do primary keys banane ki koshish karna, jo error deta hai.",
    interviewDefinition: "A primary key uniquely identifies a row and disallows NULLs, with only one allowed per table, whereas a unique key also enforces uniqueness but permits one NULL value and multiple unique keys can exist on the same table."
  },
  {
    id: 9,
    category: "Basic",
    question: "What is a Composite Key?",
    shortAnswer: "Composite Key do ya zyada columns ka combination hota hai jo mil kar table ke row ko uniquely identify karta hai, jabki individually koi bhi column unique nahi hota.",
    explanation: "Kabhi-kabhi ek single column se row unique identify nahi ho pata, tab hum multiple columns ko combine karke ek composite (ya 'compound') key banate hain. Ye tab useful hota hai jab relationship many-to-many ho — jaise ek student multiple courses le sakta hai aur ek course me multiple students ho sakte hain, to 'enrollments' table me (student_id, course_id) ka combination unique hota hai, individually nahi.",
    example: "Ek 'enrollments' table me (student_id, course_id) composite primary key ho sakti hai, kyunki ek student ek course me sirf ek hi baar enroll ho sakta hai.",
    sql: "CREATE TABLE enrollments (\n  student_id INT,\n  course_id INT,\n  enrolled_on DATE,\n  PRIMARY KEY (student_id, course_id)\n);",
    output: "Query OK, 0 rows affected\n(Composite primary key created on student_id + course_id)",
    mistakes: "Log composite key ko 'do primary keys' samajh lete hain — actually ye ek hi primary key hai jo do columns se mil kar bani hai. Ek aur galti: composite key me columns ka order sahi na rakhna, jo indexing performance ko affect karta hai.",
    interviewDefinition: "A composite key is a primary key formed by combining two or more columns, where the combination is unique across rows even though the individual columns may contain repeating values."
  },
  {
    id: 10,
    category: "Basic",
    question: "What are the common data types in MySQL?",
    shortAnswer: "MySQL me data types teen broad categories me aate hain: Numeric (INT, DECIMAL, FLOAT), String (CHAR, VARCHAR, TEXT), aur Date/Time (DATE, DATETIME, TIMESTAMP).",
    explanation: "Har column ka ek data type define karna zaroori hai, taaki MySQL jaan sake us column me kis type ka data store hoga aur kitni memory allocate karni hai. Numeric types (INT, BIGINT, DECIMAL, FLOAT) numbers ke liye use hote hain — DECIMAL precise financial calculations ke liye best hai. String types (CHAR, VARCHAR, TEXT) text data ke liye hain. Date/Time types (DATE, DATETIME, TIMESTAMP) dates aur times store karte hain. Sahi data type choose karna storage aur performance dono ke liye important hai.",
    example: "Ek 'products' table me 'price' ke liye DECIMAL(10,2) use hoga (accurate money value ke liye), 'name' ke liye VARCHAR(100), aur 'created_at' ke liye TIMESTAMP.",
    sql: "CREATE TABLE products (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100),\n  price DECIMAL(10,2),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
    output: "Query OK, 0 rows affected\n(Table created with numeric, string, and timestamp columns)",
    mistakes: "Beginners price jaisi values ke liye FLOAT use kar dete hain, jisse rounding errors aate hain — money ke liye hamesha DECIMAL use karna chahiye. Ek aur mistake: har text field ke liye TEXT use karna jab VARCHAR kaafi hota aur zyada efficient hota hai.",
    interviewDefinition: "MySQL data types fall into three main categories — numeric (INT, DECIMAL, FLOAT) for numbers, string (CHAR, VARCHAR, TEXT) for text, and date/time (DATE, DATETIME, TIMESTAMP) for temporal values — chosen based on the nature and precision of the data being stored."
  },
  {
    id: 11,
    category: "Basic",
    question: "What is the difference between CHAR and VARCHAR?",
    shortAnswer: "CHAR fixed-length storage use karta hai (always defined size occupy karta hai), jabki VARCHAR variable-length hai (sirf actual data ke barabar space leta hai).",
    explanation: "CHAR(n) hamesha 'n' characters ke liye space reserve karta hai, chahe actual value chhoti ho — bacha hua space padding se fill hota hai. VARCHAR(n) sirf utni hi space use karta hai jitni value ki length hai (plus 1-2 bytes length store karne ke liye). CHAR fixed-length data ke liye fast hota hai (jaise country codes: 'IN', 'US'), jabki VARCHAR variable-length data ke liye storage-efficient hota hai (jaise names, addresses).",
    example: "Agar 'gender' column CHAR(1) hai to 'M' store karne par bhi exactly 1 byte fixed reserve hota hai. Agar 'name' VARCHAR(50) hai aur value 'Ravi' hai, to sirf 4 characters ke barabar space (+ length info) use hoga.",
    sql: "CREATE TABLE demo (\n  gender CHAR(1),\n  name VARCHAR(50)\n);",
    output: "Query OK, 0 rows affected\n(gender is fixed-length, name is variable-length)",
    mistakes: "Log har jagah VARCHAR(255) daal dete hain bina soche — chhoti fixed-length values (jaise state codes) ke liye CHAR zyada efficient hota hai. Dusri galti: CHAR me lambi variable data store karna, jisse storage waste hota hai.",
    interviewDefinition: "CHAR is a fixed-length string type that always reserves the defined number of characters, while VARCHAR is a variable-length type that uses only as much storage as the actual data requires, making it more space-efficient for varying-length text."
  },
  {
    id: 12,
    category: "Basic",
    question: "What is the NOT NULL constraint?",
    shortAnswer: "NOT NULL constraint ek column ko empty (NULL) value store karne se rokta hai — matlab us column me value dena mandatory hota hai.",
    explanation: "Kabhi-kabhi hume ensure karna hota hai ki koi important field kabhi bhi khaali na rahe — jaise ek user ka 'email' ya 'name'. NOT NULL constraint lagane se, agar koi INSERT ya UPDATE query us column ke bina value ke chalayi jaati hai, MySQL error de deta hai. Ye data quality maintain karne ka ek simple lekin powerful tarika hai.",
    example: "'users' table me 'email' column ko NOT NULL banaya jata hai taaki koi bhi user bina email ke register na ho sake.",
    sql: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  email VARCHAR(100) NOT NULL\n);\n\n-- Ye query fail hogi:\nINSERT INTO users (id) VALUES (1);",
    output: "ERROR 1364 (HY000): Field 'email' doesn't have a default value",
    mistakes: "Beginners NOT NULL aur UNIQUE ko same samajh lete hain — NOT NULL sirf empty value rokta hai, duplicate values rokta nahi. Ek aur mistake: existing table me NOT NULL add karna jab column me already NULL values ho — ye error dega jab tak existing NULLs fix na ho jayein.",
    interviewDefinition: "The NOT NULL constraint ensures that a column cannot store a NULL value, making it mandatory to provide a value whenever a row is inserted or updated."
  },
  {
    id: 13,
    category: "Basic",
    question: "What is the DEFAULT constraint?",
    shortAnswer: "DEFAULT constraint ek column ke liye ek automatic value set karta hai, jo tab use hoti hai jab INSERT ke time us column ke liye koi value na di jaye.",
    explanation: "Ye constraint useful hota hai jab hum chahte hain ki agar user koi specific value na de, to ek sensible default value apne aap set ho jaye — isse repetitive data entry avoid hoti hai. Jaise ek 'status' column ka default 'active' rakh sakte hain, ya 'created_at' ka default current timestamp.",
    example: "'orders' table me 'status' column ka DEFAULT 'pending' rakha ja sakta hai, taaki naya order banate waqt status manually 'pending' likhne ki zaroorat na pade.",
    sql: "CREATE TABLE orders (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  status VARCHAR(20) DEFAULT 'pending',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO orders (id) VALUES (1);",
    output: "+----+---------+---------------------+\n| id | status  | created_at          |\n+----+---------+---------------------+\n| 1  | pending | 2026-01-15 10:30:00 |\n+----+---------+---------------------+",
    mistakes: "Log sochte hain DEFAULT value existing rows par bhi apply ho jayegi jab column add kiya jaye — actually DEFAULT sirf naye INSERTs (ya explicitly ALTER ke through existing rows update karne) par apply hota hai, automatically purane rows update nahi hote unless specify kiya jaye.",
    interviewDefinition: "The DEFAULT constraint specifies a fallback value that MySQL automatically assigns to a column when no explicit value is provided during an INSERT operation."
  },
  {
    id: 14,
    category: "Basic",
    question: "What is AUTO_INCREMENT in MySQL?",
    shortAnswer: "AUTO_INCREMENT ek attribute hai jo har new row insert hone par column ki value ko automatically 1 se badha deta hai — mostly primary key ke liye use hota hai.",
    explanation: "Manually har row ke liye unique ID generate karna mushkil aur error-prone hota hai. AUTO_INCREMENT ye kaam automatically karta hai: jab bhi ek naya row insert hota hai, MySQL apne aap next available number assign kar deta hai (by default 1 se start hokar 1-1 badhta hai). Ye typically primary key column par lagaya jata hai taaki har row ko ek unique, sequential identifier mil sake.",
    example: "'employees' table me 'id INT PRIMARY KEY AUTO_INCREMENT' rakhne se, har naye employee ko apne aap 1, 2, 3... IDs milti rahengi bina manually specify kiye.",
    sql: "CREATE TABLE employees (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(50)\n);\n\nINSERT INTO employees (name) VALUES ('Priya'), ('Aman');",
    output: "+----+-------+\n| id | name  |\n+----+-------+\n| 1  | Priya |\n| 2  | Aman  |\n+----+-------+",
    mistakes: "Beginners AUTO_INCREMENT column me manually value insert karne ki koshish karte hain aur confuse ho jate hain jab number sequence break ho jata hai (jaise row delete hone ke baad number wapas reuse nahi hota). Ye normal behavior hai, bug nahi.",
    interviewDefinition: "AUTO_INCREMENT is a MySQL column attribute that automatically generates a unique, sequentially increasing numeric value for each new row, commonly used with primary key columns."
  },
  {
    id: 15,
    category: "Basic",
    question: "How do you create a table in MySQL (CREATE TABLE)?",
    shortAnswer: "CREATE TABLE statement se hum ek naya table define karte hain — column names, data types, aur constraints specify karke.",
    explanation: "CREATE TABLE ek DDL command hai jo database ke andar ek naya structure banata hai jaha data store hoga. Har column ka name aur data type dena hota hai, aur optionally constraints (PRIMARY KEY, NOT NULL, DEFAULT, etc.) bhi add kiye ja sakte hain. Table banane se pehle uska design (schema) sochna zaroori hai, kyunki baad me structure change karna (especially production me) risky ho sakta hai.",
    example: "Ek simple 'departments' table banana jisme 'id' aur 'name' columns ho.",
    sql: "CREATE TABLE departments (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL\n);",
    output: "Query OK, 0 rows affected\n(Table 'departments' created successfully)",
    mistakes: "Log table create karte waqt primary key define karna bhool jate hain, jo baad me data management mushkil bana deta hai. Ek aur mistake: appropriate data types na sochna, jisse baad me ALTER TABLE karke fix karna padta hai.",
    interviewDefinition: "CREATE TABLE is a DDL statement used to define a new table's structure in a database, including its columns, their data types, and any constraints."
  },
  {
    id: 16,
    category: "Basic",
    question: "How do you modify an existing table structure (ALTER TABLE)?",
    shortAnswer: "ALTER TABLE statement se hum existing table me column add, modify, ya drop kar sakte hain, ya constraints change kar sakte hain.",
    explanation: "Jab table already ban chuka ho aur data bhi ho, tab bhi hume kabhi structure change karna padta hai — jaise naya column add karna, column ka data type badalna, ya ek column remove karna. ALTER TABLE isi ke liye hai. Production databases me ALTER TABLE bahut carefully use karna chahiye kyunki bade tables par ye slow ho sakta hai aur table ko temporarily lock kar sakta hai.",
    example: "'employees' table me ek naya 'phone' column add karna.",
    sql: "ALTER TABLE employees\nADD COLUMN phone VARCHAR(15);\n\n-- Column ka data type change karna\nALTER TABLE employees\nMODIFY COLUMN phone VARCHAR(20);\n\n-- Column drop karna\nALTER TABLE employees\nDROP COLUMN phone;",
    output: "Query OK, 0 rows affected\n(Column added, modified, and dropped successfully across the three statements)",
    mistakes: "Beginners bade production tables par bina maintenance window plan kiye ALTER TABLE chala dete hain, jisse table lock ho jata hai aur application slow/unresponsive ho jati hai. Ek aur mistake: DROP COLUMN chalane se pehle backup na lena — ye operation data ko permanently remove kar deta hai.",
    interviewDefinition: "ALTER TABLE is a DDL statement used to modify the structure of an existing table — such as adding, modifying, or dropping columns and constraints — without recreating the table."
  },
  {
    id: 17,
    category: "Basic",
    question: "What is the difference between DROP, DELETE, and TRUNCATE?",
    shortAnswer: "DELETE rows ko condition ke basis par remove karta hai (rollback possible), TRUNCATE saari rows ek saath fast remove karta hai (structure rehta hai), aur DROP pura table (structure + data) hi remove kar deta hai.",
    explanation: "Teeno commands data 'remove' karte hain, lekin different levels par. DELETE ek DML command hai — row-by-row delete karta hai, WHERE clause use kar sakte hain, aur transaction ke andar ROLLBACK ho sakta hai. TRUNCATE ek DDL command hai — poori table ki saari rows ek saath remove kar deta hai (fast hai kyunki row-by-row logging nahi karta), lekin table structure intact rehta hai. DROP sabse destructive hai — ye pura table hi database se delete kar deta hai, structure aur data dono gayab ho jate hain.",
    example: "Agar hume sirf 'inactive' users remove karne hain to DELETE use karenge; agar 'temp_logs' table ka saara data clear karna hai (structure rakhte hue) to TRUNCATE; aur agar table hi permanently hatana hai to DROP.",
    sql: "DELETE FROM users WHERE status = 'inactive';\n\nTRUNCATE TABLE temp_logs;\n\nDROP TABLE old_backup_table;",
    output: "Query OK, 4 rows affected   -- DELETE\nQuery OK, 0 rows affected   -- TRUNCATE (table emptied)\nQuery OK, 0 rows affected   -- DROP (table removed entirely)",
    mistakes: "Sabse badi galti: production me bina WHERE clause ke DELETE chala dena, jisse poori table ka data delete ho jata hai. Dusri galti: TRUNCATE ko rollback kiya ja sakta hai samajhna — MySQL me TRUNCATE ko generally undo nahi kiya ja sakta (auto-commit hota hai).",
    interviewDefinition: "DELETE removes specific rows based on a condition and can be rolled back within a transaction; TRUNCATE quickly removes all rows while keeping the table structure; DROP removes the entire table, including its structure and data, permanently."
  },
  {
    id: 18,
    category: "Basic",
    question: "How do you insert data into a table (INSERT INTO)?",
    shortAnswer: "INSERT INTO statement se hum table me ek ya multiple naye rows add karte hain, ya to sabhi columns ke liye values dekar ya specific columns choose karke.",
    explanation: "INSERT ek DML command hai. Do common tarike hote hain: pehla, sabhi columns ke liye values order me dena (bina column names likhe); dusra, specific columns naam se mention karke sirf unhi ke liye values dena (baaki columns DEFAULT ya NULL ho jayenge). Ek single query se multiple rows bhi insert kiye ja sakte hain, jo performance ke liye better hota hai multiple separate INSERTs ki tulna me.",
    example: "'employees' table me ek naya employee record insert karna.",
    sql: "-- Single row insert (specifying columns)\nINSERT INTO employees (name, department_id)\nVALUES ('Sneha', 3);\n\n-- Multiple rows in one query\nINSERT INTO employees (name, department_id)\nVALUES ('Karan', 1), ('Meera', 2);",
    output: "Query OK, 1 row affected\nQuery OK, 2 rows affected\n(Records 'Sneha', 'Karan', and 'Meera' added to employees)",
    mistakes: "Beginners column order aur values order match karna bhool jate hain, jisse galat data galat column me chala jata hai. Ek aur mistake: bahut saare rows ko loop me ek-ek karke insert karna instead of ek single multi-row INSERT — ye performance ko badly affect karta hai.",
    interviewDefinition: "INSERT INTO is a DML statement used to add one or more new rows of data into a table, either by providing values for all columns in order or by explicitly naming the target columns."
  },
  {
    id: 19,
    category: "Basic",
    question: "What is the SELECT statement used for?",
    shortAnswer: "SELECT statement database se data query aur retrieve karne ke liye use hota hai — ye SQL ka sabse zyada use hone wala command hai.",
    explanation: "SELECT ek DML command hai jo table(s) se data padhta hai, bina usse modify kiye. Isme hum specify kar sakte hain ki kaunse columns chahiye (ya '*' se sab columns), kaunsi table se, aur WHERE, ORDER BY, GROUP BY jaisi clauses se result ko filter/sort/group kar sakte hain. SELECT ka result ek 'result set' hota hai jo temporary hota hai (jab tak explicitly kisi table me store na kiya jaye).",
    example: "Sabhi employees ka naam aur salary retrieve karna jinki salary 50000 se zyada hai.",
    sql: "SELECT name, salary\nFROM employees\nWHERE salary > 50000;",
    output: "+--------+--------+\n| name   | salary |\n+--------+--------+\n| Priya  | 65000  |\n| Karan  | 72000  |\n+--------+--------+",
    mistakes: "Beginners hamesha 'SELECT *' use karte hain, jo unnecessary columns fetch karta hai aur performance ko affect karta hai — sirf zaroori columns select karna best practice hai. Ek aur mistake: bade tables par bina index ya WHERE clause ke SELECT chalana, jo slow query bana deta hai.",
    interviewDefinition: "SELECT is a DML statement used to query and retrieve data from one or more tables, optionally filtered, sorted, or grouped using additional clauses, without modifying the underlying data."
  },
  {
    id: 20,
    category: "Basic",
    question: "What is the WHERE clause used for?",
    shortAnswer: "WHERE clause SELECT, UPDATE, ya DELETE statements me rows ko filter karne ke liye use hota hai — sirf wahi rows affect hote hain jo condition satisfy karte hain.",
    explanation: "Bina WHERE clause ke, koi bhi query (SELECT, UPDATE, DELETE) poori table par apply hoti hai. WHERE ek condition define karta hai jise MySQL har row par check karta hai — agar condition TRUE hai to wo row result me include hoti hai (ya update/delete hoti hai), warna skip ho jati hai. Comparison operators (=, >, <, !=), logical operators (AND, OR, NOT), aur pattern matching (LIKE) sab WHERE ke saath use hote hain.",
    example: "Sirf un employees ko fetch karna jo 'Sales' department me hain aur jinki salary 40000 se zyada hai.",
    sql: "SELECT name, salary\nFROM employees\nWHERE department = 'Sales' AND salary > 40000;",
    output: "+-------+--------+\n| name  | salary |\n+-------+--------+\n| Aman  | 45000  |\n+-------+--------+",
    mistakes: "Sabse dangerous galti: UPDATE ya DELETE query me WHERE clause likhna bhool jana — isse poori table ki saari rows update ya delete ho jati hain. Ek aur common mistake: string values ko quotes ke bina likhna (jaise WHERE department = Sales bina quotes ke), jo syntax error deta hai.",
    interviewDefinition: "The WHERE clause filters rows in SELECT, UPDATE, or DELETE statements by specifying a condition that each row must satisfy to be included in the operation's result or effect."
  },
  {
    id: 21,
    category: "Beginner",
    question: "What does the ORDER BY clause do?",
    shortAnswer: "ORDER BY clause query ke result rows ko ek ya zyada columns ke basis par ascending (ASC) ya descending (DESC) order me sort karta hai.",
    explanation: "Default rows ka order guaranteed nahi hota (ye storage engine par depend karta hai), isliye jab bhi humein specific order me data chahiye — jaise sabse naya order pehle, ya salary ke hisaab se sabse zyada earning employee pehle — hum ORDER BY use karte hain. Default sorting ASC (ascending) hoti hai, DESC explicitly likhna padta hai descending ke liye. Multiple columns bhi diye ja sakte hain, jaha pehle column se sort hoga aur tie hone par doosre column se.",
    example: "Employees ko unki salary ke hisaab se highest se lowest order me dikhana.",
    sql: "SELECT name, salary\nFROM employees\nORDER BY salary DESC;",
    output: "+-------+--------+\n| name  | salary |\n+-------+--------+\n| Karan | 72000  |\n| Priya | 65000  |\n| Aman  | 45000  |\n+-------+--------+",
    mistakes: "Beginners sochte hain ki data hamesha insertion order me return hoga bina ORDER BY ke — ye galat assumption hai aur bade systems me unpredictable results deta hai. Ek aur mistake: ASC/DESC likhna bhool jana jab dono columns par alag order chahiye ho (jaise 'ORDER BY dept ASC, salary DESC').",
    interviewDefinition: "ORDER BY is a SQL clause used to sort the result set of a query in ascending or descending order based on one or more specified columns."
  },
  {
    id: 22,
    category: "Beginner",
    question: "What is LIMIT used for, and how does it work with OFFSET?",
    shortAnswer: "LIMIT clause query se return hone wali rows ki maximum sankhya restrict karta hai, aur OFFSET (ya LIMIT ke saath comma syntax) shuru ki kuch rows skip karne ke liye use hota hai.",
    explanation: "Jab table me lakhon rows ho, aur humein sirf top kuch results chahiye ho (jaise 'top 10 highest paid employees'), tab LIMIT bahut useful hota hai — ye performance ke liye bhi better hota hai kyunki MySQL zaroorat se zyada rows fetch nahi karta. OFFSET ke saath combine karke hum pagination implement kar sakte hain — jaise page 2 ke liye pehle 10 rows skip karke agle 10 rows fetch karna.",
    example: "Salary ke hisaab se top 3 highest-paid employees dikhana, aur phir pagination ke liye page 2 (rows 4-6) fetch karna.",
    sql: "-- Top 3 highest paid\nSELECT name, salary FROM employees\nORDER BY salary DESC\nLIMIT 3;\n\n-- Pagination: page 2, 3 rows per page\nSELECT name, salary FROM employees\nORDER BY salary DESC\nLIMIT 3 OFFSET 3;",
    output: "+-------+--------+\n| name  | salary |\n+-------+--------+\n| Karan | 72000  |\n| Priya | 65000  |\n| Sneha | 58000  |\n+-------+--------+",
    mistakes: "Log LIMIT ko ORDER BY ke bina use karte hain jab specific 'top' rows chahiye hoti hain — bina ORDER BY, LIMIT random rows return kar sakta hai kyunki order guaranteed nahi hota. Ek aur mistake: pagination me OFFSET ki value galat calculate karna (page number aur rows-per-page ka formula: OFFSET = (page-1) * pageSize).",
    interviewDefinition: "LIMIT restricts the number of rows returned by a query, and when combined with OFFSET, it allows skipping a specified number of rows first — commonly used to implement pagination."
  },
  {
    id: 23,
    category: "Beginner",
    question: "What is DISTINCT used for?",
    shortAnswer: "DISTINCT keyword SELECT query se duplicate rows ko remove karke sirf unique values return karta hai.",
    explanation: "Jab kisi column me repeated values ho (jaise 'department' column me multiple employees ka same department), aur humein sirf unique list chahiye ho (jaise 'company me kitne alag departments hain'), tab DISTINCT use karte hain. Ye poori row (ya select kiye gaye columns ka combination) ke basis par duplicates remove karta hai — agar multiple columns select kiye hain to unka pura combination unique hona chahiye.",
    example: "Company me maujood sabhi alag-alag departments ki list nikalna, bina repetition ke.",
    sql: "SELECT DISTINCT department\nFROM employees;",
    output: "+------------+\n| department |\n+------------+\n| Sales      |\n| IT         |\n| HR         |\n+------------+",
    mistakes: "Beginners DISTINCT ko multiple columns ke saath use karte waqt bhool jate hain ki ye 'combination' par apply hota hai, individual column par nahi — jaise 'SELECT DISTINCT dept, city' unique (dept, city) pairs return karega, sirf unique depts nahi. Ek aur mistake: DISTINCT ko performance-heavy queries me overuse karna jab actually GROUP BY ya proper indexing better solution ho.",
    interviewDefinition: "DISTINCT is a SQL keyword used with SELECT to eliminate duplicate rows from the result set, returning only unique combinations of the selected columns."
  },
  {
    id: 24,
    category: "Beginner",
    question: "How do you write comments in SQL?",
    shortAnswer: "SQL me single-line comments ke liye '--' (do hyphens + space) use hota hai, aur multi-line comments ke liye '/* ... */' use hota hai.",
    explanation: "Comments code ko readable aur maintainable banane ke liye use hote hain — ye explain karte hain ki query kya kar rahi hai, bina query ke execution ko affect kiye. MySQL execution ke time comments ko completely ignore kar deta hai. Single-line comment '--' ke baad ek space hona zaroori hai (MySQL syntax me), aur ye us line ke end tak sab kuch ignore kar deta hai. Multi-line comments '/* */' ke beech me kuch bhi likha ja sakta hai, chahe wo multiple lines me ho.",
    example: "Ek complex query me har part ko explain karne ke liye comments add karna.",
    sql: "-- Fetching all active employees\nSELECT name, status\nFROM employees\nWHERE status = 'active'; /* only active records needed for the report */",
    output: "+-------+--------+\n| name  | status |\n+-------+--------+\n| Priya | active |\n| Karan | active |\n+-------+--------+\n(Comments were ignored during execution)",
    mistakes: "Beginners '--' ke baad space daalna bhool jate hain (jaise '--comment' bina space ke), jo kabhi-kabhi expected behave nahi karta — MySQL me safe practice hai '-- ' (space ke saath) use karna. Ek aur mistake: '#' symbol ko bhool jana — MySQL me '#' bhi single-line comment ke liye valid hai (though '--' zyada standard/portable hai).",
    interviewDefinition: "SQL comments, written using '--' for single-line or '/* */' for multi-line blocks, are non-executable text used to document queries and are ignored entirely by the database engine at execution time."
  },
  {
    id: 25,
    category: "Beginner",
    question: "What is the difference between InnoDB and MyISAM storage engines?",
    shortAnswer: "InnoDB transactions, foreign keys, aur row-level locking support karta hai (data integrity ke liye best), jabki MyISAM inhe support nahi karta lekin simple read-heavy workloads me faster ho sakta hai.",
    explanation: "MySQL me 'storage engine' decide karta hai ki data actually disk par kaise store aur retrieve hota hai. InnoDB modern MySQL ka default engine hai — ye ACID-compliant transactions support karta hai (COMMIT/ROLLBACK), foreign key constraints enforce karta hai, aur row-level locking use karta hai (jisse concurrent writes better handle hoti hain). MyISAM ek purana engine hai jo transactions ya foreign keys support nahi karta, aur table-level locking use karta hai — isliye heavy write workloads me ye slow ho sakta hai, lekin kuch simple read-only scenarios me fast ho sakta tha. Aaj-kal almost hamesha InnoDB recommend kiya jata hai.",
    example: "Ek banking application jaha transactions aur data integrity critical hai, InnoDB use karega. MyISAM aajkal legacy systems me hi milta hai.",
    sql: "-- Specifying the storage engine explicitly\nCREATE TABLE transactions (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  amount DECIMAL(10,2)\n) ENGINE=InnoDB;\n\n-- Checking a table's current engine\nSHOW TABLE STATUS WHERE Name = 'transactions';",
    output: "+--------------+--------+\n| Name         | Engine |\n+--------------+--------+\n| transactions | InnoDB |\n+--------------+--------+",
    mistakes: "Beginners assume karte hain ki MySQL me sirf ek hi storage engine hota hai. Ek aur common galti: foreign keys use karne ki koshish karna jab table accidentally MyISAM engine par ban gaya ho — MyISAM foreign key constraints ko silently ignore kar deta hai, jo confusing bugs create karta hai.",
    interviewDefinition: "InnoDB is MySQL's default storage engine that supports ACID-compliant transactions, foreign keys, and row-level locking, whereas MyISAM lacks transaction and foreign key support and uses table-level locking, making InnoDB the recommended choice for almost all modern applications."
  },
  {
    id: 26,
    category: "Beginner",
    question: "What is the difference between WHERE and HAVING?",
    shortAnswer: "WHERE individual rows ko filter karta hai grouping se pehle, jabki HAVING grouped results ko filter karta hai GROUP BY ke baad — isliye HAVING me aggregate functions use kiye ja sakte hain, WHERE me nahi.",
    explanation: "MySQL query ko execute karte waqt pehle WHERE clause apply karta hai (row-by-row filtering, grouping se pehle), phir GROUP BY se rows group hoti hain, aur uske baad HAVING clause apply hota hai grouped data par. Isi wajah se WHERE me hum COUNT(), SUM() jaise aggregate functions directly use nahi kar sakte (kyunki grouping abhi hui hi nahi hoti), lekin HAVING me kar sakte hain. Simple rule: individual row condition ke liye WHERE, group ke result par condition ke liye HAVING.",
    example: "Un departments ko dikhana jinme 5 se zyada employees hain — ye ek group-level condition hai, isliye HAVING chahiye, WHERE nahi.",
    sql: "SELECT department, COUNT(*) AS total_employees\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5;",
    output: "+------------+-----------------+\n| department | total_employees |\n+------------+-----------------+\n| Sales      | 8               |\n| IT         | 6               |\n+------------+-----------------+",
    mistakes: "Beginners galti se 'WHERE COUNT(*) > 5' likhne ki koshish karte hain, jo syntax error deta hai kyunki WHERE grouping se pehle chalta hai. Ek aur mistake: performance ke liye HAVING me un conditions ko daal dena jo actually WHERE me daalni chahiye thi — non-aggregate conditions WHERE me likhna hamesha better hota hai kyunki isse grouping se pehle hi unnecessary rows filter ho jati hain.",
    interviewDefinition: "WHERE filters individual rows before any grouping occurs and cannot use aggregate functions, while HAVING filters grouped results after GROUP BY and is specifically designed to work with aggregate functions."
  },
  {
    id: 27,
    category: "Beginner",
    question: "What is the GROUP BY clause used for?",
    shortAnswer: "GROUP BY clause rows ko ek ya zyada columns ki common values ke basis par groups me organize karta hai, taaki unpar aggregate functions (jaise COUNT, SUM) apply kiye ja sakein.",
    explanation: "Jab hume 'per category summary' chahiye ho — jaise 'har department me kitne employees hain' ya 'har product category ki total sales kitni hai' — tab GROUP BY use karte hain. Ye same values wali rows ko ek single group me combine kar deta hai, aur phir SELECT me diye gaye aggregate functions har group ke liye alag-alag calculate hote hain. SELECT statement me jo columns GROUP BY me nahi hain, unhe generally aggregate function ke andar hi use karna chahiye.",
    example: "Har department ka total employee count nikalna.",
    sql: "SELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;",
    output: "+------------+-----------------+\n| department | employee_count  |\n+------------+-----------------+\n| Sales      | 8               |\n| IT         | 6               |\n| HR         | 3               |\n+------------+-----------------+",
    mistakes: "Beginners SELECT me aisi columns add kar dete hain jo na GROUP BY me hain na aggregate function ke andar — MySQL ka default (ONLY_FULL_GROUP_BY) mode isko error de sakta hai, aur agar disable ho to result unpredictable (arbitrary row ki value) hota hai. Ek aur mistake: GROUP BY use karke individual (non-grouped) row details expect karna, jo galat hai — GROUP BY summary data deta hai, detail-level nahi.",
    interviewDefinition: "GROUP BY is a SQL clause that groups rows sharing the same value in one or more columns, enabling aggregate functions to be calculated separately for each group rather than across the entire table."
  },
  {
    id: 28,
    category: "Beginner",
    question: "What are aggregate functions in MySQL? Name the common ones.",
    shortAnswer: "Aggregate functions multiple rows ki values par calculation karke ek single summary value return karte hain — common examples hain COUNT(), SUM(), AVG(), MIN(), aur MAX().",
    explanation: "Aggregate functions tab useful hote hain jab humein individual rows nahi, balki unka summary chahiye ho — jaise 'total kitne employees hain', 'average salary kya hai', ya 'sabse zyada aur sabse kam salary kaun si hai'. Ye functions aksar GROUP BY ke saath use hote hain (per-group summary ke liye), lekin bina GROUP BY ke bhi use ho sakte hain (jab poori table ka ek hi overall summary chahiye ho). Important: aggregate functions by default NULL values ko ignore karte hain (COUNT(*) ko chhodkar).",
    example: "Poori company ke total employees, average salary, aur highest salary nikalna — ek hi query se.",
    sql: "SELECT\n  COUNT(*) AS total_employees,\n  AVG(salary) AS average_salary,\n  MAX(salary) AS highest_salary,\n  MIN(salary) AS lowest_salary\nFROM employees;",
    output: "+------------------+----------------+----------------+---------------+\n| total_employees  | average_salary | highest_salary | lowest_salary |\n+------------------+----------------+----------------+---------------+\n| 17               | 54235.29       | 72000          | 32000         |\n+------------------+----------------+----------------+---------------+",
    mistakes: "Beginners bhool jate hain ki AVG(), SUM() jaise functions NULL values ko calculation me include nahi karte (unhe simply skip kar dete hain, zero nahi maante) — isse average calculate karte waqt confusion hoti hai. Ek aur mistake: aggregate function aur non-aggregate column ko bina GROUP BY ke saath select karna.",
    interviewDefinition: "Aggregate functions such as COUNT(), SUM(), AVG(), MIN(), and MAX() perform a calculation across a set of rows and return a single summarized value, typically ignoring NULLs in the underlying data."
  },
  {
    id: 29,
    category: "Intermediate",
    question: "What is the difference between COUNT(*) and COUNT(column_name)?",
    shortAnswer: "COUNT(*) table ki total rows count karta hai (NULL values sahit), jabki COUNT(column_name) sirf un rows ko count karta hai jaha us specific column ki value NULL nahi hai.",
    explanation: "COUNT(*) ye check nahi karta ki kisi column ki value NULL hai ya nahi — ye simply har row ko count karta hai, chahe usme koi column NULL ho. Lekin COUNT(column_name) sirf unhi rows ko ginta hai jinme us column ki value present (non-NULL) ho. Ye difference tab important ho jata hai jab kisi optional field (jaise 'phone_number') ki actual filled entries count karni ho, na ki total rows.",
    example: "'employees' table me 20 rows hain, lekin sirf 15 employees ne apna 'phone' number diya hai (baaki 5 me NULL hai).",
    sql: "SELECT\n  COUNT(*) AS total_rows,\n  COUNT(phone) AS employees_with_phone\nFROM employees;",
    output: "+-------------+-----------------------+\n| total_rows  | employees_with_phone  |\n+-------------+-----------------------+\n| 20          | 15                    |\n+-------------+-----------------------+",
    mistakes: "Beginners sochte hain COUNT(*) aur COUNT(column) hamesha same result denge — jab tak us column me NULL values na ho tab hi ye same hote hain. Ek aur mistake: COUNT(column) use karke 'total rows' nikalne ki koshish karna jab actually us column me NULLs ho sakte hain, jisse galat (kam) count aata hai.",
    interviewDefinition: "COUNT(*) counts all rows in a result set regardless of NULL values, whereas COUNT(column_name) counts only the rows where that specific column contains a non-NULL value."
  },
  {
    id: 30,
    category: "Intermediate",
    question: "Can you use HAVING with an aggregate function to filter groups? Give an example.",
    shortAnswer: "Haan — HAVING specifically isi ke liye design hua hai: GROUP BY se bane groups ko, unke aggregate function result ke basis par filter karna.",
    explanation: "HAVING ka sabse common real-world use case yahi hota hai — jaise 'sirf un customers ko dikhao jinhone 3 se zyada orders kiye hain', ya 'sirf un products ko dikhao jinki total sales 1 lakh se zyada hai'. Ye GROUP BY ke result (jo already summarized hai) par ek additional filter lagata hai. Multiple conditions bhi AND/OR se combine ki ja sakti hain.",
    example: "Un customers ko find karna jinhone 3 se zyada orders place kiye hain.",
    sql: "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 3;",
    output: "+-------------+--------------+\n| customer_id | order_count  |\n+-------------+--------------+\n| 101         | 5            |\n| 108         | 4            |\n+-------------+--------------+",
    mistakes: "Log HAVING me alias (jaise 'order_count') use karne ki koshish karte hain kuch RDBMS me jo allowed nahi hota — MySQL me actually SELECT alias HAVING me use karna allowed hai, jo dusre databases (jaise strict standard SQL) se different behavior hai, isliye interview me clarify karna acha hota hai. Ek aur mistake: HAVING ko WHERE ki jagah use karna jab condition non-aggregate ho — isse query unnecessarily slow ho sakti hai.",
    interviewDefinition: "HAVING is used after GROUP BY to filter groups based on the result of an aggregate function, such as retaining only groups whose row count, sum, or average exceeds a specified threshold."
  },
  {
    id: 31,
    category: "Intermediate",
    question: "What is the LIKE operator, and how do the % and _ wildcards work?",
    shortAnswer: "LIKE operator pattern-based text matching ke liye use hota hai — '%' zero ya zyada characters ko represent karta hai, aur '_' exactly ek character ko represent karta hai.",
    explanation: "Jab hume exact match nahi chahiye balki partial ya pattern-based match chahiye ho (jaise 'un sabhi employees ko dhoondo jinke naam Ra se start hote hain'), tab LIKE use karte hain. '%' wildcard kisi bhi length (zero including) ke characters ko match karta hai, jabki '_' sirf exactly ek character ko match karta hai. In dono ko combine bhi kiya ja sakta hai flexible patterns banane ke liye.",
    example: "Un employees ko dhoondna jinka naam 'Ra' se start hota hai, aur un emails ko dhoondna jinka domain exactly 5-letter ka hai.",
    sql: "-- Names starting with 'Ra'\nSELECT name FROM employees WHERE name LIKE 'Ra%';\n\n-- Exactly 5 characters, starting with 'A'\nSELECT name FROM employees WHERE name LIKE 'A____';",
    output: "+--------+\n| name   |\n+--------+\n| Rahul  |\n| Ravi   |\n+--------+",
    mistakes: "Beginners '%' aur '_' ke roles ko confuse kar dete hain, ya sochte hain '_' bhi 'kisi bhi length' match karega (actually ye sirf ek exact character match karta hai). Ek aur mistake: leading wildcard use karna (jaise '%text') jo table ka index use nahi kar pata, isliye ye large tables par slow ho sakta hai.",
    interviewDefinition: "The LIKE operator performs pattern matching in SQL, where the % wildcard matches zero or more characters and the underscore (_) wildcard matches exactly one character."
  },
  {
    id: 32,
    category: "Intermediate",
    question: "What is the IN operator used for?",
    shortAnswer: "IN operator ek column ki value ko multiple specified values ki ek list se compare karta hai, aur agar koi bhi match ho jaye to row include ho jati hai — ye multiple OR conditions likhne ka shortcut hai.",
    explanation: "Bina IN ke, agar humein 3-4 specific values check karni ho to hume multiple OR conditions likhni padti (jaise 'dept = A OR dept = B OR dept = C'). IN operator isko compact aur readable bana deta hai. Ye ek subquery ke result ke saath bhi use ho sakta hai, jisse dynamically list of values generate ki ja sakti hai.",
    example: "Employees ko dhoondna jo 'Sales', 'IT', ya 'HR' department me hain.",
    sql: "SELECT name, department\nFROM employees\nWHERE department IN ('Sales', 'IT', 'HR');",
    output: "+-------+------------+\n| name  | department |\n+-------+------------+\n| Aman  | Sales      |\n| Priya | IT         |\n| Meera | HR         |\n+-------+------------+",
    mistakes: "Beginners IN ke andar bahut badi list (jaise hazaron values) daal dete hain jo query ko slow bana sakta hai — aise cases me JOIN ya temporary table use karna better hota hai. Ek aur mistake: NOT IN use karte waqt list me NULL value ka hona bhool jana — agar list me ek bhi NULL ho to NOT IN unexpectedly zero rows return kar sakta hai.",
    interviewDefinition: "The IN operator checks whether a column's value matches any value in a specified list (or subquery result), serving as a concise alternative to multiple chained OR conditions."
  },
  {
    id: 33,
    category: "Intermediate",
    question: "What is the BETWEEN operator used for?",
    shortAnswer: "BETWEEN operator ek value ko given range (inclusive) ke andar check karta hai — jaise numbers, dates, ya even text values ke range ke liye.",
    explanation: "BETWEEN 'value1 AND value2' ka syntax use karta hai, aur ye dono end values (value1 aur value2) ko bhi include karta hai (inclusive range). Ye numeric ranges (jaise salary 30000 se 60000 ke beech) ke liye bahut common hai, lekin dates aur text ranges ke liye bhi use ho sakta hai. Ye internally '>= AND <=' ke equivalent hota hai, bas likhna aasan ho jata hai.",
    example: "Un employees ko dhoondna jinki salary 40000 se 60000 ke beech hai.",
    sql: "SELECT name, salary\nFROM employees\nWHERE salary BETWEEN 40000 AND 60000;",
    output: "+-------+--------+\n| name  | salary |\n+-------+--------+\n| Aman  | 45000  |\n| Sneha | 58000  |\n+-------+--------+",
    mistakes: "Beginners bhool jate hain ki BETWEEN inclusive hota hai (dono end values shamil hote hain) — kuch log expect karte hain ye exclusive hoga. Date ranges ke saath ek common mistake: 'BETWEEN 2026-01-01 AND 2026-01-31' likhna jab column DATETIME ho, jisse 31 Jan ke time-portion wale records (jaise 2026-01-31 10:00:00) miss ho sakte hain kyunki wo 'end of day' se pehle hi cutoff ho jata hai.",
    interviewDefinition: "The BETWEEN operator tests whether a value falls within an inclusive range defined by two boundary values, commonly used for filtering numeric, date, or text ranges."
  },
  {
    id: 34,
    category: "Intermediate",
    question: "How do you check for NULL values using IS NULL and IS NOT NULL?",
    shortAnswer: "NULL values ko check karne ke liye '=' operator kaam nahi karta — iske liye specifically 'IS NULL' ya 'IS NOT NULL' use karna padta hai.",
    explanation: "NULL ka matlab hai 'value unknown ya absent hai' — ye zero ya empty string ke barabar nahi hota. Isi wajah se 'column = NULL' hamesha unknown (effectively false jaisa behavior) return karta hai, kabhi TRUE nahi hota, chahe column actually NULL ho. Isliye MySQL me NULL check karne ke liye special operators 'IS NULL' aur 'IS NOT NULL' diye gaye hain, jo specifically NULL ki presence/absence test karte hain.",
    example: "Un employees ko dhoondna jinhone abhi tak apna phone number nahi diya (NULL hai).",
    sql: "SELECT name\nFROM employees\nWHERE phone IS NULL;",
    output: "+--------+\n| name   |\n+--------+\n| Kavita |\n| Rohan  |\n+--------+",
    mistakes: "Sabse common beginner mistake: 'WHERE phone = NULL' likhna, jo hamesha zero rows return karta hai (kyunki NULL kisi bhi cheez ke 'equal' nahi hota, khud NULL ke bhi nahi). Sahi tarika hai 'WHERE phone IS NULL' use karna.",
    interviewDefinition: "IS NULL and IS NOT NULL are special SQL operators used to test whether a column's value is missing or unknown, since standard comparison operators like '=' cannot reliably evaluate NULL values."
  },
  {
    id: 35,
    category: "Intermediate",
    question: "What is IFNULL() (or COALESCE()) used for in MySQL?",
    shortAnswer: "IFNULL() ek NULL value ko ek specified default value se replace karta hai; COALESCE() isi kaam ko generalize karta hai — multiple values me se pehla non-NULL value return karta hai.",
    explanation: "Kabhi-kabhi hume result me NULL dikhana pasand nahi hota (jaise report me) — us jagah hum ek fallback/default value dikhana chahte hain. IFNULL(expression, default_value) MySQL-specific function hai jo agar expression NULL hai to default_value return karta hai, warna original value. COALESCE() zyada flexible hai — ye multiple arguments accept karta hai aur unme se pehla non-NULL value return karta hai, aur ye standard SQL ka part hai (isliye zyada portable hai dusre databases ke liye).",
    example: "Employees ki phone list dikhana, aur agar phone NULL hai to 'Not Provided' text dikhana.",
    sql: "SELECT name, IFNULL(phone, 'Not Provided') AS phone\nFROM employees;\n\n-- COALESCE equivalent (more portable across databases)\nSELECT name, COALESCE(phone, 'Not Provided') AS phone\nFROM employees;",
    output: "+--------+---------------+\n| name   | phone         |\n+--------+---------------+\n| Kavita | Not Provided  |\n| Aman   | 9876543210    |\n+--------+---------------+",
    mistakes: "Beginners IFNULL() ko sirf MySQL me hi kaam karega ye samajh lete hain aur dusre databases (jaise PostgreSQL) me use karne ki koshish karte hain, jaha ye function exist nahi karta — waha COALESCE() use karna chahiye jo standard hai. Ek aur mistake: IFNULL() ke dono arguments ka data type mismatch rakhna, jo unexpected type conversion kar sakta hai.",
    interviewDefinition: "IFNULL() replaces a NULL value with a specified default in MySQL, while COALESCE() is the standard SQL equivalent that returns the first non-NULL value from a list of expressions."
  },
  {
    id: 36,
    category: "Intermediate",
    question: "What are column and table aliases (the AS keyword) used for?",
    shortAnswer: "Aliases (AS keyword se, ya kabhi bina AS ke bhi) columns ya tables ko ek temporary, aksar zyada readable naam dete hain — sirf us query ke result ke liye, actual schema change nahi hoti.",
    explanation: "Column aliases result set me column headings ko user-friendly banane ke liye use hote hain (jaise 'COUNT(*) AS total_employees'). Table aliases lambi table names ko short karne ke liye use hote hain, especially jab multiple tables JOIN ki jaa rahi ho aur query likhna repetitive ho jata — jaise 'employees AS e' likhkar baar-baar 'e.column_name' likhna. Aliases sirf query ke execution ke dauran valid hote hain, database me kuch permanently change nahi hota.",
    example: "'employees' table ko 'e' alias dena aur salary column ko 'monthly_salary' ke naam se dikhana.",
    sql: "SELECT e.name, e.salary AS monthly_salary\nFROM employees AS e\nWHERE e.department = 'IT';",
    output: "+-------+-----------------+\n| name  | monthly_salary  |\n+-------+-----------------+\n| Priya | 65000           |\n+-------+-----------------+",
    mistakes: "Beginners alias define karke usko WHERE clause me use karne ki koshish karte hain (jaise 'WHERE monthly_salary > 50000') — MySQL me ye technically kaam kar sakta hai kuch cases me, lekin standard SQL execution order ke hisaab se WHERE alias create hone se pehle evaluate hota hai, isliye safe practice hai original column name ya expression WHERE me repeat karna. Ek aur mistake: table alias define karne ke baad bhi original table name use karte rehna, jo confusing aur inconsistent code banata hai.",
    interviewDefinition: "Aliases, defined using the AS keyword, provide temporary, more readable names for columns or tables within the scope of a single query, without altering the actual database schema."
  },
  {
    id: 37,
    category: "Intermediate",
    question: "What is the CASE statement in SQL used for?",
    shortAnswer: "CASE statement SQL ka conditional logic (if-else jaisa) hai — ye condition ke basis par different values return karta hai, SELECT, WHERE, ya ORDER BY ke andar use ho sakta hai.",
    explanation: "CASE ek series of conditions check karta hai (WHEN...THEN) aur pehli TRUE condition ka result return karta hai; agar koi bhi condition match na ho to ELSE wali value return hoti hai (agar ELSE diya gaya ho, warna NULL). Ye tab bahut useful hota hai jab humein data ko categorize karna ho — jaise salary ke basis par employees ko 'High', 'Medium', 'Low' categories me classify karna, bina application code likhe.",
    example: "Employees ko unki salary ke basis par 'High Earner', 'Mid Earner', ya 'Entry Level' categorize karna.",
    sql: "SELECT name, salary,\n  CASE\n    WHEN salary >= 60000 THEN 'High Earner'\n    WHEN salary >= 40000 THEN 'Mid Earner'\n    ELSE 'Entry Level'\n  END AS salary_band\nFROM employees;",
    output: "+-------+--------+---------------+\n| name  | salary | salary_band   |\n+-------+--------+---------------+\n| Karan | 72000  | High Earner   |\n| Aman  | 45000  | Mid Earner    |\n| Rohan | 28000  | Entry Level   |\n+-------+--------+---------------+",
    mistakes: "Beginners CASE conditions ko galat order me likhte hain — CASE hamesha pehli matching condition use karta hai, isliye zyada specific/high-threshold conditions pehle likhni chahiye, warna wo kabhi reach hi nahi hongi. Ek aur mistake: END likhna bhool jana, jo syntax error deta hai.",
    interviewDefinition: "The CASE statement provides conditional logic within SQL queries, evaluating a series of WHEN conditions in order and returning the value from the first matching THEN clause, or the ELSE value if none match."
  },
  {
    id: 38,
    category: "Intermediate",
    question: "What is the difference between UNION and UNION ALL?",
    shortAnswer: "UNION do ya zyada SELECT queries ke results ko combine karta hai aur duplicate rows automatically remove kar deta hai, jabki UNION ALL sabhi rows ko rakhta hai, duplicates sahit — aur isliye faster hota hai.",
    explanation: "Dono operators tab use hote hain jab humein multiple SELECT statements ka result ek single result set me combine karna ho — condition ye hai ki dono queries me columns ki sankhya aur compatible data types same hone chahiye. UNION duplicate check karne ke liye internally sorting/comparison karta hai, jo extra processing add karta hai — isliye agar humein pata hai ki duplicates nahi honge ya duplicates matter nahi karte, to UNION ALL use karna better performance deta hai.",
    example: "'current_employees' aur 'former_employees' — dono tables ke naam ek single list me combine karna.",
    sql: "SELECT name FROM current_employees\nUNION\nSELECT name FROM former_employees;\n\n-- Faster version if duplicates are acceptable or impossible\nSELECT name FROM current_employees\nUNION ALL\nSELECT name FROM former_employees;",
    output: "+--------+\n| name   |\n+--------+\n| Priya  |\n| Karan  |\n| Rohan  |\n+--------+\n(UNION removes any duplicate names; UNION ALL would keep them)",
    mistakes: "Beginners UNION ko har jagah use kar dete hain bina soche ki duplicates matter karte hain ya nahi, jisse unnecessary performance cost aata hai. Ek aur mistake: dono SELECT statements me columns ki sankhya ya order match na hona, jo error deta hai — column names match karna zaroori nahi, lekin count aur compatible types zaroori hai.",
    interviewDefinition: "UNION combines the results of multiple SELECT statements and removes duplicate rows, while UNION ALL combines them without removing duplicates, making it faster since it skips the deduplication step."
  },
  {
    id: 39,
    category: "Intermediate",
    question: "What is a View in MySQL?",
    shortAnswer: "View ek virtual table hai jo ek stored SELECT query par based hoti hai — isme khud ka data store nahi hota, ye har baar underlying tables se live data fetch karta hai.",
    explanation: "View ek complex ya frequently-used query ko ek reusable, named object me 'save' karne ka tarika hai, taaki baar-baar wahi lambi query likhne ki zaroorat na pade — bas 'SELECT * FROM view_name' likhna kaafi hai. Views data security ke liye bhi use hote hain — jaise kisi user ko table ka sirf kuch columns dikhana (sensitive columns hide karke). Chunki view ek 'saved query' hai, iska data hamesha underlying tables se real-time fetch hota hai — jab tables update hoti hain, view ka result bhi automatically update dikhta hai.",
    example: "Ek view banana jo sirf active employees ke naam aur department dikhaye, salary jaisi sensitive information ko hide karke.",
    sql: "CREATE VIEW active_employee_summary AS\nSELECT name, department\nFROM employees\nWHERE status = 'active';\n\n-- Using the view like a regular table\nSELECT * FROM active_employee_summary;",
    output: "+-------+------------+\n| name  | department |\n+-------+------------+\n| Priya | IT         |\n| Aman  | Sales      |\n+-------+------------+",
    mistakes: "Beginners sochte hain view apna alag data physically store karta hai — actually ye sirf ek saved query hai (kuch specific 'materialized views' ke concepts ko chhodkar, jo MySQL me directly support nahi hote). Ek aur mistake: view ko update/insert karne ki koshish karna jab uski underlying query complex ho (jaise multiple joins ya aggregate functions ho) — aise views generally updatable nahi hote.",
    interviewDefinition: "A view is a virtual table based on a stored SELECT query; it does not store its own data but dynamically presents data from the underlying tables, and is often used to simplify complex queries or restrict access to specific columns."
  },
  {
    id: 40,
    category: "Intermediate",
    question: "What is the CHECK constraint in MySQL?",
    shortAnswer: "CHECK constraint ek condition define karta hai jo har row ke column value ko satisfy karni hi hoti hai — agar condition false ho to MySQL us row ko insert/update hone hi nahi deta.",
    explanation: "CHECK constraint data validation ko database level par enforce karta hai, taaki application code par depend na karna pade for basic business rules — jaise 'age hamesha 0 se zyada honi chahiye' ya 'salary negative nahi ho sakti'. Purane MySQL versions (5.7 se pehle) me CHECK constraint likha to ja sakta tha lekin silently ignore ho jata tha; MySQL 8.0.16+ se ye properly enforce hone laga hai.",
    example: "Ensure karna ki 'employees' table me 'salary' column hamesha 0 se zyada ho.",
    sql: "CREATE TABLE employees (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(50),\n  salary DECIMAL(10,2) CHECK (salary > 0)\n);\n\n-- Ye insert fail hogi:\nINSERT INTO employees (name, salary) VALUES ('Test', -5000);",
    output: "ERROR 3819 (HY000): Check constraint 'employees_chk_1' is violated.",
    mistakes: "Beginners purane MySQL versions (5.7 aur usse pehle) me CHECK constraint par bharosa kar lete hain, jabki wo silently ignore ho jata tha — production me use karne se pehle MySQL version confirm karna zaroori hai. Ek aur mistake: CHECK constraint ko complex business logic ke liye overuse karna jab wo application layer ya trigger me better handle ho sakta hai.",
    interviewDefinition: "The CHECK constraint enforces a condition on column values at the database level, rejecting any INSERT or UPDATE that would violate it, and has been fully supported in MySQL since version 8.0.16."
  },
  {
    id: 41,
    category: "Intermediate",
    question: "What are common string functions in MySQL? (CONCAT, UPPER, LOWER, SUBSTRING, TRIM)",
    shortAnswer: "MySQL string functions text data ko manipulate karne ke liye use hote hain — CONCAT() strings jodta hai, UPPER()/LOWER() case badalte hain, SUBSTRING() part nikalta hai, aur TRIM() extra spaces hataata hai.",
    explanation: "Real-world applications me data ko display-ready banane ke liye string manipulation bahut common hai — jaise first name aur last name ko jodkar full name banana, ya user input se accidental leading/trailing spaces hatana. MySQL in operations ke liye built-in functions deta hai, jisse application code me extra logic likhne ki zaroorat kam ho jati hai.",
    example: "Employee ka full name (first + last) banakar dikhana, aur unka email lowercase me normalize karna.",
    sql: "SELECT\n  CONCAT(first_name, ' ', last_name) AS full_name,\n  LOWER(email) AS normalized_email,\n  SUBSTRING(phone, 1, 3) AS area_code,\n  TRIM('  Rahul  ') AS trimmed_name\nFROM employees;",
    output: "+-------------+------------------------+------------+---------------+\n| full_name   | normalized_email       | area_code  | trimmed_name  |\n+-------------+------------------------+------------+---------------+\n| Rahul Verma | rahul.verma@example.com| 987        | Rahul         |\n+-------------+------------------------+------------+---------------+",
    mistakes: "Beginners SUBSTRING() ke indexing ko zero-based samajh lete hain — MySQL me string position 1 se start hoti hai, 0 se nahi. Ek aur mistake: TRIM() ko sirf spaces ke liye hi kaam karega samajhna — actually TRIM() specific characters bhi remove kar sakta hai jab explicitly specify kiya jaye (jaise TRIM(LEADING '0' FROM value)).",
    interviewDefinition: "MySQL provides built-in string functions like CONCAT() to join strings, UPPER()/LOWER() to change case, SUBSTRING() to extract a portion of a string, and TRIM() to remove unwanted leading or trailing characters."
  },
  {
    id: 42,
    category: "Intermediate",
    question: "What are common numeric functions in MySQL? (ROUND, CEIL, FLOOR, ABS)",
    shortAnswer: "ROUND() value ko specified decimal places tak round karta hai, CEIL() upar ki taraf nearest integer round karta hai, FLOOR() neeche ki taraf, aur ABS() kisi number ki absolute (non-negative) value deta hai.",
    explanation: "Numeric functions calculations ko clean aur presentable banane ke liye use hote hain — jaise price calculations me sirf 2 decimal places dikhana, ya discount ya inventory calculations me fractional units ko round karna. ROUND() ek second argument leta hai jo decimal places specify karta hai; agar na diya jaye to nearest whole number tak round hota hai.",
    example: "Product price ko 2 decimal places tak round karna, aur required stock ko upar ki taraf round karna (kyunki fractional units order nahi kiye ja sakte).",
    sql: "SELECT\n  ROUND(499.5678, 2) AS rounded_price,\n  CEIL(7.2) AS units_to_order,\n  FLOOR(7.9) AS complete_boxes,\n  ABS(-150) AS absolute_difference;",
    output: "+---------------+------------------+-----------------+----------------------+\n| rounded_price | units_to_order   | complete_boxes  | absolute_difference  |\n+---------------+------------------+-----------------+----------------------+\n| 499.57        | 8                | 7               | 150                  |\n+---------------+------------------+-----------------+----------------------+",
    mistakes: "Beginners ROUND() aur TRUNCATE() (ya FLOOR) ko same samajh lete hain — ROUND nearest value tak round karta hai (upar ya neeche dono), jabki FLOOR hamesha neeche round karta hai. Ek aur mistake: negative numbers ke saath CEIL/FLOOR ka behavior galat predict karna — jaise FLOOR(-7.2) ka result -8 hota hai, -7 nahi.",
    interviewDefinition: "MySQL's numeric functions include ROUND() to round a value to a given number of decimal places, CEIL() to round up to the nearest integer, FLOOR() to round down, and ABS() to return the non-negative magnitude of a number."
  },
  {
    id: 43,
    category: "Intermediate",
    question: "What are common date functions in MySQL? (NOW, CURDATE, DATEDIFF, DATE_FORMAT)",
    shortAnswer: "NOW() current date aur time deta hai, CURDATE() sirf current date deta hai, DATEDIFF() do dates ke beech din ka difference nikalta hai, aur DATE_FORMAT() date ko custom readable format me convert karta hai.",
    explanation: "Date functions reports, dashboards, aur business logic (jaise 'kitne din pehle order place hua tha') ke liye bahut common hain. NOW() date aur time dono deta hai (jaise '2026-01-15 10:30:00'), jabki CURDATE() sirf date part deta hai. DATEDIFF(date1, date2) do dates ke beech ka difference (days me) calculate karta hai. DATE_FORMAT() date ko application ke hisaab se human-readable format (jaise 'DD-MM-YYYY') me convert karta hai.",
    example: "Ek order kitne din pehle place hua, aur uski date ko readable format me dikhana.",
    sql: "SELECT\n  order_date,\n  DATEDIFF(CURDATE(), order_date) AS days_ago,\n  DATE_FORMAT(order_date, '%d-%m-%Y') AS formatted_date\nFROM orders;",
    output: "+---------------------+-----------+-----------------+\n| order_date          | days_ago  | formatted_date  |\n+---------------------+-----------+-----------------+\n| 2026-01-01 10:00:00 | 4         | 01-01-2026      |\n+---------------------+-----------+-----------------+",
    mistakes: "Beginners NOW() aur CURDATE() ko interchangeably use kar dete hain — agar sirf date-based comparison chahiye (time ignore karke) to CURDATE() zyada appropriate hai, warna time-portion mismatch ki wajah se comparisons galat result de sakte hain. Ek aur mistake: DATEDIFF() ke arguments ka order ulta likh dena, jisse negative number aa jata hai.",
    interviewDefinition: "MySQL provides date functions such as NOW() for the current date and time, CURDATE() for just the current date, DATEDIFF() to calculate the number of days between two dates, and DATE_FORMAT() to display dates in a custom format."
  },
  {
    id: 44,
    category: "Intermediate",
    question: "What is the difference between DATE, DATETIME, and TIMESTAMP data types?",
    shortAnswer: "DATE sirf date store karta hai (YYYY-MM-DD), DATETIME date aur time dono store karta hai bina timezone conversion ke, aur TIMESTAMP bhi date+time store karta hai lekin UTC me convert karke store hota hai aur ek limited range hai.",
    explanation: "DATE tab use hota hai jab time matter na kare — jaise 'date of birth'. DATETIME tab use hota hai jab exact moment chahiye ho bina kisi timezone logic ke — jaise 'event scheduled time'. TIMESTAMP internally UTC me store hota hai aur retrieve karte waqt session ke timezone ke hisaab se convert hota hai — isliye ye multi-timezone applications ke liye useful hai, lekin iski range DATETIME se choti hai (TIMESTAMP sirf 1970 se 2038 tak valid hai, jabki DATETIME 1000 se 9999 tak).",
    example: "'date_of_birth' ke liye DATE, 'event_datetime' ke liye DATETIME, aur 'created_at'/'updated_at' audit columns ke liye TIMESTAMP use karna (jo timezone-aware audit logging ke liye common practice hai).",
    sql: "CREATE TABLE events (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  event_name VARCHAR(100),\n  event_datetime DATETIME,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
    output: "Query OK, 0 rows affected\n(Table created with DATETIME for scheduling and TIMESTAMP for audit tracking)",
    mistakes: "Beginners TIMESTAMP ki 2038 range limitation ke baare me nahi jaante aur long-term data (jaise 'date_of_birth' ya future events 2040 ke baad) ke liye ise use kar dete hain, jisse future me overflow error aa sakta hai. Ek aur mistake: multi-server/multi-timezone applications me DATETIME use karna jaha actually TIMESTAMP zyada appropriate hota (timezone conversion ke liye).",
    interviewDefinition: "DATE stores only a calendar date, DATETIME stores date and time without any timezone conversion, and TIMESTAMP stores date and time internally as UTC with automatic timezone conversion, though it supports a narrower range (1970–2038) than DATETIME."
  },
  {
    id: 45,
    category: "Intermediate",
    question: "What is the ENUM data type in MySQL?",
    shortAnswer: "ENUM ek string object hai jiski value predefined list me se hi ek honi chahiye — ye tab useful hota hai jab column ki values ek fixed, chhoti list tak limited ho.",
    explanation: "ENUM tab use hota hai jab hum jaante hain ki column me sirf specific, limited values hi aa sakti hain — jaise 'order_status' (pending, shipped, delivered, cancelled), ya 'gender'. Internally MySQL ENUM values ko numbers ki tarah store karta hai (efficient storage), lekin display/query karte waqt hume string values dikhti hain. Ye data validation ka ek built-in tarika hai, application code me manual validation likhne ki zaroorat kam kar deta hai.",
    example: "'orders' table me 'status' column jiski values sirf 'pending', 'shipped', 'delivered', ya 'cancelled' ho sakti hain.",
    sql: "CREATE TABLE orders (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending'\n);\n\n-- Ye insert fail hogi:\nINSERT INTO orders (id, status) VALUES (1, 'processing');",
    output: "ERROR 1265 (01000): Data truncated for column 'status' at row 1",
    mistakes: "Beginners ENUM me naye values add karna chahte hain to bhool jate hain ki iske liye ALTER TABLE chalana padta hai (poori table structure modify hoti hai), jo bade tables par slow ho sakta hai. Ek aur mistake: ENUM ko aise data ke liye use karna jo frequently badalta rahe (jaise categories jo business logic se change hoti rahe) — aise cases me ek separate lookup table zyada flexible approach hai.",
    interviewDefinition: "ENUM is a MySQL string data type that restricts a column's values to a predefined list, enforcing data validation at the database level while storing the values efficiently as internal numeric indexes."
  },
  {
    id: 46,
    category: "Intermediate",
    question: "What is the difference between SIGNED and UNSIGNED integer types in MySQL?",
    shortAnswer: "SIGNED integers negative aur positive dono values store kar sakte hain, jabki UNSIGNED sirf zero aur positive values store karte hain — lekin isi wajah se UNSIGNED ka maximum positive range SIGNED se double ho jata hai.",
    explanation: "By default MySQL integer columns SIGNED hote hain. Agar hume pata hai ki koi column kabhi negative nahi hogi (jaise 'age', 'quantity', 'id'), to UNSIGNED use karke hum available range ko better utilize kar sakte hain — kyunki jo bits negative numbers store karne me use hoti, wo ab positive range badhane me use ho jati hain. Jaise INT SIGNED ki range hai -2,147,483,648 se 2,147,483,647 tak, jabki INT UNSIGNED ki range 0 se 4,294,967,295 tak hai.",
    example: "'quantity' column jo kabhi negative nahi ho sakta, use UNSIGNED banana taaki bigger range available ho.",
    sql: "CREATE TABLE inventory (\n  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,\n  quantity INT UNSIGNED DEFAULT 0\n);\n\n-- Ye insert fail/warn karegi:\nINSERT INTO inventory (id, quantity) VALUES (1, -5);",
    output: "ERROR 1264 (22003): Out of range value for column 'quantity' at row 1",
    mistakes: "Beginners UNSIGNED ko har numeric column par blindly apply kar dete hain, chahe wo column kabhi negative ho sakti ho (jaise 'temperature', 'balance', 'profit_loss') — aise columns SIGNED hi rehne chahiye. Ek aur mistake: UNSIGNED column me subtraction operation ka result negative aane par unexpected wraparound errors face karna.",
    interviewDefinition: "SIGNED integers can store both negative and positive values, while UNSIGNED integers store only non-negative values but offer roughly double the maximum positive range for the same storage size, making them suitable for columns like counts or IDs that are never negative."
  },
  {
    id: 47,
    category: "Intermediate",
    question: "What is NULL, and how is it different from zero or an empty string?",
    shortAnswer: "NULL ka matlab hai 'value unknown ya missing hai' — ye zero (jo ek actual numeric value hai) ya empty string (jo ek actual, though empty, text value hai) se completely different concept hai.",
    explanation: "NULL koi value nahi hai — ye represent karta hai ki us field ke liye koi data record hi nahi hua ya applicable hi nahi hai. Zero ek valid number hai (jaise 'balance = 0' matlab balance definitely zero hai), aur empty string '' ek valid (though empty) text value hai (jaise 'middle_name = ''' matlab explicitly record kiya gaya ki middle name nahi hai). NULL in dono se alag hai kyunki ye 'pata nahi' ya 'not applicable' represent karta hai. Yahi wajah hai ki NULL ke saath comparisons (=, !=) normal tarike se kaam nahi karte.",
    example: "Ek 'middle_name' column: NULL matlab 'humein pata nahi ki iska middle name hai ya nahi / entry hi nahi hui'; empty string '' matlab 'humne confirm kiya hai ki iska koi middle name nahi hai'.",
    sql: "SELECT\n  (NULL = NULL) AS null_equals_null,\n  (0 = '') AS zero_equals_empty,\n  (NULL IS NULL) AS is_null_check;",
    output: "+--------------------+---------------------+------------------+\n| null_equals_null   | zero_equals_empty   | is_null_check    |\n+--------------------+---------------------+------------------+\n| NULL                | 0                   | 1                |\n+--------------------+---------------------+------------------+",
    mistakes: "Beginners sochte hain 'NULL = NULL' TRUE return karega — actually ye NULL return karta hai (unknown), TRUE nahi. Ek aur mistake: NULL aur empty string ko application logic me same treat karna, jisse reports aur validations me galat conclusions nikalte hain (jaise 'kitne users ne middle name nahi diya' vs 'kitne users ka field hi empty hai').",
    interviewDefinition: "NULL represents an unknown or missing value in SQL, fundamentally different from zero (a valid numeric value) or an empty string (a valid but empty text value), and it requires special operators like IS NULL for accurate comparison."
  },
  {
    id: 48,
    category: "Intermediate",
    question: "What are ON DELETE CASCADE and ON UPDATE CASCADE in a foreign key?",
    shortAnswer: "ON DELETE CASCADE aur ON UPDATE CASCADE foreign key options hain jo automatically child table ke related rows ko delete ya update kar dete hain, jab parent table ka corresponding row delete ya update hota hai.",
    explanation: "Normally, agar hum ek parent row delete karne ki koshish karein jiske child table me related rows hain, MySQL error de deta hai (referential integrity violation). CASCADE option is behavior ko change kar deta hai: ON DELETE CASCADE ke saath, parent row delete hote hi uske sabhi related child rows bhi automatically delete ho jate hain. Isi tarah ON UPDATE CASCADE ke saath, agar parent ki key value update ho, to child table me bhi wo reference automatically update ho jata hai. Ye manual cleanup code likhne ki zaroorat khatam kar deta hai, lekin sochke use karna chahiye kyunki accidental data loss ho sakta hai.",
    example: "Agar ek 'customer' delete ho, to uske sabhi 'orders' bhi automatically delete ho jayein (agar business logic yahi chahti ho).",
    sql: "CREATE TABLE orders (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  customer_id INT,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(id)\n    ON DELETE CASCADE\n    ON UPDATE CASCADE\n);",
    output: "Query OK, 0 rows affected\n(Deleting a customer now automatically deletes their related orders)",
    mistakes: "Beginners ON DELETE CASCADE ko bina soche use kar dete hain, jisse ek accidental parent-row delete se related data ka bada chunk silently delete ho jata hai — production systems me isse 'soft deletes' (ek 'is_deleted' flag) se replace karna zyada safe hota hai. Ek aur mistake: CASCADE aur RESTRICT/SET NULL options ke behavior ko confuse karna.",
    interviewDefinition: "ON DELETE CASCADE and ON UPDATE CASCADE are foreign key options that automatically propagate a deletion or key change from a parent row to its related child rows, maintaining referential integrity without manual cleanup."
  },
  {
    id: 49,
    category: "Intermediate",
    question: "What is a Stored Procedure in MySQL?",
    shortAnswer: "Stored Procedure SQL statements ka ek precompiled, named block hai jo database ke andar store hota hai aur baar-baar call kiya ja sakta hai, parameters ke saath.",
    explanation: "Stored procedures complex, multi-step logic (jaise multiple queries, conditions, loops) ko database ke andar hi encapsulate karne ka tarika hain, taaki application code se baar-baar wahi lambi logic bhejni na pade — bas procedure ko call karna hota hai. Ye network round-trips kam karte hain (especially multi-step operations ke liye), aur logic ko centralize karte hain taaki multiple applications same business rule follow karein. In parameters (input) aur OUT parameters (output) dono support karte hain.",
    example: "Ek procedure banana jo employee ID lekar uski salary ek percentage se badha de.",
    sql: "DELIMITER //\nCREATE PROCEDURE GiveRaise(IN emp_id INT, IN percentage DECIMAL(5,2))\nBEGIN\n  UPDATE employees\n  SET salary = salary + (salary * percentage / 100)\n  WHERE id = emp_id;\nEND //\nDELIMITER ;\n\n-- Calling the procedure\nCALL GiveRaise(5, 10.0);",
    output: "Query OK, 0 rows affected\n(Procedure created; calling it increased employee 5's salary by 10%)",
    mistakes: "Beginners DELIMITER change karna bhool jate hain jab procedure me multiple statements (semicolons) ho, jisse MySQL confuse ho jata hai ki procedure definition kaha khatam hui. Ek aur mistake: business logic ko poori tarah stored procedures me daal dena, jisse code version control aur testing mushkil ho jata hai — aksar application layer me hi core logic rakhna better maintainability deta hai.",
    interviewDefinition: "A stored procedure is a precompiled, named collection of SQL statements stored in the database that can be executed repeatedly with input parameters, encapsulating reusable business logic and reducing network round-trips."
  },
  {
    id: 50,
    category: "Intermediate",
    question: "What is a Trigger in MySQL?",
    shortAnswer: "Trigger ek special stored program hai jo automatically execute hota hai jab table par ek specific event (INSERT, UPDATE, ya DELETE) hota hai — before ya after us event ke.",
    explanation: "Triggers tab useful hote hain jab humein har baar ek table par koi specific operation hone par automatically kuch action lena ho, bina application code me explicitly wo logic call kiye — jaise 'jab bhi ek naya order insert ho, product ka stock automatically kam ho jaye', ya 'jab bhi salary update ho, ek audit log table me entry create ho'. Trigger ke andar special references NEW aur OLD available hote hain jo respectively insert/update hone wali nayi value, aur update/delete se pehle wali purani value ko represent karte hain.",
    example: "Jab bhi 'employees' table me salary update ho, ek 'salary_audit_log' table me automatically entry create karna.",
    sql: "DELIMITER //\nCREATE TRIGGER before_salary_update\nBEFORE UPDATE ON employees\nFOR EACH ROW\nBEGIN\n  INSERT INTO salary_audit_log (employee_id, old_salary, new_salary, changed_at)\n  VALUES (OLD.id, OLD.salary, NEW.salary, NOW());\nEND //\nDELIMITER ;",
    output: "Query OK, 0 rows affected\n(Trigger created — every salary update now logs an audit entry automatically)",
    mistakes: "Beginners bahut saare triggers ek hi table par bana dete hain jo ek dusre ko chain-react karte hain, jisse debugging bahut mushkil ho jati hai aur performance bhi affect hoti hai. Ek aur mistake: heavy logic (jaise external API calls) triggers ke andar likhna, jo unhe slow aur unreliable banata hai — triggers lightweight, focused actions ke liye best hote hain.",
    interviewDefinition: "A trigger is a database object that automatically executes a defined set of SQL statements before or after an INSERT, UPDATE, or DELETE event on a table, commonly used for auditing, validation, or maintaining derived data."
  },
  {
    id: 51,
    category: "Intermediate",
    question: "What is a JOIN in SQL, and what are the main types?",
    shortAnswer: "JOIN do ya zyada tables ko ek common column ke basis par combine karta hai; main types hain INNER JOIN, LEFT JOIN, RIGHT JOIN, aur (MySQL me simulate kiya jaane wala) FULL OUTER JOIN.",
    explanation: "Relational databases me data normalize karke multiple tables me split kiya jata hai (jaise 'customers' aur 'orders' alag tables), taaki duplication kam ho. JOIN inhe query ke time wapas jodne ka tarika hai. Har JOIN type ye decide karta hai ki 'matching' aur 'non-matching' rows ke saath kya kiya jaye — INNER JOIN sirf match hone wali rows leta hai, jabki OUTER JOINs (LEFT/RIGHT/FULL) non-matching rows ko bhi include karte hain (missing side ke liye NULL ke saath).",
    example: "Har order ke saath uske customer ka naam dikhana — dono 'orders' aur 'customers' tables ko unke common column ('customer_id' aur 'id') se JOIN karke.",
    sql: "SELECT o.id AS order_id, c.name AS customer_name\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;",
    output: "+-----------+----------------+\n| order_id  | customer_name  |\n+-----------+----------------+\n| 1         | Rahul          |\n| 2         | Priya          |\n+-----------+----------------+",
    mistakes: "Beginners JOIN condition (ON clause) likhna bhool jate hain, jisse accidentally ek CROSS JOIN ban jata hai (har row ka har row se combination — jise 'Cartesian product' kehte hain), jo galat aur bahut bada result deta hai. Ek aur mistake: sabhi JOIN types ko same samajh lena, jabki har ek ka non-matching rows handle karne ka tarika alag hota hai.",
    interviewDefinition: "A JOIN combines rows from two or more tables based on a related column, with common types being INNER JOIN (matching rows only), LEFT/RIGHT JOIN (matching rows plus unmatched rows from one side), and FULL OUTER JOIN (unmatched rows from both sides)."
  },
  {
    id: 52,
    category: "Intermediate",
    question: "What is an INNER JOIN? Explain with an example.",
    shortAnswer: "INNER JOIN sirf un rows ko return karta hai jaha dono tables me JOIN condition satisfy hoti hai — matlab match na hone wali rows dono taraf se exclude ho jati hain.",
    explanation: "INNER JOIN sabse common aur default JOIN type hai. Ye do tables ke beech ek 'intersection' banata hai — sirf wahi rows result me aati hain jinka corresponding match dusri table me exist karta ho. Agar kisi customer ka koi order na ho, wo customer is result me bilkul nahi dikhega (kyunki match hi nahi hua orders table me).",
    example: "Sirf un customers ko dikhana jinhone kam se kam ek order place kiya ho.",
    sql: "SELECT c.name, o.id AS order_id\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;",
    output: "+--------+-----------+\n| name   | order_id  |\n+--------+-----------+\n| Rahul  | 1         |\n| Priya  | 2         |\n+--------+-----------+\n(Customers with zero orders do not appear at all)",
    mistakes: "Beginners INNER JOIN use karte hain jab actually unhe non-matching rows bhi chahiye hoti hain (jaise 'sabhi customers dikhao, chahe unka order ho ya na ho') — waha LEFT JOIN chahiye hota hai, INNER JOIN nahi. Ek aur mistake: multiple JOIN conditions ke beech AND ki jagah comma use karna, jo galat Cartesian-style result de sakta hai.",
    interviewDefinition: "An INNER JOIN returns only the rows where the join condition matches in both tables, effectively producing the intersection of the two datasets and excluding any unmatched rows from either side."
  },
  {
    id: 53,
    category: "Intermediate",
    question: "What is a LEFT JOIN (LEFT OUTER JOIN)?",
    shortAnswer: "LEFT JOIN left table ki sabhi rows return karta hai, chahe right table me match ho ya na ho — agar match na ho to right table ke columns me NULL aa jata hai.",
    explanation: "LEFT JOIN tab use hota hai jab humein 'primary' table (left side) ki har row chahiye ho, chahe uska related data dusri table me ho ya na ho. Ye especially useful hai 'missing data' find karne ke liye — jaise 'un customers ko dhoondo jinhone koi order nahi kiya' (jinke liye right table ki value NULL aayegi).",
    example: "Sabhi customers dikhana, unke orders ke saath — chahe unhone koi order kiya ho ya nahi.",
    sql: "SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;",
    output: "+--------+-----------+\n| name   | order_id  |\n+--------+-----------+\n| Rahul  | 1         |\n| Priya  | 2         |\n| Aman   | NULL      |\n+--------+-----------+\n(Aman has no orders, so order_id shows NULL instead of being excluded)",
    mistakes: "Beginners LEFT JOIN ke baad WHERE clause me right table ke column par simple condition laga dete hain (jaise 'WHERE o.status = \"pending\"'), jo effectively LEFT JOIN ko INNER JOIN me convert kar deta hai (kyunki NULL rows condition fail ho jaati hain) — is case me condition ko ON clause me daalna chahiye, WHERE me nahi. Ek aur mistake: 'un rows ko dhoondo jinka match nahi hai' ke liye 'WHERE o.id IS NULL' likhna bhool jana.",
    interviewDefinition: "A LEFT JOIN returns all rows from the left table along with matching rows from the right table, filling in NULLs for the right table's columns whenever no match exists — commonly used to find unmatched or missing related data."
  },
  {
    id: 54,
    category: "Intermediate",
    question: "What is a RIGHT JOIN?",
    shortAnswer: "RIGHT JOIN right table ki sabhi rows return karta hai, chahe left table me match ho ya na ho — ye LEFT JOIN ka mirror image hai.",
    explanation: "RIGHT JOIN, LEFT JOIN ke exact opposite tarike se kaam karta hai: is baar 'right' table ki har row guaranteed result me aati hai, aur left table se match na hone par left table ke columns NULL ho jate hain. Practically, RIGHT JOIN kam use hota hai kyunki tables ka order swap karke usi result ko LEFT JOIN se bhi achieve kiya ja sakta hai — isliye readability ke liye zyadatar developers LEFT JOIN hi prefer karte hain.",
    example: "Sabhi departments dikhana (chahe unme koi employee ho ya na ho) — 'departments' ko right table rakh kar.",
    sql: "SELECT e.name, d.department_name\nFROM employees e\nRIGHT JOIN departments d ON e.department_id = d.id;",
    output: "+-------+------------------+\n| name  | department_name  |\n+-------+------------------+\n| Priya | IT               |\n| NULL  | Legal            |\n+-------+------------------+\n(Legal department has no employees yet, but still appears)",
    mistakes: "Beginners RIGHT JOIN ko unnecessarily complex bana dete hain jab simply tables ka order swap karke LEFT JOIN se easily wahi result mil sakta tha — team conventions me consistency ke liye LEFT JOIN prefer karna common practice hai. Ek aur mistake: RIGHT JOIN aur LEFT JOIN ke result ko compare karte waqt table order badalna bhool jana.",
    interviewDefinition: "A RIGHT JOIN returns all rows from the right table along with matching rows from the left table, filling in NULLs for the left table's columns when no match is found — functionally the mirror image of a LEFT JOIN."
  },
  {
    id: 55,
    category: "Intermediate",
    question: "MySQL FULL OUTER JOIN directly support nahi karta — ise kaise simulate karte hain?",
    shortAnswer: "MySQL me FULL OUTER JOIN ko LEFT JOIN aur RIGHT JOIN ke results ko UNION ke through combine karke simulate kiya jata hai.",
    explanation: "FULL OUTER JOIN dono tables ki sabhi rows return karta hai — matching aur non-matching, dono sides se. MySQL is JOIN type ko natively support nahi karta (jabki PostgreSQL, SQL Server karte hain). Solution hai: pehle LEFT JOIN karo (left table ki sab rows + matches), phir RIGHT JOIN karo (right table ki sab rows + matches), aur dono results ko UNION se combine kar do — UNION automatically overlapping (matching) rows ko duplicate hone se bhi bacha leta hai.",
    example: "Sabhi customers aur sabhi orders dikhana — chahe customer ka koi order ho ya na ho, aur chahe order ka koi valid customer ho ya na ho (data inconsistency check karne ke liye).",
    sql: "SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\n\nUNION\n\nSELECT c.name, o.id AS order_id\nFROM customers c\nRIGHT JOIN orders o ON c.id = o.customer_id;",
    output: "+--------+-----------+\n| name   | order_id  |\n+--------+-----------+\n| Rahul  | 1         |\n| Priya  | 2         |\n| Aman   | NULL      |\n| NULL   | 9         |\n+--------+-----------+\n(Aman has no orders, and order #9 has no matching customer)",
    mistakes: "Beginners UNION ki jagah UNION ALL use kar dete hain is simulation me, jisse matching rows duplicate ho jati hain (kyunki wo LEFT aur RIGHT dono queries me appear hoti hain). Ek aur mistake: sochna ki MySQL 8+ me FULL OUTER JOIN keyword directly available ho gaya hai — abhi bhi ye natively supported nahi hai.",
    interviewDefinition: "Since MySQL does not natively support FULL OUTER JOIN, it is simulated by combining a LEFT JOIN and a RIGHT JOIN using UNION, which returns all matched and unmatched rows from both tables while automatically eliminating duplicate overlapping rows."
  },
  {
    id: 56,
    category: "Intermediate",
    question: "What is a Self Join?",
    shortAnswer: "Self Join ek table ko khud ke saath JOIN karta hai — usually table ko do alag aliases dekar, taaki table ke andar hi related rows compare ki ja sakein.",
    explanation: "Self Join tab use hota hai jab ek table ke andar hi rows ke beech koi relationship ho — jaise 'employees' table me har employee ka ek 'manager_id' ho jo khud usi table ke kisi employee ki id ko refer karta ho. Chunki hum same table ko do baar reference kar rahe hain, dono instances ko alag-alag aliases dena zaroori hota hai (jaise 'e' for employee, 'm' for manager) taaki MySQL confuse na ho.",
    example: "Har employee ka naam uske manager ke naam ke saath dikhana, jaha manager bhi 'employees' table ka hi ek row hai.",
    sql: "SELECT e.name AS employee_name, m.name AS manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
    output: "+----------------+----------------+\n| employee_name  | manager_name   |\n+----------------+----------------+\n| Aman           | Priya          |\n| Priya          | Karan          |\n| Karan          | NULL           |\n+----------------+----------------+\n(Karan has no manager — likely the top of the hierarchy)",
    mistakes: "Beginners table ko do baar alias diye bina reference karne ki koshish karte hain, jo 'ambiguous column' error deta hai. Ek aur mistake: INNER JOIN use karna jab top-level rows (jinka koi parent/manager nahi) bhi dikhane hon — waha LEFT JOIN zaroori hai taaki NULL manager wale bhi include ho.",
    interviewDefinition: "A self join joins a table to itself, typically using two different aliases, to compare or relate rows within the same table — commonly used for hierarchical data such as an employee-manager relationship."
  },
  {
    id: 57,
    category: "Intermediate",
    question: "What is a CROSS JOIN?",
    shortAnswer: "CROSS JOIN ek table ki har row ko dusri table ki har row ke saath combine karta hai (Cartesian product), bina kisi matching condition ke.",
    explanation: "Normal JOINs me ek ON condition hoti hai jo decide karti hai kaunsi rows match karti hain. CROSS JOIN me koi matching condition hi nahi hoti — ye simply dono tables ka har possible combination generate kar deta hai. Agar table A me m rows hain aur table B me n rows, to result me m*n rows aayengi. Ye tab useful hota hai jab humein saare possible combinations chahiye ho — jaise 'saari sizes' ko 'saare colors' ke saath combine karke product variants generate karna.",
    example: "3 sizes (S, M, L) aur 2 colors (Red, Blue) ke saare possible product variant combinations generate karna.",
    sql: "SELECT s.size_name, c.color_name\nFROM sizes s\nCROSS JOIN colors c;",
    output: "+------------+-------------+\n| size_name  | color_name  |\n+------------+-------------+\n| S          | Red         |\n| S          | Blue        |\n| M          | Red         |\n| M          | Blue        |\n| L          | Red         |\n| L          | Blue        |\n+------------+-------------+",
    mistakes: "Sabse common galti: accidentally CROSS JOIN create karna — ye tab hota hai jab do tables ko FROM clause me comma se separate kiya jaye lekin WHERE/ON me koi matching condition dena bhool jaye, jisse ek bahut bada aur galat result set ban jata hai. Ye large tables par performance ke liye bhi dangerous ho sakta hai.",
    interviewDefinition: "A CROSS JOIN produces the Cartesian product of two tables, pairing every row from one table with every row from the other with no matching condition, resulting in a row count equal to the product of both tables' row counts."
  },
  {
    id: 58,
    category: "Intermediate",
    question: "What is the difference between using a JOIN and a Subquery?",
    shortAnswer: "JOIN tables ko horizontally combine karta hai (columns side by side laata hai), jabki subquery ek query ke result ko dusri query ke andar ek value/list/table ki tarah use karta hai — dono se same result mil sakta hai, lekin performance aur readability alag ho sakti hai.",
    explanation: "Kai cases me ek hi problem JOIN aur subquery — dono se solve ho sakta hai. JOIN generally tab better hota hai jab humein dono tables ka data ek saath (side-by-side columns me) dikhana ho, aur MySQL optimizer usually JOINs ko efficiently execute karta hai. Subquery tab zyada readable ho sakta hai jab humein sirf filter ke liye dusri table ka data chahiye ho (jaise 'IN' ya 'EXISTS' ke saath), bina uske columns ko final result me dikhaye. Modern MySQL optimizer aksar dono ko similar execution plan me convert kar deta hai, lekin correlated subqueries kabhi-kabhi JOIN se slower ho sakti hain agar unoptimized ho.",
    example: "Un customers ko dhoondna jinhone kam se kam ek order kiya hai — JOIN aur subquery, dono tarike se.",
    sql: "-- Using JOIN\nSELECT DISTINCT c.name\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;\n\n-- Using Subquery\nSELECT name\nFROM customers\nWHERE id IN (SELECT customer_id FROM orders);",
    output: "+--------+\n| name   |\n+--------+\n| Rahul  |\n| Priya  |\n+--------+\n(Both queries return the same result set)",
    mistakes: "Beginners sochte hain subquery hamesha JOIN se slower hota hai — actual performance query aur data ke structure par depend karta hai, aur MySQL 8's optimizer aksar in-list subqueries ko efficiently handle karta hai. Ek aur mistake: correlated subquery ko har outer row ke liye baar-baar execute hone dena jab actually usko JOIN me refactor karke ek hi baar me solve kiya ja sakta tha.",
    interviewDefinition: "A JOIN combines columns from multiple tables into a single result set, while a subquery nests one query inside another to filter or compute a value — both can often achieve the same result, with the optimal choice depending on readability and the query optimizer's execution plan."
  },
  {
    id: 59,
    category: "Intermediate",
    question: "What is a Subquery? What are its common types?",
    shortAnswer: "Subquery ek query hai jo dusri (outer) query ke andar nested hoti hai; common types hain single-row subquery, multi-row subquery, aur correlated subquery.",
    explanation: "Subquery ko parentheses () ke andar likha jata hai, aur ye SELECT, WHERE, ya FROM clause ke andar use ho sakta hai. Single-row subquery sirf ek value return karta hai (jaise 'average salary se zyada earning employees dhoondo' me AVG() ek single number return karta hai). Multi-row subquery multiple values return karta hai (jaise IN operator ke saath use hota hai). Correlated subquery outer query ki har row ke liye alag se re-execute hota hai, kyunki uske andar outer query ke column ka reference hota hai.",
    example: "Un employees ko dhoondna jinki salary company ki average salary se zyada hai — ye ek single-row subquery ka example hai.",
    sql: "SELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);",
    output: "+-------+--------+\n| name  | salary |\n+-------+--------+\n| Priya | 65000  |\n| Karan | 72000  |\n+-------+--------+",
    mistakes: "Beginners multi-row subquery ke result ko '=' operator ke saath compare karne ki koshish karte hain (jaise 'WHERE dept_id = (SELECT id FROM ...)' jab subquery multiple rows return kare), jo 'Subquery returns more than 1 row' error deta hai — waha IN operator use karna chahiye. Ek aur mistake: subquery aur outer query ke column names ko confuse karna, especially correlated subqueries me.",
    interviewDefinition: "A subquery is a query nested inside another SQL statement, categorized as single-row (returns one value), multi-row (returns multiple values, often used with IN), or correlated (references the outer query and re-executes for each outer row)."
  },
  {
    id: 60,
    category: "Intermediate",
    question: "What is a Correlated Subquery? Give an example.",
    shortAnswer: "Correlated Subquery ek aisi subquery hai jo outer query ke column ko reference karti hai, isliye ye independently execute nahi ho sakti — outer query ki har row ke liye ye baar-baar (re-)execute hoti hai.",
    explanation: "Normal ('non-correlated') subquery ek baar execute hoti hai aur uska result outer query use karti hai. Lekin correlated subquery ke andar outer table ka koi column reference hota hai, isliye MySQL ko outer query ki har row ke liye subquery ko dobara evaluate karna padta hai — ye conceptually ek loop jaisa kaam karta hai. Ye powerful hai (jaise 'per-row' comparisons ke liye) lekin agar table badi ho to performance par asar daal sakta hai.",
    example: "Un employees ko dhoondna jinki salary unke apne department ki average salary se zyada hai (har department ki alag average, isliye outer row ke department ko reference karna padta hai).",
    sql: "SELECT e1.name, e1.salary, e1.department\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(e2.salary)\n  FROM employees e2\n  WHERE e2.department = e1.department\n);",
    output: "+-------+--------+------------+\n| name  | salary | department |\n+-------+--------+------------+\n| Priya | 65000  | IT         |\n| Aman  | 45000  | Sales      |\n+-------+--------+------------+\n(Each employee is compared only against their own department's average)",
    mistakes: "Beginners correlated subqueries ko bade tables par unoptimized use kar dete hain, jisse query bahut slow ho jati hai (kyunki subquery baar-baar re-run hoti hai) — aksar isko window functions (jaise AVG() OVER (PARTITION BY department)) se replace karke better performance mil sakti hai. Ek aur mistake: outer aur inner query ke aliases ko sahi se distinguish na karna, jisse galat column reference ho jata hai.",
    interviewDefinition: "A correlated subquery references a column from the outer query, causing it to be re-evaluated once for every row processed by the outer query, unlike a standard subquery which executes independently and only once."
  },
  {
    id: 61,
    category: "Advanced",
    question: "What is a CTE (Common Table Expression)? How does the WITH clause work?",
    shortAnswer: "CTE ek temporary, named result set hai jo WITH clause se define hota hai aur usi query ke andar ek ya zyada baar reference kiya ja sakta hai — ye complex queries ko readable, modular blocks me todne me madad karta hai.",
    explanation: "CTE ko subquery ka ek zyada readable alternative maan sakte hain — especially jab same subquery-jaisa logic query me multiple jagah repeat ho raha ho, ya jab nested subqueries bahut confusing ho rahi ho. WITH clause se hum ek CTE define karte hain (jaise 'WITH high_earners AS (...)'), aur phir usko main query me ek normal table ki tarah reference kar sakte hain. CTE sirf usi query ke duration tak exist karta hai — permanently store nahi hota (View ke ulat).",
    example: "Pehle un employees ko find karna jinki salary 50000 se zyada hai (CTE ke through), phir unhe unke department ke saath JOIN karna.",
    sql: "WITH high_earners AS (\n  SELECT id, name, salary, department_id\n  FROM employees\n  WHERE salary > 50000\n)\nSELECT h.name, h.salary, d.department_name\nFROM high_earners h\nINNER JOIN departments d ON h.department_id = d.id;",
    output: "+-------+--------+------------------+\n| name  | salary | department_name  |\n+-------+--------+------------------+\n| Priya | 65000  | IT               |\n| Karan | 72000  | Sales            |\n+-------+--------+------------------+",
    mistakes: "Beginners sochte hain CTE performance ko automatically improve kar deta hai — actually CTE mainly readability ke liye hai; MySQL internally isko aksar subquery jaisa hi treat karta hai (kuch cases me materialize bhi kar sakta hai). Ek aur mistake: CTE ko baar-baar main query me use karke ye expect karna ki ye sirf ek baar hi evaluate hoga — MySQL me non-recursive CTE har reference par phir se evaluate ho sakta hai unless optimizer use materialize kare.",
    interviewDefinition: "A CTE (Common Table Expression), defined using the WITH clause, is a named, temporary result set scoped to a single query, used to break down complex logic into readable, reusable blocks without permanently storing any data."
  },
  {
    id: 62,
    category: "Advanced",
    question: "What is a Recursive CTE? Give a use case.",
    shortAnswer: "Recursive CTE ek CTE hai jo khud ko reference karta hai, taaki hierarchical ya tree-structured data (jaise organization chart, category tree) ko level-by-level traverse kiya ja sake.",
    explanation: "Recursive CTE do parts se milkar bana hota hai: ek 'anchor member' (starting point define karta hai) aur ek 'recursive member' (jo baar-baar khud ko call karta hai, har baar previous result ke basis par agla level nikaalta hai), dono UNION ALL se joined. Ye process tab tak chalta hai jab tak recursive part koi naya row return karna band na kar de. Ye employee-manager hierarchy, category-subcategory trees, ya folder structures jaise self-referencing data ke liye perfect hai.",
    example: "Ek employee se shuru karke uski poori management chain (upar tak ke sabhi managers) nikaalna.",
    sql: "WITH RECURSIVE management_chain AS (\n  SELECT id, name, manager_id\n  FROM employees\n  WHERE id = 5           -- anchor: starting employee\n\n  UNION ALL\n\n  SELECT e.id, e.name, e.manager_id\n  FROM employees e\n  INNER JOIN management_chain mc ON e.id = mc.manager_id\n)\nSELECT * FROM management_chain;",
    output: "+----+--------+------------+\n| id | name   | manager_id |\n+----+--------+------------+\n| 5  | Aman   | 3          |\n| 3  | Priya  | 1          |\n| 1  | Karan  | NULL       |\n+----+--------+------------+\n(The chain climbs upward until it reaches someone with no manager)",
    mistakes: "Beginners termination condition define karna bhool jate hain (jaise anchor query missing ho ya recursive part kabhi 'stop' na ho), jisse infinite loop ban jata hai — MySQL me is se bachne ke liye 'cte_max_recursion_depth' system variable ek safety limit deta hai, jo error throw kar deta hai agar recursion bahut deep ho jaye. Ek aur mistake: UNION ki jagah UNION ALL na use karna, jo unnecessary deduplication overhead add karta hai.",
    interviewDefinition: "A recursive CTE is a common table expression that references itself, consisting of an anchor query and a recursive query joined with UNION ALL, commonly used to traverse hierarchical or tree-structured data such as organizational charts."
  },
  {
    id: 63,
    category: "Advanced",
    question: "What are Window Functions in MySQL?",
    shortAnswer: "Window functions har row ke liye calculation karte hain rows ke ek defined 'window' (set) par, lekin GROUP BY ke unlike, individual rows ko collapse/merge nahi karte — result me original rows ki sankhya as-it-is rehti hai.",
    explanation: "Normal aggregate functions (jab GROUP BY ke saath use hote hain) multiple rows ko ek single summary row me combine kar dete hain. Window functions is se different hain — ye bhi ek set of rows par calculation karte hain (jise 'window' kehte hain, OVER() clause se define hota hai), lekin har original row apni jagah result me bani rehti hai, bas usme ek extra calculated column add ho jata hai. Ye 'running totals', 'rankings', 'moving averages' jaise use cases ke liye perfect hain jaha humein detail row bhi chahiye aur aggregate insight bhi.",
    example: "Har employee ki salary ke saath, uske department ki average salary bhi dikhana — bina rows ko collapse kiye.",
    sql: "SELECT name, department, salary,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary\nFROM employees;",
    output: "+-------+------------+--------+------------------+\n| name  | department | salary | dept_avg_salary  |\n+-------+------------+--------+------------------+\n| Priya | IT         | 65000  | 60000            |\n| Rohan | IT         | 55000  | 60000            |\n| Aman  | Sales      | 45000  | 45000            |\n+-------+------------+--------+------------------+",
    mistakes: "Beginners window functions aur GROUP BY ko confuse kar dete hain, ya sochte hain window function bhi rows ko group/collapse kar dega — actually iska poora fayda hi ye hai ki original rows preserve rehti hain. Ek aur mistake: PARTITION BY ko GROUP BY jaisa treat karna jabki PARTITION BY sirf window function ke andar 'sub-groups' define karta hai, poori query ko group nahi karta.",
    interviewDefinition: "Window functions perform calculations across a defined set of rows (a 'window') related to the current row, using the OVER() clause, without collapsing the result into a single row per group — unlike traditional GROUP BY aggregation."
  },
  {
    id: 64,
    category: "Advanced",
    question: "What is the ROW_NUMBER() window function?",
    shortAnswer: "ROW_NUMBER() har row ko ek unique, sequential number assign karta hai (1, 2, 3...) based on ek specified order — chahe values duplicate hi kyun na hon, har row ko alag number milta hai.",
    explanation: "ROW_NUMBER() tab useful hota hai jab humein rows ko rank karna ho lekin har row ko strictly unique number chahiye ho, chahe unke values same hi kyun na ho (RANK() ke unlike, jo ties ko same rank deta hai). Ye aksar PARTITION BY ke saath combine hota hai jab humein 'har group ke andar' separate numbering chahiye ho — jaise 'har department me salary ke hisaab se top employee dhoondna'.",
    example: "Har department ke andar employees ko unki salary ke hisaab se rank karna (department-wise numbering).",
    sql: "SELECT name, department, salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept\nFROM employees;",
    output: "+-------+------------+--------+---------------+\n| name  | department | salary | rank_in_dept  |\n+-------+------------+--------+---------------+\n| Priya | IT         | 65000  | 1             |\n| Rohan | IT         | 55000  | 2             |\n| Aman  | Sales      | 45000  | 1             |\n+-------+------------+--------+---------------+",
    mistakes: "Beginners ROW_NUMBER() aur RANK() ko same samajh lete hain — ROW_NUMBER() kabhi bhi duplicate number nahi deta (chahe values tie ho), jabki RANK() tied values ko same rank deta hai. Ek aur mistake: ORDER BY clause OVER() ke andar likhna bhool jana, jisse row numbering ka order unpredictable ho jata hai.",
    interviewDefinition: "ROW_NUMBER() is a window function that assigns a unique, sequential integer to each row within its partition based on a specified order, with no ties — every row receives a distinct number even if its values match another row's."
  },
  {
    id: 65,
    category: "Advanced",
    question: "What is the difference between RANK() and DENSE_RANK()?",
    shortAnswer: "RANK() tied (same value wali) rows ko same rank deta hai, lekin agla rank number tied rows ki count ke hisaab se skip kar deta hai; DENSE_RANK() bhi tied rows ko same rank deta hai, lekin agla rank number kabhi skip nahi karta.",
    explanation: "Dono functions duplicate values ko same ranking dete hain, farq sirf next rank number me hota hai. Agar 2 employees ki salary same hai aur dono ko rank 1 mila, to RANK() agle unique value ko rank 3 dega (rank 2 skip ho jayega, kyunki 2 rows already rank 1 le chuki), jabki DENSE_RANK() agle unique value ko rank 2 hi dega (koi gap nahi chhodega). Ye choice business requirement par depend karta hai — jaise 'competition rankings' me RANK() zyada natural lagta hai (jaise Olympics), jabki 'tier grouping' ke liye DENSE_RANK() better hota hai.",
    example: "Employees ko unki salary ke hisaab se rank karna jaha do employees ki salary same hai.",
    sql: "SELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rank_with_gaps,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS rank_no_gaps\nFROM employees;",
    output: "+-------+--------+------------------+-----------------+\n| name  | salary | rank_with_gaps   | rank_no_gaps    |\n+-------+--------+------------------+-----------------+\n| Karan | 72000  | 1                | 1               |\n| Priya | 65000  | 2                | 2               |\n| Sneha | 65000  | 2                | 2               |\n| Aman  | 45000  | 4                | 3               |\n+-------+--------+------------------+-----------------+",
    mistakes: "Beginners RANK() aur DENSE_RANK() ke output ko same expect karte hain jab tak koi ties na ho — ties na hone par dono function same result dete hain, isliye difference sirf tab dikhta hai jab actual duplicate values ho. Ek aur mistake: 'top N' results nikalne ke liye rank column par WHERE clause directly laga dena — actually rank ek window function hai, isliye isko WHERE me use nahi kar sakte, ek outer query ya subquery/CTE ke through filter karna padta hai.",
    interviewDefinition: "RANK() assigns the same rank to tied rows but leaves a gap in the ranking sequence equal to the number of ties, whereas DENSE_RANK() also assigns the same rank to ties but continues the ranking sequence without any gaps."
  },
  {
    id: 66,
    category: "Advanced",
    question: "What is the difference between Window Functions and GROUP BY aggregate functions?",
    shortAnswer: "GROUP BY ke saath aggregate functions multiple rows ko ek single summarized row me collapse kar dete hain, jabki window functions calculation to similar karte hain lekin original, individual rows ko as-it-is rakhte hain.",
    explanation: "Ye difference samajhna interview me bahut important hai. 'SELECT department, AVG(salary) FROM employees GROUP BY department' sirf ek row-per-department deta hai — individual employee ki details result me nahi milti. Lekin 'SELECT name, salary, AVG(salary) OVER (PARTITION BY department)' har employee ki apni row rakhta hai, aur uske saath ek extra column me department ka average bhi dikhata hai. Window functions is liye zyada flexible hain jab humein 'detail + summary' dono ek saath chahiye ho.",
    example: "Har employee ki salary ke saath, unke department ki average salary bhi ek hi row me dikhana — bina detail rows kho diye.",
    sql: "-- GROUP BY: only summary rows (one per department)\nSELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department;\n\n-- Window Function: detail rows preserved, plus the summary as an extra column\nSELECT name, department, salary,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg\nFROM employees;",
    output: "-- GROUP BY result:\n+------------+-------------+\n| department | avg_salary  |\n+------------+-------------+\n| IT         | 60000       |\n+------------+-------------+\n\n-- Window function result:\n+-------+------------+--------+-----------+\n| name  | department | salary | dept_avg  |\n+-------+------------+--------+-----------+\n| Priya | IT         | 65000  | 60000     |\n| Rohan | IT         | 55000  | 60000     |\n+-------+------------+--------+-----------+",
    mistakes: "Beginners inhe interchangeable samajh lete hain aur sochte hain window function bhi rows ko group kar dega. Ek aur mistake: jab actual requirement sirf summarized data hai (per-group ek row), tab bhi window function use karke unnecessarily verbose (aur slightly less efficient) query likhna — waha simple GROUP BY hi kaafi hota.",
    interviewDefinition: "GROUP BY aggregate functions collapse multiple rows into a single summarized row per group, whereas window functions compute similar aggregate calculations while preserving every individual row, allowing detail and summary data to appear together in the same result set."
  },
  {
    id: 67,
    category: "Advanced",
    question: "What is Normalization? Why is it needed?",
    shortAnswer: "Normalization ek database design process hai jisme data ko multiple related tables me organize kiya jata hai taaki data duplication (redundancy) kam ho aur data integrity (consistency) maintain rahe.",
    explanation: "Bina normalization ke, ek hi information (jaise customer ka address) multiple jagah repeat ho sakti hai — agar wo information change ho, to hume har jagah manually update karna padega, jo error-prone hai (kahin update ho jaye, kahin reh jaye — isse 'update anomaly' kehte hain). Normalization is problem ko solve karta hai by breaking data into smaller, logically related tables, aur unhe foreign keys se connect karke. Ye process step-by-step 'normal forms' (1NF, 2NF, 3NF, etc.) follow karke kiya jata hai, har form pichle wale se aur zyada strict rules add karta hai.",
    example: "Customer ka address 'orders' table ke har row me repeat karne ki jagah, ek alag 'customers' table me ek hi baar store karna aur orders me sirf 'customer_id' reference rakhna.",
    sql: "-- Before normalization (redundant data)\n-- orders(id, customer_name, customer_address, product, amount)\n\n-- After normalization\nCREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50), address VARCHAR(200));\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  product VARCHAR(100),\n  amount DECIMAL(10,2),\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);",
    output: "Query OK, 0 rows affected\n(Customer data is now stored once, referenced by orders via customer_id)",
    mistakes: "Beginners sochte hain 'zyada normalization hamesha better hai' — actually over-normalization se bahut saari small tables ban jati hain jinhe query karne ke liye bahut saare JOINs chahiye hote hain, jo performance ko affect kar sakta hai. Real-world me ek balance rakha jata hai (aksar 3NF tak).",
    interviewDefinition: "Normalization is the process of organizing data into related tables to minimize redundancy and prevent update, insert, and delete anomalies, typically achieved by progressively applying a series of rules known as normal forms."
  },
  {
    id: 68,
    category: "Advanced",
    question: "What is 1NF (First Normal Form)?",
    shortAnswer: "1NF require karta hai ki har column me sirf atomic (indivisible) values ho, aur har row unique ho — matlab koi bhi column me multiple values (comma-separated list jaisi) store nahi honi chahiye.",
    explanation: "1NF normalization ka sabse basic level hai. Rule hai: (1) har cell me sirf ek value honi chahiye, multiple values ek saath nahi (jaise ek column me 'Math, Science, English' likh dena galat hai), aur (2) har row ko uniquely identify karna possible hona chahiye (usually ek primary key ke through). Agar ek column me multiple related values store karni ho, to unhe ek separate table me todna chahiye.",
    example: "Ek 'students' table jisme 'subjects' column me 'Math, Science, English' comma-separated store ho raha hai — ye 1NF violate karta hai. Solution: ek alag 'student_subjects' table banana jisme har subject apni alag row me ho.",
    sql: "-- Violates 1NF:\n-- students(id, name, subjects) → subjects = 'Math, Science, English'\n\n-- 1NF compliant:\nCREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE student_subjects (\n  student_id INT,\n  subject VARCHAR(50),\n  FOREIGN KEY (student_id) REFERENCES students(id)\n);",
    output: "Query OK, 0 rows affected\n(Each subject now lives in its own row instead of being packed into one column)",
    mistakes: "Beginners performance ya simplicity ke naam par comma-separated values ek column me store kar dete hain, jisse searching (jaise 'Math padhne wale students dhoondo') mushkil aur slow ho jati hai kyunki hume string matching (LIKE '%Math%') use karna padta hai instead of clean JOIN/WHERE.",
    interviewDefinition: "First Normal Form (1NF) requires that every column hold only atomic, single values with no repeating groups or comma-separated lists, and that every row be uniquely identifiable, typically via a primary key."
  },
  {
    id: 69,
    category: "Advanced",
    question: "What is 2NF (Second Normal Form)?",
    shortAnswer: "2NF, 1NF ki requirements ke saath ye bhi ensure karta hai ki table me koi 'partial dependency' na ho — matlab, har non-key column poori primary key par depend kare, sirf uske ek part par nahi (ye tab hi relevant hai jab primary key composite ho).",
    explanation: "Partial dependency tab hoti hai jab table me ek composite primary key ho (jaise student_id + course_id), aur koi non-key column sirf primary key ke ek part par depend kare, dono par nahi — jaise agar 'student_name' bhi isi table me ho, wo sirf 'student_id' par depend karta hai, 'course_id' par nahi. Isse data duplicate hota hai (ek hi student ka naam multiple courses ki rows me repeat hoga). Solution hai: aisi columns ko unke apne table me nikaal dena.",
    example: "Ek 'enrollments' table jisme (student_id, course_id) composite key hai, lekin 'student_name' bhi isi table me hai (jo sirf student_id par depend karta hai) — ye 2NF violate karta hai.",
    sql: "-- Violates 2NF:\n-- enrollments(student_id, course_id, student_name, grade)\n\n-- 2NF compliant:\nCREATE TABLE students (id INT PRIMARY KEY, student_name VARCHAR(50));\nCREATE TABLE enrollments (\n  student_id INT,\n  course_id INT,\n  grade CHAR(2),\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (student_id) REFERENCES students(id)\n);",
    output: "Query OK, 0 rows affected\n(student_name now lives only in the students table, removing the partial dependency)",
    mistakes: "Beginners 2NF ko tab bhi apply karne ki koshish karte hain jab table me simple (non-composite) primary key ho — 2NF ka concept sirf composite keys ke context me meaningful hai. Ek aur mistake: partial dependency identify karne me galti karna — key check karna ye hai ki 'kya ye column poori composite key par depend karta hai, ya sirf ek part par'.",
    interviewDefinition: "Second Normal Form (2NF) builds on 1NF by eliminating partial dependencies, ensuring that every non-key column depends on the entire composite primary key rather than just part of it."
  },
  {
    id: 70,
    category: "Advanced",
    question: "What is 3NF (Third Normal Form)?",
    shortAnswer: "3NF, 2NF ki requirements ke saath ye bhi ensure karta hai ki koi 'transitive dependency' na ho — matlab, koi non-key column kisi dusre non-key column par depend na kare, sirf primary key par depend kare.",
    explanation: "Transitive dependency tab hoti hai jab column A, column B par depend kare, aur column B, primary key par depend kare (matlab A indirectly primary key par depend kar raha hai, but through B) — jaise 'employees' table me 'department_id' primary key par depend karta hai, lekin agar 'department_name' bhi isi table me store ho, wo 'department_id' par depend karta hai, employee id par nahi. Solution: aisi columns ko ek separate table me move karna. 3NF real-world applications me sabse commonly targeted normal form hai — usually 'good enough' balance deta hai redundancy aur query simplicity ke beech.",
    example: "Ek 'employees' table jisme 'department_id' ke saath 'department_name' bhi directly store hai — ye transitive dependency hai kyunki department_name, department_id par depend karta hai, employee id par nahi.",
    sql: "-- Violates 3NF:\n-- employees(id, name, department_id, department_name)\n\n-- 3NF compliant:\nCREATE TABLE departments (id INT PRIMARY KEY, department_name VARCHAR(100));\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  department_id INT,\n  FOREIGN KEY (department_id) REFERENCES departments(id)\n);",
    output: "Query OK, 0 rows affected\n(department_name now lives only in departments, removing the transitive dependency)",
    mistakes: "Beginners 3NF violation ko identify karne me galti karte hain — check yahi hai ki 'kya ye column directly primary key par depend karta hai, ya kisi aur non-key column ke through indirectly'. Ek aur mistake: strict 3NF follow karte-karte queries ko itna JOIN-heavy bana dena ki practical performance suffer ho — real projects me kabhi-kabhi controlled denormalization (jaise reporting tables me) ki jaati hai.",
    interviewDefinition: "Third Normal Form (3NF) builds on 2NF by removing transitive dependencies, ensuring that every non-key column depends only directly on the primary key and not indirectly through another non-key column."
  },
  {
    id: 71,
    category: "Advanced",
    question: "What is Denormalization, and when would you use it?",
    shortAnswer: "Denormalization ek intentional process hai jisme normalized data me controlled redundancy wapas add ki jaati hai, taaki read-heavy queries fast ho sakein — usually performance ke liye, thodi si data duplication ki cost par.",
    explanation: "Normalization data integrity ke liye best hai, lekin isme baar-baar JOINs karne padte hain jo complex reports ya high-traffic read queries ko slow bana sakte hain. Denormalization me hum jaan-boojh kar kuch redundant data wapas add karte hain (jaise ek 'order_summary' table me customer ka naam directly store karna, bina baar-baar 'customers' table JOIN kiye) — taaki read performance improve ho. Ye trade-off hai: writes thodi complex ho jati hain (do jagah update karna padta hai), lekin reads bahut fast ho jate hain. Ye tab use hota hai jab system 'read-heavy' ho (jaise analytics dashboards, reporting systems).",
    example: "Ek e-commerce analytics dashboard ke liye ek denormalized 'order_reports' table banana jisme customer_name, product_name, aur amount saare ek hi jagah store hon, taaki reporting query fast chale bina multiple JOINs ke.",
    sql: "-- Normalized version needs a JOIN every time:\nSELECT o.id, c.name, o.amount\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;\n\n-- Denormalized reporting table (customer_name duplicated intentionally):\nCREATE TABLE order_reports (\n  order_id INT,\n  customer_name VARCHAR(100),\n  amount DECIMAL(10,2)\n);",
    output: "Query OK, 0 rows affected\n(order_reports avoids a JOIN entirely for reporting queries, at the cost of some duplicated data)",
    mistakes: "Beginners denormalization ko 'bad practice' samajh kar avoid karte hain hamesha — actually ye ek valid, deliberate design decision hai jab performance requirements demand karein. Ek aur mistake: denormalized data ko sync me rakhne ka plan na banana — agar 'customers' table me naam change ho, to denormalized copies ko bhi update karne ka mechanism (jaise trigger, ya scheduled job) hona chahiye, warna data inconsistent ho jayega.",
    interviewDefinition: "Denormalization is the deliberate introduction of controlled data redundancy into a normalized schema to improve read performance, commonly used in reporting or analytics systems where query speed is prioritized over write simplicity."
  },
  {
    id: 72,
    category: "Advanced",
    question: "What are the types of relationships in database design (1:1, 1:N, N:N)?",
    shortAnswer: "One-to-One (1:1) me ek row sirf ek hi row se related hoti hai dusri table me; One-to-Many (1:N) me ek row dusri table ki multiple rows se related ho sakti hai; Many-to-Many (N:N) me dono taraf multiple rows related ho sakti hain, jo ek junction table ke through implement hoti hai.",
    explanation: "Ye relationships decide karti hain ki foreign keys kaha rakhi jayein aur data kaise structure ho. One-to-One tab hota hai jab ek entity ka data privacy ya optional-extension reasons se do tables me split kiya jaye (jaise 'users' aur 'user_profiles'). One-to-Many sabse common hai (jaise ek customer ke multiple orders ho sakte hain, lekin ek order sirf ek hi customer ka hota hai) — foreign key 'many' side wali table me rakha jata hai. Many-to-Many tab hoti hai jab dono directions me multiple ho sakte hain (jaise ek student multiple courses le sakta hai, aur ek course me multiple students ho sakte hain) — is case me ek 'junction'/'bridge' table (jaise 'enrollments') banani padti hai jisme dono tables ki foreign keys hoti hain.",
    example: "1:1 — 'users' aur 'user_profiles'. 1:N — 'customers' aur 'orders'. N:N — 'students' aur 'courses' (junction table 'enrollments' ke through).",
    sql: "-- One-to-Many: customers -> orders\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\n-- Many-to-Many: students <-> courses (via junction table)\nCREATE TABLE enrollments (\n  student_id INT,\n  course_id INT,\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (student_id) REFERENCES students(id),\n  FOREIGN KEY (course_id) REFERENCES courses(id)\n);",
    output: "Query OK, 0 rows affected\n(orders references customers directly; enrollments bridges the many-to-many link between students and courses)",
    mistakes: "Beginners Many-to-Many relationship ko directly implement karne ki koshish karte hain (jaise 'students' table me ek 'course_ids' column comma-separated rakhna) — ye 1NF violate karta hai aur junction table use karna hi sahi approach hai. Ek aur mistake: One-to-One relationship ke liye foreign key galat table me rakhna, ya bina zaroorat ke poori tarah alag table bana dena jab sab kuch ek hi table me fit ho sakta tha.",
    interviewDefinition: "Database relationships are classified as One-to-One (a row relates to exactly one row in another table), One-to-Many (a row relates to multiple rows in another table), and Many-to-Many (rows on both sides can relate to multiple rows, implemented via a junction table holding foreign keys to both)."
  },
  {
    id: 73,
    category: "Advanced",
    question: "What is an Index in MySQL, and why is it used?",
    shortAnswer: "Index ek data structure hai (usually B-Tree based) jo table ke columns par bana kar data retrieval ko fast banata hai — bina index ke, MySQL ko matching rows dhoondne ke liye poori table scan karni padti hai.",
    explanation: "Simple words me samjho: Index database ke liye book ke index jaisa hota hai. Agar hume kisi specific record ko baar-baar search karna hai, to index database ko poori table scan karne se bacha sakta hai — instead ye ek sorted structure use karke seedha relevant rows tak pahuncha deta hai. Lekin index free nahi hota: har index extra disk space leta hai, aur INSERT/UPDATE/DELETE operations thodi slow ho jaati hain (kyunki index ko bhi update karna padta hai). Isliye indexes wahi columns par banane chahiye jo frequently WHERE, JOIN, ya ORDER BY me use hote hon.",
    example: "Ek 'employees' table me lakhon rows hain aur hum baar-baar 'email' se search karte hain — 'email' column par index banane se search fractions of a second me ho jayega, poori table scan karne ke bajaye.",
    sql: "CREATE INDEX idx_employees_email\nON employees(email);\n\n-- Query that now benefits from the index\nSELECT * FROM employees WHERE email = 'priya@example.com';",
    output: "Query OK, 0 rows affected\n(Index created — lookups by email now avoid a full table scan)",
    mistakes: "Beginners har column par index bana dete hain 'better performance' ki umeed me, lekin isse writes slow ho jati hain aur storage bhi zyada lagta hai — index sirf un columns par lagana chahiye jo actually frequently filter/sort/join ke liye use hote hon. Ek aur mistake: index banane ke baad bhi query slow rehne par confuse ho jana — kai baar query pattern (jaise column par function apply karna, ya leading wildcard LIKE) index ko use hi nahi hone deta.",
    interviewDefinition: "An index is a database data structure that improves the speed of data retrieval operations by allowing the engine to locate rows without scanning the entire table, but it requires additional storage and can slightly slow down write operations."
  },
  {
    id: 74,
    category: "Advanced",
    question: "What is the difference between a Clustered Index and a Non-Clustered Index?",
    shortAnswer: "Clustered Index actual table data ko physically usi order me disk par store karta hai jis order me index defined hai (ek table me sirf ek ho sakta hai), jabki Non-Clustered Index ek separate structure hai jo actual data rows ki taraf pointers rakhta hai (ek table me multiple ho sakte hain).",
    explanation: "MySQL ke InnoDB engine me, primary key automatically clustered index bana deta hai — matlab table ka actual data primary key ke order me physically arranged hota hai, aur ye data hi index ka 'leaf level' hota hai. Isliye primary key se search karna sabse fast hota hai (data khud waha mil jata hai). Non-clustered (secondary) indexes ek alag structure hote hain jo index column ki value ke saath primary key ki value store karte hain — jab hum kisi secondary index se search karte hain, MySQL pehle us index me value dhoondta hai, phir uske saath stored primary key use karke actual row tak pahunchta hai (isse 'bookmark lookup' bhi kehte hain).",
    example: "'employees' table me 'id' (primary key) clustered index hai — data physically id ke order me stored hai. 'email' column par banaya gaya index non-clustered/secondary index hai.",
    sql: "-- id is the clustered index (via PRIMARY KEY)\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  email VARCHAR(100),\n  name VARCHAR(50)\n);\n\n-- This creates a non-clustered (secondary) index\nCREATE INDEX idx_email ON employees(email);",
    output: "Query OK, 0 rows affected\n(id drives physical row storage order; idx_email is a separate lookup structure pointing back to id)",
    mistakes: "Beginners sochte hain ek table me multiple clustered indexes ho sakte hain — actually InnoDB me sirf ek hi clustered index ho sakta hai (kyunki data physically sirf ek hi order me arrange ho sakta hai). Ek aur mistake: primary key ko bahut lamba ya complex banana — chunki secondary indexes internally primary key value store karte hain, ek bada primary key sabhi secondary indexes ka size bhi badha deta hai.",
    interviewDefinition: "A clustered index determines the physical storage order of table data and is limited to one per table (in InnoDB, the primary key), while a non-clustered (secondary) index is a separate structure that stores pointers back to the primary key, and a table can have multiple non-clustered indexes."
  },
  {
    id: 75,
    category: "Advanced",
    question: "What is the EXPLAIN statement used for in MySQL?",
    shortAnswer: "EXPLAIN ek query ke aage laga kar MySQL se ye poocha jata hai ki wo query ko actually execute kaise karega — kaunse indexes use honge, kitni rows scan hongi, aur kaunsa join order follow hoga — bina query ko actually run kiye.",
    explanation: "Jab koi query slow lage, EXPLAIN sabse pehla debugging tool hota hai — ye MySQL optimizer ka 'execution plan' dikhata hai. Important columns me 'type' (access method — jaise 'ALL' matlab full table scan, jo generally bura sign hai; 'ref' ya 'const' better hote hain), 'possible_keys' aur 'key' (kaunse indexes available the aur actually use kiya gaya), aur 'rows' (estimated kitni rows scan hongi) shamil hain. Isse hum identify kar sakte hain ki kya koi missing index performance issue create kar raha hai.",
    example: "Ek slow query ko EXPLAIN se analyze karna ye check karne ke liye ki kya 'email' column par index use ho raha hai ya nahi.",
    sql: "EXPLAIN\nSELECT name, email\nFROM employees\nWHERE email = 'priya@example.com';",
    output: "+----+-------------+-----------+------+----------------+-------------+---------+-------+------+-------------+\n| id | select_type | table     | type | possible_keys  | key         | key_len | ref   | rows | Extra       |\n+----+-------------+-----------+------+----------------+-------------+---------+-------+------+-------------+\n| 1  | SIMPLE      | employees | ref  | idx_email      | idx_email   | 402     | const | 1    | Using where |\n+----+-------------+-----------+------+----------------+-------------+---------+-------+------+-------------+",
    mistakes: "Beginners EXPLAIN ke output ko dekh kar samajh nahi paate ki kya priority set karni hai — sabse pehle 'type' column check karna chahiye ('ALL' ka matlab full table scan, jo optimize karna chahiye). Ek aur mistake: EXPLAIN ka result dekh kar sirf ek baar check karna aur assume kar lena ki ye hamesha waisa hi rahega — data grow hone ke saath execution plan change ho sakta hai, isliye periodically re-check karna best practice hai.",
    interviewDefinition: "EXPLAIN shows the query execution plan that MySQL's optimizer intends to use, including which indexes are considered and used, the join order, and the estimated number of rows scanned, making it the primary tool for diagnosing slow queries."
  },
  {
    id: 76,
    category: "Advanced",
    question: "What is a Composite Index?",
    shortAnswer: "Composite Index ek single index hai jo multiple columns ko combine karke banaya jata hai — ye tab useful hota hai jab queries regularly un columns ko together filter/sort karti hon.",
    explanation: "Jab humari queries me multiple columns ek saath WHERE ya ORDER BY me use hote hon (jaise 'department AND salary' ke basis par filter karna), tab ek composite index un dono columns par ek saath bana sakte hain, jo do separate single-column indexes se zyada efficient hota hai us specific query pattern ke liye. Sabse important concept hai 'leftmost prefix rule': composite index (col_a, col_b, col_c) tab efficiently use hoga jab query col_a se shuru ho (col_a alone, col_a+col_b, ya col_a+col_b+col_c) — lekin agar query sirf col_b ya col_c filter kare (col_a ke bina), to ye index use nahi hoga.",
    example: "Employees ko frequently 'department' aur uske andar 'salary' ke basis par search kiya jata hai — dono par ek composite index banana.",
    sql: "CREATE INDEX idx_dept_salary\nON employees(department, salary);\n\n-- This query uses the index efficiently (leftmost column present)\nSELECT * FROM employees\nWHERE department = 'IT' AND salary > 50000;",
    output: "Query OK, 0 rows affected\n(Composite index created — filtering on department, or department+salary, benefits from it)",
    mistakes: "Beginners composite index ke columns ka order galat rakh dete hain — jo column zyada selective (unique values zyada) hai ya jo queries me zyada consistently use hoti hai, use pehle rakhna chahiye. Ek aur mistake: 'leftmost prefix rule' ko bhool jana aur expect karna ki index tab bhi use hoga jab query sirf composite index ke second/third column par filter kare, pehle column ke bina.",
    interviewDefinition: "A composite index is a single index built on multiple columns, optimized for queries that filter or sort by those columns together, and it is only usable when the query references the index's leftmost column(s) — known as the leftmost prefix rule."
  },
  {
    id: 77,
    category: "Advanced",
    question: "What is a Covering Index?",
    shortAnswer: "Covering Index ek aisa index hai jisme query ke saare required columns already shamil hon, isliye MySQL ko actual table row fetch karne ki zaroorat hi nahi padti — sirf index se hi poora result mil jata hai.",
    explanation: "Normally, jab hum secondary index se search karte hain, MySQL pehle index me value dhoondta hai, phir uske saath store primary key use karke actual table row tak jaata hai (extra I/O operation, jise 'bookmark lookup' kehte hain). Lekin agar index me hi wo saare columns present hon jo query ko chahiye (SELECT list + WHERE conditions), to MySQL is extra step ko skip kar deta hai — query 'index-only' ban jati hai, jo bahut fast hoti hai. EXPLAIN output me 'Using index' (Extra column me) dikhna is behavior ka signal hota hai.",
    example: "Agar query sirf 'name' aur 'department' chahti hai WHERE 'department' par filter karke, aur index (department, name) par bana ho, to ye ek covering index ban jayega us query ke liye.",
    sql: "CREATE INDEX idx_dept_name\nON employees(department, name);\n\nEXPLAIN\nSELECT name, department\nFROM employees\nWHERE department = 'IT';\n-- Extra column should show: Using index",
    output: "+----+-------------+-----------+------+----------------+---------------+---------+-------+------+--------------------------+\n| id | select_type | table     | type | possible_keys  | key           | key_len | ref   | rows | Extra                    |\n+----+-------------+-----------+------+----------------+---------------+---------+-------+------+--------------------------+\n| 1  | SIMPLE      | employees | ref  | idx_dept_name  | idx_dept_name | 202     | const | 6    | Using where; Using index |\n+----+-------------+-----------+------+----------------+---------------+---------+-------+------+--------------------------+",
    mistakes: "Beginners covering index ko design karte waqt SELECT list bhool jate hain aur sirf WHERE clause ke columns par focus karte hain — agar SELECT me koi aisa column ho jo index me nahi hai, to covering behavior nahi milega. Ek aur mistake: har query ke liye ek naya covering index bana dena, jisse bahut saare wide indexes ban jate hain aur write performance (aur storage) badly affect hoti hai.",
    interviewDefinition: "A covering index contains all the columns a query needs, both in the SELECT list and WHERE clause, allowing MySQL to satisfy the entire query from the index alone without a separate lookup into the actual table data."
  },
  {
    id: 78,
    category: "Advanced",
    question: "What are common Query Optimization techniques in MySQL?",
    shortAnswer: "Common techniques me proper indexing, avoiding 'SELECT *', using EXPLAIN to analyze queries, avoiding functions on indexed columns in WHERE, limiting result sets, aur query rewriting (jaise correlated subqueries ko JOINs se replace karna) shamil hain.",
    explanation: "Query optimization ek ongoing process hai, koi ek-baar-ka fix nahi. Kuch high-impact practices: (1) sirf zaroori columns select karo, 'SELECT *' avoid karo. (2) WHERE/JOIN/ORDER BY me use hone wale columns par appropriate indexes banao. (3) indexed column par function apply mat karo (jaise 'WHERE YEAR(created_at) = 2026' index ko use hone se rok sakta hai — better hai 'WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01''). (4) EXPLAIN se query analyze karo. (5) large result sets ko LIMIT/pagination se control karo. (6) N+1 query problems ko batch queries ya JOINs se replace karo.",
    example: "Ek query jo function ke wajah se index use nahi kar rahi thi, use rewrite karke index-friendly banana.",
    sql: "-- Slow: function on indexed column prevents index usage\nSELECT * FROM orders WHERE YEAR(order_date) = 2026;\n\n-- Optimized: index-friendly range condition\nSELECT id, customer_id, amount\nFROM orders\nWHERE order_date >= '2026-01-01' AND order_date < '2027-01-01';",
    output: "-- The optimized version can use an index on order_date;\n-- the original version forces a full table scan.",
    mistakes: "Beginners sirf indexes add karke sochte hain optimization complete ho gayi — actual query pattern (jaise functions on columns, leading wildcards, implicit type conversions) bhi utna hi important hota hai. Ek aur mistake: production me changes test kiye bina hi apply kar dena — query optimization ko hamesha EXPLAIN aur realistic data volume ke saath verify karna chahiye.",
    interviewDefinition: "Query optimization involves techniques such as selecting only needed columns, indexing columns used in filtering and joining, avoiding functions on indexed columns within WHERE clauses, using EXPLAIN to validate execution plans, and restructuring inefficient patterns like correlated subqueries into joins."
  },
  {
    id: 79,
    category: "Advanced",
    question: "What is a Transaction in MySQL?",
    shortAnswer: "Transaction SQL statements ka ek group hai jo ek single, indivisible unit ki tarah treat hota hai — ya to sabhi statements successfully complete hote hain (COMMIT), ya koi bhi permanently apply nahi hota (ROLLBACK).",
    explanation: "Transactions tab critical hote hain jab multiple related operations ek saath consistent rehne chahiye — jaise bank transfer me ek account se paisa minus karna aur dusre me add karna. Agar in dono steps ke beech kuch fail ho jaye (jaise server crash), to hum nahi chahte ki sirf pehla step apply ho jaye aur dusra reh jaye — isse data inconsistent ho jayega. Transaction START karke, agar sab kuch sahi chala to COMMIT karte hain (permanently save), aur agar kahi error aaye to ROLLBACK karte hain (sabkuch undo). InnoDB engine transactions ko support karta hai; MyISAM nahi.",
    example: "Ek bank transfer: account A se 5000 minus karna aur account B me 5000 add karna — dono ko ek transaction me wrap karna.",
    sql: "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 5000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 5000 WHERE id = 2;\n\n-- Agar dono updates successful hue:\nCOMMIT;\n\n-- Agar kahin error aata, hum ye chalate:\n-- ROLLBACK;",
    output: "Query OK, 1 row affected  -- first UPDATE\nQuery OK, 1 row affected  -- second UPDATE\nQuery OK               -- COMMIT (changes are now permanent)",
    mistakes: "Beginners transaction start karke COMMIT ya ROLLBACK karna bhool jate hain, jisse locks lambe time tak hold ho sakte hain aur dusre queries block ho sakti hain. Ek aur mistake: application code me error-handling proper na hona — agar beech me exception aaye to ROLLBACK zaroor call hona chahiye, warna partial changes 'stuck' reh sakte hain.",
    interviewDefinition: "A transaction is a sequence of SQL statements executed as a single atomic unit — either fully committed together or fully rolled back on failure — ensuring that related operations either all succeed or leave no partial effect on the database."
  },
  {
    id: 80,
    category: "Advanced",
    question: "What is ACID in the context of databases?",
    shortAnswer: "ACID chaar properties hain jo reliable transactions guarantee karte hain: Atomicity (sab ya kuch nahi), Consistency (database hamesha valid state me rahe), Isolation (concurrent transactions ek dusre ko interfere na karein), aur Durability (COMMIT hone ke baad data permanently safe rahe).",
    explanation: "Atomicity ensure karta hai ki transaction ke sabhi steps ek unit ki tarah behave karein — ya sab apply hon ya koi nahi. Consistency ensure karta hai ki transaction database ko ek valid state se dusre valid state me le jaye, kabhi bhi constraints (jaise foreign keys, checks) violate na ho. Isolation ensure karta hai ki multiple transactions simultaneously chal rahi ho to bhi wo ek dusre ke intermediate (uncommitted) changes na dekh sakein — is level ko 'isolation levels' se control kiya jata hai. Durability ensure karta hai ki ek baar COMMIT ho jane ke baad, data permanently safe hai — chahe turant hi system crash ho jaye (typically write-ahead logging ke through implement hota hai).",
    example: "Ek bank transfer transaction ACID ke through guarantee karta hai: ya to poora transfer ho, ya bilkul na ho (Atomicity); balance kabhi negative na ho agar constraint hai (Consistency); doosri transaction ko intermediate state na dikhe (Isolation); aur ek baar confirm hone ke baad, power failure ke baad bhi data safe rahe (Durability).",
    sql: "START TRANSACTION;\nUPDATE accounts SET balance = balance - 5000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 5000 WHERE id = 2;\nCOMMIT; -- After this point, durability guarantees the change survives a crash",
    output: "Query OK -- Transaction committed; ACID guarantees now apply to this change",
    mistakes: "Beginners in char properties ko sirf 'buzzwords' ki tarah yaad karte hain bina samjhe ki har ek ka practical implication kya hai — interview me har property ka ek real-world example dena zyada impressive hota hai. Ek aur mistake: sochna ki ACID sirf 'financial applications' ke liye important hai — actually ye kisi bhi application ke liye zaroori hai jaha data consistency matter karti hai.",
    interviewDefinition: "ACID stands for Atomicity (all-or-nothing execution), Consistency (transactions move the database between valid states), Isolation (concurrent transactions don't interfere with each other), and Durability (committed changes survive system failures) — the four properties that guarantee reliable database transactions."
  },
  {
    id: 81,
    category: "Expert",
    question: "What are the Isolation Levels in MySQL?",
    shortAnswer: "MySQL (InnoDB) 4 isolation levels support karta hai: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ (default), aur SERIALIZABLE — har level concurrency aur data consistency ke beech ek different trade-off deta hai.",
    explanation: "Jaise-jaise hum READ UNCOMMITTED se SERIALIZABLE ki taraf jaate hain, data consistency badhti hai lekin concurrency (parallel transactions ki performance) kam hoti hai. READ UNCOMMITTED sabse loose hai — ye dusre transactions ke uncommitted changes bhi dekh sakta hai (dirty reads allowed). READ COMMITTED sirf committed data dekhta hai, lekin same transaction ke andar ek hi query do baar chalane par different results aa sakte hain (non-repeatable reads). REPEATABLE READ (MySQL ka default) ensure karta hai ki ek transaction ke andar same query hamesha same result de, chahe koi aur transaction beech me data change kar de. SERIALIZABLE sabse strict hai — transactions ko effectively sequentially (ek-ek karke) execute hone jaisa treat karta hai, jo maximum consistency deta hai lekin concurrency ko sabse zyada limit karta hai.",
    example: "Ek reporting system jaha thoda stale data chalega, READ COMMITTED use kar sakta hai for better concurrency; ek financial system jaha strict consistency chahiye, SERIALIZABLE ya REPEATABLE READ use karega.",
    sql: "-- Checking the current isolation level\nSELECT @@transaction_isolation;\n\n-- Setting isolation level for the current session\nSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;",
    output: "+--------------------------+\n| @@transaction_isolation  |\n+--------------------------+\n| REPEATABLE-READ          |\n+--------------------------+",
    mistakes: "Beginners sochte hain isolation level change karne se koi downside nahi hota — actually higher isolation levels (jaise SERIALIZABLE) throughput significantly kam kar sakte hain high-concurrency systems me. Ek aur mistake: default (REPEATABLE READ) ko blindly trust karna bina samjhe ki kis type ke anomalies (dirty read, non-repeatable read, phantom read) ye actually prevent karta hai aur kaunse edge cases me phir bhi issues aa sakte hain.",
    interviewDefinition: "MySQL's InnoDB engine supports four transaction isolation levels — READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ (the default), and SERIALIZABLE — each offering a different trade-off between data consistency and transaction concurrency."
  },
  {
    id: 82,
    category: "Expert",
    question: "What is a Dirty Read?",
    shortAnswer: "Dirty Read tab hoti hai jab ek transaction dusre transaction ke uncommitted (abhi tak COMMIT na hue) changes ko padh leta hai — agar wo dusra transaction baad me ROLLBACK ho jaye, to pehle wale transaction ne 'galat' (kabhi exist hi na kiya) data padha hota hai.",
    explanation: "Ye problem sirf READ UNCOMMITTED isolation level me hoti hai (jo MySQL me default nahi hai). Sochiye: Transaction A ek row update karta hai lekin abhi COMMIT nahi kiya. Transaction B, READ UNCOMMITTED level par, wo updated (but not yet committed) value padh leta hai aur uske basis par kuch decision leta hai. Agar Transaction A phir ROLLBACK kar de (apna change undo kar de), to Transaction B ne ek aisi value use ki jo actually kabhi database me permanently exist hi nahi hui — ye 'dirty' data hai.",
    example: "Transaction A ek order ka status 'confirmed' kar deta hai (but COMMIT nahi kiya). Transaction B, READ UNCOMMITTED level par, ye 'confirmed' status dekh kar customer ko confirmation email bhej deta hai. Phir Transaction A ROLLBACK ho jata hai — ab customer ko galat email mil chuka hai for an order that was never actually confirmed.",
    sql: "-- Session 1:\nSTART TRANSACTION;\nUPDATE orders SET status = 'confirmed' WHERE id = 10;\n-- (not yet committed)\n\n-- Session 2 (with READ UNCOMMITTED):\nSET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\nSELECT status FROM orders WHERE id = 10; -- sees 'confirmed', even though it's not committed",
    output: "+------------+\n| status     |\n+------------+\n| confirmed  |\n+------------+\n(This value might be rolled back and never actually become permanent)",
    mistakes: "Beginners sochte hain dirty reads MySQL ke default settings me possible hain — actually MySQL ka default isolation level REPEATABLE READ hai, jo dirty reads ko already prevent karta hai. Dirty reads sirf tab possible hain jab explicitly READ UNCOMMITTED set kiya jaye. Ek aur mistake: dirty read aur non-repeatable read ko confuse karna — dirty read uncommitted data padhne se hoti hai, non-repeatable read committed data ke change hone se.",
    interviewDefinition: "A dirty read occurs when a transaction reads data that has been modified by another transaction but not yet committed, risking the use of data that may later be rolled back and thus never actually existed permanently."
  },
  {
    id: 83,
    category: "Expert",
    question: "What is a Non-Repeatable Read?",
    shortAnswer: "Non-Repeatable Read tab hoti hai jab ek transaction ke andar hi same row ko do baar query karne par different values milti hain, kyunki beech me kisi doosre transaction ne wo row update karke COMMIT kar diya.",
    explanation: "Ye problem READ COMMITTED isolation level me ho sakti hai (lekin REPEATABLE READ aur SERIALIZABLE me nahi, jaisa naam se hi zaahir hai). Farq dirty read se ye hai ki yaha doosra transaction ne apna change already COMMIT kar diya hai — ye 'valid' data hai, lekin problem ye hai ki same transaction ke andar consistency nahi mil rahi (pehli baar ek value, dusri baar dusri value, jabki humne beech me khud kuch update nahi kiya).",
    example: "Transaction A ek employee ki salary padhta hai (65000). Isi beech Transaction B us employee ki salary update karke 70000 kar deta hai aur COMMIT kar deta hai. Transaction A agar dobara wahi salary query kare (still within its own transaction), READ COMMITTED level par ab usse 70000 milega — same transaction ke andar do alag values.",
    sql: "-- Session 1 (READ COMMITTED):\nSTART TRANSACTION;\nSELECT salary FROM employees WHERE id = 5; -- returns 65000\n\n-- Session 2 (runs and commits in between):\nUPDATE employees SET salary = 70000 WHERE id = 5;\nCOMMIT;\n\n-- Back in Session 1, same transaction, same query again:\nSELECT salary FROM employees WHERE id = 5; -- now returns 70000",
    output: "First read: 65000\nSecond read (same transaction): 70000\n(Both values are 'valid' committed data, but they differ within one transaction)",
    mistakes: "Beginners is problem ko dirty read samajh lete hain — key difference yaad rakho: non-repeatable read me dusra transaction apna change COMMIT kar chuka hota hai (valid data), dirty read me nahi. Ek aur mistake: REPEATABLE READ isolation level use kar rahe hote hain aur phir bhi is problem ko expect karte hain — MySQL ka default level (REPEATABLE READ) is issue ko already prevent karta hai.",
    interviewDefinition: "A non-repeatable read occurs when a transaction reads the same row twice and gets different values because another transaction modified and committed a change to that row in between — an issue possible under READ COMMITTED but prevented by REPEATABLE READ and stricter levels."
  },
  {
    id: 84,
    category: "Expert",
    question: "What is a Phantom Read?",
    shortAnswer: "Phantom Read tab hoti hai jab ek transaction same condition ke saath query dobara chalata hai, aur pehli baar ke comparison me kuch naye rows appear ho jate hain (ya gayab ho jate hain) — kyunki beech me doosre transaction ne matching rows insert ya delete karke COMMIT kar diya.",
    explanation: "Ye non-repeatable read jaisa hi concept hai, lekin farq ye hai ki non-repeatable read 'existing row ki value' change hone se hoti hai, jabki phantom read 'poore row set' (kitni rows match karti hain) change hone se hoti hai — matlab naye rows appear/disappear hote hain, existing row modify nahi hoti. MySQL me REPEATABLE READ isolation level standard SQL definition ke hisaab se phantom reads ko poori tarah prevent nahi karta in kuch cases me, lekin InnoDB ka 'next-key locking' mechanism practically bahut cases me isse bhi prevent kar deta hai — SERIALIZABLE level me ye guaranteed prevent hota hai.",
    example: "Transaction A query karta hai 'salary > 50000 wale kitne employees hain' aur result 5 milta hai. Isi beech Transaction B ek naya employee insert karta hai jiski salary 60000 hai aur COMMIT kar deta hai. Transaction A agar wahi query dobara chalaye, ab result 6 aa sakta hai — ek 'phantom' row appear ho gaya.",
    sql: "-- Session 1:\nSTART TRANSACTION;\nSELECT COUNT(*) FROM employees WHERE salary > 50000; -- returns 5\n\n-- Session 2 (inserts and commits in between):\nINSERT INTO employees (name, salary) VALUES ('New Hire', 60000);\nCOMMIT;\n\n-- Back in Session 1, same transaction:\nSELECT COUNT(*) FROM employees WHERE salary > 50000; -- might now return 6",
    output: "First count: 5\nSecond count (same transaction): 6\n(A new matching row 'phantom-appeared' between the two identical queries)",
    mistakes: "Beginners phantom read aur non-repeatable read ko same samajh lete hain — yaad rakhne ka tarika: non-repeatable read = 'ek existing row ki value badli', phantom read = 'row set (count/rows) hi badal gaya kyunki naye rows aaye ya gaye'. Ek aur mistake: sochna ki REPEATABLE READ MySQL me phantom reads ko 100% standard-SQL-definition ke hisaab se rokta hai — InnoDB ka implementation ise mostly prevent karta hai (next-key locks ki wajah se) lekin poori tarah SERIALIZABLE jitna strict nahi hai.",
    interviewDefinition: "A phantom read occurs when a transaction re-executes the same query and finds a different set of rows because another transaction inserted or deleted matching rows and committed in between — distinct from a non-repeatable read, which involves a change to an existing row's value rather than the row count."
  },
  {
    id: 85,
    category: "Expert",
    question: "What is a Deadlock, and how can it be avoided?",
    shortAnswer: "Deadlock tab hota hai jab do (ya zyada) transactions ek dusre ke resources (locks) ke liye wait karte reh jate hain, is tarah ki koi bhi aage badh hi nahi pata — MySQL aisi situations ko detect karke ek transaction ko automatically 'kill' (rollback) kar deta hai.",
    explanation: "Classic example: Transaction A row 1 ko lock karta hai aur ab row 2 ko lock karna chahta hai (jo Transaction B ne already lock kiya hua hai). Simultaneously, Transaction B row 2 ko lock kiye hue hai aur row 1 ko lock karna chahta hai (jo Transaction A ne le rakha hai). Dono ek dusre ka wait karte reh jate hain — ye ek circular wait hai. InnoDB is situation ko detect karke ek transaction (usually jisne kam work kiya ho) ko forcefully rollback kar deta hai, taaki dusra aage badh sake. Deadlocks avoid karne ke best tarike hain: hamesha ek consistent order me tables/rows ko access karna (jaise hamesha pehle 'accounts' phir 'orders'), transactions ko chhota aur fast rakhna, aur appropriate indexes use karna (taaki unnecessarily zyada rows lock na ho).",
    example: "Do transactions jo do accounts ke beech transfer kar rahe hain lekin opposite order me lock le rahe hain — Transaction A pehle account 1 phir account 2 lock karta hai, Transaction B pehle account 2 phir account 1 — is se deadlock ho sakta hai.",
    sql: "-- Best practice: always lock rows in the same consistent order across the whole application\nSTART TRANSACTION;\nSELECT * FROM accounts WHERE id = 1 FOR UPDATE; -- always lock the lower id first\nSELECT * FROM accounts WHERE id = 2 FOR UPDATE;\n-- ... perform the transfer ...\nCOMMIT;",
    output: "ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction\n(This is what MySQL returns to the 'losing' transaction when it detects a deadlock)",
    mistakes: "Beginners deadlock error aane par application me simply error dikha kar chhod dete hain — best practice hai application code me deadlock error ko detect karke transaction ko automatically retry karna (kyunki deadlock ek normal, expected occurrence hai high-concurrency systems me). Ek aur mistake: application ke different parts me tables ko different orders me access karna, jo deadlock ki probability badha deta hai.",
    interviewDefinition: "A deadlock occurs when two or more transactions each hold a lock the other needs, creating a circular wait that prevents any of them from proceeding; MySQL's InnoDB engine detects this automatically and rolls back one transaction so the others can continue, and it is best avoided by accessing resources in a consistent order."
  },
  {
    id: 86,
    category: "Expert",
    question: "How does Concurrency Control (row-level locking) work in InnoDB?",
    shortAnswer: "InnoDB row-level locking use karta hai — matlab ek transaction sirf un specific rows ko lock karta hai jinhe wo modify kar raha hai, poori table ko nahi (jaise MyISAM karta tha table-level locking se), jisse multiple transactions simultaneously different rows par kaam kar sakte hain bina ek dusre ko block kiye.",
    explanation: "Concurrency control ensure karta hai ki multiple users/transactions ek saath database use kar sakein bina data corrupt kiye ya ek dusre ko unnecessarily block kiye. InnoDB me, jab ek transaction 'SELECT ... FOR UPDATE' ya UPDATE/DELETE karta hai, wo sirf affected rows par lock leta hai. Dusre transactions still baaki rows ke saath kaam kar sakte hain bina wait kiye. Ye MyISAM ke table-level locking se kaafi behtar concurrency deta hai, especially high-traffic write-heavy applications me. InnoDB gap locks aur next-key locks bhi use karta hai (REPEATABLE READ ke sath) taaki phantom-read-jaisi anomalies bhi mostly prevent ho sakein.",
    example: "Do users simultaneously alag-alag employees ke records update kar rahe hain — InnoDB dono ko parallel me chalne deta hai kyunki wo different rows lock kar rahe hain.",
    sql: "-- Session 1: locks only row with id = 1\nSTART TRANSACTION;\nSELECT * FROM employees WHERE id = 1 FOR UPDATE;\n\n-- Session 2: can still work on a different row concurrently\nSTART TRANSACTION;\nSELECT * FROM employees WHERE id = 2 FOR UPDATE; -- not blocked",
    output: "Both sessions proceed concurrently because they lock different rows.\n(In MyISAM, the entire table would have been locked, forcing Session 2 to wait.)",
    mistakes: "Beginners sochte hain InnoDB hamesha poori table ko lock karta hai jaise MyISAM — actually row-level locking iska core advantage hai. Ek aur mistake: bina index ke UPDATE/DELETE chalana — agar WHERE clause me indexed column na ho, InnoDB ko poori table scan karni padti hai jisse effectively bahut saari (ya sabhi) rows lock ho sakti hain, jo row-level locking ka fayda khatam kar deta hai.",
    interviewDefinition: "InnoDB implements row-level locking, meaning a transaction only locks the specific rows it modifies rather than the entire table, allowing multiple transactions to work concurrently on different rows without blocking each other — a significant improvement over MyISAM's table-level locking."
  },
  {
    id: 87,
    category: "Expert",
    question: "What is the difference between Optimistic and Pessimistic Locking?",
    shortAnswer: "Pessimistic Locking data ko modify karne se pehle hi lock le leta hai (assume karta hai ki conflict hoga), jabki Optimistic Locking bina lock liye proceed karta hai aur sirf update ke time check karta hai ki data kisi aur ne change to nahi kiya (assume karta hai ki conflict rare hoga).",
    explanation: "Pessimistic locking ('SELECT ... FOR UPDATE' se implement hota hai) tab useful hai jab conflicts frequent hone ki possibility ho — ye row ko turant lock kar deta hai taaki koi aur usse simultaneously modify na kar sake, lekin isse concurrency kam ho jati hai (dusre transactions wait karte hain). Optimistic locking ek 'version' column (ya timestamp) use karta hai: read karte waqt version note kar lete hain, aur update karte waqt check karte hain ki version abhi bhi wahi hai ya nahi — agar kisi aur ne beech me update kar diya (version mismatch), to hamara update fail ho jata hai aur hume retry karna padta hai. Optimistic locking high-read, low-conflict scenarios me better concurrency deta hai.",
    example: "Ek high-traffic e-commerce product page jaha stock update hota hai — optimistic locking se stock update 'version' check karke hoga, taaki simultaneous requests overselling na kar sakein.",
    sql: "-- Optimistic locking pattern using a version column\nUPDATE products\nSET stock = stock - 1, version = version + 1\nWHERE id = 10 AND version = 5;\n-- If another transaction already updated it (version != 5),\n-- this UPDATE affects 0 rows, signaling a conflict to retry.",
    output: "Query OK, 1 row affected   -- success: version matched, update applied\n\n-- OR, if the version already changed:\nQuery OK, 0 rows affected  -- conflict detected, application should retry",
    mistakes: "Beginners optimistic locking use karte waqt 'affected rows = 0' case ko handle karna bhool jate hain — application code ko explicitly check karna chahiye ki update actually apply hua ya nahi, aur agar nahi hua to retry logic implement karna chahiye. Ek aur mistake: high-conflict scenarios (jaise flash sale me limited stock) me optimistic locking use karna, jaha bahut saare retries honge — waha pessimistic locking (ya queue-based approach) zyada suitable ho sakta hai.",
    interviewDefinition: "Pessimistic locking acquires a lock on data before modifying it, blocking other transactions until released, and suits high-conflict scenarios, whereas optimistic locking allows transactions to proceed without locking and instead validates a version or timestamp at update time, failing and requiring a retry if the data changed — better suited to low-conflict, high-read scenarios."
  },
  {
    id: 88,
    category: "Expert",
    question: "What is SQL Injection, and how does it happen?",
    shortAnswer: "SQL Injection ek security vulnerability hai jaha attacker user input ke through malicious SQL code inject kar deta hai, jab application us input ko directly (bina sanitize kiye) query me concatenate kar deta hai — isse attacker unauthorized data dekh sakta hai, modify kar sakta hai, ya poori database compromise kar sakta hai.",
    explanation: "Ye tab hota hai jab developer user input ko string concatenation se directly SQL query me daal deta hai, bina us input ko properly escape ya validate kiye. Attacker phir specially crafted input (jaise ' OR '1'='1) de sakta hai jo query ki logic ko hi badal deta hai. Iska solution hamesha prepared statements / parameterized queries use karna hai (jo Question 89 me detail me cover kiya gaya hai), na ki user input ko manually escape karne ki koshish karna.",
    example: "Ek login form jo query ko is tarah banata hai: \"SELECT * FROM users WHERE username = '\" + input + \"'\" — agar attacker username field me \"' OR '1'='1\" daal de, to query ka WHERE clause hamesha TRUE ban jata hai, aur attacker bina valid password ke login kar sakta hai.",
    sql: "-- VULNERABLE (string concatenation with raw user input):\n-- Query becomes: SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '...'\n\n-- SAFE (parameterized/prepared statement):\nPREPARE stmt FROM 'SELECT * FROM users WHERE username = ? AND password = ?';\nSET @username = 'attacker_input_here';\nSET @password = 'anything';\nEXECUTE stmt USING @username, @password;",
    output: "-- Vulnerable version: attacker bypasses authentication entirely.\n-- Prepared statement version: the input is always treated as data,\n-- never as executable SQL, so the injection attempt fails safely.",
    mistakes: "Beginners sochte hain user input ko manually escape karna (jaise apostrophes ko replace karna) kaafi surakshit hai — ye approach error-prone hai aur edge cases miss ho sakti hain. Ek aur mistake: sirf frontend validation par bharosa karna — SQL injection protection hamesha backend/database layer par honi chahiye, kyunki frontend validation ko bypass kiya ja sakta hai.",
    interviewDefinition: "SQL Injection is a security vulnerability where an attacker inserts malicious SQL code through user input that gets directly concatenated into a query, potentially allowing unauthorized data access, modification, or full database compromise — prevented primarily through the use of parameterized queries or prepared statements."
  },
  {
    id: 89,
    category: "Expert",
    question: "What are Prepared Statements, and how do they prevent SQL Injection?",
    shortAnswer: "Prepared Statements query ke structure (SQL logic) ko user-supplied data se completely separate rakhte hain — query pehle placeholders (?) ke saath compile hoti hai, aur actual values baad me alag se bheji jaati hain, jisse input kabhi bhi executable SQL ki tarah interpret nahi hota.",
    explanation: "Normal query building me, agar hum string concatenation use karte hain, to user input query ke 'text' ka hi part ban jata hai — isliye agar input me SQL syntax ho, wo execute ho sakta hai. Prepared statements is problem ko structurally hi khatam kar dete hain: database engine pehle query ka 'template' (placeholders ke saath) parse aur compile karta hai, aur phir jab actual values diye jaate hain, unhe hamesha literal data ki tarah treat kiya jata hai, chahe unme kuch bhi 'SQL jaisa' text kyun na ho. Isse SQL injection structurally hi impossible ho jata hai (agar sahi tarike se use kiya jaye).",
    example: "PHP/Laravel me, PDO ya Eloquent query builder internally prepared statements use karte hain jab hum '?' ya named bindings (jaise ':name') use karte hain, instead of raw string concatenation.",
    sql: "-- Prepared statement in raw SQL\nPREPARE find_user FROM 'SELECT * FROM users WHERE email = ?';\nSET @email = 'someone@example.com';\nEXECUTE find_user USING @email;\nDEALLOCATE PREPARE find_user;",
    output: "+----+-------------------------+\n| id | email                   |\n+----+-------------------------+\n| 7  | someone@example.com     |\n+----+-------------------------+\n(Even if @email contained SQL syntax, it would be treated as plain text data, not executable code)",
    mistakes: "Beginners Laravel/PHP me kabhi-kabhi raw SQL query strings likhte waqt directly variables concatenate kar dete hain (jaise \"WHERE email = '$email'\") instead of using query builder's parameter binding — ye prepared statements ke security benefits ko bypass kar deta hai. Ek aur mistake: sochna ki ORM use karne se automatically hamesha safe rahenge — agar developer explicitly raw/unescaped queries likhe (jaise Laravel me DB::raw() galat tarike se), tab bhi vulnerability create ho sakti hai.",
    interviewDefinition: "Prepared statements separate a query's SQL structure from user-supplied data by compiling the query with placeholders first and binding actual values afterward, ensuring input is always treated as literal data rather than executable SQL — the primary and most reliable defense against SQL injection."
  },
  {
    id: 90,
    category: "Expert",
    question: "How do you implement efficient Pagination in MySQL for large tables?",
    shortAnswer: "Simple pagination LIMIT aur OFFSET se ki jaati hai, lekin bade tables par ye slow ho jati hai jaise-jaise OFFSET badhta hai — better performance ke liye 'keyset pagination' (jise 'seek method' bhi kehte hain) use kiya jata hai, jo last-seen value ke basis par agla page fetch karta hai.",
    explanation: "'LIMIT 10 OFFSET 10000' jaisi query me MySQL ko internally pehle 10010 rows count/scan karni padti hain aur phir last 10 return karni padti hain — bade OFFSET values ke saath ye bahut slow ho jata hai, chahe humein sirf 10 rows chahiye ho. Keyset pagination is problem ko avoid karta hai: hum last page ki last row ki 'id' (ya sorted column ki value) yaad rakhte hain, aur agle page ke liye 'WHERE id > last_seen_id ORDER BY id LIMIT 10' jaisi query chalate hain — ye index ka directly use kar leta hai bina pehle wale saare rows scan kiye.",
    example: "Ek products listing page jaha lakhon products hain — deep pages (jaise page 5000) ko efficiently load karna keyset pagination se.",
    sql: "-- Traditional OFFSET pagination (slow for deep pages)\nSELECT * FROM products ORDER BY id LIMIT 20 OFFSET 100000;\n\n-- Keyset/seek pagination (fast, uses the index directly)\nSELECT * FROM products\nWHERE id > 100000   -- last id seen on the previous page\nORDER BY id\nLIMIT 20;",
    output: "-- Both return the 'next' 20 rows, but the keyset version\n-- avoids scanning through the first 100,000 rows to get there.",
    mistakes: "Beginners bade applications me bhi simple OFFSET-based pagination use karte reh jate hain jab tak users deep pages par jaake performance issues report na karein. Ek aur mistake: keyset pagination implement karte waqt sorting column par unique constraint/index na hona — agar sort column me duplicate values ho sakti hain, tab tie-breaking ke liye ek additional unique column (jaise id) bhi order/condition me shamil karna zaroori hai.",
    interviewDefinition: "Standard LIMIT/OFFSET pagination becomes slow on large tables because MySQL must scan through all skipped rows, whereas keyset (seek-based) pagination filters on the last-seen sort value using an indexed WHERE condition, allowing MySQL to jump directly to the next page efficiently."
  },
  {
    id: 91,
    category: "Expert",
    question: "What is the N+1 query problem, commonly seen with ORMs like Laravel's Eloquent?",
    shortAnswer: "N+1 problem tab hota hai jab hum N records ki list fetch karne ke liye 1 query chalate hain, aur phir har record ke related data ko fetch karne ke liye alag-alag N additional queries chala dete hain — total N+1 queries, jabki ye kaam sirf 2 (ya 1 JOIN) query me ho sakta tha.",
    explanation: "Ye problem tab hota hai jab hum ORM me 'lazy loading' use karte hain aur ek loop ke andar related model access karte hain. Jaise Laravel me agar hum '$posts = Post::all()' karte hain aur phir loop me '$post->author->name' access karte hain, to Eloquent har post ke liye ek alag query chalata hai author fetch karne ke liye — agar 100 posts hain, to 1 (posts ke liye) + 100 (har post ke author ke liye) = 101 queries chalengi. Solution hai 'eager loading' use karna (jaise 'Post::with('author')->get()'), jo sirf 2 queries me (ek posts ke liye, ek saare authors ke liye ek IN clause ke saath) poora kaam kar deta hai.",
    example: "Ek blog listing page jaha 50 posts dikhane hain unke authors ke saath — bina eager loading ke ye 51 queries chalayega.",
    sql: "-- Equivalent to what N+1 generates behind the scenes:\nSELECT * FROM posts;                        -- 1 query\nSELECT * FROM users WHERE id = 1;           -- for post #1's author\nSELECT * FROM users WHERE id = 2;           -- for post #2's author\n-- ...and so on, once per post (N additional queries)\n\n-- What eager loading generates instead (just 2 queries):\nSELECT * FROM posts;\nSELECT * FROM users WHERE id IN (1, 2, 3, /* ...all needed author ids */);",
    output: "-- N+1 version: 51 total queries for 50 posts.\n-- Eager-loaded version: 2 total queries for the same result.",
    mistakes: "Beginners is problem ko development me notice hi nahi karte kyunki thoda sa data (jaise 5-10 records) ke saath performance difference negligible lagta hai — production me jab records hazaron me ho jate hain, tab ye severe slowdown ban jata hai. Ek aur mistake: eager loading har jagah blindly apply kar dena, chahe related data actually use na ho rahi ho — isse unnecessary data fetch hota hai, jo apna alag performance cost add karta hai.",
    interviewDefinition: "The N+1 query problem occurs when fetching a list of N records triggers one additional query per record to load related data, resulting in N+1 total queries instead of a single optimized query — commonly solved in ORMs through eager loading of relationships."
  },
  {
    id: 92,
    category: "Expert",
    question: "What is the difference between Eager Loading and Lazy Loading?",
    shortAnswer: "Lazy Loading related data ko tabhi fetch karta hai jab wo actually access kiya jaye (on-demand, ek-ek karke), jabki Eager Loading related data ko pehle hi, ek batch query ke through, upfront load kar leta hai.",
    explanation: "Lazy loading simple aur memory-efficient lagta hai kyunki ye sirf wahi data fetch karta hai jo actually use hota hai — lekin agar loop ke andar related data access ho, to ye N+1 problem create kar deta hai. Eager loading is problem ko avoid karta hai by fetching sabhi related data upfront ek combined query se (jaise Laravel me 'with()' method), lekin agar related data actually use hi nahi hona, to ye unnecessary overhead bhi add kar sakta hai. Sahi choice depend karta hai use case par: agar related data definitely use hoga (especially loops me), eager loading better hai; agar occasional/conditional use hai, lazy loading theek reh sakta hai.",
    example: "Laravel me posts aur unke comments — agar hum sabhi posts ke comments dikhane wale hain, eager loading behtar hai; agar sirf kabhi-kabhi ek specific post ke comments chahiye hote hain, lazy loading theek hai.",
    sql: "-- Lazy loading (Laravel Eloquent) — triggers a query only when accessed:\n$posts = Post::all();\nforeach ($posts as $post) {\n  echo $post->comments; // separate query fires here, per post\n}\n\n-- Eager loading — loads everything upfront in 2 queries total:\n$posts = Post::with('comments')->get();\nforeach ($posts as $post) {\n  echo $post->comments; // no additional query — already loaded\n}",
    output: "-- Lazy loading: 1 (posts) + N (comments per post) queries.\n-- Eager loading: 2 queries total, regardless of how many posts.",
    mistakes: "Beginners hamesha eager loading use kar dete hain 'best practice' samajh kar, chahe related data use ho ya na ho — isse unnecessary data database se transfer hota hai. Ek aur mistake: nested relationships ke liye eager loading sahi se configure na karna (jaise 'with('comments.author')' jaisi nested eager loading), jisse ek dusra chhota N+1 problem create ho jata hai deeper relationship level par.",
    interviewDefinition: "Lazy loading fetches related data on-demand only when it is accessed, which can lead to the N+1 query problem inside loops, whereas eager loading proactively fetches related data upfront in a single combined query, trading some unnecessary data transfer for significantly fewer total queries."
  },
  {
    id: 93,
    category: "Expert",
    question: "What is your general strategy to optimize a slow query on a large table?",
    shortAnswer: "General strategy hai: pehle EXPLAIN se query analyze karo, missing/wrong indexes identify karo, query structure improve karo (functions on indexed columns hatao, unnecessary columns/joins hatao), aur agar zaroorat ho to schema-level changes (partitioning, denormalization) consider karo.",
    explanation: "Ek systematic approach follow karna chahiye: (1) Sabse pehle EXPLAIN chalao aur 'type' column dekho — agar 'ALL' (full table scan) dikhe, to indexing missing hai. (2) 'possible_keys' aur 'key' columns compare karo — kya koi useful index available hai jo actually use nahi ho raha? (3) Query ko rewrite karo — indexed columns par functions hatao, 'SELECT *' ki jagah specific columns lo, unnecessary subqueries ko JOINs me convert karo. (4) Slow query log enable karke identify karo ki production me actually kaunsi queries problematic hain. (5) Agar table bahut badi ho (crores rows), to partitioning, archiving purane data, ya read replicas jaisa architectural change consider karo. Optimization hamesha measure-first approach follow karna chahiye — bina data ke assumptions par optimize mat karo.",
    example: "Ek 'orders' table jisme 5 crore rows hain, aur 'SELECT * FROM orders WHERE customer_id = 123 ORDER BY created_at DESC' query slow chal rahi hai.",
    sql: "-- Step 1: Analyze\nEXPLAIN SELECT * FROM orders WHERE customer_id = 123 ORDER BY created_at DESC;\n\n-- Step 2: If 'type' shows ALL (full scan), add a composite index\nCREATE INDEX idx_customer_created\nON orders(customer_id, created_at);\n\n-- Step 3: Select only needed columns instead of *\nSELECT id, product_name, amount, created_at\nFROM orders\nWHERE customer_id = 123\nORDER BY created_at DESC\nLIMIT 20;",
    output: "-- Before: type = ALL, rows scanned = 50,000,000 (full table scan)\n-- After adding the composite index: type = ref, rows scanned ≈ 40 (just this customer's orders)",
    mistakes: "Beginners bina EXPLAIN check kiye directly indexes add karte rehte hain trial-and-error tarike se, jisse bahut saare unnecessary/unused indexes ban jate hain (jo write performance kharab karte hain). Ek aur mistake: sirf query-level optimization par focus karna aur application-level problems (jaise N+1 queries, unnecessary repeated queries) ko ignore kar dena.",
    interviewDefinition: "Optimizing a slow query generally involves analyzing its execution plan with EXPLAIN, adding or correcting indexes based on actual filtering and sorting columns, refining the query itself to avoid unnecessary computation, and, for very large tables, considering architectural solutions like partitioning or read replicas — all guided by measurement rather than guesswork."
  },
  {
    id: 94,
    category: "Expert",
    question: "What is Database Replication (Master-Slave / Source-Replica)?",
    shortAnswer: "Replication ek process hai jisme ek 'primary' (master/source) database ke changes automatically ek ya zyada 'replica' (slave) databases par copy ho jate hain — mainly read scalability, backup, aur high availability ke liye use hota hai.",
    explanation: "Ek single database server par zyada read traffic ho to wo bottleneck ban sakta hai. Replication se hum saare writes (INSERT/UPDATE/DELETE) primary server par bhejte hain, aur primary apne changes (binary log ke through) replicas ko continuously bhejta rehta hai. Reads ko phir replicas ke beech distribute kiya ja sakta hai, jisse primary par load kam hota hai. Replication backup/disaster-recovery ke liye bhi useful hai — agar primary fail ho jaye, ek replica ko naya primary bana kar downtime minimize kiya ja sakta hai. Ek important consideration: replication asynchronous hoti hai by default, matlab replica ka data primary se thoda 'lag' kar sakta hai (replication lag) — isliye critical reads (jahan turant-turant updated data chahiye) ko primary se hi karna chahiye.",
    example: "Ek high-traffic web application jaha saare writes primary database par jaate hain, aur dashboard/reporting jaisi read-heavy queries ek separate read-replica se serve hoti hain.",
    sql: "-- Illustrative: application-level routing (conceptual, not raw SQL)\n-- Writes go here:\nINSERT INTO orders (customer_id, amount) VALUES (101, 2500) /* executed on PRIMARY */;\n\n-- Reads can be routed here instead:\nSELECT * FROM orders WHERE customer_id = 101 /* executed on a REPLICA */;",
    output: "-- The INSERT is applied to the primary and then streamed to all replicas\n-- via the binary log, typically within milliseconds to a few seconds.",
    mistakes: "Beginners replication lag ko ignore kar dete hain aur turant-write-ke-baad-read wale operations (jaise 'order place karo aur turant usi order ki details dikhao') ko replica se serve karne ki koshish karte hain, jisse kabhi-kabhi 'data not found' jaisi problems aati hain agar replica abhi tak sync na hua ho. Ek aur mistake: replication ko backup ka substitute samajh lena — replication automatically corruption ya accidental DELETE ko bhi replicate kar deta hai, isliye separate proper backups bhi zaroori hote hain.",
    interviewDefinition: "Database replication continuously copies changes from a primary (master) database to one or more replica (slave) databases, typically used to scale read traffic across replicas, provide failover for high availability, and support backup strategies — with the trade-off of asynchronous replication lag between the primary and its replicas."
  },
  {
    id: 95,
    category: "Expert",
    question: "What is Sharding / Partitioning in MySQL?",
    shortAnswer: "Partitioning ek single table ke data ko multiple physical segments me split karta hai (usually same server par), jabki Sharding data ko multiple separate database servers me split karta hai — dono ka goal hai bahut badi datasets ko manageable, performant chunks me todna.",
    explanation: "Partitioning tab useful hai jab ek single table itni badi ho jaye ki queries aur maintenance (jaise index rebuilding) slow ho jaye — MySQL data ko range, list, hash, ya key ke basis par partitions me divide kar sakta hai, aur agar query kisi specific partition tak restrict ho ('partition pruning'), to MySQL sirf relevant partition scan karta hai, poori table nahi. Sharding is concept ko ek step aage le jata hai — data ko completely alag database servers par distribute kiya jata hai (jaise customer ID ke hash ke basis par 'customer 1-1000 server A par, 1001-2000 server B par'), jo horizontal scaling ka core concept hai jab ek single server ka storage/compute capacity insufficient ho jaye.",
    example: "Ek 'orders' table jo saal ke hisaab se partitioned hai (2024, 2025, 2026 alag partitions me) — purane saal ki reports sirf us specific partition ko scan karengi.",
    sql: "CREATE TABLE orders (\n  id INT NOT NULL,\n  order_date DATE NOT NULL,\n  amount DECIMAL(10,2)\n)\nPARTITION BY RANGE (YEAR(order_date)) (\n  PARTITION p2024 VALUES LESS THAN (2025),\n  PARTITION p2025 VALUES LESS THAN (2026),\n  PARTITION p2026 VALUES LESS THAN (2027)\n);",
    output: "Query OK, 0 rows affected\n(Queries filtering on order_date within 2026 will only scan the p2026 partition)",
    mistakes: "Beginners partitioning aur sharding ko same concept samajh lete hain — partitioning ek single server ke andar hi data split karta hai (relatively simpler), jabki sharding multiple independent servers involve karta hai (bahut zyada application-level complexity add karta hai, jaise cross-shard queries/joins handle karna). Ek aur mistake: partition key aisa choose karna jo query patterns ke saath align na kare — agar queries partition key par filter nahi karti, to partitioning se koi performance benefit nahi milta (balki thoda overhead bhi ho sakta hai).",
    interviewDefinition: "Partitioning splits a single table's data into physical segments (typically within the same server) based on a key like date ranges, allowing MySQL to scan only relevant partitions, while sharding distributes data across multiple independent database servers entirely — both aim to keep very large datasets manageable, with sharding representing a more complex, horizontally-scaled architecture."
  },
  {
    id: 96,
    category: "Expert",
    question: "What is the difference between Horizontal and Vertical Scaling for databases?",
    shortAnswer: "Vertical Scaling (scale-up) ek single server ki capacity badhata hai (zyada CPU, RAM, faster disk), jabki Horizontal Scaling (scale-out) load ko handle karne ke liye zyada servers add karta hai (jaise replicas ya shards).",
    explanation: "Vertical scaling simpler hota hai implement karne me — bas server ka hardware upgrade kar do, application code me koi change nahi chahiye. Lekin iski ek physical limit hoti hai (ek server sirf itni RAM/CPU tak hi scale ho sakta hai), aur ye single point of failure bhi rehta hai. Horizontal scaling zyada complex hai (application ko multiple servers ke saath kaam karne ke liye design karna padta hai — jaise read replicas ka use, ya sharding), lekin theoretically bahut zyada scale kar sakta hai aur better fault-tolerance deta hai (agar ek server down ho, doosre chalte rehte hain). Real-world systems aksar dono ka combination use karte hain — pehle vertical scaling se jitna ho sake utna scale karo (simplicity ke liye), aur jab wo limit reach ho jaye, tab horizontal scaling introduce karo.",
    example: "Ek startup apne database server ka RAM 8GB se 64GB upgrade karta hai (vertical scaling) jab tak traffic manageable hai; jab traffic bahut zyada badh jata hai, wo read replicas add karta hai reads ko distribute karne ke liye (horizontal scaling).",
    sql: "-- Vertical scaling: no SQL change needed, just infrastructure upgrade\n-- (e.g., moving from a 4-core/8GB server to a 16-core/64GB server)\n\n-- Horizontal scaling: application-level routing to distribute load\n-- Write -> primary server\nINSERT INTO orders (customer_id, amount) VALUES (101, 2500);\n-- Read -> any of several replica servers\nSELECT * FROM orders WHERE customer_id = 101;",
    output: "-- Vertical scaling improves the capacity of a single machine.\n-- Horizontal scaling spreads load across multiple machines.",
    mistakes: "Beginners sochte hain horizontal scaling hamesha 'better' solution hai — actually ye significant application complexity add karta hai (data consistency across servers, cross-shard queries, etc.), isliye zaroorat se pehle isse implement karna over-engineering ho sakta hai. Ek aur mistake: vertical scaling ki hardware limits ko underestimate karna — ek point ke baad, chahe kitna bhi paisa lagao, single-server performance aur nahi badh sakti.",
    interviewDefinition: "Vertical scaling increases a single server's capacity by adding more CPU, RAM, or faster storage, while horizontal scaling distributes load across multiple servers through techniques like read replicas or sharding — vertical scaling is simpler but has a hard ceiling, whereas horizontal scaling is more complex to implement but scales much further and improves fault tolerance."
  },
  {
    id: 97,
    category: "Expert",
    question: "How would you design a database schema for a real-world e-commerce order system?",
    shortAnswer: "Ek typical e-commerce schema me 'customers', 'products', 'orders', aur 'order_items' jaisi core tables hoti hain — 'orders' aur 'products' ke beech many-to-many relationship ko ek junction table ('order_items') handle karti hai, jisme quantity aur price-at-time-of-purchase jaisi details store hoti hain.",
    explanation: "Key design decision yahan ye hai ki ek order me multiple products ho sakte hain, aur ek product multiple orders me ho sakta hai — ye ek many-to-many relationship hai, jo 'order_items' junction table se handle hoti hai. Important insight: 'order_items' me product ka price bhi store karna chahiye (uss waqt ka price, 'products' table se copy karke), na ki sirf product_id reference karke live price fetch karna — kyunki agar product ka price baad me badal jaye, purane orders ka total amount galat ho jayega agar hum live price use karein. Ye ek jaan-boojh kar kiya gaya controlled denormalization hai, historical accuracy ke liye.",
    example: "Customer ek order place karta hai jisme 2 products hain — schema ko is tarah design karna ki order ka total amount hamesha accurate rahe, chahe products ka price future me badal jaye.",
    sql: "CREATE TABLE customers (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100),\n  email VARCHAR(100) UNIQUE\n);\n\nCREATE TABLE products (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(150),\n  price DECIMAL(10,2),\n  stock INT UNSIGNED DEFAULT 0\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  customer_id INT,\n  status ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\nCREATE TABLE order_items (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  order_id INT,\n  product_id INT,\n  quantity INT UNSIGNED,\n  price_at_purchase DECIMAL(10,2), -- snapshot of the price when ordered\n  FOREIGN KEY (order_id) REFERENCES orders(id),\n  FOREIGN KEY (product_id) REFERENCES products(id)\n);",
    output: "Query OK, 0 rows affected  (x4)\n(Four related tables created, capturing customers, products, orders, and their line items)",
    mistakes: "Beginners 'order_items' me price store karna skip kar dete hain aur order total calculate karte waqt live 'products.price' use karte hain — isse ek bahut common real-world bug aata hai jaha product price change hone par purane orders ke totals galat dikhne lagte hain. Ek aur mistake: 'orders' table me direct 'product_id' aur 'quantity' columns rakh dena (single product assume karke), jo future me multi-product orders support karne ke liye poori schema restructure karne ki zaroorat create kar deta hai.",
    interviewDefinition: "A typical e-commerce schema centers on customers, products, orders, and an order_items junction table that resolves the many-to-many relationship between orders and products, while also snapshotting the product's price at the time of purchase to preserve historical accuracy even if the product's price later changes."
  },
  {
    id: 98,
    category: "Expert",
    question: "How do you handle race conditions when multiple requests try to decrement stock simultaneously?",
    shortAnswer: "Race condition ko avoid karne ke liye stock check aur decrement ko ek hi atomic database operation me combine karna chahiye (jaise 'UPDATE ... WHERE stock >= quantity'), instead of pehle 'SELECT' se stock check karke phir separately 'UPDATE' karna — aur is poore operation ko ek transaction ke andar 'SELECT ... FOR UPDATE' ke saath wrap karna chahiye.",
    explanation: "Ek common (lekin buggy) pattern hai: pehle SELECT karke check karna 'stock > 0 hai kya', aur agar hai to phir alag se UPDATE karke stock ghatana. Problem ye hai ki do simultaneous requests dono hi 'stock > 0' check kar sakte hain (dono ko same value dikh sakti hai, jaise stock = 1), aur dono decrement kar den — isse stock negative ho sakta hai (overselling). Sahi approach hai: ek single atomic UPDATE query use karna jisme condition khud WHERE clause me ho ('UPDATE products SET stock = stock - 1 WHERE id = ? AND stock >= 1') — agar affected rows 0 aaye, matlab stock insufficient tha, request ko fail treat karo. Isse extra pessimistic locking ('SELECT ... FOR UPDATE' ek transaction ke andar) bhi combine kiya ja sakta hai jab operation thoda zyada complex ho (jaise multiple related updates ek saath karni ho).",
    example: "Ek flash sale me sirf 1 item bacha hai aur 2 customers simultaneously 'Buy Now' click karte hain — sirf ek hi order successfully place hona chahiye.",
    sql: "-- BUGGY pattern (race condition possible):\n-- Step 1: SELECT stock FROM products WHERE id = 10;   -- both requests see stock = 1\n-- Step 2: UPDATE products SET stock = stock - 1 WHERE id = 10;  -- both succeed, stock becomes -1\n\n-- SAFE pattern (atomic, condition inside the UPDATE itself):\nUPDATE products\nSET stock = stock - 1\nWHERE id = 10 AND stock >= 1;\n-- Check affected rows: if 0, stock was already insufficient — reject this order.",
    output: "Query OK, 1 row affected     -- the first request that reaches this succeeds\nQuery OK, 0 rows affected    -- the second, near-simultaneous request is safely rejected",
    mistakes: "Beginners application-level checks (jaise pehle model fetch karke uske property check karna, phir save karna) par bharosa kar lete hain, jo race conditions se completely vulnerable hota hai — ye check hamesha database-level atomic operation me hona chahiye. Ek aur mistake: sirf application code me try-catch laga dena bina samjhe ki underlying problem concurrency ki hai, database constraint/atomic-update ki nahi.",
    interviewDefinition: "Race conditions on stock decrements are prevented by making the check-and-decrement a single atomic database operation — such as an UPDATE with the stock condition in its WHERE clause — rather than performing a separate SELECT check followed by an UPDATE, ensuring concurrent requests cannot both pass the check against the same stale value."
  },
  {
    id: 99,
    category: "Expert",
    question: "What is Connection Pooling, and why does it matter for a PHP/Laravel application?",
    shortAnswer: "Connection Pooling ek technique hai jisme database connections ko pehle se create karke ek 'pool' me reusable rakha jata hai, taaki har request par naya connection banane aur band karne ka overhead na uthana pade — isse application significantly faster aur more scalable ban jati hai.",
    explanation: "Database connection banana (TCP handshake, authentication, session setup) ek relatively expensive operation hai. Traditional PHP-FPM setups me, har incoming request apna khud ka naya database connection banata hai aur request khatam hote hi close kar deta hai — high-traffic applications me ye overhead significant ban sakta hai aur database server par bhi bahut saare 'connect/disconnect' cycles ka load daalta hai. Connection pooling (jo tools jaise ProxySQL, ya persistent connections, ya PHP-FPM ke bahar chalne wale long-running processes — jaise Laravel Octane — ke through implement kiya jata hai) already-open connections ko reuse karta hai, jisse per-request overhead kam hota hai aur database server par bhi connection churn kam hota hai.",
    example: "Ek high-traffic Laravel API jisme thousands requests per second aa rahe hain — connection pooling (jaise ProxySQL ke through, ya Laravel Octane jaisi persistent-worker architecture apnakar) database par connection overhead significantly kam kar deta hai.",
    sql: "-- Illustrative: without pooling, each request effectively does this:\n-- 1. Open a new TCP connection + authenticate\n-- 2. Run the actual query\n-- 3. Close the connection\n\n-- With pooling, step 1 and 3 are skipped for most requests —\n-- an already-established connection from the pool is reused:\nSELECT * FROM products WHERE id = 10;  -- runs on a pre-existing pooled connection",
    output: "-- Without pooling: connection setup can take longer than the query itself\n-- under high load. With pooling, that setup cost is largely eliminated.",
    mistakes: "Beginners connection pooling ko sirf 'infrastructure team ka problem' samajh kar ignore kar dete hain, jab actually application architecture (jaise Laravel Octane adopt karna, ya database ke max_connections settings sahi tune karna) is se directly juda hota hai. Ek aur mistake: pooling implement kiye bina hi bahut zyada 'max_connections' database server par set kar dena as a workaround — ye actual root cause (per-request connection overhead) solve nahi karta, sirf symptom ko temporarily mask karta hai.",
    interviewDefinition: "Connection pooling maintains a set of pre-established, reusable database connections so that individual requests don't incur the overhead of opening and closing a new connection each time, significantly improving performance and reducing connection churn on the database server under high load — particularly relevant for PHP/Laravel applications given PHP's traditionally short-lived, per-request execution model."
  },
  {
    id: 100,
    category: "Expert",
    question: "What are the best practices for securing a MySQL database in a production environment?",
    shortAnswer: "Key practices me shamil hain: least-privilege user permissions, strong unique passwords, disabling remote root login, using SSL/TLS for connections, keeping MySQL updated, regular encrypted backups, using prepared statements everywhere, aur firewall rules jo database port ko sirf trusted servers tak restrict karein.",
    explanation: "Production database security ek layered approach maangti hai. (1) Least privilege: application users ko sirf wahi permissions do jo unhe actually chahiye (jaise ek reporting user ko sirf SELECT, koi DROP/DELETE nahi) — GRANT statements se granular control milta hai. (2) Root user ko remote se access na hone dena, aur sabhi accounts par strong, unique passwords. (3) SSL/TLS enable karna taaki data 'in transit' encrypted rahe, especially jab application aur database alag servers par ho. (4) Regular backups lena (aur unhe encrypt karke store karna, aur periodically restore test karna). (5) MySQL aur uske dependencies ko updated rakhna known vulnerabilities patch karne ke liye. (6) Application code me hamesha prepared statements use karna (SQL injection se bachne ke liye — Question 89 dekho). (7) Firewall/security groups se database port (3306) ko sirf specific trusted application servers ke IPs tak restrict karna, public internet ke liye open na rakhna.",
    example: "Ek production Laravel application ka database user sirf specific tables par SELECT/INSERT/UPDATE permission rakhta hai (koi DROP/ALTER nahi), aur database server firewall se sirf application server ke IP se hi accessible hai.",
    sql: "-- Creating a least-privilege application user (instead of using root)\nCREATE USER 'app_user'@'10.0.1.%' IDENTIFIED BY 'a_very_strong_unique_password';\n\nGRANT SELECT, INSERT, UPDATE, DELETE\nON ecommerce_db.orders, ecommerce_db.order_items\nTO 'app_user'@'10.0.1.%';\n\n-- Explicitly NOT granting DROP, ALTER, or GRANT OPTION to this user\nFLUSH PRIVILEGES;",
    output: "Query OK, 0 rows affected\n(app_user can now only read and modify data in the specified tables —\nit cannot alter schema, drop tables, or manage other users)",
    mistakes: "Beginners application ke liye directly 'root' user use kar dete hain convenience ke liye — agar application layer kabhi compromise ho jaye (jaise koi SQL injection reh jaye), attacker ko poori database par full control mil jata hai. Ek aur mistake: database port ko bina firewall restriction ke public internet par expose kar dena 'remote access ke liye', jo automated bots/attackers ke liye ek easy target ban jata hai.",
    interviewDefinition: "Securing a production MySQL database involves applying least-privilege access control for application users, disabling remote root access, encrypting connections with SSL/TLS, keeping the server patched and updated, maintaining regular encrypted backups, consistently using prepared statements to prevent SQL injection, and restricting network access to the database port to only trusted, known servers."
  }
];

QUESTIONS.push(...window.QUESTIONS_101_150);

console.log(QUESTIONS.length);

/* ================================ STATE ================================= */
const state = {
  currentId: null,
  readIds: new Set(),
  searchTerm: "",
  theme: "light"
};

const STORAGE_KEYS = {
  read: "mysqlReadQuestions",
  theme: "mysqlTheme",
  current: "mysqlCurrentQuestion"
};

/* ============================== DOM CACHE ================================ */
const dom = {
  // sidebars
  sidebarList: document.getElementById("sidebarList"),
  mobileSidebarList: document.getElementById("mobileSidebarList"),
  sidebarEmptyDesktop: document.getElementById("sidebarEmptyStateDesktop"),
  sidebarEmptyMobile: document.getElementById("sidebarEmptyStateMobile"),

  // search inputs
  searchDesktop: document.getElementById("searchInputDesktop"),
  searchSidebar: document.getElementById("searchInputSidebar"),
  searchMobile: document.getElementById("searchInputMobile"),

  // progress widgets
  progressCountDesktop: document.getElementById("progressCountDesktop"),
  progressPercentDesktop: document.getElementById("progressPercentDesktop"),
  progressFillDesktop: document.getElementById("progressFillDesktop"),
  progressCountMobile: document.getElementById("progressCountMobile"),
  progressPercentMobile: document.getElementById("progressPercentMobile"),
  progressFillMobile: document.getElementById("progressFillMobile"),
  progressCountMobileTop: document.getElementById("progressCountMobileTop"),
  progressFillMobileTop: document.getElementById("progressFillMobileTop"),

  // question card
  questionCard: document.getElementById("questionCard"),
  qPosition: document.getElementById("qPosition"),
  qCategoryBadge: document.getElementById("qCategoryBadge"),
  qReadBadge: document.getElementById("qReadBadge"),
  qQuestionText: document.getElementById("qQuestionText"),
  qShortAnswer: document.getElementById("qShortAnswer"),
  qExplanation: document.getElementById("qExplanation"),
  qExample: document.getElementById("qExample"),
  qSql: document.getElementById("qSql"),
  qOutput: document.getElementById("qOutput"),
  qMistakes: document.getElementById("qMistakes"),
  qInterviewDefinition: document.getElementById("qInterviewDefinition"),

  // desktop nav
  btnPrev: document.getElementById("btnPrev"),
  btnNext: document.getElementById("btnNext"),
  btnMarkRead: document.getElementById("btnMarkRead"),
  btnMarkReadLabel: document.getElementById("btnMarkReadLabel"),

  // mobile nav
  btnPrevMobile: document.getElementById("btnPrevMobile"),
  btnNextMobile: document.getElementById("btnNextMobile"),
  btnMarkReadMobile: document.getElementById("btnMarkReadMobile"),
  btnMarkReadLabelMobile: document.getElementById("btnMarkReadLabelMobile"),

  // navbar actions
  btnResetProgress: document.getElementById("btnResetProgress"),
  btnDarkMode: document.getElementById("btnDarkMode"),
  darkModeIcon: document.getElementById("darkModeIcon"),

  htmlEl: document.documentElement,
  mobileSidebarEl: document.getElementById("mobileSidebar")
};

/* ============================ UTILITY HELPERS ============================ */

/** Returns the QUESTIONS array filtered by the current search term. */
function getFilteredQuestions() {
  const term = state.searchTerm.trim().toLowerCase();
  if (!term) return QUESTIONS;
  return QUESTIONS.filter((q) => {
    return (
      String(q.id).includes(term) ||
      q.question.toLowerCase().includes(term) ||
      q.category.toLowerCase().includes(term)
    );
  });
}

/** Maps a category string to a short lowercase token used for badge coloring. */
function categoryToToken(category) {
  return category.toLowerCase().replace(/[^a-z]/g, "");
}

/** Finds a question object by its numeric id. */
function findQuestionById(id) {
  return QUESTIONS.find((q) => q.id === id);
}

/* ============================= RENDER: SIDEBAR ============================ */

/**
 * Renders the question catalog into both the desktop sidebar and the
 * mobile offcanvas sidebar, applying the current search filter, the
 * active question highlight, and read/unread styling.
 */
function renderSidebar() {
  const list = getFilteredQuestions();
  const fragmentHtml = list
    .map((q) => {
      const isActive = q.id === state.currentId;
      const isRead = state.readIds.has(q.id);
      const classes = [
        "question-nav-item",
        isActive ? "active" : "",
        isRead ? "is-read" : ""
      ]
        .filter(Boolean)
        .join(" ");
      const iconClass = isRead ? "bi-check-circle-fill" : "bi-circle";
      return `
        <button type="button" class="${classes}" data-id="${q.id}">
          <i class="bi ${iconClass} nav-item-icon"></i>
          <span class="nav-item-number">Q${q.id}</span>
          <span class="nav-item-text">${escapeHtml(q.question)}</span>
        </button>
      `;
    })
    .join("");

  dom.sidebarList.innerHTML = fragmentHtml;
  dom.mobileSidebarList.innerHTML = fragmentHtml;

  const isEmpty = list.length === 0;
  dom.sidebarEmptyDesktop.classList.toggle("d-none", !isEmpty);
  dom.sidebarEmptyMobile.classList.toggle("d-none", !isEmpty);

  // Attach click handlers (delegation would also work, but lists are
  // re-rendered on every search/state change so direct binding is simple
  // and keeps behavior easy to follow).
  [dom.sidebarList, dom.mobileSidebarList].forEach((listEl) => {
    listEl.querySelectorAll(".question-nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        loadQuestion(id);
        // Close the mobile offcanvas after picking a question.
        if (dom.mobileSidebarEl.classList.contains("show")) {
          const instance = bootstrap.Offcanvas.getOrCreateInstance(dom.mobileSidebarEl);
          instance.hide();
        }
      });
    });
  });

  scrollActiveItemIntoView();
}

/** Escapes HTML special characters to avoid markup injection from data. */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Ensures the active sidebar entry is visible within its scrollable list. */
function scrollActiveItemIntoView() {
  [dom.sidebarList, dom.mobileSidebarList].forEach((listEl) => {
    const activeEl = listEl.querySelector(".question-nav-item.active");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  });
}

/* ============================ RENDER: QUESTION ============================ */

/** Paints the currently active question into the main question card. */
function renderQuestion() {
  const q = findQuestionById(state.currentId);
  if (!q) return;

  const index = QUESTIONS.findIndex((item) => item.id === q.id);
  const isRead = state.readIds.has(q.id);

  dom.qPosition.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  dom.qCategoryBadge.textContent = q.category;
  dom.qCategoryBadge.dataset.cat = categoryToToken(q.category);
  dom.qReadBadge.classList.toggle("d-none", !isRead);

  dom.qQuestionText.textContent = q.question;
  dom.qShortAnswer.textContent = q.shortAnswer;
  dom.qExplanation.textContent = q.explanation;
  dom.qExample.textContent = q.example;
  dom.qSql.textContent = q.sql;

  dom.qOutput.textContent = q.output;
  dom.qOutput.style.whiteSpace = "pre-wrap";

  dom.qMistakes.textContent = q.mistakes;
  dom.qInterviewDefinition.textContent = q.interviewDefinition;

  // Prev/Next disabled state
  dom.btnPrev.disabled = index <= 0;
  dom.btnPrevMobile.disabled = index <= 0;
  dom.btnNext.disabled = index >= QUESTIONS.length - 1;
  dom.btnNextMobile.disabled = index >= QUESTIONS.length - 1;

  updateMarkReadButton(isRead);

  // One deliberate transition on question change.
  dom.questionCard.classList.remove("question-enter");
  // Force reflow so the animation can restart every time.
  void dom.questionCard.offsetWidth;
  dom.questionCard.classList.add("question-enter");

  // Persist the current position so a refresh resumes where the user left off.
  try {
    localStorage.setItem(STORAGE_KEYS.current, String(q.id));
  } catch (e) {
    /* localStorage may be unavailable (e.g. private mode) — fail silently */
  }
}

/** Updates the "Mark as Read" button label/state on both desktop and mobile. */
function updateMarkReadButton(isRead) {
  dom.btnMarkRead.classList.toggle("is-marked", isRead);
  dom.btnMarkReadMobile.classList.toggle("is-marked", isRead);
  dom.btnMarkReadLabel.textContent = isRead ? "Read" : "Mark as Read";
  dom.btnMarkReadLabelMobile.textContent = isRead ? "Read" : "Mark Read";
}

/* ============================ RENDER: PROGRESS ============================ */

/** Recomputes read-progress numbers and paints every progress widget. */
function updateProgress() {
  const total = QUESTIONS.length;
  const done = state.readIds.size;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const countText = `${done} / ${total} Completed`;
  const percentText = `${percent}%`;

  dom.progressCountDesktop.textContent = countText;
  dom.progressPercentDesktop.textContent = percentText;
  dom.progressFillDesktop.style.width = `${percent}%`;

  dom.progressCountMobile.textContent = countText;
  dom.progressPercentMobile.textContent = percentText;
  dom.progressFillMobile.style.width = `${percent}%`;

  dom.progressCountMobileTop.textContent = countText;
  dom.progressFillMobileTop.style.width = `${percent}%`;
}

/* ============================= CORE ACTIONS =============================== */

/** Loads a question by id: updates state and repaints question + sidebar. */
function loadQuestion(id) {
  const q = findQuestionById(id);
  if (!q) return;
  state.currentId = id;
  renderQuestion();
  renderSidebar();
}

/** Advances to the next question in the full (unfiltered) list, if any. */
function nextQuestion() {
  const index = QUESTIONS.findIndex((q) => q.id === state.currentId);
  if (index === -1 || index >= QUESTIONS.length - 1) return;
  loadQuestion(QUESTIONS[index + 1].id);
}

/** Moves to the previous question in the full (unfiltered) list, if any. */
function previousQuestion() {
  const index = QUESTIONS.findIndex((q) => q.id === state.currentId);
  if (index <= 0) return;
  loadQuestion(QUESTIONS[index - 1].id);
}

/** Marks the current question as read (idempotent) and persists it. */
function markAsRead() {
  if (state.currentId === null) return;
  if (state.readIds.has(state.currentId)) return; // no duplicate entries
  state.readIds.add(state.currentId);
  persistReadIds();
  updateProgress();
  renderSidebar();
  updateMarkReadButton(true);
  dom.qReadBadge.classList.remove("d-none");
}

/** Saves the current read-set to localStorage as a JSON array of ids. */
function persistReadIds() {
  try {
    localStorage.setItem(STORAGE_KEYS.read, JSON.stringify(Array.from(state.readIds)));
  } catch (e) {
    /* localStorage may be unavailable — the session still works in-memory */
  }
}

/** Filters the sidebar as the user types in any of the three search boxes. */
function searchQuestions(term) {
  state.searchTerm = term || "";
  renderSidebar();
}

/** Reads saved read-ids and theme preference from localStorage into state. */
function loadSavedProgress() {
  try {
    const savedRead = localStorage.getItem(STORAGE_KEYS.read);
    if (savedRead) {
      const ids = JSON.parse(savedRead);
      if (Array.isArray(ids)) {
        state.readIds = new Set(ids);
      }
    }
  } catch (e) {
    state.readIds = new Set();
  }

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    state.theme = savedTheme === "dark" ? "dark" : "light";
  } catch (e) {
    state.theme = "light";
  }

  applyTheme(state.theme);
}

/** Applies the given theme to the document and updates the toggle icon. */
function applyTheme(theme) {
  dom.htmlEl.setAttribute("data-theme", theme);
  dom.darkModeIcon.classList.toggle("bi-moon-stars", theme === "light");
  dom.darkModeIcon.classList.toggle("bi-sun", theme === "dark");
}

/** Flips light/dark mode and persists the preference. */
function toggleDarkMode() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme(state.theme);
  try {
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  } catch (e) {
    /* localStorage may be unavailable — theme still applies for this session */
  }
}

/** Clears all read progress after user confirmation. */
function resetProgress() {
  const confirmed = window.confirm(
    "This will clear your read progress for all 100 questions. Continue?"
  );
  if (!confirmed) return;

  state.readIds = new Set();
  persistReadIds();
  updateProgress();
  renderSidebar();
  if (state.currentId !== null) {
    updateMarkReadButton(false);
    dom.qReadBadge.classList.add("d-none");
  }
}

/* ============================ EVENT WIRING ================================ */

function wireStaticEvents() {
  // Navigation
  dom.btnPrev.addEventListener("click", previousQuestion);
  dom.btnNext.addEventListener("click", nextQuestion);
  dom.btnPrevMobile.addEventListener("click", previousQuestion);
  dom.btnNextMobile.addEventListener("click", nextQuestion);

  dom.btnMarkRead.addEventListener("click", markAsRead);
  dom.btnMarkReadMobile.addEventListener("click", markAsRead);

  // Search (all three inputs stay in sync with the same search term)
  [dom.searchDesktop, dom.searchSidebar, dom.searchMobile].forEach((input) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      [dom.searchDesktop, dom.searchSidebar, dom.searchMobile].forEach((other) => {
        if (other !== e.target) other.value = value;
      });
      searchQuestions(value);
    });
  });

  // Dark mode + reset
  dom.btnDarkMode.addEventListener("click", toggleDarkMode);
  dom.btnResetProgress.addEventListener("click", resetProgress);

  // Keyboard navigation: Left/Right arrows move between questions,
  // "M" marks the current question as read. Ignored while typing in a
  // search box so users can type freely.
  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

    if (e.key === "ArrowRight") {
      nextQuestion();
    } else if (e.key === "ArrowLeft") {
      previousQuestion();
    } else if (e.key === "m" || e.key === "M") {
      markAsRead();
    }
  });
}

/* ================================= INIT ==================================== */

function initApp() {
  loadSavedProgress();

  // Enable Bootstrap tooltips on the icon buttons.
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    new bootstrap.Tooltip(el);
  });

  wireStaticEvents();

  // Resume the last-viewed question if one was saved, otherwise start at Q1.
  let startId = QUESTIONS[0].id;
  try {
    const savedCurrent = Number(localStorage.getItem(STORAGE_KEYS.current));
    if (savedCurrent && findQuestionById(savedCurrent)) {
      startId = savedCurrent;
    }
  } catch (e) {
    /* fall back to the first question */
  }

  loadQuestion(startId);
  updateProgress();
}

document.addEventListener("DOMContentLoaded", initApp);
