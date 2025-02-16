import Ajv from "ajv";
import axios from "axios";
import { expect } from "chai";

describe("Get User (https://reqres.in/api/users)", () => {
  it("Seharusnya ini mengembalikan data pada resource user dihalaman ke 2", async () => {
    const schema = {
      type: "object",
      properties: {
        page: { type: "integer" },
        per_page: { type: "integer" },
        total: { type: "integer" },
        total_pages: { type: "integer" },
        data: { type: "array" },
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            avatar: { type: "string" },
          },
          required: ["id", "email", "first_name", "last_name", "avatar"],
          additionalProperties: false,
        },
        support: {
          type: "object",
          properties: {
            url: { type: "string" },
            text: { type: "string" },
          },
          required: ["url", "text"],
          additionalProperties: false,
        },
      },
      required: ["page", "per_page", "total", "total_pages", "data", "support"],
      additionalProperties: false,
    };
    const response = await axios.get("https://reqres.in/api/users?page=2");
    const ajv = new Ajv();
    const validasi = ajv.compile(schema);
    const isValid = validasi(response.data);

    expect(response.status).to.equal(200);

    expect(isValid).to.equal(true);

    expect(response.data).to.not.be.empty;
  });

  it("Seharusnya mengembalikan data id 2 pada resource user", async () => {
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            avatar: { type: "string" },
          },
        },
        support: {
          type: "object",
          properties: {
            url: { type: "string" },
            text: { type: "string" },
          },
          required: ["url", "text"],
          additionalProperties: false,
        },
      },
      required: ["data", "support"],
      additionalProperties: false,
    };

    const response = await axios.get("https://reqres.in/api/users/2");
    const ajv = new Ajv();
    const validasi = ajv.compile(schema);
    const isValid = validasi(response.data);

    expect(response.status).to.equal(200);

    expect(isValid).to.equal(true);

    expect(response.data.data.id).to.equal(2);
    expect(response.data.data.email).to.equal("janet.weaver@reqres.in");
    expect(response.data.data.first_name).to.equal("Janet");
    expect(response.data.data.last_name).to.equal("Weaver");
    expect(response.data.data.avatar).to.equal(
      "https://reqres.in/img/faces/2-image.jpg"
    );
  });

  it("Seharusnya tidak ada data", async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users/23");
    } catch (error) {
      const schema = {};
      const ajv = new Ajv();
      const validasi = ajv.compile(schema);
      const isValid = validasi(error.response.data);

      expect(error.response.status).to.equal(404);

      expect(isValid).to.equal(true);
    }
  });
});
