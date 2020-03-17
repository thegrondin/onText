
var showdown  = require('showdown'),
converter = new showdown.Converter(),
text      = '# hello, markdown!',
html      = converter.makeHtml(text);
textConvert = converter.makeMarkdown(html);

global.appRoot = window.appRoot = __dirname

console.log(html, textConvert);

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
