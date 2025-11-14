# Start Backend Server
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend"

Write-Host "Starting Health Buddy Backend Server..."
Write-Host "Backend path: $backendPath"

if (Test-Path $backendPath) {
    Set-Location $backendPath
    Write-Host "Current directory: $(Get-Location)"
    
    # Check if node_modules exists
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing dependencies..."
        npm install
    }
    
    # Start the server
    Write-Host "Starting server..."
    npm start
} else {
    Write-Host "Error: Backend directory not found at $backendPath"
    exit 1
}

