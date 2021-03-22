import { AuthTypes } from '@hti/common';
import jwt from 'jsonwebtoken';

export interface loginPayload {
  token: string;
  refreshToken: string;
}

export interface refreshTokenPayload {
  id: string;
  email: string;
}

class Auth {
  public static login(user: any, guard: AuthTypes): loginPayload {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        guard,
        country: {
          id: user.country.id,
          name: user.country.name,
          timezone: user.country.timezone,
        },
      },
      process.env.APP_KEY!,
      {
        expiresIn: process.env.TOKEN_EXPIRE_PERIOD!,
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.APP_KEY!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_PERIOD!,
      }
    );

    return { token, refreshToken };
  }
}

export { Auth };
