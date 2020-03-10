const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const math = require('dsc-kek-math');


const app = http.createServer();
const port = 8000;

app.on('request', (request, response) => {

    switch (request.method) {
        case 'GET':
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    response.end(data);
                }
            });
            break;

        case 'POST':
            switch (url.parse(request.url).pathname) {
                case '/calculate/min':
                    request.on('data', (data) => {
                        const _data = data.toString().split(',');
                        console.log(_data);
                        response.writeHead(200);
                        response.end(math.min(_data).toString());
                    });
                    break;

                case '/file-tree':
                    const dir = fs.readdirSync(__dirname);
                    const result = [];
                    dir.forEach((i) => result.push(i));
                    response.writeHead(200);
                    response.end(JSON.stringify(result));
                    break;    

                default:
                    response.end('Something else...');
            }
            break;

        default:
            response.writeHead(405).end('Not Allowed');
    }



});

app.listen(port, () => console.log('Listening on port', port));