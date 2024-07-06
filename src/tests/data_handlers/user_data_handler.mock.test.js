import axios from 'axios';
import UserDataHandler from '../../data_handlers/user_data_handler';
jest.mock('axios');
describe('loadUsers() method check', () => {
  let userDataHadlerObject;
  beforeEach(() => {
    userDataHadlerObject = new UserDataHandler();
  });
  test('loadUsers() returns expected error if axios call failed', async () => {
    axios.get.mockRejectedValue(new Error('AggregateError'));
    const expectedErrorMessage = 'Failed to load users data: Error: AggregateError';
    async function expectError() {
      await userDataHadlerObject.loadUsers();
    }
    await expect(expectError).rejects.toThrow(expectedErrorMessage);
  });
});
