import { appDecryptData } from '@helpers/validation';
import { dbQuery } from '@helpers/prisma';

export class MainClass {
  protected user: { id: string; role: string } | null;
  constructor(protected token?: string) {
    this.user = null;
    this.token = token;
  }

  private getUser = async () => {
    const user = await appDecryptData(this.token);
    this.user = user as User;
    return user;
  };

  protected async hasAccess(role: string[] | 'all') {
    await this.getUser();
    if (!this.user?.id) throw new Error('You are not authorized to perform this action');

    if (role === 'all') return true;
    if (role.includes(this.user?.role)) return true;
    throw new Error('You are not authorized to perform this action');
  }

  protected async LogAction({ table, user, prevDocs, newDocs, action }: LogDBActionProps) {
    const previousDocs = JSON.stringify(prevDocs).slice(0, 10000);
    const newerDocs = JSON.stringify(newDocs).slice(0, 10000);

    const message = action === 'login' ? `User ${action}` : `${table} table was ${action}d`;
    await dbQuery.log.create({
      data: { user: JSON.stringify(this.user), table, action, message, prevDocs: previousDocs, newDocs: newerDocs },
    });

    return 'Logged';
  }
}
