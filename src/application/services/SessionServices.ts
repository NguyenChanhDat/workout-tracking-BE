import { ISessionServices } from './interfaces/ISessionServices';
import { ISessionRepository } from '@domain/repositories/ISessionRepository';
import { Session } from '@domain/entities/Session';
import { sessionRepositoryGlobal } from '@infra/locator/repository/RepositoryGlobal';
import { GetByDateUserIdResponse } from '@application/dto/set/GetSetDto';
import { GetSessionVolumeByUserIdResponseDto } from '@application/dto/session/GetSessionDto';

export class SessionServices implements ISessionServices {
  constructor(
    private readonly sessionRepository: ISessionRepository = sessionRepositoryGlobal
  ) {}

  public async createEntity(session: Session): Promise<void> {
    await this.sessionRepository.createEntity(session);
  }

  public async updateEntity(
    sessionId: number,
    session: Partial<Session>
  ): Promise<void> {
    await this.sessionRepository.updateEntity(sessionId, session);
  }

  public async deleteEntity(sessionId: number): Promise<void> {
    await this.sessionRepository.deleteEntity(sessionId);
  }

  public async getEntityById(sessionId: number): Promise<Session | null> {
    return await this.sessionRepository.getEntityById(sessionId);
  }

  public async showListEntity(): Promise<Session[] | null> {
    return await this.sessionRepository.showListEntity();
  }

  public async getByPlanId(planId: number): Promise<Session[] | null> {
    return await this.sessionRepository.getByPlanId(planId);
  }

  public async getByDateUserId(input: {
    date: Date;
    userId: number;
  }): Promise<GetByDateUserIdResponse | null> {
    return await this.sessionRepository.getByDateUserId(input);
  }

  public async getSessionVolumeByUserId(
    userId: number
  ): Promise<GetSessionVolumeByUserIdResponseDto| null> {
    return await this.sessionRepository.getSessionVolumeByUserId(userId);
  }
}
