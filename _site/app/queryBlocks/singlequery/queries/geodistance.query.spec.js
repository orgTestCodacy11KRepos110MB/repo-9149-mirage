"use strict";
var geodistance_query_1 = require('./geodistance.query');
describe('geo_distance query format', function () {
    // Set initial things
    // set expected query format
    var query;
    var expectedFormat = {
        'geo_distance': {
            'distance': '100km',
            'location': {
                'lat': '10',
                'lon': '10'
            }
        }
    };
    var expectedFormatWithOption = {
        'geo_distance': {
            'distance': '100km',
            'location': {
                'lat': '10',
                'lon': '10'
            },
            "distance_type": "arc",
            "optimize_bbox": "none",
            "_name": "place",
            "ignore_malformed": "true"
        }
    };
    // instantiate query component and set the input fields 
    beforeEach(function () {
        query = new geodistance_query_1.GeoDistanceQuery();
        query.queryName = 'geo_distance';
        query.fieldName = 'location';
        query.inputs = {
            lat: {
                value: '10'
            },
            lon: {
                value: '10'
            },
            distance: {
                value: '100km'
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
    // Test to check if result of setformat is equal to expected query format with option.
    it('Is setformat matches with expected query format when pass options with query', function () {
        query.optionRows = [{
                name: 'distance_type',
                value: 'arc'
            }, {
                name: 'optimize_bbox',
                value: 'none'
            }, {
                name: '_name',
                value: 'place'
            }, {
                name: 'ignore_malformed',
                value: 'true'
            }];
        var format = query.setFormat();
        expect(format).toEqual(expectedFormatWithOption);
    });
});
describe("xhr test (geo_distance)", function () {
    var returnedJSON = {};
    var status = 0;
    beforeEach(function (done) {
        var query = new geodistance_query_1.GeoDistanceQuery();
        query.queryName = 'geo_distance';
        query.fieldName = 'place';
        query.inputs = {
            lat: {
                value: '10'
            },
            lon: {
                value: '10'
            },
            distance: {
                value: '100km'
            }
        };
        var config = {
            url: 'https://scalr.api.appbase.io',
            appname: 'mirage_test',
            username: 'wvCmyBy3D',
            password: '7a7078e0-0204-4ccf-9715-c720f24754f2'
        };
        var url = 'https://scalr.api.appbase.io/mirage_test/geo/_search';
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
    it("Should have returned JSON and Should have atleast 1 record", function () {
        expect(returnedJSON).not.toEqual({});
        expect(returnedJSON).not.toBeUndefined();
        expect(status).toEqual(200);
        expect(returnedJSON.hits.hits.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=geodistance.query.spec.js.map