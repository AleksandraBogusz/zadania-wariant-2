const assert = require('assert');
const { task1, task2, task3, task4 } = require('../index.js');


describe('task1', function () {
    const users = [
        { "id": 1, "username": "Bret", },
        { "id": 2, "username": "Antonette", },
        { "id": 5, "username": "Kamren", },
    ];

    const groupedPosts = {
        "1": [ { "userId": 1, "title": "title1", }, { "userId": 1, "title": "title2", } ],
        "2": [ { "userId": 2, "title": "title3", }, { "userId": 2, "title": "title4", }, ]
    }

    const expected = [
        {
            "id": 1,
            "username": "Bret",
            "posts": [ { "userId": 1, "title": "title1", }, { "userId": 1, "title": "title2", } ]
        },
        {
            "id": 2,
            "username": "Antonette",
            "posts": [ { "userId": 2, "title": "title3", }, { "userId": 2, "title": "title4", }, ]
        },
        {
            "id": 5,
            "username": "Kamren",
        },
    ];

    it('Users should be joined with posts', function () {
        assert.deepEqual(task1(users, groupedPosts), expected);
    });
});

describe('task2', function() {

    const input = [
        { "username": "Bret", "posts": [{},{}] },
        { "username": "Antonette", "posts": [{},{},{},{}] },
    ];

    const expected = [ "Bret napisał 2 postów.", "Antonette napisał 4 postów.", ]
    it ('Should count number of posts per user', function() {
        assert.deepEqual(task2(input), expected);
    });
});

describe('task3', function() {

    const input = { "title1": [{}], "title2": [{}, {}], "title3": undefined, "title4": [], "title5": [{}, {}, {}], }

    const expected = [ "title2", "title5"];
    it ('Should return non-unique post tiltes.', function() {
        assert.deepEqual(task3(input), expected);
    });
});

describe('task4', function() {
    const points = [
        { id: 1, x: 0, y: 0 },
        { id: 2, x: -1, y: -1 },
        { id: 3, x: 2, y: 2 },
        { id: 4, x: 3, y: 3 }
    ]

    const expected = [
        { point: { id: 1, x: 0, y: 0 }, nearestPoint: { id: 2, x: -1, y: -1 }, distance: 1.4142135623730951 },
        { point: { id: 2, x: -1, y: -1 }, nearestPoint: { id: 1, x: 0, y: 0 }, distance: 1.4142135623730951 },
        { point: { id: 3, x: 2, y: 2 }, nearestPoint: { id: 4, x: 3, y: 3 }, distance: 1.4142135623730951 },
        { point: { id: 4, x: 3, y: 3 }, nearestPoint: { id: 3, x: 2, y: 2 }, distance: 1.4142135623730951 },
    ]
    it ('Should return nearest neighbour for each point in the list.', function() {
        assert.deepEqual(task4(points), expected);
    });
})