# Start Frontend Server
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Health Buddy Frontend Server..."
Write-Host "Frontend path: $scriptPath"

Set-Location $scriptPath

# Try Python first, then Node.js http-server
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starting Python HTTP server on port 8000..."
    Write-Host "Open http://localhost:8000 in your browser"
    python -m http.server 8000
} elseif (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Starting Node.js http-server on port 8000..."
    Write-Host "Installing http-server if needed..."
    npx --yes http-server -p 8000
} else {
    Write-Host "Error: Neither Python nor Node.js found. Please install one of them."
    exit 1
}

