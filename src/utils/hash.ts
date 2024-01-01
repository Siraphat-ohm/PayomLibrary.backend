import bcrypt from 'bcrypt';

const SALTS = 10;
export const hash = (password: string) => {
  return bcrypt.hashSync(password, SALTS);
};

export const compare = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};