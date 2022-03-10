// sqlMap.js  sql语句
const sqlMap = {
  Stu: {
    add: 'insert into axios_demo(stu_Id,stu_name,stu_sex,stu_college,stu_class) values (0,?,?,?,?)',
    show: 'select * from passenger',
    del: 'delete from axios_demo where stu_Id = ?',
    update: 'update axios_demo set stu_name = ?,stu_sex = ?,stu_college = ?,stu_class = ? where stu_Id = ?',
    search: 'select * from passenger where id = ?',
  },
  City: {
    selectProvince: 'SELECT DISTINCT province_id, province FROM air_location ORDER BY province_id', //查询省份
    selectCity: 'SELECT city_id, city FROM air_location WHERE province_id = ?'  //查询城市
  },
  User: {
    insertUser: 'insert into user(id, name, password, mobile, idCard) values(?,?,?,?,?)' //插入用户信息
  },
}

module.exports = sqlMap