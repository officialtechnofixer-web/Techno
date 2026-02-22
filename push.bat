@echo off
SET PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%
echo Pushing changes to GitHub...
echo.
git push -u origin main
echo.
pause
