$today = Get-Date -Format "yyyy-MM-dd"
$commitDate = git log -1 --format=%cd --date=format:"%Y-%m-%d"
if ($commitDate -eq $today) {
    Write-Host "SUCCESS: Commit date matches today ($today)"
} else {
    Write-Host "FAILURE: Last commit date ($commitDate) does not match today ($today)"
}

$hostingUrl = "https://jk-festival.web.app" 
# Note: Actual URL to be confirmed from firebase deploy output
Write-Host "Checking URL: $hostingUrl"
try {
    $response = Invoke-WebRequest -Uri $hostingUrl -Method Head
    if ($response.StatusCode -eq 200) {
        Write-Host "SUCCESS: Site is reachable"
    } else {
        Write-Host "FAILURE: Site returned status $($response.StatusCode)"
    }
} catch {
    Write-Host "FAILURE: Could not reach site"
}
