const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}

function paramsChange (params) {

}

/**
 * 用户相关
 */

// 接口：注册用户
router.post('/registerUser', (req, res) => {
  const sql = $sql.User.insertUser
  const params = req.body
  console.log('接口：注册用户', params)
  conn.query(sql, [params.id, params.name, params.password, params.mobile, params.idCard, params.level, 0], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '注册失败，请重新确认信息正确'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：登录
router.post('/login', (req, res) => {
  const sql = $sql.User.login
  const params = req.body
  console.log('接口：登录', params)
  conn.query(sql, [params.loginName, params.loginName, params.password, params.level], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
      if (result.length === 0) {
        returnData.msg = '用户名或密码错误'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：更新用户信息
router.post('/updateUser', (req, res) => {
  const sql = $sql.User.updateUser
  const params = req.body
  console.log('接口：更新用户', params)
  conn.query(sql, [params.name, params.sex, params.idCard, params.mobile, params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：获取当前用户信息
router.post('/getUser', (req, res) => {
  const sql = $sql.User.selectUser
  const params = req.body
  console.log('接口：获取当前用户信息', params)
  conn.query(sql, [params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

/**
 * 航空公司相关
 */
// 接口：登录
router.post('/comLogin', (req, res) => {
  const sql = $sql.CompanyUser.login
  const params = req.body
  console.log('接口：登录', params)
  conn.query(sql, [params.loginName, params.loginName, params.password, params.level], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
      if (result.length === 0) {
        returnData.msg = '用户名或密码错误'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查询密码是否正确
router.post('/judgeComPassword', (req, res) => {
  const sql = $sql.CompanyUser.selectPassword
  const params = req.body
  console.log('接口：查询密码是否正确', params)
  conn.query(sql, [params.password], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：更改密码
router.post('/updatePassword', (req, res) => {
  const sql = $sql.CompanyUser.updatePassword
  const params = req.body
  console.log('接口：更改密码', params)
  conn.query(sql, [params.password, params.company_id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：获取航空公司信息
router.post('/getCompanyUser', (req, res) => {
  const sql = $sql.CompanyUser.selectUser
  const params = req.body
  console.log('接口：获取航空公司信息', params)
  conn.query(sql, [params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})



// 接口：查询航空公司所属飞机
router.post('/getPlaneList', (req, res) => {
  const sql = $sql.CompanyPlane.select
  const params = req.body
  console.log('%c [ req.body ]-165', 'font-size:13px; background:pink; color:#bf2c9f;', req.body)
  params.ids = params.ids.split(',')
  let ss = 'SELECT * FROM plane WHERE plane_id IN (?'
  if (params.ids.length > 1) {
    params.ids.forEach((it, index) => {
      if (parseInt(index) !== 0) {
        ss += ', ?'
      }
    })
    ss += ")"
  } else {
    ss = sql
  }
  console.log('接口：查询航空公司所属飞机', params)
  conn.query(ss, [...params.ids], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
      if (result.length === 0) {
        returnData.msg = '用户名或密码错误'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：插入航班
router.post('/submitAirLine', (req, res) => {
  const sql = $sql.AirLine.insert
  const params = req.body
  console.log('接口：插入航班', params)
  conn.query(sql, [params.line_id, params.company_id, params.plane_id, params.departure, params.destination, params.departure_time, params.destination_time, params.ticket_count, params.business_cabin_count, params.economy_cabin_count, params.business_cabin_price, params.economy_cabin_price, params.have_ticket_count, params.have_business_cabin_count, params.have_economy_cabin_count, params.is_show], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：取消航班
router.post('/updateAirLine', (req, res) => {
  const sql = $sql.AirLine.updateAirLine
  const params = req.body
  console.log('接口：插入航班', params)
  conn.query(sql, [params.line_id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查询航班（根据飞机id查询）
router.post('/searchAirLine', (req, res) => {
  let sql = $sql.AirLine.selectPlaneAir
  const params = req.body
  console.log('接口：插入航班', params)
  let args;
  if (params.plane_id) {
    args = params.plane_id
  } else if (params.company_id) {
    args = params.company_id
    sql = $sql.AirLine.selectCompanyAir
  } else if (params.line_id) {
    args = params.line_id
    sql = $sql.AirLine.selectAirLine
  }
  conn.query(sql, [args], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查询航班（查询今日、明日、后日的航班）
router.post('/selectDateLine', (req, res) => {
  let sql = $sql.AirLine.selectDateLine
  const params = req.body
  console.log('接口：查询航班（查询今日、明日、后日的航班）', params)
  conn.query(sql, [params.destination_time, params.departure_time, params.limit], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})


/**
 * 余额相关
 */
// 接口：余额充值
router.post('/recharge', (req, res) => {
  const sql = $sql.User.updateMoney
  const params = req.body
  console.log('接口：余额充值', params)
  conn.query(sql, [params.money, params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})
// 接口：向资金表中插入值
router.post('/insertCapital', (req, res) => {
  const sql = $sql.Capital.insertCapital
  const params = req.body
  console.log('接口：向资金表中插入值', params)
  conn.query(sql, [params.capital_id, params.user_id, params.user_name, params.created_time, params.money, params.control_type, params.order_id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：资金列表查询
router.post('/getBalanceList', (req, res) => {
  const sql = $sql.Capital.selectCapital
  const params = req.body
  console.log('接口：资金列表查询', params)
  let arr = []
  for (let item in params) {
    arr.push(params[item])
  }
  console.log('[ arr ] >', arr)
  conn.query(sql, [...arr], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：向订单表中插入值
router.post('/insertOrder', (req, res) => {
  const sql = $sql.PayTicket.insertOrder
  const params = req.body
  console.log('接口：向订单表中插入值', params)
  // order_id, id, name, created_time, price, count, departure, destination, total_price, ticket_id, state
  conn.query(sql, [params.order_id, params.id, params.name, params.created_time, params.price, params.count, params.departure, params.destination, params.total_price, params.ticket_id, params.state], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：向机票表中插入值
router.post('/insertTicket', (req, res) => {
  const sql = $sql.PayTicket.insertTicket
  const params = req.body
  console.log('接口：向机票表中插入值', params)
  // ticket_id, company_id, plane_id, line_id, user_id, user_name, created_time, departure, destination, departure_time, destination_time, duration, price, cabin_type, passenger_information
  conn.query(sql, [params.ticket_id, params.company_id, params.plane_id, params.line_id, params.user_id, params.user_name, params.created_time, params.departure, params.destination, params.departure_time, params.destination_time, params.duration, , params.price, params.cabin_type, params.passenger_information], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：更新航班的机票销售情况
router.post('/updateLineCount', (req, res) => {
  let sql = $sql.PayTicket.updateBusiness
  const params = req.body
  console.log('接口：更新航班的机票销售情况', params)
  // type2为商务、1为经济
  if (params.type === 1) {
    sql = $sql.PayTicket.updateEconomy
  }
  conn.query(sql, [params.count, params.count, params.line_id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：更新用户钱包值
router.post('/updateTicketUser', (req, res) => {
  const sql = $sql.PayTicket.updateUser
  const params = req.body
  console.log('接口：更新用户钱包值', params)
  // money - ? WHERE id
  conn.query(sql, [params.payAmount, params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查询用户订单记录
router.post('/selectOwnOrder', (req, res) => {
  const sql = $sql.Order.selectOwnOrder
  const params = req.body
  console.log('接口：查询用户订单记录', params)
  conn.query(sql, [params.id], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})








// 接口：查询省份
router.get('/getProvince', (req, res) => {
  const sql = $sql.City.selectProvince
  const params = req.body
  console.log('接口：查询省份', params)
  conn.query(sql, function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查询省份下的城市
router.post('/getCity', (req, res) => {
  let sql = $sql.City.selectAllCity
  const params = req.body
  let args;
  if (params.province_id) {
    args = params.province_id
  } else if (params.city_id) {
    args = params.city_id
    sql = $sql.City.selectCity
  } else {
    sql = $sql.City.selectAll
  }
  console.log('接口：查询省份下的城市', params)
  conn.query(sql, [args], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})




// 接口：用户查询航班
router.post('/getAirLine', (req, res) => {
  const sql = $sql.AirLine.selectLine
  const params = req.body
  console.log('接口：用户查询航班', params)
  conn.query(sql, [params.destination_time, params.departure_time, params.passengerNum, params.departure, params.destination], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：用户查询航班
// router.post('/getCity', (req, res) => {
//   let sql = $sql.City.selectAllCity
//   const params = req.body
//   let args;
//   if (params.province_id) {
//     args = params.province_id
//   } else if (params.city_id) {
//     args = params.city_id
//     sql = $sql.City.selectCity
//   } else {
//     sql = $sql.City.selectAll
//   }
//   console.log('接口：查询省份下的城市', params)
//   conn.query(sql, [args], function (err, result) {
//     let returnData = {}
//     if (err) {
//       console.log(err)
//       returnData = {
//         data: err,
//         msg: '请求错误'
//       }
//     }
//     if (result) {
//       returnData = {
//         data: result,
//         msg: '请求成功'
//       }
//     }
//     jsonWrite(res, returnData)
//   })
// })



//
/**
 * 公告相关接口
 */
// 接口：发布公告
router.post('/addNotice', (req, res) => {
  const sql = $sql.Notice.insertNotice
  const params = req.body
  console.log('接口：发布公告', params)
  conn.query(sql, [params.notice_id, params.user_id, params.user_name, params.title, params.description, params.created_time, params.type, params.state], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})

// 接口：查看公告
router.post('/showNotice', (req, res) => {
  const sql = $sql.Notice.selectAllNotice
  const params = req.body
  console.log('接口：查看公告')
  conn.query(sql, [params.type], function (err, result) {
    let returnData = {}
    if (err) {
      console.log(err)
      returnData = {
        data: err,
        msg: '请求错误'
      }
    }
    if (result) {
      returnData = {
        data: result,
        msg: '请求成功'
      }
    }
    jsonWrite(res, returnData)
  })
})






















module.exports = router
