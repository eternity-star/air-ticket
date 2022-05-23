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
    insertUser: 'insert into user(id, name, password, mobile, idCard, level, money, state) values(?,?,?,?,?,?,?,?)', //插入用户信息
    selectLogin: 'SELECT id,name,idCard,mobile FROM user where state = 1',
    login: 'SELECT id,name,mobile,idCard,level,sex,money,state FROM user where (idCard = ? or mobile = ?) and password = ? and level = ?', //查询用户信息
    updateUser: 'UPDATE user SET name = ?, sex = ?, idCard = ?, mobile = ? WHERE id = ?',
    selectUser: 'SELECT id,name,mobile,idCard,level,sex,money FROM user where id = ?',
    updateMoney: 'UPDATE user SET money = ? WHERE id = ?',
  },
  CompanyUser: {
    selectLogin: 'SELECT company_id,name,idCard,mobile FROM company where state = 1',
    login: 'SELECT company_id,name,mobile,idCard,level,address,own_plane,description,money,state FROM company where (idCard = ? or mobile = ?) and password = ? and level = ?', //查询用户信息
    updateCompanyUser: 'UPDATE company SET name = ?, address = ?, idCard = ?, mobile = ?, description = ? WHERE company_id = ?',
    updatePassword: 'UPDATE company SET password = ? WHERE company_id = ?',
    selectUser: 'SELECT company_id,name,mobile,idCard,level,address,own_plane,description,money FROM company where company_id = ?',
    selectPassword: 'SELECT * FROM company where password = ?',
    updateMoney: 'UPDATE company SET money = ? WHERE company_id = ?',
    addMoney: 'UPDATE company SET money = money + ? WHERE company_id = ?',
  },
  CompanyPlane: {
    select: 'SELECT * FROM plane WHERE plane_id IN (?)'
  },
  AirLine: {
    insert: 'insert into air_line(line_id, company_id, plane_id, departure, destination, departure_time, destination_time, ticket_count, business_cabin_count, economy_cabin_count, business_cabin_price, economy_cabin_price, have_ticket_count, have_business_cabin_count, have_economy_cabin_count, is_show) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', // 插入航班
    selectPlaneAir: 'SELECT * FROM air_line where plane_id = ?',
    selectCompanyAir: 'SELECT * FROM air_line where company_id = ?',
    selectRecommendAir: 'SELECT * FROM air_line where company_id = ? and ? <= departure_time',
    selectAirLine: 'SELECT * FROM air_line where line_id = ?',
    updateAirLine: 'UPDATE air_line SET is_show = 0 WHERE line_id = ?',
    selectLine: 'SELECT * from air_line WHERE destination_time <= ? and ? <= departure_time and (ticket_count -have_ticket_count) >= ? and departure = ? and destination = ?',
    selectDateLine: 'SELECT * FROM `air_line` WHERE destination_time < ? and departure_time > ? LIMIT ?',
  },
  Capital: {
    selectCapital: 'SELECT * FROM air_capital WHERE user_id = ?',
    insertCapital: 'insert into air_capital(capital_id, user_id, user_name, created_time, money, control_type, order_id) values(?,?,?,?,?,?,?)',
  },
  PayTicket: {
    insertOrder: 'insert into air_order(order_id, user_id, user_name, created_time, count, departure, destination, total_price, ticket_id, state, line_id, company_id) values(?,?,?,?,?,?,?,?,?,?,?,?)',
    insertTicket: 'insert into air_ticket(ticket_id, company_id, plane_id, line_id, user_id, user_name, created_time, departure, destination, departure_time, destination_time, duration, passenger_information, price, cabin_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    insertCapital: 'insert into air_capital(capital_id, user_id, user_name, created_time, money, control_type, order_id) values(?,?,?,?,?,?,?)',
    updateUser: 'UPDATE user SET money = money - ? WHERE id = ?',
    updateBusiness: 'UPDATE air_line SET have_ticket_count = have_ticket_count + ?, have_business_cabin_count = have_business_cabin_count + ? WHERE line_id = ?',
    updateEconomy: 'UPDATE air_line SET have_ticket_count = have_ticket_count + ?, have_economy_cabin_count = have_economy_cabin_count + ? WHERE line_id = ?',
  },
  Order: {
    selectOwnOrder: 'SELECT * FROM air_order where user_id = ?',
    selectOrder: 'SELECT * FROM air_order where company_id = ?',
    selectOwnTicket: 'SELECT * FROM air_ticket where user_id = ?',
    selectTicket: 'SELECT * FROM air_ticket where company_id = ?',
    selectAllTicket: 'SELECT * FROM air_ticket',
  },
  Notice: {
    insertNotice: 'insert into air_notice(notice_id, user_id, user_name, title, description, created_time, type, state) values(?,?,?,?,?,?,?,?)',
    selectAllNotice: 'SELECT * FROM air_notice WHERE type = ?',
  },
  Quanxian: {
    selectAllUser: 'SELECT * FROM user',
    selectAllCompany: 'SELECT * FROM company',
    updateUser: 'UPDATE user SET state = ? WHERE id = ?',
    updateCompany: 'UPDATE company SET state = ? WHERE company_id = ?',
    selectAirLine: 'SELECT * FROM air_line',
    selectAllOrder: 'SELECT * FROM air_order',
  },
  // 测试
  // "SELECT * FROM `air_line` where departure_time  > '2022-05-02 00:00:00' and destination_time < '2022-05-02 23:59:59'"
}

module.exports = sqlMap
