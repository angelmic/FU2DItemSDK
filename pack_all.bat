set name=packed_item
cd out
..\tools\7z.exe a ..\%name%.zip *
cd ..
tools\node.exe tools\sign_file.js %name%.zip %name%.bundle
move %name%.zip zip_v3\%name%.zip
move %name%.bundle build_v3\%name%.bundle