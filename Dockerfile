FROM php:7.4-apache
RUN docker-php-ext-install pdo_mysql


# docker build -t php_mysql-pdo .