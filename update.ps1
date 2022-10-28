Write-Output "Starting update..."

$currentVersionString = (Get-Content .\meta.json | ConvertFrom-Json).version
Write-Output "Current version: $currentVersion"

Write-Output "Searching for newest version..."
$newestVersionString = ""
$req = Invoke-WebRequest https://github.com/DerTyp876/ts5-obs-overlay/releases/tag/latest

foreach ($tag in $req.ParsedHtml.body.getElementsByTagName('h1')) {
  if ($tag.innerText[0] -eq "v") {
    $newestVersionString = $tag.innerText
  }
}

if ($newestVersionString -ne "") {
  Write-Output "Newest version found: $newestVersion"


  $currentVersion = ($currentVersionString -replace "v").split(".")
  $newestVersion = ($newestVersionString -replace "v").split(".")

  if ($currentVersion[0] -gt $newestVersion[0]) {
    Write-Output "Current version is up to date!"
  }
  elseif ($currentVersion[1] -gt $newestVersion[1]) {
    Write-Output "Current version is up to date!"
  }
  elseif ($currentVersion[2] -ge $newestVersion[2]) {
    Write-Output "Current version is up to date!"
  }
  else {
    Write-Output "Updating to newer version..."

    Remove-Item * -Recurse -Force -Confirm -Exclude "update.ps1"

    mkdir ./temp
    attrib +h ./temp
    Write-Output "Downloading newer version..."
    Invoke-WebRequest -Uri "https://github.com/DerTyp876/ts5-obs-overlay/archive/refs/tags/$newestVersionString.zip" -OutFile "./temp/$newestVersionString.zip"
    Write-Output "Extracting archive..."
    Expand-Archive -Path "./temp/$newestVersionString.zip" -DestinationPath "./temp/"
    Get-ChildItem -Path "./temp/ts5-obs-overlay-$($newestVersionString -replace 'v')" -Recurse | Move-Item -Destination "./"

    Remove-Item "./temp" -Recurse -Force -Confirm

    Write-Output "You are now up to date again!"
  }
}
else {
  Write-Output "No new version found!"
}



