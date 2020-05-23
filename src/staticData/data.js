export default {
    'categories': [
        {
            title: 'C1',
            id: 'c1',
        },
        {
            title: 'C2',
            id: 'c2',
        },
        {
            title: 'C3',
            id: 'c3',
        },
        {
            title: 'C4',
            id: 'c4',
        },
        {
            title: 'C5',
            id: 'c5',
        }
    ],
    'categoriesRewardsRelation':
    [
        {
            id: 'r1',
            title: 'R1',
            description: 'Valid only for Redwood city',
            categories: ['c1', 'c3']
        },
        {
            id: 'r2',
            title: 'R2',
            description: 'Valid only for California',
            categories: ['c2', 'c3']
        },
        {
            id: 'r3',
            title: 'R3',
            description: 'Valid only for Employees',
            categories: ['c4']
        },
        {
            id: 'r4',
            title: 'R4',
            description: 'Valid only this month',
            categories: ['c5']
        },
        {
            id: 'r5',
            title: 'R5',
            description: 'Valid only this month',
            categories: ['c5']
        }
    ]
}