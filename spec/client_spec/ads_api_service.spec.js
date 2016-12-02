/* eslint-disable */

import { expect } from 'chai';
import sinon from 'sinon';

import AdsAPIService from '../../client/services/ads_api_service';
import {
  apiEndpoint, validEndpoints, onHttpResponse, onHttpError
} from '../../client/services/ads_api_service';

describe('AdsAPIService', function () {
  describe('onHttpResponse', function () {
    it('should return a function', function () {
      expect(onHttpResponse()).to.be.a.function;
    });

    describe('returned function', function () {
      let resolve;
      let reject;
      beforeEach(function () {
        resolve = sinon.spy();
        reject = sinon.spy();
      });

      it('should invoke resolve if the response has a valid JSON body', function () {
        const fakeHttpRequest = {
          status: 200,
          responseText: "{\"hello\": \"world\"}"
        }

        const handler = onHttpResponse(resolve, reject, fakeHttpRequest);
        handler();

        expect(resolve.called && !reject.called).to.be.true;
      });

      it('should invoke reject if the response does not have a valid JSON body', function () {
        const fakeHttpRequest = {
          status: 200,
          responseText: "{"
        };

        const handler = onHttpResponse(resolve, reject, fakeHttpRequest);
        handler();

        expect(reject.called && !resolve.called).to.be.true;
      });

      it('should invoke reject if the responseText property is empty', function () {
        const fakeHttpRequest = {
          status: 200,
          responseText: '',
        };

        const handler = onHttpResponse(resolve, reject, fakeHttpRequest);
        handler();

        expect(reject.called && !resolve.called).to.be.true;
      });

      it('should invoke reject if the response status code is not 200', function () {
        const fakeHttpRequest = {
          status: 404,
          responseText: "\"There was a problem \""
        }

        const handler = onHttpResponse(resolve, reject, fakeHttpRequest);
        handler();

        expect(reject.called && !resolve.called).to.be.true;
      });
    });
  });

  describe('onHttpError', function () {
    it('should return a function', function () {
      expect(onHttpError()).to.be.a('function');
    });

    describe('returned function', function () {
      let resolve;
      let reject;

      beforeEach(function () {
        resolve = sinon.spy();
        reject = sinon.spy();
      });

      it('should invoke reject with the error', function () {
        const fakeHttpRequest = {}
        const errorEvent = {
          message: "OH NO!!!"
        };

        const handler = onHttpError(resolve, reject, fakeHttpRequest);
        handler(errorEvent);

        expect(reject.calledWith(errorEvent)).to.be.true;
      });
    });
  });

  describe('get', function () {
    it('should return a Promise', function () {
      expect(AdsAPIService.get('blah', {})).to.be.an.instanceof(Promise);
    });

    it('should reject if an invalid endpoint is provided', function (done) {
      const invalid = 'blahblah';

      expect(validEndpoints).to.not.include.keys(invalid);

      AdsAPIService.get(invalid, {})
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

    it('should invoke open and send methods on the httpRequest', function () {
      const fakeHTTP = {
        open: sinon.spy(),
        send: sinon.spy(),
      };

      const url = apiEndpoint('/ads');
      
      AdsAPIService.get('ads', fakeHTTP);

      expect(fakeHTTP.open.calledWith('GET', url)).to.be.true;
      expect(fakeHTTP.send.called).to.be.true;
    });
  });
});