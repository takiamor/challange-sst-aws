export default {
    "scalars": [
        1,
        2,
        5
    ],
    "types": {
        "Job": {
            "jobID": [
                1
            ],
            "nom": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Mutation": {
            "createJob": [
                0,
                {
                    "nom": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "job": [
                0,
                {
                    "jobID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "jobs": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}