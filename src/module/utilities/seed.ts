import { v4 } from "uuid";
import { AppDataSource } from "../../data-source";
import { UserEntity } from "../../entity/user.entity";
import { GroupEntity } from "../../entity/group.entity";
import { DataSource } from "typeorm";

export const seed = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(UserEntity);
  const chandler = {
    id: v4(),
    username: "chandler",
    password: "Chandler123",
  };
  const joey = {
    id: v4(),
    username: "joey",
    password: "Joey1234",
  };
  const monicha = {
    id: v4(),
    username: "monicha",
    password: "Monicha123",
  };
  const ross = {
    id: v4(),
    username: "ross",
    password: "Ross1234",
  };
  const phoebe = {
    id: v4(),
    username: "phoebe",
    password: "Phoebe123",
  };
  const rachel = {
    id: v4(),
    username: "rachel",
    password: "Rachel123",
  };

  await userRepo.save([chandler, joey, monicha, ross, phoebe, rachel]);

  const groupRepo = AppDataSource.getRepository(GroupEntity);
  await groupRepo.save({
    id: v4(),
    title: "Friends",
    creator: chandler,
    users: [chandler, joey, ross],
  });

  await groupRepo.save({
    id: v4(),
    title: "Other Friends",
    creator: chandler,
    users: [chandler, monicha, phoebe, rachel],
  });
};
