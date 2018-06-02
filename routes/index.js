const express = require('express');

const router = express.Router();
const fs = require('fs')

const path = './public/data/'
const weather = require('../api/weather')
const api = require('../api/api')

// const UID = "UAA99D024B"; // 测试用 用户ID，请更换成您自己的用户ID
// const KEY = "x8hbz2ipx3sx1l5p"; // 测试用 key，请更换成您自己的 Key
// var Api = require('../api/api.js')
// var api = new Api(UID, KEY);

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    return res.render('login', {})
  }
  res.render('index', {});
});

// login page
router.get('/login', (req, res, next) => {
  res.render('login', {})
})

// recommend
router.get('/recommend', (req, res, next) => {
  if (!req.session.user) {
    return res.render('login', {});
  }

  res.render('recommend', {})
});

// edit page
router.get('/edit', (req, res, next) => {
  if (!req.session.user) {
    res.render('login');
  }
  // var type = req.param('type')
  const type = req.query.type
  const pathFile = `${path + type}.json`
  console.log(type)
  if (type) {
    let obj = {}

    switch (type) {
    case 'sanwen':
      obj = {}
      break;
    case 'it':
      obj = {}
      break;
    case 'manager':
      obj = {}
      break;
    case 'cookies':
      obj = {}
      break;
    default:
      return res.send({
        status: 0,
        info: '参数错误'
      });
      // break;
    }
    console.log(pathFile)
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        return res.send({
          status: 0,
          info: '读文件失败'
        })
      }

      obj = JSON.parse(data.toString())
      res.render('edit', { data: obj, title: type });
      // console.log({data: obj, title: type})
    })
  } else {
    return res.send({
      status: 0,
      info: '参数错误'
    });
  }
})

router.get('/api/weather/:city', (req, res) => {
  // return res.send({
  //   status: 0,
  //   info: '天气'
  // })
  const city = req.params.city
  // new weather(city.toString(), res)
  weather(city, res)
  // console.log(d.data);
  // weather.getWeatherNow(city).then((data) => {
  //   console.log(JSON.stringify(data, null, 4));
  //   return res.send(JSON.stringify(data, null, 4))
  // }).catch((err) => {
  //   console.log(err.error.status);
  //   return res.send(err.error.status)
  // });
});

module.exports = router;
