import { HttpError } from "../../../../src/modules/utilities/http-error";
import { UserService } from "../../../../src/services/User.service";

const service = new UserService();
describe("Create User", () => {
  const tempUser = service.create({
    username: "tempUser",
    password: "Strong123",
  });

  it("Should throw username already exists", async () => {
    expect(() =>
      service.create({
        username: "tempUser",
        password: "Strong123",
      })
    ).toThrow(HttpError);
  });

  it("Should find user by id", async () => {
    expect(service.findById(tempUser.id)).toStrictEqual(tempUser);
  });
});
