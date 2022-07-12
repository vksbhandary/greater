const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "Contract chala nhi");
  });

  describe("greet()", () => {
    it("returns '' (empty string)", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "Greeted with empty string!!");
    });
  });
});

contract("setGreeting() update greeting", (accounts) => {
  describe("setGreeting(string)", async () => {
    it("sets greeting to passed on string", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "New message";
      await greeter.setGreeting(expected, { from: accounts[0] });
      const actual = await greeter.greet();
      assert.equal(
        actual,
        expected,
        "Greeting was not updated to 'New message'"
      );
    });
  });

  describe("owner()", () => {
    it("returns current owner's address", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      assert(owner, "the current owner");
    });

    it("matches the address that originally deployed contracts", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      const exprected = accounts[0];
      assert.equal(owner, exprected, "matches address used to deploy contract");
    });
  });

  describe("message is sent by another account", async () => {
    it("doesnt set the greeting", async () => {
      const greeter = await GreeterContract.deployed();
      const exprected = await greeter.greet();
      try {
        await greeter.setGreeting("abc", { from: accounts[1] });
      } catch (e) {
        assert.equal(
          e.reason,
          "Caller is not owner",
          "greeting should not update"
        );
        return;
      }
      assert(false, "greeting should not update");
    });
  });
});
