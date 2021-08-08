import { v4 } from "uuid";
const assignId = (req, res, next) => {
  req.id = v4();
  next();
};
export default assignId;
