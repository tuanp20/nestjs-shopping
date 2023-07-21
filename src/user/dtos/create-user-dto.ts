import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
  roles: Role;
}
