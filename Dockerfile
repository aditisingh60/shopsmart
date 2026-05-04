FROM ubuntu:latest
RUN apt-get update && apt-get install -y curl
RUN apt-get intall -y wget
RUN rm -rf  
