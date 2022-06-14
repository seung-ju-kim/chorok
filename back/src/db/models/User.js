import { UserModel } from "../schemas/user";

const User = {
  create: async ({ newUser }) => {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  },

  findByEmail: async ({ email }) => {
    const user = await UserModel.findOne({ email });
    return user;
  },

  findById: async ({ user_id }) => {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  },

  findAll: async () => {
    const users = await UserModel.find({});
    return users;
  },

  update: async ({ user_id, fieldToUpdate, newValue }) => {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  },

  // id를 통해 해당 사용자를 탈퇴시킴
  deleteById: async ({ user_id }) => {
    await UserModel.deleteOne({ id: user_id });
    return;
  },
};

export { User };
