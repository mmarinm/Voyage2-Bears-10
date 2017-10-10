var chai = require('chai');
const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const server = require('../server');

const processMessage = require('../server/api.ai');

describe('server', function() {
  // describe('builds application', function() {
  //   it('builds to "build" directory', function() {
  //     // Disable mocha time-out because this takes a lot of time
  //     this.timeout(0);

  //     // Run process
  //     return exec('npm run buildclient');
  //   });
  // });

  describe('express serving', function() {
    it('responds to / with the index.html', function() {
      request(server)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .then(res => expect(res.text).to.contain('<div id="root"></div>'));
    });
    it('responds to favicon.icon request', function() {
      request(server)
        .get('/favicon.ico')
        .expect('Content-Type', 'image/x-icon')
        .expect(200);
    });
    it('404 everything else', function testPath() {
      request(server)
        .get('/foo/bar')
        .expect(404);
    });
  });

  describe('api.ai processes the message', function() {
    const testMessage = 'hi there';
    const apiCall = processMessage(testMessage);
    it('should return resp object from api call', function() {
      return expect(apiCall).to.eventually.be.an('object');
    });
    it('message should be query value for api', function() {
      return expect(apiCall)
        .to.eventually.have.property('result')
        .that.has.property('resolvedQuery')
        .that.to.equal(testMessage);
    });
  });
});
