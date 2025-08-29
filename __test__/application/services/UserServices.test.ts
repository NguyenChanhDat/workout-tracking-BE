import { UserServices } from '../../../src/application/services/UserServices';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository';
import { CreateUserDto } from '../../../src/application/dto/user/createUserDto';
import { UpdateUserDto } from '../../../src/application/dto/user/updateUserDto';
import { User } from '../../../src/domain/entities/User';
import { MembershipTierEnum } from '@shared/enums/MembershipTierEnum';
import { RoleEnum } from '@shared/enums/RoleEnum';

class MockUserRepository implements IUserRepository {
  createEntity = jest.fn();
  updateEntity = jest.fn();
  deleteEntity = jest.fn();
  getEntityById = jest.fn();
  showListEntity = jest.fn();
  getByUsername = jest.fn();
}

describe('UserServices', () => {
  let userServices: UserServices;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    userServices = new UserServices(mockUserRepository);
  });

  it('should create a new user', async () => {
    const userInput: CreateUserDto = {
      username: 'testuser',
      password: 'password',
      membershipTier: MembershipTierEnum.BASIC,
      role: RoleEnum.USER,
    };
    await userServices.createEntity(userInput);

    expect(mockUserRepository.createEntity).toHaveBeenCalledWith(userInput);
  });

  it('should update an existing user', async () => {
    const userId = 1;
    const updateInfor: UpdateUserDto = {
      username: 'updateduser',
      password: 'newpassword',
      membershipTier: MembershipTierEnum.BASIC,
      role: RoleEnum.USER,
    };
    await userServices.updateEntity(userId, updateInfor);

    expect(mockUserRepository.updateEntity).toHaveBeenCalledWith(
      userId,
      updateInfor
    );
  });

  it('should delete a user by id', async () => {
    const userId = 1;
    await userServices.deleteEntity(userId);

    expect(mockUserRepository.deleteEntity).toHaveBeenCalledWith(userId);
  });

  it('should get a user by id', async () => {
    const userId = 1;
    const user: User = {
      id: userId,
      username: 'testuser',
      password: 'password',
      membershipTier: MembershipTierEnum.BASIC,
      role: RoleEnum.USER,
    };
    mockUserRepository.getEntityById.mockResolvedValue(user);

    const result = await userServices.getUserById(userId);

    expect(result).toEqual(user);
    expect(mockUserRepository.getEntityById).toHaveBeenCalledWith(userId);
  });

  it('should return null if user does not exist', async () => {
    const userId = 1;
    mockUserRepository.getEntityById.mockResolvedValue(null);

    const result = await userServices.getUserById(userId);

    expect(result).toBeNull();
    expect(mockUserRepository.getEntityById).toHaveBeenCalledWith(userId);
  });

  it('should get a user by username', async () => {
    const username = 'testuser';
    const user: User = {
      id: 1,
      username,
      password: 'password',
      membershipTier: MembershipTierEnum.BASIC,
      role: RoleEnum.USER,
    };
    mockUserRepository.getByUsername.mockResolvedValue(user);

    const result = await userServices.getUserByUsername(username);

    expect(result).toEqual(user);
    expect(mockUserRepository.getByUsername).toHaveBeenCalledWith(username);
  });

  it('should return null if user does not exist by username', async () => {
    const username = 'testuser';
    mockUserRepository.getByUsername.mockResolvedValue(null);

    const result = await userServices.getUserByUsername(username);

    expect(result).toBeNull();
    expect(mockUserRepository.getByUsername).toHaveBeenCalledWith(username);
  });

  it('should show list of users', async () => {
    const users: User[] = [
      {
        id: 1,
        username: 'user1',
        password: 'password1',
        membershipTier: MembershipTierEnum.BASIC,
        role: RoleEnum.USER,
      },
      {
        id: 2,
        username: 'user2',
        password: 'password2',
        membershipTier: MembershipTierEnum.BASIC,
        role: RoleEnum.USER,
      },
    ];
    mockUserRepository.showListEntity.mockResolvedValue(users);

    const result = await userServices.showListEntity();

    expect(result).toEqual(users);
    expect(mockUserRepository.showListEntity).toHaveBeenCalled();
  });
});
