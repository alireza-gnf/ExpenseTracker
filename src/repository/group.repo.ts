import { v4 } from "uuid";
import {
  CreateGroup,
  Group,
  GroupRelations,
  GroupWithRelation,
} from "../model/group.model";
import { IGroupRepository } from "./Repository.interface";
import { DataSource, Repository } from "typeorm";
import { GroupEntity } from "../entity/group.entity";
import { User } from "../model/user.model";

// export class GroupArrayRepository implements IGroupRepository {
//   findById<R extends Array<keyof GroupRelations>>(
//     id: string,
//     relations: R
//   ): Promise<Group | GroupWithRelation<R> | null> {
//     throw new Error("Method not implemented.");
//   }
//   private groups: Array<Group> = [];

//   private generateId(): string {
//     return v4();
//   }

//   async create(group: CreateGroup): Promise<Group> {
//     const newGroup = { ...group, id: this.generateId() };
//     this.groups.push(newGroup);
//     return newGroup;
//   }

// async findById<R extends Array<keyof GroupRelations>>(
//   id: string,
//   relations?: R
// ): Promise<Group | GroupWithRelation<R> | null> {
//   const group = this.groups.find((group) => group.id === id);

//   if (!group) return null;

//   if (relations) {
//     const groupWithRelation = group as GroupWithRelation<>;
//   }

//   return group;
// }

// async users(group: Group): GroupWithRelation<["users"]> {
//   return this.
// }
// }

export class GroupOrmRepository implements IGroupRepository {
  private repo: Repository<GroupEntity>;
  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(GroupEntity);
  }

  async create(group: CreateGroup, user: User): Promise<Group> {
    return await this.repo.save({ ...group, id: v4(), users: [user] });
  }

  async findById(id: string): Promise<Group | null> {
    return await this.repo.findOneBy({ id });
  }

  async groupWithRelations<R extends Array<keyof GroupRelations>>(
    id: string,
    selectRelations: R
  ): Promise<GroupWithRelation<R> | null> {
    return await this.repo.findOne({
      where: { id },
      relations: selectRelations.reduce(
        (
          prev: { [k in (keyof GroupRelations)[number]]: boolean },
          next: keyof GroupRelations
        ) => {
          prev[next] = true;
          return prev;
        },
        {}
      ),
    });
  }

  async addMember(
    group: Group,
    user: User
  ): Promise<GroupWithRelation<["users"]>> {
    return this.repo.save({ ...group, users: [user] });
  }
}
