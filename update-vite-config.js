const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const folders = fs.readdirSync(rootDir).filter(file => {
    return fs.statSync(path.join(rootDir, file)).isDirectory() && file.startsWith('praktik-');
});

folders.forEach(folder => {
    const configPath = path.join(rootDir, folder, 'vite.config.js');
    if (fs.existsSync(configPath)) {
        let content = fs.readFileSync(configPath, 'utf8');
        
        // Check if base is already defined
        if (!content.includes('base:')) {
            // Insert base: './' into defineConfig object
            // Regex to find the start of the object inside defineConfig
            const regex = /defineConfig\(\s*\{/;
            if (regex.test(content)) {
                const newContent = content.replace(regex, "defineConfig({\n  base: './',");
                fs.writeFileSync(configPath, newContent);
                console.log(`Updated ${folder}/vite.config.js`);
            } else {
                console.log(`Could not parse ${folder}/vite.config.js`);
            }
        } else {
            console.log(`${folder}/vite.config.js already has 'base' property.`);
        }
    }
});
