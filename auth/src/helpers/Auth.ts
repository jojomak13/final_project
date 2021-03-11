import jwt from 'jsonwebtoken';

class Auth {
  public static async login(user: any) {
    console.log(process.env.TOKEN_EXPIRE_PERIOD);
    const token = await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        country: {
          id: user.country.id,
          name: user.country.name,
          timezone: user.country.timezone,
        },
      },
      process.env.APP_KEY!,
      {
        expiresIn: parseInt(process.env.TOKEN_EXPIRE_PERIOD!),
      }
    );

    return token;
  }
}

export { Auth };
