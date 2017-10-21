const dbUtils = require('../db/index')


//通过名字找用户信息
let getUserByUserName = function(username){
    let _sql = "SELECT * FROM user WHERE Username =? "
    return dbUtils.query( _sql ,[username])
    
}


//添加用户信息
let addUserInfo = function(info){  
  let _sql ="INSERT INTO user (Username,Password,UserType,SecurityCode) VALUES ( ? , ? , 0 , ? )"
  return dbUtils.query(_sql,[info.username,info.password,info.securitycode])

}





module.exports = {
    getUserByUserName,
    addUserInfo
   
} 
