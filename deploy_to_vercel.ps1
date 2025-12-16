$folders = @(
    "praktik-01",
    "praktik-02",
    "praktik-03",
    "praktik-04",
    "praktik-05",
    "praktik-06",
    "praktik-07",
    "praktik-08",
    "praktik-08-lanjutan",
    "praktik-09",
    "praktik-10",
    "praktik-11",
    "praktik-12",
    "praktik-13"
)

$results = @()

Write-Host "Starting deployment for all folders..." -ForegroundColor Cyan
Write-Host "NOTE: You may be asked to log in to Vercel in the browser." -ForegroundColor Yellow

foreach ($folder in $folders) {
    Write-Host "`nDeploying $folder..." -ForegroundColor Green
    
    # Navigate to folder
    Push-Location $folder
    
    try {
        # Run Vercel deploy
        # --prod: Production deployment
        # --yes: Skip questions (use defaults)
        # --no-clipboard: Don't copy to clipboard
        $url = npx vercel deploy --prod --yes --no-clipboard
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully deployed $folder to: $url" -ForegroundColor Cyan
            $results += [PSCustomObject]@{
                Folder = $folder
                URL = $url
            }
        } else {
            Write-Host "Failed to deploy $folder" -ForegroundColor Red
            $results += [PSCustomObject]@{
                Folder = $folder
                URL = "FAILED"
            }
        }
    }
    catch {
        Write-Host "Error deploying $folder" -ForegroundColor Red
        $results += [PSCustomObject]@{
            Folder = $folder
            URL = "ERROR"
        }
    }
    
    # Return to root
    Pop-Location
}

Write-Host "`n`n=== DEPLOYMENT SUMMARY ===" -ForegroundColor Magenta
$results | Format-Table -AutoSize

# Also save to a file
$summaryContent = "# Vercel Deployment Links`n`n| Folder | URL |`n|---|---|`n"
foreach ($res in $results) {
    $summaryContent += "| $($res.Folder) | $($res.URL) |`n"
}
$summaryContent | Out-File -FilePath "..\vercel_links.md" -Encoding utf8
Write-Host "Links saved to vercel_links.md" -ForegroundColor Green
