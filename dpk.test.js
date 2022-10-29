const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

function hash(input) {
  if (typeof input === "string")
    return crypto.createHash("sha3-512").update(input).digest("hex");
  return crypto
    .createHash("sha3-512")
    .update(JSON.stringify(input))
    .digest("hex");
}

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the original partition key when given an object with 'partitionKey' as string and < 256 character", () => {
    const key = "Some string as key with length less than 256";
    const trivialKey = deterministicPartitionKey({
      partitionKey: key,
    });
    expect(trivialKey).toBe(key);
  });

  it("Returns the hash of the original partition key when given an object with 'partitionKey' as string and >= 256 character", () => {
    const key =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis elit tellus, ut scelerisque lacus tempus a. Pellentesque quis cursus dui, non elementum nibh. Maecenas maximus nisl in massa ullamcorper molestie vestibulum nec felis. Donec fringilla fusce.";
    const trivialKey = deterministicPartitionKey({
      partitionKey: key,
    });
    expect(trivialKey).toBe(hash(key));
  });

  it("Returns the hash of the entire input when the given input is not an object, or it does not have a key named 'partitionKey'", () => {
    const emptyObject = {};
    expect(deterministicPartitionKey(emptyObject)).toBe(hash(emptyObject));

    const someObject = { someKey: "random text" };
    expect(deterministicPartitionKey(someObject)).toBe(hash(someObject));

    const notAnObject = 100;
    expect(deterministicPartitionKey(notAnObject)).toBe(hash(notAnObject));
  });

  it("Returns the JSON string of 'partitionKey' if the input object has this key and it is not an string, and the json string has length < 256", () => {
    const input = {
      partitionKey: {
        key: "abc",
        value: "random value string",
      },
    };

    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(JSON.stringify(input.partitionKey));
  });

  it("Returns the hash of the JSON string of 'partitionKey' if the input object has this key and it is not an string, and the json string has length >= 256", () => {
    const input = {
      partitionKey: {
        key: "abc",
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis elit tellus, ut scelerisque lacus tempus a. Pellentesque quis cursus dui, non elementum nibh. Maecenas maximus nisl in massa ullamcorper molestie vestibulum nec felis. Donec fringilla fusce.",
      },
    };

    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(hash(input.partitionKey));
  });

  it("Returns the literal '0' when given input is falsy", () => {
    expect(deterministicPartitionKey(0)).toBe("0");
    expect(deterministicPartitionKey(false)).toBe("0");
    expect(deterministicPartitionKey(null)).toBe("0");
    expect(deterministicPartitionKey("")).toBe("0");
  });

  it("Returns hash of entire object if given object has partitionKey field with falsy value", () => {
    const input = {
      partitionKey: false,
    };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(hash(input));
  });
});
