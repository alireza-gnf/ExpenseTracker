import { findOrFail } from "../../../../src/model/Base.model";
import { groups } from "../../../../src/model/Group.model";
import { NotFound } from "../../../../src/modules/utilities/http-error";
import { tempGroup } from "../../../utility/temps";

describe("Find group by id", () => {
  it("Should throw 404 if group doesn't exist", () => {
    expect(() => findOrFail("someId", groups)).toThrow(NotFound);
  });
  it("Should return group", async () => {
    expect(findOrFail(tempGroup.id.value, groups)).toStrictEqual(tempGroup);
  });
});
