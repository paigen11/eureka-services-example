# Netflix Eureka, Java & NodeJS Example

## About This App

This application is an example of a Netflix Eureka registry service, registering both Java and NodeJS services. 

## Running This App

From the home folder, run the following commands:

For the very first build:
* ``` $ gradle wrapper ``` (if you need to install the gradle wrapper first)

Open a new terminal window for each service you'll be spinning up to register with the Eureka server:
Cd into each java folder to compile and spin up the services (one terminal):
* ``` $ cd eureka-service && gradle clean build ``` 
* ``` $ gradle bootRun``` 

Cd into each java folder to compile and spin up the services (second teminal):
* ``` $ cd eureka-client-java && gradle clean build ``` 
* ``` $ gradle bootRun``` 

Cd into each java folder to compile and spin up the services (third teminal):
* ``` $ cd eureka-client-java-2 && gradle clean build ``` 
* ``` $ gradle bootRun```

Cd into the node project too (fourth teminal):
* ``` $ cd eureka-client-node && npm install ``` 
* ``` $ npm start``` 

Your Eureka server should be accessible from the  at `http://localhost:8761` and it will show the three services running, your `client-java` service will be accessible at `http://localhost:8091/service-instances/a-java-service`, your `client-java-2` service will be accessible at `http://localhost:8092/service-instances/another-java-service`, and your `client-node` service will be accessible at `http://localhost:3000`.

From the Node app, I also made some extra endpoints so you can see the info from the other two services being consumed and displayed by the Node service.

Hit these endpoints to see the other services info:
* `http://localhost:3000/servicesInfo/192.168.1.18:8091/service-instances/A-JAVA-SERVICE`
* `http://localhost:3000/servicesInfo/192.168.1.18:8092/service-instances/ANOTHER-JAVA-SERVICE`
* `http://localhost:3000/servicesInfo/localhost:3000/service-instances/A-NODE-SERVICE`