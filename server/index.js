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
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: "data received",
    });
    let profilequery = 'INSERT INTO  user_profiles (reg_id ,user_email,firstname,dob,degree,department,phone_number,address) VALUES ( ?,?,?,?,?,?,?,?)'
    pool.query(profilequery ,[req.body.reg,
        req.body.email,
        req.body.name,
        req.body.dob,
        req.body.degree,
        req.body.department,
        req.body.phoneNumber,
        req.body.adress],(error,result)=>{
            if(error){
                console.log("error occured in inserting",error);
                return;
            }else{
                console.log(`data inserted affected :`+result.affectedRows+'rows');
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

function senddata(att){
    app.get('/api/home',(req,res)=>{
        res.json(att);
        console.log(`data send to UI ${JSON.stringify(att)}`);
    })
}
app.listen(port,()=>{
    console.log(`server is runnig on the port ${port}`);
})