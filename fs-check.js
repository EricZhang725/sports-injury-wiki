const fs = require('fs');
const path = require('path');

// Check if .next directory exists
console.log('.next directory exists:', fs.existsSync(path.join(__dirname, '.next')));

// Try to create a test file
try {
  fs.writeFileSync(path.join(__dirname, 'test-file.txt'), 'Hello, World!');
  console.log('Successfully created test file');
} catch (error) {
  console.error('Error creating test file:', error);
}

// Try to read the test file
try {
  if (fs.existsSync(path.join(__dirname, 'test-file.txt'))) {
    const content = fs.readFileSync(path.join(__dirname, 'test-file.txt'), 'utf8');
    console.log('Successfully read test file:', content);
  }
} catch (error) {
  console.error('Error reading test file:', error);
}

// Check if we can list files in the project root
try {
  const files = fs.readdirSync(__dirname);
  console.log('Files in project root:', files.slice(0, 10));
} catch (error) {
  console.error('Error listing files:', error);
}

// Clean up test file
try {
  fs.unlinkSync(path.join(__dirname, 'test-file.txt'));
  console.log('Successfully cleaned up test file');
} catch (error) {
  console.error('Error cleaning up test file:', error);
} 