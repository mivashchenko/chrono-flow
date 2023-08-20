const list1 = [
    {
        'firstName': 'a',
        'lastName': 'd',
        'count': 11
    },
    {
        'firstName': 'b',
        'lastName': 's',
        'count': 7
    },
    {
        'firstName': 'd',
        'lastName': 'z',
        'count': 11
    },
    {
        'firstName': 'c',
        'lastName': 'r',
        'count': 1
    }
]

const list2 = [
    {
        'firstName': 'a',
        'lastName': 'd',
        'count': 1
    },
    {
        'firstName': 'b',
        'lastName': 's',
        'count': 7
    },
    {
        'firstName': 'a',
        'lastName': 'z',
        'count': 9
    },
    {
        'firstName': 'c',
        'lastName': 'r',
        'count': 1
    }
]

const sortList = (list1, list2) => {
    const result = {};
    const arrayResult = [];
    for (let i = 0; i < list1.length; i++) {

        if (result[list1[i].firstName]) {
            result[list1[i].firstName] = result[list1[i].firstName] + list1[i].count;
        } else {
            result[list1[i].firstName] = list1[i].count;

        }
    }
    for (let i = 0; i < list2.length; i++) {
        if (result[list2[i].firstName]) {
            result[list2[i].firstName] = result[list2[i].firstName] + list2[i].count;
        } else {
            result[list2[i].firstName] = list2[i].count;

        }
    }

    for (let key in result) {
        arrayResult.push({
            firstName: key,
            count: result[key],
        })
    }
    return arrayResult;
}

console.log(sortList(list1, list2));
