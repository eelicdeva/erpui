@echo off
echo.
echo [��Ϣ] ���Web���̣�����dist�ļ���
echo [info] Package the web project and generate the dist file.
echo.

%~d0
cd %~dp0

cd ..
yarn build:prod

pause