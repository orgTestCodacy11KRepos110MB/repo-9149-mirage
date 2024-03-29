"use strict";
var lt_query_1 = require('./lt.query');
describe('Lt query format', function () {
    // Set initial things
    // set expected query format
    var query;
    var expectedFormat = {
        'range': {
            'age': {
                'lt': 35
            }
        }
    };
    // instantiate query component and set the input fields 
    beforeEach(function () {
        query = new lt_query_1.LtQuery();
        query.queryName = 'lt';
        query.fieldName = 'age';
        query.inputs = {
            lt: {
                value: 35
            }
        };
    });
    function isValidJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    // Test to check if queryformat is valid json
    it('is valid json', function () {
        var format = query.setFormat();
        var validJson = isValidJson(JSON.stringify(format));
        expect(validJson).toEqual(true);
    });
    // Test to check if result of setformat is equal to expected query format.
    it('Is setformat matches with expected query format', function () {
        var format = query.setFormat();
        expect(format).toEqual(expectedFormat);
    });
});
describe("xhr call (lt)", function () {
    var returnedJSON = {};
    var status = 0;
    beforeEach(function (done) {
        var query = new lt_query_1.LtQuery();
        query.queryName = 'lt';
        query.fieldName = 'age';
        query.inputs = {
            lt: {
                value: 35
            }
        };
        var config = {
            url: 'https://scalr.api.appbase.io',
            appname: 'mirage_test',
            username: 'wvCmyBy3D',
            password: '7a7078e0-0204-4ccf-9715-c720f24754f2'
        };
        var url = 'https://scalr.api.appbase.io/mirage_test/test/_search';
        var query_data = query.setFormat();
        var request_data = {
            "query": {
                "bool": {
                    "must": [query_data]
                }
            }
        };
        $.ajax({
            type: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Basic " + btoa(config.username + ':' + config.password));
            },
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(request_data),
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                returnedJSON = res;
                status = 200;
                done();
            },
            error: function (xhr) {
                returnedJSON = xhr;
                status = xhr.status;
                done();
            }
        });
    });
    it("Should have returned JSON", function () {
        expect(returnedJSON).not.toEqual({});
        expect(returnedJSON).not.toBeUndefined();
        expect(status).toEqual(200);
    });
});
//# sourceMappingURL=lt.query.spec.js.map