import { Group } from "../model/group.model";
import { User } from "../model/user.model";
import { CreateGroupDto } from "../module/dto/group.dto";
import { HttpError, NotFound } from "../module/utilities/http-error";
import { IGroupRepository } from "../repository/Repository.interface";
import { UserService } from "./user.service";

export class GroupService {
  constructor(private repo: IGroupRepository) {}

  async create(dto: CreateGroupDto, user: User): Promise<Group> {
    const group = await this.repo.create({ ...dto, creatorId: user.id }, user);

    return group;
  }

  async findById(id: string): Promise<Group> {
    const group = await this.repo.findById(id);

    if (group) return group;

    throw new NotFound();
  }

  async addMember(userId: string, groupId: string, userService: UserService) {
    const group = await this.repo.groupWithRelations(groupId, ["users"]);
    console.log(group);

    if (!group) throw new NotFound("Group not found");

    const user = await userService.findById(userId);
    if (!user) {
      throw new NotFound("User not found");
    }

    if (group.users.find((user) => user.id === userId))
      throw new HttpError(400, "User is already a member of this group");

    return await this.repo.addMember(group, user);
  }
}
