// 练习 fs 和 path，处理html文件，将style标签和html标签提取到单独文件中
const fs = require('fs')
const path = require('path')
const { resolve } = require('path/posix')
// 匹配<style></style>标签
const regStyle = /<style>[\s\S]*<\/style>/
// 匹配<script></script>标签
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, './demo.html'), 'utf8', function(err, res) {
    if (err) {
        return console.error('文件读取失败：', err);
    }
    resolveCSS(res);
    resolveJS(res);
    resolveHTML(res);
})

function resolveCSS(res) {
    const result = regStyle.exec(res);
    const cssStr = result[0].replace(/<style>/, '').replace(/<\/style>/, '');
    fs.writeFile(path.join(__dirname, './index.css'), cssStr, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log('写入成功');
    })
}
function resolveJS(res) {
    const result = regScript.exec(res);
    const jsStr = result[0].replace(/<script>/, '').replace(/<\/script>/, '');
    fs.writeFile(path.join(__dirname, './index.js'), jsStr, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log('写入成功');
    })
}
function resolveHTML(res) {
    const htmlStr = res.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname, './index.html'), htmlStr, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log('文件写入成功');
    })
}



