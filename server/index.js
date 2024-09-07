let express = require('express');
let cors = require('cors');
let mysql = require('mysql2');
let app = express();
port = 4000;

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
  }));

const pool=mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Ssk@2000',
        database: 'auth',
});

app.post('/api/register',(req,res)=>{
    console.log(req.body);
    res.json({
        "status":"registered",
    }) 
    let enter = 'INSERT INTO auth1 (Email, Pass) VALUES (?, ?)';
    pool.query(enter,[req.body.email ,req.body.pass],(error,result)=>{
        if(error){
            console.log("error occured in inserting",error);
            return;
        }else{
            console.log(`data inserted affected :`+result.affectedRows+'rows');
        }
    }); 

})

app.post('/api/ProfileForm', (req, res) => {
    console.log(req.body); 

    const {
        name,
        email,
        phoneNumber,
        fatherPhoneNumber,
        motherPhoneNumber,
        aadharCard,
        address,
        age
    } = req.body;

    let profileQuery = `INSERT INTO user_details (
        name, email, phone_number, father_phone_number, mother_phone_number, aadhar_card, address, age
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(profileQuery, [
        name,
        email,
        phoneNumber,
        fatherPhoneNumber,
        motherPhoneNumber,
        aadharCard,
        address,
        age
    ], (error, result) => {
        if (error) {
            console.log("Error occurred in inserting", error);
            return res.status(500).json({
                status: "Error",
                message: "Error inserting data"
            });
        } else {
            console.log(`Data inserted affected: ${result.affectedRows} rows`);
            res.json({
                status: "data received",
                message: "Data successfully inserted"
            });
        }
    });
});


app.post('/api/StudentProfile',(req,res)=>{
    let details = `SELECT * FROM student_profiles`;
    pool.query(details ,(err,result)=>{
        if(err){
            res.send()
        }
    })
})
app.post('/api/login',(req,res)=>{
    let e= req.body.email;
    let p =req.body.pass;
    console.log(`recieved-Credentials :${JSON.stringify(req.body)}`);
    console.log(e);
    console.log(p);
    let retrive =`SELECT * FROM  auth1 WHERE Email= ? AND  Pass=?`;

    pool.query(retrive, [e,p],(err,result)=>{
        
        if(err){
            console.log('Error connecting to the database: ' + err);
            res.json({
                "status": "Error",
                "message": err.message
            });
        }
        else{
            if(result.length >0){
                let user = result[0];
                console.log(result);
                console.log(user);
                console.log(user.Email);
                console.log(user.Pass);
                if(user.Email === e && user.Pass === p){
                    let att =user;
                    senddata(att)
                    console.log(att);
                    console.log('User-Found')
                    res.json({
                        "status":"User-Found",
                    });

                }
                else{
                    console.log("User doesn't exist1");
                    res.json({
                        "status":"User-NotFound",
                    })
                }
            }
            else{
                console.log("User doesn't exist2");                
                res.json({
                    "status":"User-NotFound",
                })
            }
        }
        
    })
    
})
app.post('/api/geolocation', (req, res) => {
    const { latitude, longitude, email } = req.body;

    console.log(latitude,longitude,email)

    if (typeof latitude !== 'number' || typeof longitude !== 'number' || typeof email !== 'string') {
        return res.status(400).json({ "status": "Error", "message": "Invalid data" });
    }

    let query = 'INSERT INTO geolocations (latitude, longitude, email) VALUES (?, ?, ?)';

    pool.query(query, [latitude, longitude, email], (error, result) => {
        if (error) {
            console.log("Error occurred while inserting:", error);
            return res.status(500).json({ "status": "Error", "message": "Error inserting data" });
        } else {
            console.log(`Data inserted, affected rows: ${result.affectedRows}`);
            return res.json({ "status": "Location saved successfully" });
        }
    });
});
app.get('/api/geolocations', (req, res) => {
    const geolocationsQuery = 'SELECT * FROM geolocations ORDER BY timestamp DESC';
    const userDetailsQuery = 'SELECT * FROM user_details';

    // First query to fetch geolocations
    pool.query(geolocationsQuery, (error1, geolocationsResults) => {
        if (error1) {
            console.log("Error occurred while fetching geolocations:", error1);
            return res.status(500).json({ "status": "Error", "message": "Error fetching geolocations" });
        }

        // Second query to fetch all user details
        pool.query(userDetailsQuery, (error2, userDetailsResults) => {
            if (error2) {
                console.log("Error occurred while fetching user details:", error2);
                return res.status(500).json({ "status": "Error", "message": "Error fetching user details" });
            }

            // Create a map to associate users by their email
            const userMap = new Map();
            userDetailsResults.forEach(user => {
                userMap.set(user.email, user);
            });

            // Combine geolocations with their corresponding user details
            const combinedResults = geolocationsResults.map(geo => {
                const user = userMap.get(geo.email);
                if (user) {
                    return {
                        ...geo,
                        ...user,
                        timestamp: new Date(geo.timestamp).toLocaleString(),
                        created_at: new Date(user.created_at).toLocaleString(),
                        updated_at: new Date(user.updated_at).toLocaleString(),
                    };
                } else {
                    return {
                        ...geo,
                        timestamp: new Date(geo.timestamp).toLocaleString(),
                    };
                }
            });

            // Send combined data in the response
            res.json({
                combinedData: combinedResults
            });
        });
    });
});




function senddata(att){
    app.get('/api/home',(req,res)=>{
        res.json(att);
        console.log(`data send to UI ${JSON.stringify(att)}`);
    })
}
app.listen(port,()=>{
    console.log(`server is runnig on the port ${port}`);
})