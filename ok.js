
var steps=[];
var testindex = 0;
var loadInProgress = false; //This is set to true when a page is still loading

/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

phantom.addCookie({
  'name'     : 'Valid-Cookie-Name',   /* required property */
  'value'    : 'Valid-Cookie-Value',  /* required property */
  'domain'   : '.okcupid.com',
  'path'     : '/foo',                /* required property */
  'httponly' : true,
  'secure'   : false,
  'expires'  : "Fri, 27 Aug 2027 02:54:37 GMT"   /* <-- expires in 1 hour */
});

/*********SETTINGS END*****************/

console.log('All settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
/**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
steps = [

	//Step 1 - Open Amazon home page
    function(){
        console.log('Step 1 - page');
        page.open("https://www.okcupid.com/match", function(status){
            console.log('[status]', status);
            var cookies = page.cookies;
            console.log('Listing cookies:');
            for(var i in cookies) {
              console.log(cookies[i].name + '=' + cookies[i].value);
            }
		});
    }
];
/**********END STEPS THAT FANTOM SHOULD DO***********************/

//Execute steps one by one
interval = setInterval(executeRequestsStepByStep, 500);

function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}

/**
 * These listeners are very important in order to phantom work properly.
    Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
