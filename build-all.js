const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// 1. Clean and create dist folder
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Copy Landing Page
if (fs.existsSync(path.join(rootDir, 'index.html'))) {
    fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(distDir, 'index.html'));
}
// Copy styles if any (e.g. for landing page)
// (Assuming inline styles in index.html for now based on previous turn)

// 3. Find all practice folders
const folders = fs.readdirSync(rootDir).filter(file => {
    return fs.statSync(path.join(rootDir, file)).isDirectory() && file.startsWith('praktik-');
});

console.log('Found projects:', folders);

folders.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    console.log(`\nProcessing ${folder}...`);

    try {
        // Install dependencies if needed
        if (!fs.existsSync(path.join(folderPath, 'node_modules'))) {
            console.log(`Installing dependencies for ${folder}...`);
            execSync('npm install', { cwd: folderPath, stdio: 'inherit' });
        }

        // Build
        console.log(`Building ${folder}...`);
        execSync('npm run build', { cwd: folderPath, stdio: 'inherit' });

        // Copy build output to root dist
        const sourceDist = path.join(folderPath, 'dist');
        const targetDist = path.join(distDir, folder);

        if (fs.existsSync(sourceDist)) {
            fs.cpSync(sourceDist, targetDist, { recursive: true });
            console.log(`Successfully copied ${folder} to dist/${folder}`);
        } else {
            console.error(`Error: dist folder not found for ${folder}`);
        }

    } catch (error) {
        console.error(`Failed to process ${folder}:`, error.message);
    }
});

console.log('\nBuild All Completed!');
