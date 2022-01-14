const airbnb = require('./airbnb');

(async () => {
    await airbnb.initialize();

    await airbnb.search('Da Nang');
})();