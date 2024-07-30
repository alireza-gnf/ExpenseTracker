// import { create, prepareModel } from "../../../../src/models/Base.model";
// import {
//   friends,
//   groups,
//   otherFriends,
// } from "../../../../src/models/Group.model";
// import { groupUsersPivot } from "../../../../src/models/GroupUser.model";
// import {
//   chandler,
//   User,
//   userGroups,
//   users,
// } from "../../../../src/models/User.model";

// const grouplessUser = create(
//   prepareModel<User>({ username: "grouplessUser" }, "user"),
//   users
// );

// describe("Get User Groups", () => {
//   it("Should return empty array for user that does not have a group", async () => {
//     expect(userGroups(grouplessUser.id, groupUsersPivot, groups)).toEqual([]);
//   });

//   it("Should return array of groups", async () => {
//     expect(userGroups(chandler.id, groupUsersPivot, groups)).toStrictEqual([
//       friends,
//       otherFriends,
//     ]);
//   });
// });
