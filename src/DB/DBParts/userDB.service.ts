import { User } from 'src/Users/interfaces/user.interface';
import { BasicDB } from './basicDB.service';
import { UpdatePasswordDto } from 'src/Users/dto/update-password.dto';

export class UserDB extends BasicDB<User, UpdatePasswordDto> {
  update(id: string, data: UpdatePasswordDto): User {
    const { oldPassword: _, newPassword } = data;

    const user: User | undefined = this.getById(id);
    if (!user) {
      return;
    }

    user.password = newPassword || user.password;
    user.version++;
    user.updatedAt = Date.now();

    return user;
  }
}
