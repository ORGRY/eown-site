:: 输入提交内容
set /p commit_msg=Please input commit message:
:: 添加
git add .
:: 提交
git commit -m "%commit_msg%"

:: 推送到git@github.com:ORGRY/eown-site.git
git remote set-url --add origin git@github.com:ORGRY/eown-site.git

:: 推送到远程副分支  gh-pages
git push origin gh-pages
:: 拉取主分支代码
git pull origin master
:: 合并分支
git merge fz
:: 推送到主分支
git push origin master
:: 切换到fz
git checkout fz
:: 停顿 
pause