# Base images 基础镜像
FROM nginx

#MAINTAINER 维护者信息
MAINTAINER benxjc

#拷贝文件
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docs/ /usr/share/nginx/html/

#EXPOSE 映射端口
EXPOSE 80

#CMD 运行以下命令
CMD ["nginx", "-g", "daemon off;"]
