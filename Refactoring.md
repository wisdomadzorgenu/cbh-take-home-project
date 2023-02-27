# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- The candidate variable is being assigned to TRIVIAL_PARTITION_KEY in a nested if/else statement if no event is avaiable. The nested if statement can be removed to improve the clarity of the code. It is much simpler to return the default partition key at the very top as on line 10 to eliminate any nested if statements

- The candidate can be assigned the event partition key or stringified when input is not string. In the previous implementation, these two behaviours were in separate if statements which makes it difficult to understand the code because there are so many if statments. To keep it simple, we move both implementation to once place and use a ternary operator to assign the right value to candidate is on line 14.

- Assigning the candidate variable to the hash canditate string if lenght exceeds 256 is redundant. We could just return the result immediately since it isn't used anywhere else as on line 23.

- To follow separation of concerns, a new utility function was created to determine if a variable is a string.

- Enough unit tests were written to cover the core behaviour of the function.
