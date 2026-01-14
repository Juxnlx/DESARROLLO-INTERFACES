const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles('./src');

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const nonAscii = content.match(/[^\x00-\x7F]/g);
        if (nonAscii) {
            console.log(`\nFOUND NON-ASCII CHARACTERS IN: ${file}`);
            console.log('Characters:', [...new Set(nonAscii)].join(' '));
            
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (/[^\x00-\x7F]/.test(line)) {
                    console.log(`Line ${index + 1}: ${line}`);
                }
            });
        }
    } catch (err) {
        console.log(`Error reading ${file}:`, err.message);
    }
});

console.log('\nCheck complete!');