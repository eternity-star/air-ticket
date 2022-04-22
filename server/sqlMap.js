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
    selectAllCity: 'SELECT city_id, city FROM air_location WHERE province_id = ?',  //查询城市
    selectAll: 'SELECT * FROM air_location',  //查询整张表
    selectCity: 'SELECT * FROM air_location WHERE city_id = ?'  //查询城市
  },
  User: {
    insertUser: 'insert into user(id, name, password, mobile, idCard, level) values(?,?,?,?,?,?)', //插入用户信息
    login: 'SELECT id,name,mobile,idCard,level,sex FROM user where (idCard = ? or mobile = ?) and password = ? and level = ?', //查询用户信息
    updateUser: 'UPDATE user SET name = ?, sex = ?, idCard = ?, mobile = ? WHERE id = ?',
    selectUser: 'SELECT id,name,mobile,idCard,level,sex FROM user where id = ?'
  },
  CompanyUser: {
    login: 'SELECT company_id,name,mobile,idCard,level,address,own_plane,description FROM company where (idCard = ? or mobile = ?) and password = ? and level = ?', //查询用户信息
    updateCompanyUser: 'UPDATE company SET name = ?, sex = ?, idCard = ?, mobile = ? WHERE company_id = ?',
    updatePassword: 'UPDATE company SET password = ? WHERE company_id = ?',
    selectUser: 'SELECT id,name,mobile,idCard,level,sex FROM company where company_id = ?',
    selectPassword: 'SELECT * FROM company where password = ?'
  },
  CompanyPlane: {
    select: 'SELECT * FROM plane WHERE plane_id IN (?)'
  },
  AirLine: {
    insert: 'insert into air_line(line_id, company_id, plane_id, departure, destination, departure_time, destination_time, ticket_count, business_cabin_count, economy_cabin_count, business_cabin_price, economy_cabin_price, have_ticket_count, have_business_cabin_count, have_economy_cabin_count, is_show) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', // 插入航班
    selectPlaneAir: 'SELECT * FROM air_line where plane_id = ?',
    selectCompanyAir: 'SELECT * FROM air_line where company_id = ?',
    selectAirLine: 'SELECT * FROM air_line where line_id = ?',
    updateAirLine: 'UPDATE air_line SET is_show = 0 WHERE line_id = ?',
  }
  // 测试
  // "SELECT * FROM `air_line` where departure_time  > '2022-05-02 00:00:00' and destination_time < '2022-05-02 23:59:59'"
}

module.exports = sqlMap
