// ESM
// import {faker} from '@faker-js/faker';

// CJS
const {faker} = require('@faker-js/faker');

// index.js
module.exports = () => {
    const data = {patients: []}
    // Create 1000 users
    for (let i = 0; i < 1000; i++) {
        let sex = faker.person.sex();
        data.patients.push(
            {
                id: i,
                firstName: faker.person.firstName(sex),
                lastName: faker.person.lastName(sex),
                sex: sex,
                age: faker.number.int({min: 0, max: 100}),
            })
    }
    return data
}
