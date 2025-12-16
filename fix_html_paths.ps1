$folders = Get-ChildItem -Directory -Filter "praktik-*"

foreach ($folder in $folders) {
    $indexPath = Join-Path $folder.FullName "index.html"
    if (Test-Path $indexPath) {
        $content = Get-Content $indexPath -Raw
        
        # Fix favicon path
        if ($content -match 'href="/vite.svg"') {
            $content = $content -replace 'href="/vite.svg"', 'href="vite.svg"'
            Write-Host "Fixed favicon path in $($folder.Name)"
        }
        
        # Fix script path if needed (Vite usually handles this, but removing leading slash is safer for relative base)
        # However, Vite often relies on /src/main.jsx in dev. 
        # Let's stick to fixing the favicon which is a static asset reference.
        
        Set-Content $indexPath $content
    }
}
