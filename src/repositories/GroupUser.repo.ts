import { GroupUser } from "../models/GroupUser.model";

export interface CreateGroupUser {
  userId: string;
  groupId: string;
}

export class GroupUserRepository {
  private groupUsers: Array<GroupUser> = [];

  public create(groupUser: GroupUser): GroupUser {
    this.groupUsers.push(groupUser);
    return groupUser;
  }

  public findBy<K extends keyof GroupUser>(
    value: GroupUser[K],
    key: K
  ): GroupUser | undefined {
    return this.groupUsers.find((gu) => gu[key] === value);
  }

  public filterBy<K extends keyof GroupUser>(
    value: GroupUser[K],
    key: K
  ): Array<GroupUser> {
    return this.groupUsers.filter((gu) => gu[key] === value);
  }
}
