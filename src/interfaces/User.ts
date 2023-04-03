import { StringDecoder } from "string_decoder";

export type genderType = 'Female' | 'Male';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: genderType;
  username: string;
} 