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
    var result = '';
    fs.readFile('./templates/post.html', 'utf8', function (err, data) {
      if (err) { console.log(err); return false; }
      result = data.replace(/articleDate/g, new Date(article.created_at).Format('yyyy-MM-dd'));
      result = result.replace(/articleContent/g, article.body_html);
    });
    fs.readFile('./templates/default.html', 'utf8', function (err, data) {
      if (err) { console.log(err); return false; }
      var allHtml = data.replace(/articleTitle/g, article.title);
      allHtml = allHtml.replace(/articleHtml/g, result);
      fs.writeFile(`./articles/${article.id}.html`, allHtml, () => console.log(article.id))
    });
  }
  fs.writeFile('./articles/list.json', JSON.stringify(list), () => console.log('list.json'))
});

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'S+': this.getMilliseconds()
  };
  //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
  if (/(y+)/.test(fmt)) {
    //第一种：利用字符串连接符“+”给date.getFullYear()+''，加一个空字符串便可以将number类型转换成字符串。
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
    }
  }
  return fmt;
};
