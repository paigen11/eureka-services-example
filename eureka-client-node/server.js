'use strict';

const express = require('express');
const Eureka = require('eureka-js-client').Eureka;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const app = express();

// example configuration
const eureka = new Eureka({
  // application instance information
  instance: {
    app: 'a-node-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:3000',
    vipAddress: 'a-node-service',
    port: {
      $: PORT,
      '@enabled': 'true',
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

var javaInstance = '';
var java2Instance = '';
var nodeInstance = '';

eureka.logger.level('debug');
eureka.start(error => {
  console.log(error || 'NodeJS Eureka Started!');

  javaInstance = eureka.getInstancesByAppId('A-JAVA-SERVICE');
  console.log(javaInstance);

  java2Instance = eureka.getInstancesByAppId('ANOTHER-JAVA-SERVICE');
  console.log(java2Instance);

  // nodeInstance = eureka.getInstancesByAppId('A-NODE-SERVICE');
  // console.log(nodeInstance);

  // App
  app.get('/', (req, res) => {
    res.send('Hello from NodeJS Eureka Client\n');
    res.end();
  });

  const javaUrl = `${javaInstance[0].hostName}:${
    javaInstance[0].port.$
  }/service-instances/${javaInstance[0].app}`;

  console.log(javaUrl);

  // get java service info endpoint
  app.get(`/serviceInfo/${javaUrl}`, (req, res) => {
    res.send(JSON.stringify(javaInstance), null, 2);
    res.end();
  });

  const java2Url = `${java2Instance[0].hostName}:${
    java2Instance[0].port.$
  }/service-instances/${java2Instance[0].app}`;

  console.log(java2Url);

  app.get(`/serviceInfo/${java2Url}`, (req, res) => {
    res.send(JSON.stringify(java2Instance), null, 2);
    res.end();
  });

  const nodeUrl = `${nodeInstance[0].hostName}:${
    nodeInstance[0].port.$
  }/service-instances/${nodeInstance[0].app}`;

  console.log(nodeUrl);

  app.get(`/serviceInfo/${nodeUrl}`, (req, res) => {
    res.send(JSON.stringify(nodeInstance), null, 2);
    res.end();
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
