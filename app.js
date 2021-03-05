const rp = require('request-promise')
const fs = require('fs')
const config = require('./config.js')

let list = []
rp.get({
  uri: `https://api.github.com/repos/${config.user}/${config.repo}/issues?client_id=${config.client_id}&client_secret=${config.client_secret}`,
  headers: {
    'User-Agent': 'Request-Promise',
    'Accept': 'application/vnd.github.VERSION.html+json'
  },
  json: true
}).then(articles => {
  for (let article of articles) {
    list.push({
      title: article.title,
      id: article.id,
      date: article.created_at
    })
    // read template html
    fs.readFile('./templates/default.html', 'utf8', function (err, data) {
      if (err) { console.log(err); return false; }
      console.log(data)
      var result = data.replace(/articleTitle/g, article.title);
      result = result.replace(/articleContent/g, article.body_html);
      fs.writeFile(`./articles/${article.id}.html`, result, () => console.log(article.id))
    });
  }
  fs.writeFile('./articles/list.json', JSON.stringify(list), () => console.log('list.json'))
})
