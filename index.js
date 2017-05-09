var config = require('./config')
var Crawler = require('crawler')
var models = require('./models')
var db = require('./db')

db()

var c = new Crawler({
  maxConnections : 10
})

// Queue just one URL, with default callback
c.queue([{
  /**
   * Pontoon
   */
  uri: config.source.pontoon,
  jQuery: 'cheerio',
  callback: function (error, res, done) {
    var $ = res.$
    if (error) {
      /**
       * Error Handling
       */
    } else {

      $('tbody > tr').each(function (i, elem) {
        var emailCrawler = new Crawler({
          rateLimit: 1000
        })
        // rank
        var rank = $(this).children('td.rank').text()

        // contributor
        var username = $(this).children('td.contributor').children('a').children('p.name').text()
        var userId = $(this).children('td.contributor').children('a').attr('href')


        // Stats
        var total = $(this).children('td.stats').children('.details').children('.total').children('p').text()
        var translated = $(this).children('td.stats').children('.details').children('.approved').children('p').text()
        var suggested = $(this).children('td.stats').children('.details').children('.translated').children('p').text()
        var fuzzy = $(this).children('td.stats').children('.details').children('.fuzzy').children('p').text()

        emailCrawler.queue({
          uri: 'https://pontoon.mozilla.org' + userId,
          jQuery: 'cheerio',
          callback: function (error, res, done) {
            var $ = res.$

            var email = $('#heading').children('ul.info').children('li').first().children('a').text()

            models.User.findOrCreate({
              where: {
                username: username
              },
              defaults: {
                username: username,
                email: email,
                pontoonId: userId.replace(/\//g, '').replace('contributors', '')
              }

            })
            .spread(user => {
              var u = user.get({plain: true})

              return models.Pontoon.upsert({
                userId: user.id,
                rank: rank,
                total: total,
                translated: translated,
                suggested: suggested,
                fuzzy: fuzzy
              }, {
                userId: user.id
              })
            })
            .then(res => {
              done()
            })
          }
        })

        done()
      })
    }
  }
}])
