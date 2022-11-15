@echo off
echo.
echo [信息] 安装Web工程，生成node_modules文件。
echo [Info] Install the Web project and generate the node_modules file.
echo.

%~d0
cd %~dp0

cd ..
yarn --registry=https://registry.npmmirror.com

pause