const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const folders = fs.readdirSync(rootDir).filter(file => {
    return fs.statSync(path.join(rootDir, file)).isDirectory() && file.startsWith('praktik-');
});

folders.forEach(folder => {
    const configPath = path.join(rootDir, folder, 'vite.config.js');
    if (!fs.existsSync(configPath)) {
        return;
    }

    const desiredBase = `/${folder}/`;
    let content = fs.readFileSync(configPath, 'utf8');
    let updated = false;

    const baseRegex = /base:\s*['"]([^'"]+)['"]/;
    if (baseRegex.test(content)) {
        const currentBase = content.match(baseRegex)[1];
        if (currentBase !== desiredBase) {
            content = content.replace(baseRegex, `base: '${desiredBase}'`);
            updated = true;
        }
    } else {
        const insertRegex = /defineConfig\(\s*\{/;
        if (insertRegex.test(content)) {
            content = content.replace(insertRegex, `defineConfig({\n  base: '${desiredBase}',`);
            updated = true;
        } else {
            console.warn(`Could not insert base for ${folder} (unexpected format).`);
        }
    }

    if (updated) {
        fs.writeFileSync(configPath, content, 'utf8');
        console.log(`Updated base for ${folder} -> ${desiredBase}`);
    } else {
        console.log(`${folder} already has correct base.`);
    }
});
