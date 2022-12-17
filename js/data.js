let users = [
    {
        "name": "Test User",
        "email": "test@test.com",
        "password": "",
        "phone": "",
        "short_name": "TU",
        "color": "HSL(300, 100%, 50%)"
    },

    {
        "name": "User Test",
        "email": "user@test.de",
        "password": "",
        "phone": "",
        "short_name": "UT",
        "color": "HSL(120, 100%, 50%)"
    },

    {
        "name": "Joe May",
        "email": "joe.m@test.de",
        "password": "",
        "phone": "",
        "short_name": "JM",
        "color": "HSL(180, 100%, 50%)"
    },

    {
        "name": "Maria Mutschler",
        "email": "mamu@test.de",
        "password": "",
        "phone": "",
        "short_name": "MM",
        "color": "HSL(36, 100%, 50%)"
    }
];

let tasks = [
    [ // To-Do
        {
            "title": "Task A",
            "desc": "Do some stuff",
            "cat": "Design",
            "date": "2023-02-15",
            "prio": 2,
            "subtasks": [
                {
                    "title": "Subtask A",
                    "status": false
                },
                {
                    "title": "Subtask B",
                    "status": true
                },
            ],
            "assignees": ['joe.m@test.de', 'test@test.com', 'user@test.de', 'mamu@test.de'] // mail-address
        }
    ],
    [ // In Progress
        {
            "title": "Task B",
            "desc": "Do this and that",
            "cat": "Sales",
            "date": "2023-01-13",
            "prio": 2,
            "subtasks": [
                {
                    "title": "Subtask A",
                    "status": false
                },
                {
                    "title": "Subtask B",
                    "status": true
                },
                {
                    "title": "Subtask C",
                    "status": true
                }
            ],
            "assignees": ['user@test.de', 'test@test.com'] // mail-address
        },
        {
            "title": "Task E",
            "desc": "Improve the code",
            "cat": "Developement",
            "date": "2023-03-13",
            "prio": 0,
            "subtasks": [
                {
                    "title": "Subtask A",
                    "status": false
                },
                {
                    "title": "Subtask B",
                    "status": false
                }
            ],
            "assignees": ['user@test.de', 'test@test.com'] // mail-address
        }
    ],
    [ // Awaiting Feedback
        {
            "title": "Task C",
            "desc": "Do more stuff",
            "cat": "Marketing",
            "date": "2023-01-22",
            "prio": 2,
            "subtasks": [
                
            ],
            "assignees": ['joe.m@test.de'] // mail-address
        }
    ],
    [ // Done
        {
            "title": "Task D",
            "desc": "Sell some stuff",
            "cat": "Sales",
            "date": "2023-03-14",
            "prio": 2,
            "subtasks": [
                {
                    "title": "Subtask A",
                    "status": false
                },
                {
                    "title": "Subtask B",
                    "status": true
                },
                {
                    "title": "Subtask C",
                    "status": true
                }
            ],
            "assignees": ['joe.m@test.de', 'user@test.de'] // mail-address
        }
    ]
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

const prio = [
    {
        "name": "Low",
        "color": "#7AE229",
        "sign-white": "./assets/img/low-white.svg",
        "sign-color": "./assets/img/low.svg"
    },
    {
        "name": "Medium",
        "color": "#FFA800",
        "sign-white": "./assets/img/medium-white.svg",
        "sign-color": "./assets/img/medium.svg"
    },
    {
        "name": "Urgent",
        "color": "#FF3D00",
        "sign-white": "./assets/img/urgent-white.svg",
        "sign-color": "./assets/img/urgent.svg"
    }
];

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];