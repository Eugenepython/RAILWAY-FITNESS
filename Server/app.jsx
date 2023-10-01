const express = require('express');
const { Pool } = require('pg');
const pgp = require('pg-promise')();
require('dotenv').config();

//const db = pgp('postgres://postgres:vienna1981@localhost:5432/fitness');
const db = pgp(process.env.DATABASE_URL);


const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const historyArray = [];

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'notguilty2010', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log(process.env.DB_USER)
console.log(process.env.DB_HOST)
console.log(process.env.DB_NAME)
console.log(process.env.DB_PASSWORD)
console.log(pool.options.user)

console.log(process.env.DB_PORT)


app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.get('/hello', (req, res) => { 
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    } else {
      console.log(result.rows);
      res.send(result.rows);
    }
  });  
});

app.post('/dates', (req, res) => {
  const { userName } = req.body;
  //console.log('??????Received registration request with username: ', userName);

  pool.query('SELECT * FROM workout_history WHERE username = $1', [userName],
    (err, result) => {
      if (err) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } else {
        //console.log(result.rows);
        res.send( result.rows);
      }
    });
});

app.post('/arms', (req, res) => {
  const { lastArmsDate, sessionTitle } = req.body;
  const workoutType = 'arms'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastArmsDate: ', lastArmsDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastArmsDate, sessionTitle],
        )
        .then((result) => {
          console.log('New workout data inserted successfully');
          console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post('/abs', (req, res) => {
  const { lastAbsDate, sessionTitle } = req.body;
  const workoutType = 'abs'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastAbsDate: ', lastAbsDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastAbsDate, sessionTitle],
        )
        .then((result) => {
          console.log('New workout data inserted successfully');
          console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post('/back', (req, res) => {
  const { lastBackDate, sessionTitle } = req.body;
  const workoutType = 'back'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastAbsDate: ', lastBackDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastBackDate, sessionTitle],
        )
        .then((result) => {
          //console.log('New workout data inserted successfully');
          //console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post('/chest', (req, res) => {
  const { lastChestDate, sessionTitle } = req.body;
  const workoutType = 'chest'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastAbsDate: ', lastChestDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastChestDate, sessionTitle],
        )
        .then((result) => {
          console.log('New workout data inserted successfully');
          console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post('/legs', (req, res) => {
  const { lastLegsDate, sessionTitle } = req.body;
  const workoutType = 'legs'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastAbsDate: ', lastLegsDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastLegsDate, sessionTitle],
        )
        .then((result) => {
          console.log('New workout data inserted successfully');
          console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});








app.post('/shoulders', (req, res) => {
  const { lastShouldersDate, sessionTitle } = req.body;
  const workoutType = 'shoulders'
  db.manyOrNone('SELECT * FROM users WHERE username = $1', [sessionTitle])
    .then((relevantRow) => {
      //if (relevantRow.length > 0) {
        //console.log(relevantRow[0].user_id)
        const user_id = relevantRow[0].user_id
        //console.log('!!!Received registration request with lastAbsDate: ', lastShouldersDate);
        //console.log('!!!Received registration request with sessionTitle: ', sessionTitle);
        //console.log('!!!Received registration request with user_id: ', user_id);
        pool.query(
          'INSERT INTO workout_history (user_id, workout_type, last_workout_date, username) VALUES ($1, $2, $3, $4)',
          [user_id, workoutType, lastShouldersDate, sessionTitle],
        )
        .then((result) => {
          console.log('New workout data inserted successfully');
          console.log('Request Body:', req.body);
          res.status(200).json({ message: 'New workout data inserted successfully' });
        })
        .catch((err) => {
          console.error('Error inserting new details into the table:', err);
          console.log('Request Body:', req.body);
          res.status(500).json({ error: 'Internal server error' });
        });
      //}
    })
    .catch((error) => {
      console.log(error);
    });
});



app.post('/history', (req, res) => {
  const { sessionTitle } = req.body;
  //console.log('Request Body:', req.body);
  const userName = req.body.theUser
  //console.log(userName + " is the sessionTitle")
  db.manyOrNone('SELECT * FROM workout_history WHERE username = $1', [userName])
    .then((history) => {
      if (history.length > 0) {
          //console.log(history)
        history.forEach((row) => {
          //console.log('Username:', row.username);
          //console.log('Workout Type:', row.workout_type  + ' Last Workout Date:' + row.last_workout_date);
          historyArray.push((
                  {
                'workoutType': row.workout_type,
                  'workoutDate' : row.last_workout_date,
                  'person' : row.username
                  }
          ))
        });
        res.status(200).json({ answer: historyArray });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  //console.log('Received registration request with username:', username);
  ///console.log('Received registration request with password:', password);
  pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2)',
    [username, password],
    (err) => {
      if (err) {
        console.error('Error inserting user:', err);
        console.log('Request Body:', req.body);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('User inserted successfully');
        console.log('Request Body:', req.body);

        res.status(201).json({ message: 'User inserted successfully' });
      }
    }
  );
});


app.post('/login', (req, res) => {
  const { username, password } = req.body; //the username here is what is ncluded in the token
  const token = jwt.sign({ username }, 'notguilty2010', { expiresIn: '1h' }); 
  pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (err, result) => {
      if (err) {
        console.error('Error selecting user:', err);
        console.log("complete mistake!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.rows.length === 0) {
          res.status(401).json({ noUser: 'User not found' });
          console.log("user not found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        } else {
          //console.log('User exists in the database');
          //console.log('Request Body:', req.body);
          //console.log('Database Result:', result.rows[0]);
          //console.log(result.rows[0].password)
          const storedPassword = result.rows[0].password;
          //console.log(password)
          //console.log(storedPassword)
          if (storedPassword === password) {
            res.status(200).json({ message: 'Login successful, you are logged in',  username : username, token : token });
            //console.log('Login successful');
            req.session.user = { username: username };
            //console.log(JSON.stringify(req.session.user) + ' is the session user');
            //console.log(token)
          } else {
              res.status(401).json({ message: 'wrong' });
              console.log("duckkkkkkkk")
            }
        }
      }
    }
  );
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


