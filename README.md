# Netflix Eureka, Docker, Java & NodeJS Example

## About This App

This application is an example of a Netflix Eureka discovery server, discovering both Java and NodeJS services. It's coupled with Dockerfiles, created by the Jib Gradle plugin for the Java apps and manually for the NodeJS app, and a docker-compose.yml file that is capable of spinning up the whole service with a few graceful commands.

## Running This App

From the home folder, run the following commands:

For the very first build:
* ``` $ gradle wrapper ``` (if you need to install the gradle wrapper first)
* ``` $ ./gradlew clean jibExportDockerContext ``` (to generate the local Docker images and the compiled build files for the Java apps)
* ``` $ docker-compose build ``` (to build the images for all the application and install the node-modules for the JavaScript app)
* ``` $ docker-compose up ```

Every time after that:
* ``` $ docker-compose build ```
* ``` $ docker-compose up ```

Your Eureka server should be accessible from the  at `http://localhost:8761` and it will show the three services running, your `client-java` service will be accessible at `http://localhost:8091/service-instances/a-java-service`, your `client-java-2` service will be accessible at `http://localhost:8092/service-instances/another-java-service`, and your `client-node` service will be accessible at `http://localhost:3000`

To stop the services:
* ``` $ docker compose-stop ```

To kill the services:
* ``` CTRL + C  ``` and then ``` $ docker compose-down ```