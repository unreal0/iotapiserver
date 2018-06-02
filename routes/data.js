
var express = require('express');
var router = express.Router();
var fs = require('fs');
path = './public/data/';

/* GET /data/read?type=it 资讯data. */
router.get('/read', function(req, res, next) {
    var type = req.param('type') || '';
    fs.readFile(path + type + '.json', (err,data) => {
        if(err) {
            return res.send({
                status: 0,
                info: '读取数据错误'
            })
        }
        var obj = []
        try {
            obj = JSON.parse(data.toString())
        } catch (error) {
            obj = []
        }
        if (obj.length > 50) {
            obj = obj.slice(0, 50)
        }
        return res.send({
            status: 1,
            data: obj
        })
    })
});

//写入数据模块
//data/write?type=it&url=www.163.com&title=hello&img=aaa.png
router.post('/write',  (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            status: 0,
            info: '非登录用户'
        })
      }
    var type = req.param('type') || ''
    var title = req.param('title') || ''
    var url = req.param('url') || ''
    var img = req.param('img') || ''
    var pathFile = path + type + '.json'
    fs.readFile(pathFile, (err, data) => {
        if (err) {
            console.log(pathFile)
            return res.send({
                status: 0,
                info: '读取失败'
            })
        }

        var obj = JSON.parse(data.toString())

        if (!type || !title || !url || !img) {
            return res.send({
                status: 0,
                info: '参数不全'
            })
        }

        var o = {
            title: title,
            url: url,
            img: img,
            id: guid(),
            time: new Date()
        }

        obj.splice(0, 0, o)
        var newData = JSON.stringify(obj)

        fs.writeFile(pathFile, newData, (err) => {
            if (err) {
                return res.send({
                    status: 0,
                    info: '写入文件失败'
                }) 
            }
            
            return res.send({
                status: 1,
                data: obj
            })
        })

    })

})

//配置模块写入接口
router.post('/write_config', (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            status: 0,
            info: '非登录用户'
        })
      }
    var data = req.body.data
    var obj = JSON.parse(data.toString())
    var newData = JSON.stringify(obj)
    var pathFile = path + type + '.json'
    fs.writeFile(pathFile, newData, (err) => {
        if (err) {
            return res.send({
                status: 0,
                info: '写入失败'
            })
        }
        return res.send({
            status: 1,
            data: obj
        })
    })
})

//login
router.post('/login', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    //TODO: xxs/MD5/验证码
    if (username === 'admin' && password === 'hhhhhh') {
        req.session.user = {
            username : username
        }
        //console.log('ok')
    
        return res.send({
            status: 1
        })
    }

    return res.send({
        status: 0,
        info: '登录失败'

    })
})

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16)
    }).toUpperCase()
}

module.exports = router;
