const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// 定义API路由根目录
const API_ROUTES_DIR = path.join(__dirname, '..', 'app', 'api');

// 递归获取所有文件路径
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat();
}

// 主函数
async function main() {
  try {
    // 获取所有API路由文件
    const files = await getFiles(API_ROUTES_DIR);
    const routeFiles = files.filter(file => 
      (file.endsWith('route.ts') || file.endsWith('route.js')) && 
      !file.includes('node_modules')
    );
    
    console.log(`找到 ${routeFiles.length} 个API路由文件`);
    
    // 处理每个路由文件
    for (const file of routeFiles) {
      console.log(`处理文件: ${file}`);
      
      // 读取文件内容
      let content = await readFile(file, 'utf8');
      
      // 检查是否已有dynamic配置
      if (content.includes('export const dynamic')) {
        console.log(`  已有dynamic配置，跳过`);
        continue;
      }
      
      // 查找合适的位置添加dynamic配置
      let newContent;
      
      // 在import语句后添加
      const importEndIndex = content.lastIndexOf('import');
      if (importEndIndex !== -1) {
        const lineEnd = content.indexOf('\n', importEndIndex);
        if (lineEnd !== -1) {
          newContent = 
            content.slice(0, lineEnd + 1) + 
            '\n// 确保API路由为动态渲染\nexport const dynamic = \'force-dynamic\';\n' + 
            content.slice(lineEnd + 1);
        }
      }
      
      // 如果找不到import语句，就在文件开头添加
      if (!newContent) {
        newContent = '// 确保API路由为动态渲染\nexport const dynamic = \'force-dynamic\';\n\n' + content;
      }
      
      // 写入修改后的内容
      await writeFile(file, newContent, 'utf8');
      console.log(`  已添加dynamic配置`);
    }
    
    console.log('完成!');
  } catch (error) {
    console.error('出错:', error);
  }
}

main(); 