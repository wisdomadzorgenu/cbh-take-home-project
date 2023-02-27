const crypto = require("crypto");

const isString = (input) => typeof input === "string";

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) return TRIVIAL_PARTITION_KEY;

  if (event.partitionKey) {
    const { partitionKey } = event;
    candidate = isString(partitionKey)
      ? partitionKey
      : JSON.stringify(partitionKey);
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
