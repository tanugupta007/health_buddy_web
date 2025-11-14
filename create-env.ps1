# Create .env file for Health Buddy Backend
$backendPath = Join-Path $PSScriptRoot "backend"
$envPath = Join-Path $backendPath ".env"

$envContent = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthbuddy
JWT_SECRET=healthbuddy_secret_key_2025_change_in_production
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
"@

try {
    $envContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline
    Write-Host "✅ Created .env file at: $envPath"
    Write-Host "`n📝 Contents:"
    Get-Content $envPath
} catch {
    Write-Host "❌ Error creating .env file: $_"
    Write-Host "Please create the file manually at: $envPath"
}

