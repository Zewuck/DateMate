const bcrypt = require('bcrypt')
const mysql = require('mysql')

function login(req, res) {
    if(req.session.loggedin != true ) {

        res.render('login/index');

    } else {
        res.redirect('/')
    }
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {

        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {

            if (userdata.length > 0) {

                userdata.forEach(element => {

                bcrypt.compare(data.password, element.password, (err, isMatch) => {
                    
                        if (!isMatch) {
                            res.render('login/index', { error: 'Erorr: incorrect password !'});
                        } else {
                            req.session.name = element.name;
                            req.session.loggedin = true;
                           
                            res.redirect('/')
                        }
                    });
                })
                                
            } else {
                res.render('login/index', { error: 'Erorr: user not exists !'});
            }
        })
})
}

function register(req, res) {
    if(req.session.loggedin != true ) {

        res.render('login/register');

    } else {
        res.redirect('/')
    }
    
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                res.render('login/register', { error: 'Erorr: user alredy exists !'});
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {

                            req.session.loggedin = true;
                            req.session.name = data.name;

                            res.redirect('/');
                        })
                    })
                })
            }
        })
    })

    
}

function logout(req, res) {
    if (req.session.loggedin == true) {

        req.session.destroy();

    }
    res.redirect('/login')

}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'nodelogin'
})

async function usersRequest (req, res) {
        if(req.session.loggedin == true ) {
        await connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) throw (error);
            res.render('home', {data: results});
        })
    
        } else {
            res.redirect('/login')
        }
    };

function citations (req, res) {
    res.render("login/citations")
}

module.exports = {
    login,
    register,
    storeUser,
    auth, 
    logout,
    usersRequest,
    citations
}