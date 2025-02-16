import Ajv from "ajv";
import format from "ajv-formats";
import axios from "axios";
import { expect } from "chai";

describe("Post User (https://reqres.in/api/users)", () => {
  it("Seharusnya bisa menambahkan data pada resource user dengan request body yang valid", async () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        job: { type: "string" },
        id: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
      },
      required: ["name", "job", "id", "createdAt"],
      additionalProperties: false,
    };

    const response = await axios.post("https://reqres.in/api/users", {
      name: "Yustika",
      job: "cari pekerjaan QA",
    });
    const ajv = new Ajv();
    format(ajv);
    const validasi = ajv.compile(schema);
    const isValid = validasi(response.data);

    expect(response.status).to.equal(201);

    expect(isValid).to.equal(true);

    expect(response.data.name).to.equal("Yustika");
    expect(response.data.job).to.equal("cari pekerjaan QA");
    expect(response.data.id).to.not.be.empty;
    expect(response.data.createdAt).to.not.be.empty;
  });
});
