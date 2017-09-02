var page = require('webpage').create(),
    url = 'https://www.okcupid.com/match';
page.open(url, function(status) {
   if (status === 'success') {
      phantom.addCookie({   //add name cookie1 with value = 1
         name: 'cookie1',
         value: '1',
         domain: 'localhost'
      });
      console.log('Total cookies :'+phantom.cookies.length);
      for(var i; i<phantom.cookies.length; i++){
          console.log(JSON.stringify(phantom.cookies[i]));
      }
      cook = phantom.cookies[0];
    //   phantom.exit();
   } else {
      console.error('Cannot open file');
      phantom.exit(1);
   }
});
