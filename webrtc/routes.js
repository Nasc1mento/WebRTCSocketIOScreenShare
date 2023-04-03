module.exports = function (app) {
    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });
  
    app.get('/screen-share', (req, res) => {
      res.sendFile(__dirname + '/public/screen-share.html');
    });


    app.get('/screen-share-receiver', (req, res) => {
        res.sendFile(__dirname + '/public/screen-share-receiver.html');
      });
};