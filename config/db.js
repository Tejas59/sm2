

import mysql from "mysql2"

export const db = mysql.createConnection({
  host: 'localhost',          
  username: 'root',           
  password: 'Tejas@555',      
  database: 'practice' 
})