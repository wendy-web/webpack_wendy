/*
 * @Author: wendy-web wendywen@tencent.com
 * @Date: 2021-11-17 13:36:59
 * @LastEditors: wendy-web wendywen@tencent.com
 * @LastEditTime: 2022-10-28 12:26:23
 * @FilePath: /源码/7_extract-common/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 公共模块
import { add } from './math';
import $ from 'jquery';
import vue from 'vue';
import _ from 'lodash';
import axios from 'axios';

import App from  './components/App.vue';
vue.config.productionTip =
new vue({
    render: (h) => h(App)
}).$mount('#app')

const result = add(1, 10);
console.log('index result', result);
const string = _.join(['一键', '三连']);
axios.get('http://localhost:3000/posts').then((res) => {
    console.log('res,axios', res.data);
});

// 添加数据的
$('#putData').click(function (e) { 
    e.preventDefault();
    console.log('gengxinshuju')
    axios.post('http://localhost:3000/posts',{
        title: 'wendy',
        author: 'ern' 
    }).then(() => {
        console.log("tjia succ")
    }); 
});
$('#updataData').click(() => {
    axios.get('http://localhost:3000/posts').then((res) => {
    console.log('res,axios---updat', res.data);
    });
});

console.log('index string', string);
fetch('http://localhost:3000/posts').then((res) => {
    res.json().then((data) => {
        console.log('json', data)
    });
    console.log('res');
}).catch((errror) => {
    console.log('errror', errror)
});
// fastMock访问地址
$('#fastData').click(() => {
    axios.get('https://www.fastmock.site/mock/e5e1635d60999d2c16b8180afa4863a9/index/first').then((res) => {
        console.log(res.data);
    })
});




// 切片上传
let chunkSize = 1024 * 10;
let index = 0;
const inputUplad = document.getElementById('inputUplad');
$('#uploadBtn').click(upload);
function upload() {
    const file = inputUplad.files[0]; // 获取到的上传文件
    if(!file) return;
    const [filename, ext] = file.name.split('.'); // 将文件的名称，后缀解构出来
    let start = index * chunkSize; // 切片的起始位置
    console.log(file.size, start,"file.size")
    if(start > file.size) return; // 大于文件的大小时进行return跳出递归
    //   切片的blob的文件；
    const blob = file.slice(start, start * chunkSize);
    const blobName = `${filename}${index}.${ext}`;
    // 将blob的文件转换为file的文件；
    const blobFile = new File([blob], blobName);
    // 上传用到的formData的格式
    const formData = new FormData();
    formData.append('file', blobFile);
    formData.append('filqe', 22);
    // 上传文件
    fetch('https://www.fastmock.site/mock/e5e1635d60999d2c16b8180afa4863a9/index/first/upload', {
        method: 'post',
        body: formData
    }).then((res) => {
        index++;
        console.log(res)
        upload(); // 进行递归的上传文件处理
    });
}