# project-v2

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### 接口地址
地址：[https://www.showdoc.com.cn/jinducasey/8321036098744323]
密码：jinduVIP
登录的用户名和密码符合校验规则即可(用户名:admin,密码1qaz!QAZ)

### 资源
分数地图资源：[http://192.144.199.210:8080/editor/index.html?chart_id=7Ph0yZtNoJ1JhGDl]

### Nginx部署项目
1、yarn build打包Vue项目
2、打开nging.conf文件,配置对应的信息
```
# nginx.conf
location / {
    root   C:\Users\17542\Desktop\project-v2\dist;
    index  index.html index.htm;
    try_files $uri $uri/ @router; # 解决页面刷新404问题
}

location @router {
    rewrite ^.*$ /index.html last; # Vue项目路由不是真实存在的
}
```
3、检查配置文件是否配置成功
```cmd
nginx -t -c D:\nginx-1.16.1\conf\nginx.conf
start nginx # 运行nginx
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
