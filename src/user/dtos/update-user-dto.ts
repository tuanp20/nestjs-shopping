import { Role } from 'src/auth/enums/role.enum';

export class UpdateUserDTO {
  username: string;
  email: string;
  password: string;
  roles: Role;
  refreshToken: string;
}
