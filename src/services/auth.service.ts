import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { UserRole } from '../constants/enums';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: {
    phone: string;
    password: string;
    fullName?: string;
    role: UserRole;
    companyName?: string;
  }) {
    // 1. Kiểm tra SĐT đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({ where: { phone: data.phone } });
    if (existingUser) {
      throw new Error('Số điện thoại này đã được đăng ký!');
    }

    // 2. Hash mật khẩu
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Lưu User
    const user = this.userRepository.create({
      phone: data.phone,
      password: hashedPassword,
      fullName: data.fullName,
      role: data.role,
      companyName: data.companyName,
    });

    const savedUser = await this.userRepository.save(user);

    // 4. Tạo JWT Token
    const token = generateToken({ userId: savedUser.id, role: savedUser.role });

    const { password, ...userWithoutPassword } = savedUser;
    return { user: userWithoutPassword, token };
  }

  async login(phone: string, passwordText: string) {
    // 1. Tìm User theo SĐT
    const user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      throw new Error('Số điện thoại hoặc mật khẩu không chính xác!');
    }

    // 2. Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(passwordText, user.password);
    if (!isPasswordValid) {
      throw new Error('Số điện thoại hoặc mật khẩu không chính xác!');
    }

    // 3. Tạo Token
    const token = generateToken({ userId: user.id, role: user.role });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('Không tìm thấy người dùng!');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}


