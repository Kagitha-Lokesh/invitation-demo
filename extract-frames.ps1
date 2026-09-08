# extract-frames.ps1
# Run from: d:\Project\Invitaion Cards\DEMO
# Requires: ffmpeg in PATH (winget install --id Gyan.FFmpeg -e)

$ErrorActionPreference = "Stop"

$sequences = [ordered]@{
  "hero"         = "hero.mp4"
  "couple"       = "couple.mp4"
  "celebrations" = "celebrations.mp4"
  "wedding"      = "wedding.mp4"
  "final"        = "finalinvitation.mp4"
}

Write-Host "`n=== Telugu Wedding — Frame Extraction ===" -ForegroundColor Cyan
Write-Host "Output: 15fps, 540px wide, WebP quality 82`n" -ForegroundColor DarkCyan

$totalFrames = 0
$totalBytes  = 0

foreach ($name in $sequences.Keys) {
  $src    = $sequences[$name]
  $outDir = "frames\$name"

  if (-not (Test-Path $src)) {
    Write-Host "SKIP $src (not found)" -ForegroundColor Yellow
    continue
  }

  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
  Write-Host "Extracting: $src" -ForegroundColor White

  & ffmpeg -i $src `
    -vf "fps=15,scale=540:-1:flags=lanczos" `
    -c:v libwebp `
    -quality 82 `
    -an `
    -y `
    "$outDir\frame-%04d.webp" 2>$null

  $files  = Get-ChildItem $outDir -Filter "*.webp"
  $count  = $files.Count
  $mb     = [math]::Round(($files | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
  $totalFrames += $count
  $totalBytes  += ($files | Measure-Object -Property Length -Sum).Sum

  Write-Host "  DONE  $count frames / $mb MB" -ForegroundColor Green
}

$totalMB = [math]::Round($totalBytes / 1MB, 2)
Write-Host "`nTOTAL: $totalFrames frames / $totalMB MB" -ForegroundColor Cyan

Write-Host "`n=== FRAME COUNTS (update in script.js) ===" -ForegroundColor Yellow
foreach ($name in $sequences.Keys) {
  $outDir = "frames\$name"
  if (Test-Path $outDir) {
    $c = (Get-ChildItem $outDir -Filter "*.webp").Count
    Write-Host "  $name : $c"
  }
}
