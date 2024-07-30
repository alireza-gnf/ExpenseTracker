import { Group } from "../models/Group.model";
import { GroupUser } from "../models/GroupUser.model";
import { User } from "../models/User.model";
import { AddMemberDto } from "../modules/dto/addMember.dto";
import { CreateGroupDto } from "../modules/dto/group.dto";
import { HttpError, NotFound } from "../modules/utilities/http-error";
import { GroupRepository } from "../repositories/Group.repo";
import { GroupUserService } from "./GroupUser.service";
import { UserService } from "./User.service";

export class GroupService {
  private groupRepo = new GroupRepository();

  create(
    dto: CreateGroupDto,
    userId: string,
    groupUserService: GroupUserService
  ): Group {
    const group = this.groupRepo.create({ ...dto, creatorId: userId });

    groupUserService.create({
      groupId: group.id,
      userId: group.creatorId,
    });

    return group;
  }

  findById(id: string): Group {
    const group = this.groupRepo.findBy(id, "id");
    if (!group) throw new NotFound();
    return group;
  }

  groupUsers(
    groupId: string,
    userService: UserService,
    groupUserService: GroupUserService
  ): Array<User> {
    return groupUserService
      .filterBy(groupId, "groupId")
      .reduce((users: Array<User>, groupUser: GroupUser) => {
        const user = userService.findById(groupUser.userId);
        if (user) users.push(user);
        return users;
      }, []);
  }

  addMember(
    dto: AddMemberDto,
    groupId: string,
    userService: UserService,
    groupUserService: GroupUserService
  ) {
    if (!userService.findById(dto.userId)) {
      throw new NotFound("User not found");
    }

    if (
      this.groupUsers(groupId, userService, groupUserService).find(
        (user) => user.id === dto.userId
      )
    ) {
      throw new HttpError(400, "User is already a member of this group");
    }

    groupUserService.create({ ...dto, groupId });
  }
}
