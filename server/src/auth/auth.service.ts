import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import * as bcrypt from 'bcrypt';
import generateTokens from '../../utils/generateTokens';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}

  async signUp(req, res) {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password)
      return res.status(401).send({ message: 'Fill all fields' });

    const [user, created] = await this.UserModel.findOrCreate({
      where: { email },
      defaults: { username, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      console.log(123);

      return res.status(403).json({ message: 'User already exists' });
    }

    const plainUser = user.get();
    delete plainUser.password;

    console.log(plainUser);

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    return { accessToken, refreshToken, plainUser };
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({ message: 'All fields must be present' });

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ message: 'Incorrect password' });

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    return { accessToken, refreshToken, plainUser };
  }

}
