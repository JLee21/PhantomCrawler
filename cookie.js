phantom.addCookie ({
   name: 'c1',
   value: '1',
   domain: 'localhost',
   session_cookie: '4517571001155053886%3a826489461721967187'
});

console.log(JSON.stringify(phantom.cookies));
phantom.exit();
