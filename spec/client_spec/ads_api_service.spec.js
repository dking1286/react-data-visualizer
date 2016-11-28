/* eslint-disable */

const expect = require('chai').expect;
const sinon = require('sinon');

const AdsAPIService = require('../../client/services/ads_api_service');

describe('AdsAPIService', function () {
  describe('.onHttpResponse', function () {
    it('should return a function', function () {
      expect(AdsAPIService.onHttpResponse()).to.be.a.function;
    });

    describe('returned function', function () {
      let resolve;
      let reject;
      beforeEach(function () {
        resolve = sinon.spy();
        reject = sinon.spy();
      });

      it('should invoke resolve if the response has a valid JSON body', function () {

      });

      it('should invoke reject if the response does not have a valid JSON body', function () {
        
      });

      it('should invoke reject if the response does not have a responseText property', function () {

      });

      it('should invoke reject if the response status code is not 200', function () {
        
      });
    });
  });

  describe('.onHttpError', function () {
    it('should return a function', function () {
      expect(AdsAPIService.onHttpError()).to.be.a('function');
    });

    describe('returned function', function () {
      let resolve;
      let reject;

      beforeEach(function () {
        resolve = sinon.spy();
        reject = sinon.spy();
      });

      it('should invoke reject with the error', function () {
        
      });
    });
  });

  describe('.get', function () {
    it('should return a Promise', function () {
      expect(AdsAPIService.get('blah')).to.be.an.instanceof(Promise);
    });

    it('should reject if an invalid endpoint is provided', function (done) {
      const invalid = 'blahblah';

      expect(AdsAPIService.validEndpoints).to.not.include.keys(invalid);

      AdsAPIService.get(invalid)
        .then(() => {
          // This shouldn't happen
          return done(new Error('Promise resolved instead of rejected'));
        })
        .catch((error) => {
          // This should happen
          expect(error.message).to.equal('Invalid API endpoint provided');
          done();
        });
    });
  });
});