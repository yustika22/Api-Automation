import Ajv from "ajv";
import axios from "axios";
import { expect } from "chai";

describe("Delete User (https://reqres.in/api/users)", () => {
  it("Seharusnya bisa menghapus data id 2 pada resource user", async () => {
    const schema = {};

    const response = await axios.delete("https://reqres.in/api/users/2");
    const ajv = new Ajv();
    const validasi = ajv.compile(schema);
    const isValid = validasi(response.data);

    expect(response.status).to.equal(204);
    expect(isValid).to.equal(true);
  });
});
