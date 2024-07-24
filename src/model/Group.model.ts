import { chandler, UserId } from "./User.model";

export type GroupId = {
  value: string;
  type: "group";
};
export interface Group {
  id: GroupId;
  title: string;
  creatorId: UserId;
}

export const groups: Array<Group> = [
  {
    id: {
      value: "d99522b6-e2aa-49f4-ab2a-e44a3644acab",
      type: "group",
    },
    title: "Friends",
    creatorId: chandler.id,
  },
  {
    id: {
      value: "c218c60c-b076-4199-924d-6676524e9b8c",
      type: "group",
    },
    title: "Other Friends",
    creatorId: chandler.id,
  },
];

export const friends = groups[0];
export const otherFriends = groups[1];
