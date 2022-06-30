import { CronUnixUIService } from '@sbzen/cron-core';

export class UnixCronDI {
  private static map = new Map<string, CronUnixUIService>();

  static get(session: string) {
    let service = this.map.get(session);
    if (!service) {
      service = this.create(session);
    }
    return service;
  }

  static destroy(session: string) {
    const service = this.get(session);
    service.destroy();
    this.map.delete(session);
  }

  private static create(session: string) {
    const inst = new CronUnixUIService();
    this.map.set(session, inst);
    return inst;
  }
}
