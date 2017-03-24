# 介绍

每隔一小时执行一次本脚本，同步上一个小时的融云聊天日志到zepplin服务器指定目录。

# 注意事项

1. 需要本脚本执行在能连外网的机器上，如oss
2. 需要安装node, 然后npm install
3. 需要设置crond，作定时任务
4. 需要设置oss到zepplin免密登录（ssh-copyid)
5. 需要本机有wget, unzip, rsync命令
6. `node index.js` 同步上一个小时的日志
7. `node index.js` 2016092710 同步指定日期小时的日志
8. 执行`chmod +x rongMessage.sh`
9. 在定时任务中执行任务脚本rongMessage.sh  `30 * * * * /apps/freekeer/rongsync/rongMessage.sh`