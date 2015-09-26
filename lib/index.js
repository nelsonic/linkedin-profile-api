var wreck   = require('wreck');
var cheerio = require('cheerio');
var profile = require('./profile');
var chalk = require('chalk');

/**
 * switcher is the brains of this module!
 * it decides which scraper to use for a given url
 * @param {string} url - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories (for the user)
 */
module.exports = function switcher (url, callback) {

  if(!url || typeof url === 'undefined') {
    return callback(404);
  }
  console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - - URL:')
  console.log(url);
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')

  // centralised request issuer/hander
  wreck.get(url, function (error, response, html) {
    if (error || !response || response.statusCode !== 200) {
      console.log(chalk.bgRed.black(" - - - URL FAIL >> " + url + "  - - - "));
      // console.log(error, response.headers);
      // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - -')
      callback(404);
    }
    else {
      var $ = cheerio.load(html);

      console.log(chalk.bgGreen.black(" - - - Linkedin Public Profile Parser >> "+url +"  - - - "));
      // console.log(html);
      return profile($, url, callback);
    }
  });
}