import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("editor")
  .createOwn("post")
  .readOwn("post", ["*", "!body"])
  .grant("admin")
  .readAny("users")
  .extend("editor")
  .readAny("post")
  .createAny("post")
  .updateAny("post");

export default ac;
