import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

//DONE: VD: http://localhost:5050/api/v1/users
userRouter.get('/', getAllUsers);

//DONE. VD: http://localhost:5050/api/v1/users/67de517b931c2c83b26f1eca
/*
  note: khi test trong postman, get user api. Nó sẽ bị Unauthorized. Vì chưa có token.
  để fix, hãy sang auth => Auth Type => chọn Bearer Token => paste token vào.
*/
userRouter.get('/:id', authorize, getUser); // :id sẽ lấy được id từ req.params.id.

userRouter.post('/', (req, res) => {
  res.send({ title: "CREATE a new user" });
});

userRouter.put('/:id', (req, res) => {
  res.send({ title: "UPDATE user" });
});

userRouter.delete('/:id', (req, res) => {
  res.send({ title: "DELETE an user" });
});

export default userRouter;