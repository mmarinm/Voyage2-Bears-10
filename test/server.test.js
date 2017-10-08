const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;

const server = require('../server');

describe('server', function() {
  describe('builds application', function() {
    it('builds to "build" directory', function() {
      // Disable mocha time-out because this takes a lot of time
      this.timeout(0);

      // Run process
      return exec('npm run buildclient');
    });
  });

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

});
