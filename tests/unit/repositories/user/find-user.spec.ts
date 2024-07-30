import { UserRepository } from "../../../../src/repositories/User.repo";

describe("Find User by different keys", () => {
  const repo = new UserRepository();
  const tempUser = repo.create({
    username: "tempUser",
    password: "Strong123",
  });

  it("Should find by username", async () => {
    expect(repo.findBy(tempUser.username, "username")).toStrictEqual(tempUser);
  });

  it("Should find by id", async () => {
    expect(repo.findBy(tempUser.id, "id")).toStrictEqual(tempUser);
  });
});
