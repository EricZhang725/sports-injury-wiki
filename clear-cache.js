const fs = require('fs');
const path = require('path');

// 待删除的文件夹
const dirs = [
  '.next',
  'node_modules/.cache'
];

// 递归删除文件夹函数
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath);
      } else {
        // 删除文件
        try {
          fs.unlinkSync(curPath);
        } catch (err) {
          console.error(`Failed to delete file ${curPath}:`, err.message);
        }
      }
    });
    // 删除空文件夹
    try {
      fs.rmdirSync(folderPath);
    } catch (err) {
      console.error(`Failed to delete folder ${folderPath}:`, err.message);
    }
  }
}

// 清理缓存
dirs.forEach(dir => {
  console.log(`Cleaning ${dir}...`);
  try {
    deleteFolderRecursive(path.join(__dirname, dir));
    console.log(`Successfully cleaned ${dir}`);
  } catch (err) {
    console.error(`Error cleaning ${dir}:`, err.message);
  }
});

console.log('Cache cleanup completed'); 