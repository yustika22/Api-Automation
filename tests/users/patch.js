import Ajv from "ajv";
import format from "ajv-formats";
import axios from "axios";
import { expect } from "chai";

describe("Patch User (https://reqres.in/api/users)", () => {
  it("Seharusnya bisa update data pada id 2", async () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        job: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: ["name", "job", "updatedAt"],
      additionalProperties: false,
    };

    const response = await axios.patch("https://reqres.in/api/users/2", {
      name: "shafira",
      job: "QA",
    });

    const ajv = new Ajv();
    format(ajv);
    const validasi = ajv.compile(schema);
    const isValid = validasi(response.data);

    expect(response.status).to.equal(200);

    expect(isValid).to.equal(true);

    expect(response.data.name).to.equal("shafira");
    expect(response.data.job).to.equal("QA");
    expect(response.data.updatedAt).to.not.be.empty;
  });
});
