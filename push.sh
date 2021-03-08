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