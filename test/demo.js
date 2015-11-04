//var XhrXhr = require('freedom-xhr').corexhr;
//var XhrTcpsocket = require('freedom-xhr').coretcpsocket;

var xhrdemo = function(dispatchEvent, selector) {
  this.dispatch = dispatchEvent;
  this.XhrClass = require('freedom-xhr')[selector];
  this.xhr = new this.XhrClass();
};

xhrdemo.prototype.testHasXhr = function() {
  if (typeof this.XhrClass !== 'undefined' &&
        typeof this.xhr !== 'undefined') {
    return Promise.resolve('Woo');
  } else {
    return Promise.reject('Missing XHR classes');
  }
};

xhrdemo.prototype.testLoadEvent = function() {
  return new Promise(function(resolve, reject) {
    this.xhr.addEventListener('load', function (e) {
      // TODO: expect(e).not.toBeUndefined();
      //
      if (this.xhr.readyState !== 4) {
        reject('readyState is not 4: ' + this.xhr.readyState);
        return;
      }
      resolve('Woo');
    }.bind(this));

//    this.xhr.open('GET', 'http://isup.me');
    this.xhr.open('GET', 'https://api.github.com/');
    this.xhr.send(null);
  }.bind(this));
};

xhrdemo.prototype.testErrorEvent = function() {
  return new Promise(function(resolve, reject) {
    this.xhr.addEventListener('error', function (e) {
      // TODO: expect(e).not.toBeUndefined();
      resolve('Woo');
    }.bind(this));

    this.xhr.open('GET', 'http://no.such.domain');
    this.xhr.send(null);
  }.bind(this));
};

xhrdemo.prototype.testTimeoutEvent = function() {
  return new Promise(function(resolve, reject) {
    this.xhr.addEventListener('timeout', function (e) {
      // TODO: expect(e).not.toBeUndefined();
      resolve('Woo');
    }.bind(this));

    this.xhr.timeout = 500;
    this.xhr.open('GET', 'http://192.0.2.1');
    this.xhr.send(null);
  }.bind(this));
};

xhrdemo.prototype.testLoadGetResponse = function() {
  return new Promise(function(resolve, reject) {
    this.xhr.addEventListener('load', function (e) {
      // TODO: expect(e).not.toBeUndefined();
      if (this.xhr.statusText !== 'OK') {
        reject('statusText not `OK`: ' + this.xhr.statusText);
        return;
      }
      try {
        // Check that the page is valid JSON
        var parsed = JSON.parse(this.xhr.responseText);
        resolve('Woo');
      } catch (e) {
        reject('responseText isn\'t valid JSON:' + e.message);
      }
    }.bind(this));

    this.xhr.open('GET', 'https://api.github.com/');
    this.xhr.send(null);
  }.bind(this));
};

xhrdemo.prototype.testDoneGetResponse = function() {
  return new Promise(function(resolve, reject) {
    this.xhr.addEventListener('readystatechange', function (e) {
      if (this.xhr.readyState === 4) {
        if (this.xhr.statusText !== 'OK') {
          reject('statusText not `OK`: ' + this.xhr.statusText);
          return;
        }
        try {
          // Check that the page is valid JSON
          var parsed = JSON.parse(this.xhr.responseText);
          resolve('Woo');
        } catch (e) {
          reject('responseText isn\'t valid JSON:' + e.message);
        }
      }
    }.bind(this));

    this.xhr.open('GET', 'https://api.github.com/');
    this.xhr.send(null);
  }.bind(this));
};

    /**

    it ('SSL support', function (done) {
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                expect(xhr.statusText).toBe('OK');
                done();
            }
        });

        xhr.open('GET', 'https://www.httpsnow.org/');
        xhr.send(null);
    });
    **/


freedom().providePromises(xhrdemo);
