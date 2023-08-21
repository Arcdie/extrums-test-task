import faker from 'faker';

export const getFakeFirstName = () => faker.name.firstName();
export const getFakeLastName = () => faker.name.lastName();

export const getFakeFullName = () => `${getFakeFirstName()} ${getFakeLastName()}`;
