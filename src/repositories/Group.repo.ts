import { v4 } from "uuid";
import { Group } from "../models/Group.model";

export interface CreateGroup {
  title: string;
  creatorId: string;
}

export class GroupRepository {
  private groups: Array<Group> = [];

  private generateId(): string {
    return v4();
  }

  public create(group: CreateGroup): Group {
    const newGroup = { ...group, id: this.generateId() };
    this.groups.push(newGroup);
    return newGroup;
  }

  public findBy<K extends keyof Group>(
    value: Group[K],
    key: K
  ): Group | undefined {
    return this.groups.find((group) => group[key] === value);
  }
}
