const http = require('http')
const data = require('./urls.json')
const URL = require('url')
const fs = require('fs')
const path = require('path')


function writeFile(cb) {
    fs.write(path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2), 
        err => {
            if (err) throw err

            cb(JSON.stringify({message: 'ok'}))
        }
    )
}

http.createServer((req, res) => {
    const {name, url} = URL.parse(req.url, true).query


    res.writeHead(200,'Access-Control-Allow-Origin')

    if (!name || url) {
        return res.end('show all');
    }

    if (del) {
        data.urls =  data.urls.filter(item => String(item.url) !== String(url));
        return writeFile((message) => res.end(message))  
    }
        
    data.url.push({name, url})
    
    return writeFile((message) => res.end(message))
    
}).listen(3000, () => console.log('API is running...')) 