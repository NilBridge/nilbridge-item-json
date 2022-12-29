chcp 65001

echo %cwd%

if not exist tmp mkdir tmp
if not exist resources mkdir resources
if not exist web mkdir web
:: echo mc-item.nilbridge.site >> ./web/CNAME

set version=%1

echo version: %version%, readly to doownload.

curl https://void.bedrock.dev/resources/%version%.zip --output ./tmp/%version%.zip 

echo download done!!

tar -xf ./tmp/%version%.zip -C ./resources/

pause