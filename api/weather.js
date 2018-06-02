const UID = 'UAA99D024B'; // 测试用 用户ID，请更换成您自己的用户ID
const KEY = 'x8hbz2ipx3sx1l5p'; // 测试用 key，请更换成您自己的 Key
const LOCATION = 'shenyang'; // 除拼音外，还可以使用 v3 id、汉语等形式
// var l =''
const Api = require('./api.js')
// var argv = require('optimist').default('l', LOCATION).argv;
// let l = 'shenyang'
const api = new Api(UID, KEY);
// let data = null
function weather(city, res) {
  api.getWeatherNow(city).then((data) => {
    console.log(JSON.stringify(data, null, 4));
    return res.send(JSON.stringify(data, null, 4))
  }).catch((err) => {
    console.log(err.error.status);
    return res.send(err.error.status)
  });
}
// var argv = argv.default('l', this.l).argv;

// weather.prototype.data = api.getWeatherNow(l).then(function(data) {
//     //console.log(this.l);
//     //console.log(JSON.stringify(data, null, 4));
//     return JSON.stringify(data, null, 4)
//   }).catch(function(err) {
//     //console.log(err.error.status);
//     //console.log(l);

//     return err.error.status
//   });


// weather  = (city) => {
//   LOCATION = city
// var argv = require('optimist').default('l', LOCATION).argv;
//   api.getWeatherNow(argv.l).then(function(data) {
//     console.log(JSON.stringify(data, null, 4));
//     return JSON.stringify(data, null, 4)
//   }).catch(function(err) {
//     console.log(err.error.status);
//     return err.error.status
//   });
// }

module.exports = weather
