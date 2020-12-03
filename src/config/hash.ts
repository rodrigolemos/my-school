import { hash, compare } from 'bcrypt'

export const generateHash = async (param: string): Promise<string> => {
  return hash(param, 8)
}

export const compareHash = async (param: string, hashed: string): Promise<boolean> => {
  return compare(param, hashed)
}
