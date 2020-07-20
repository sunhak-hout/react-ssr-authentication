import { UnauthorizedException } from '../libs/errors';
import { signToken, verifyToken } from '../libs/jwt';
import { Models } from '../middlewares/context';
import { compareSync, hashSync } from 'bcrypt';

export default class AuthService {
  constructor(private readonly models: Models) {}

  async getAuthUser(token: string) {
    const payload = verifyToken(token);
    if (!payload) return null;
    return this.models.User.findOne({ email: payload.email });
  }

  async login(data: LoginData) {
    const { email, password } = data;
    const user = await this.models.User.findOne({ email });
    if (!user || !compareSync(password, user.password))
      throw new UnauthorizedException('Incorrect credential');
    return signToken({ email });
  }

  async signup(data: SignupData) {
    const { firstName, lastName, email, password } = data;
    const user = await this.models.User.create({
      firstName,
      lastName,
      email,
      password: hashSync(password, 10),
    });
    return signToken({ email: user.email });
  }
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
