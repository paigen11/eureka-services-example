'use strict';

const express = require('express');
const Eureka = require('eureka-js-client').Eureka;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// example configuration
const eureka = new Eureka({
  // application instance information
  instance: {
    app: 'a-node-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:3000',
    vipAddress: 'jq.test.something.com',
    port: {
      $: PORT,
      '@enabled': 'true',
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: '172.25.0.2',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

eureka.logger.level('debug');
eureka.start(error => {
  console.log(error || 'NodeJS Eureka Started!');
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello from NodeJS Eureka Client\n');
  res.end();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
