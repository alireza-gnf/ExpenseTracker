import { GroupUser } from "../models/GroupUser.model";
import {
  CreateGroupUser,
  GroupUserRepository,
} from "../repositories/GroupUser.repo";

export class GroupUserService {
  private groupUserRepo = new GroupUserRepository();

  create(dto: CreateGroupUser): void {
    this.groupUserRepo.create(dto);
  }

  public filterBy<K extends keyof GroupUser>(
    value: GroupUser[K],
    key: K
  ): Array<GroupUser> {
    return this.groupUserRepo.filterBy(value, key);
  }
}
