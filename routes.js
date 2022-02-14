const fs = require('fs');


const requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);
    //process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/') {

        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="Message"></input><button type="submit">Send</button></form></body>');
        res.write('</html>');
        //res.end() paxi aru code execute hunu vaina tei vara return res.end() garueko so that
        //yo vand tala ko code execute nahos vayira
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302; //redirect
                res.setHeader('location', '/');
                res.end();
            });

        });


    }
    res.setHeader('Content-Type', 'Text/Html');
    res.write('<html>');
    res.write('<body><h1>hello from node.js server</h1></body>');
    res.write('</html>');
    res.end();
}

//also can have mulitple exports 
module.exports = requestHandler;

// module.exports.handler = requestHandler;
// or
// exports.sometext = 'some hard coded text';