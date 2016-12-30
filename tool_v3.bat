cd out
del * /q
cd ..
set /p name=Please input the package name:

tools\tool2d-v3.exe %name%
xcopy /i /s /e res_v3\%name%\*.glsl out\ /Y /Q
cd out
..\tools\cwebp.exe -q 75 -o bigtex.webp bigtex.png
move bigtex.webp bigtex.png
..\tools\7z.exe a ..\%name%.zip *
cd ..
tools\node.exe tools\sign_file.js %name%.zip %name%.mp3
move %name%.zip zip_v3\%name%.zip
move %name%.mp3 build_v3\%name%.mp3
pause