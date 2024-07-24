import { GroupId } from "./Group.model";
import { chandler, UserId } from "./User.model";

export type GroupUserId = {
  value: string;
  type: "groupUser";
};
export type GroupUser = {
  id: GroupUserId;
  userId: UserId;
  groupId: GroupId;
};

export const groupUsersPivot: Array<GroupUser> = [
  {
    id: {
      value: "2ef80bb8-d72d-4ec0-a8c0-c4dc010f30f2",
      type: "groupUser",
    },
    userId: chandler.id,
    groupId: {
      value: "d99522b6-e2aa-49f4-ab2a-e44a3644acab",
      type: "group",
    },
  },
  {
    id: {
      value: "e6cfa68c-bac9-46e1-bfe1-7f3242907408",
      type: "groupUser",
    },
    userId: {
      value: "28b5d3b6-004d-4b0f-b9e0-8c1015b54ae1",
      type: "user",
    },
    groupId: {
      value: "d99522b6-e2aa-49f4-ab2a-e44a3644acab",
      type: "group",
    },
  },
  {
    id: {
      value: "514720f7-eb1c-4847-a866-efa89bc51383",
      type: "groupUser",
    },
    userId: {
      value: "f827051e-1fbf-4b35-ad44-76740487fdba",
      type: "user",
    },
    groupId: {
      value: "d99522b6-e2aa-49f4-ab2a-e44a3644acab",
      type: "group",
    },
  },
  {
    id: {
      value: "08685ca1-404a-4cfb-9afc-25ec239d5682",
      type: "groupUser",
    },
    userId: chandler.id,
    groupId: {
      value: "c218c60c-b076-4199-924d-6676524e9b8c",
      type: "group",
    },
  },
  {
    id: {
      value: "b746b9a5-1184-445f-b819-193d8390bc51",
      type: "groupUser",
    },
    userId: {
      value: "add611e9-c03d-4ebc-ab8e-7e9f12f8ca7e",
      type: "user",
    },
    groupId: {
      value: "c218c60c-b076-4199-924d-6676524e9b8c",
      type: "group",
    },
  },
  {
    id: {
      value: "d241cdd1-894c-437c-92c4-bcad930a64bf",
      type: "groupUser",
    },
    userId: {
      value: "120083f3-11bc-459d-bd12-0f77f8875499",
      type: "user",
    },
    groupId: {
      value: "c218c60c-b076-4199-924d-6676524e9b8c",
      type: "group",
    },
  },
  {
    id: {
      value: "5c9159b7-14f1-4ca1-8d50-671a315fc4b8",
      type: "groupUser",
    },
    userId: {
      value: "7bcd75bb-bf12-42d3-95df-887849b67817",
      type: "user",
    },
    groupId: {
      value: "c218c60c-b076-4199-924d-6676524e9b8c",
      type: "group",
    },
  },
];
