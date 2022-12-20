import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Content } from '@application/entities/content';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipiente-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipiente-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipiente-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipiente-1',
    });

    expect(count).toEqual(2);
  });
});
