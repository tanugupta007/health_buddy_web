# MongoDB Installation Guide for Windows

## Step 1: Download MongoDB
The download page should be open in your browser. If not, visit:
https://www.mongodb.com/try/download/community

**On the download page:**
1. Select "Windows" as your platform
2. Select "MSI" as the package
3. Choose the latest version (recommended)
4. Click "Download"

## Step 2: Install MongoDB

1. **Run the downloaded .msi installer**
2. **Choose "Complete" installation** (recommended)
3. **Important: Check "Install MongoDB as a Service"**
   - This allows MongoDB to run automatically
   - Service Name: MongoDB
   - Service Account: Local System
4. **Install MongoDB Compass** (optional but recommended)
   - This is a GUI tool to manage your databases
5. Click "Install" and wait for completion

## Step 3: Verify Installation

After installation, MongoDB should be running automatically as a Windows service.

### Check if MongoDB is running:
```powershell
Get-Service -Name MongoDB
```

### If it's not running, start it:
```powershell
Start-Service -Name MongoDB
```

### Verify MongoDB is working:
```powershell
# Test connection
mongosh
# Or if mongosh is not in PATH:
& "C:\Program Files\MongoDB\Server\<version>\bin\mongosh.exe"
```

## Step 4: Create Data Directory (if needed)

MongoDB needs a data directory. The installer usually creates this, but if you get errors:

```powershell
# Create data directory
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

## Step 5: Start Your Health Buddy Backend

Once MongoDB is running, start your backend:

```powershell
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
```

## Troubleshooting

### MongoDB Service Not Found
If the service name is different, check all MongoDB services:
```powershell
Get-Service | Where-Object {$_.DisplayName -like "*Mongo*"}
```

### Port 27017 Already in Use
Another MongoDB instance might be running. Check:
```powershell
Get-Process -Name mongod -ErrorAction SilentlyContinue
```

### Manual Start (if service doesn't work)
```powershell
# Navigate to MongoDB bin directory (adjust version number)
cd "C:\Program Files\MongoDB\Server\<version>\bin"
.\mongod.exe --dbpath "C:\data\db"
```

## Next Steps

After MongoDB is installed and running:
1. ✅ MongoDB should be running as a service
2. ✅ Start the backend: `cd backend && npm start`
3. ✅ Frontend is already running on http://localhost:8000
4. ✅ Access your Health Buddy app!

