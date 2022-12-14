let users = [
    {
        "name": "Test User",
        "email": "test@test.com",
        "password": "",
        "phone": "",
        "short_name": "TU",
        "color": "hsl(200, 240, 120)"
    },

    {
        "name": "User Test",
        "email": "user@test.de",
        "password": "",
        "phone": "",
        "short_name": "UT",
        "color": "hsl(120, 240, 120)"
    },

    {
        "name": "Joe May",
        "email": "joe.m@test.de",
        "password": "",
        "phone": "",
        "short_name": "JM",
        "color": "hsl(80, 240, 120)"
    }
];

let tasks = [
    [
        {
            "title": "Task A",
            "desc": "Do this and that",
            "cat": "Design",
            "date": "13.01.2023",
            "prio": 0,
            "subtasks": [
                {
                    "title": "Subtask A",
                    "status": false
                },
                {
                    "title": "Subtask B",
                    "status": true
                }
            ],
            "assignees": ['joe.m@test.de', 'test@test.com'] // mail-address
        }
    ],
    [],
    [],
    []
];

let categories = [
    {
        "name": "Sales",
        "color": "lightpink"
    },

    {
        "name": "Marketing",
        "color": "blue"
    },

    {
        "name": "Design",
        "color": "turquoise"
    },

    {
        "name": "Developement",
        "color": "red"
    }
];

let prio = [
    {
        "name": "Urgent",
        "color": "#FF3D00",
        "sign": "./assets/img/urgent-white.svg"
    },
    {
        "name": "Medium",
        "color": "#FFA800",
        "sign": "./assets/img/medium-white.svg"
    },
    {
        "name": "Low",
        "color": "#7AE229",
        "sign": "./assets/img/low-white.svg"
    }
];
