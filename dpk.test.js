const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it.each([
    ["string", "123456"],
    ["number", 123456],
  ])(
    "returns stringified key when input event partition key has type %s and key with length less than 256",
    (_partitionKeyType, partitionKey) => {
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(`${partitionKey}`);
    }
  );

  it("returns a hash when no partition key is passed as input", () => {
    const event = "some_random_string";
    const trivialKey = deterministicPartitionKey(event);

    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).not.toBe(event);
  });

  it("returns a hash string which should not exceed 256 characters", () => {
    const longEventString = crypto
      .randomBytes(200)
      .toString("hex")
      .substring(0, 300);

    const trivialKey = deterministicPartitionKey(longEventString);

    expect(longEventString).toHaveLength(300);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeLessThanOrEqual(256);
  });
});
