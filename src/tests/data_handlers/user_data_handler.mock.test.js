import axios from 'axios';
jest.mock('axios');
import UserDataHandler from '../../data_handlers/user_data_handler';
import testData from '../../../data/users.json';
import serchParamsTestData from '../../../data/isMatchingAllSearchParamsTestData.json';
import findUsersTestData from '../../../data/findUsersTestData.json';
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
