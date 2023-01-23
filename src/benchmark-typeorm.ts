import { faker } from "@faker-js/faker";
import { userGroups } from "./userGroups";
import { Repository } from "typeorm";
import { UserModel } from "./user.model";
import { AppDataSource } from "./data-source";

const createManyUsers = async (count: number) => {
    const fakeUsers = Array.from({ length: count }, () => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        group: userGroups[Math.floor(Math.random() * userGroups.length)]
    }));

    console.time(`Create(many) ${count} users - TYPEORM`);
    await userRepository.save(fakeUsers);
    console.timeEnd(`Create(many) ${count} users - TYPEORM`);
}

const findUsers = async () => {
    console.time('Find users - TYPEORM');
    await userRepository.find();
    console.timeEnd('Find users - TYPEORM');
}

const findByGroup = async (group: string) => {
    console.time('Find users by group - TYPEORM');
    await userRepository.find({
        where: {
            group: group,
        },
    });
    console.timeEnd('Find users by group - TYPEORM');
}

const createUsersIntensive = async (count: number) => {
    const fakeUsers = Array.from({ length: count }, () => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        group: userGroups[Math.floor(Math.random() * userGroups.length)],
        userAddresses: [
            {
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
                country: faker.address.country(),
            }
        ]
    }));

    console.time(`Create users intensive - TYPEORM`);
    await userRepository.save(fakeUsers);
    console.timeEnd(`Create users intensive - TYPEORM`);
}

let userRepository: Repository<UserModel>;
AppDataSource.initialize()
    .then(async () => {
        userRepository = AppDataSource.getRepository(UserModel);

        await createManyUsers(Number(process.argv[2]) || 1000);
        await createUsersIntensive(Number(process.argv[3]) || Number(process.argv[2]) || 1000);
        await findUsers();
        await findByGroup("guest");
    })
    .catch((e) => console.log(e));
