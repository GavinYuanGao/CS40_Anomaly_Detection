/**
Created by dechuan on 2020/12/31 13
 */
const path = require("path");
const fs = require("fs");
const execSync = require('child_process').execSync;


const id = process.argv[2]
if (!id) {
  throw 'Error: 请输入客户编号!!!!!!'
  return false;
}

const CorpId = `CorpIdsDir/${id}`;

const idDir = path.join(__dirname, `/${CorpId}`);
const baseDir = path.join(__dirname, `CorpIdsDir/0000`);

if (!fs.existsSync(idDir)) {
  execSync(`mkdir -p ${idDir} && cp -vr ${baseDir}/ ${idDir}/ && for i in ${idDir}/*;do mv "$i" "$i";done`);
  console.log( `已经初始化[${id}] 目录,  请修改${id}的内容，再执行该操作`)
  return
}


//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  安全性判断

function copyFile(from, to, callback) {
  if(fs.existsSync(from)) fs.copyFileSync(from, to);

  if (callback) callback("success");
}

// 样式（主题颜色)
copyFile(path.join(__dirname, `/${CorpId}/_variables.less`), path.join(__dirname, "/src/style/_variables.less"));

return

// 图片资源
copyFile(path.join(__dirname, `/${CorpId}/01_banner.png`), path.join(__dirname, "/src/assets/banner.png"));
copyFile(path.join(__dirname, `/${CorpId}/logo.png`), path.join(__dirname, "/src/assets/logo.png"));
copyFile(path.join(__dirname, `/${CorpId}/01_icon_title.png`), path.join(__dirname, "/src/assets/titleLogo.png"));

// 公共配置，首页，图标
copyFile(path.join(__dirname, `/${CorpId}/config.js`), path.join(__dirname, "/public/config.js"));
copyFile(path.join(__dirname, `/${CorpId}/index.html`), path.join(__dirname, "/public/index.html"));
copyFile(path.join(__dirname, `/${CorpId}/favicon.ico`), path.join(__dirname, "/public/favicon.ico"));

const fileList = {
  views: [
    'Repayment', 'Login', 'StepOne', 'StepThree', 'StepFour',
    'Progress', 'BankCard', 'Home',
  ],
  components: ['ContactUs'],
  lang: ['en', 'vi', 'vi_special'],
}
Object.keys(fileList).forEach(async (item) => {
  if(item === 'lang') {
    await copyComponentsAndViews(fileList[item], item, 'js');
  } else {
    await copyComponentsAndViews(fileList[item], item);
  }

});

// 判断当前客户是否要替换 国际化 文件
// existsFile(__dirname + `/${CorpId}/vi.js`).then(
//   res => {
//     copyFile(path.join(__dirname, `/${CorpId}/vi.js`), path.join(__dirname, "/src/lang/vi.js"));
//   },
//   err => {
//     console.log("Err: ", `/${CorpId}/en.js is not exist`);
//   }
// );

function existsFile(filename) {
  return new Promise((complete, fail) => fs.access(filename, fs.R_OK | fs.W_OK, err => (err ? fail() : complete())));
}

async function copyComponentsAndViews(fileList, fileLowPath, fileType = 'vue') {
  for(const fileItem of fileList) {
    // todo async await
    await existsFile(__dirname + `/${CorpId}/${fileItem}.${fileType}`).then(
      res => {
        copyFile(path.join(__dirname, `/${CorpId}/${fileItem}.${fileType}`), path.join(__dirname, `/src/${fileLowPath}/${fileItem}.${fileType}`));
        console.log("复制: ", `/${CorpId}/${fileItem}.${fileType}`);
      },
      err => {
        // console.error("Err: ", `/${CorpId}/${fileItem}.js is not exist`);
      }
    );
  }
}

