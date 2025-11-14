# Simple Backend Startup Script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "backend"

Write-Host "Starting Health Buddy Backend..."
Write-Host "Backend directory: $backendDir"

if (Test-Path $backendDir) {
    Set-Location $backendDir
    Write-Host "Current directory: $(Get-Location)"
    Write-Host "Starting server on port 5000..."
    Write-Host ""
    node server.js
} else {
    Write-Host "Error: Backend directory not found!"
    pause
}

