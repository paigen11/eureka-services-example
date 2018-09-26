FROM gcr.io/distroless/java

COPY libs /app/libs/
COPY resources /app/resources/
COPY classes /app/classes/

ENTRYPOINT ["java","-cp","/app/resources/:/app/classes/:/app/libs/*","eurekaClient.EurekaClientApplication"]
CMD []