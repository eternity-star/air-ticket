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
    console.log(111);
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
  conn.query(sql, [params.id, params.name, params.password, params.mobile, params.idCard, params.level], function (err, result) {
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
  conn.query(sql, [params.line_id, params.company_id, params.plane_id, params.departure, params.destination, params.departure_time, params.destination_time, params.ticket_count, params.business_cabin_count, params.economy_cabin_count, params.business_cabin_price, params.economy_cabin_price, params.have_ticket_count, params.have_business_cabin_count, params.have_economy_cabin_count], function (err, result) {
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
  const sql = $sql.AirLine.select
  const params = req.body
  console.log('接口：插入航班', params)
  // params.line_id, params.company_id, params.plane_id, params.departure, params.destination, params.departure_time, params.destination_time, params.ticket_count, params.business_cabin_count, params.economy_cabin_count, params.business_cabin_price, params.economy_cabin_price, params.have_ticket_count, params.have_business_cabin_count, params.have_economy_cabin_count
  conn.query(sql, [params.plane_id], function (err, result) {
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
  const sql = $sql.City.selectCity
  const params = req.body
  console.log('接口：查询省份下的城市', params)
  conn.query(sql, [params.province_id], function (err, result) {
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
 * 测试
 */

// 接口：增加信息
router.post('/addStu', (req, res) => {
  const sql = $sql.Stu.add
  const params = req.body
  console.log('添加', params)
  conn.query(sql, [params.stu_name, params.stu_sex, params.stu_college, params.stu_class], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})


// 接口：删除信息
router.post('/delStu', (req, res) => {
  const sql = $sql.Stu.del
  const params = req.body
  console.log('删除', params)
  conn.query(sql, [params.stu_Id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateStu', (req, res) => {
  const sql = $sql.Stu.update
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.stu_name, params.stu_sex, params.stu_college, params.stu_class, params.stu_Id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询信息
router.post('/searchAir', (req, res) => {
  const sql = $sql.Stu.search
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      this.$message.error(err)
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})



module.exports = router
