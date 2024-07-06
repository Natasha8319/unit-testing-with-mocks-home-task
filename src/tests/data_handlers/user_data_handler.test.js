import UserDataHandler from '../../data_handlers/user_data_handler';
import testData from '../../../data/users.json';
import serchParamsTestData from '../../../data/isMatchingAllSearchParamsTestData.json';
import findUsersTestData from '../../../data/findUsersTestData.json';
describe('user_data_handler test suite', () => {
  let userDataHadlerObject;
  beforeEach(() => {
    userDataHadlerObject = new UserDataHandler();
  });
  describe('getNumberOfUsers() method check', () => {
    test('getNumberOfUsers() returns 10 if users were loaded', async () => {
      await userDataHadlerObject.loadUsers();
      const actualNumberOfUsers = userDataHadlerObject.getNumberOfUsers();
      expect(actualNumberOfUsers).toBe(10);
    });

    test('getNumberOfUsers() returns 0 if users were not loaded', () => {
      const actualNumberOfUsers = userDataHadlerObject.getNumberOfUsers();
      expect(actualNumberOfUsers).toBe(0);
    });
  });

  describe('loadUsers() method check', () => {
    test('loadUsers() returns list of all users', async () => {
      const expectedUsersList = JSON.parse(JSON.stringify(testData));
      await userDataHadlerObject.loadUsers();
      const actualUsersList = userDataHadlerObject.users;
      expect(actualUsersList).toEqual(expectedUsersList);
    });
  });

  describe('getUserEmailsList() method check', () => {
    test('getUserEmailsList() returns the list of emails correctly', async () => {
      await userDataHadlerObject.loadUsers();
      const expectedEmails = JSON.parse(JSON.stringify(testData))
        .map((user) => user.email)
        .join(';');

      const actualUserEmails = userDataHadlerObject.getUserEmailsList();

      expect(actualUserEmails).toBe(expectedEmails);
    });
    test('getUserEmailsList() returns single email correctly', () => {
      userDataHadlerObject.users = [{ email: 'test@test.com' }];
      const expectedEmail = 'test@test.com';

      const actualUserEmail = userDataHadlerObject.getUserEmailsList();

      expect(actualUserEmail).toBe(expectedEmail);
    });
    test('getUserEmailsList() throws the error if users were not loaded', async () => {
      const expectedErrorMessage = 'No users loaded!';

      function expectError() {
        userDataHadlerObject.getUserEmailsList();
      }

      expect(expectError).toThrow();
      expect(expectError).toThrowError(expectedErrorMessage);
    });
  });

  describe('isMatchingAllSearchParams() method check', () => {
    const searchTestData = JSON.parse(JSON.stringify(serchParamsTestData));

    test.each([
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validId,
        expectedResult: true,
        testDescription: 'searchTestData.validId',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.invalidId,
        expectedResult: false,
        testDescription: 'searchTestData.invalidId',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validUserName,
        expectedResult: true,
        testDescription: 'searchTestData.validUserName',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.invalidUserName,
        expectedResult: false,
        testDescription: 'searchTestData.invalidUserName',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validPhone,
        expectedResult: true,
        testDescription: 'searchTestData.validPhone',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.invalidPhone,
        expectedResult: false,
        testDescription: 'searchTestData.invalidPhone',
      },
      // {
      //   new test raw
      //   user: searchTestData.testUser,
      //   searchParams: searchTestData.validAddress,
      //   expectedResult: true,
      //   testDescription: 'searchTestData.validAddress',
      // },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.invalidAddress,
        expectedResult: false,
        testDescription: 'searchTestData.invalidAddress',
      },
      // {
      //   user: searchTestData.testUser,
      //   searchParams: searchTestData.validCompany,
      //   expectedResult: true,
      // },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.invalidCompany,
        expectedResult: false,
        testDescription: 'searchTestData.invalidCompany',
      },
    ])(
      `isMatchingAllSearchParams() returns correct values for single search parameter: %s`,
      async ({ user, searchParams, expectedResult }) => {
        await userDataHadlerObject.loadUsers();
        const actualResult = userDataHadlerObject.isMatchingAllSearchParams(user, searchParams);

        expect(actualResult).toBe(expectedResult);
      },
      20000,
    );

    test.each([
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validIdAndName,
        expectedResult: true,
        testDescription: 'searchTestData.validIdAndName',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validIdAndInvalidName,
        expectedResult: false,
        testDescription: 'searchTestData.validIdAndInvalidName',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validIdAndNameAndPhone,
        expectedResult: true,
        testDescription: 'searchTestData.validIdAndNameAndPhone',
      },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validIdAndNameAndInvalidPhone,
        expectedResult: false,
        testDescription: 'searchTestData.validIdAndNameAndInvalidPhone',
      },
      // {
      //   user: searchTestData.testUser,
      //   searchParams: searchTestData.validIdAndNameAndPhoneAndAddress,
      //   expectedResult: true,
      //   testDescription: 'searchTestData.validIdAndNameAndPhoneAndAddress',
      // },
      {
        user: searchTestData.testUser,
        searchParams: searchTestData.validIdAndNameAndPhoneAndInvalidAddress,
        expectedResult: false,
        testDescription: 'searchTestData.validIdAndNameAndPhoneAndInvalidAddress',
      },
    ])(
      `isMatchingAllSearchParams returns correct values for multiple search parameters: %s`,
      async ({ user, searchParams, expectedResult }) => {
        await userDataHadlerObject.loadUsers();
        const actualResult = userDataHadlerObject.isMatchingAllSearchParams(user, searchParams);

        expect(actualResult).toBe(expectedResult);
      },
      20000,
    );
  });

  describe('findUsers() method check', () => {
    const findUsersData = JSON.parse(JSON.stringify(findUsersTestData));
    test.each([
      {
        searchParams: findUsersData.testUserDataID.searchParameters,
        expectedUsers: findUsersData.testUserDataID.expectedUsers,
        testDescription: 'findUsersData.testUserDataID.searchParameters',
      },
      {
        searchParams: findUsersData.testUserDataName.searchParameters,
        expectedUsers: findUsersData.testUserDataName.expectedUsers,
        testDescription: 'findUsersData.testUserDataName.searchParameters',
      },
      {
        searchParams: findUsersData.testUserDataEmail.searchParameters,
        expectedUsers: findUsersData.testUserDataEmail.expectedUsers,
        testDescription: 'findUsersData.testUserDataEmail.searchParameters',
      },
      // {
      //   searchParams: findUsersData.testUserDataAddress.searchParameters,
      //   expectedUsers: findUsersData.testUserDataAddress.expectedUsers,
      //   testDescription: 'findUsersData.testUserDataAddress.searchParameters',
      // },
      {
        searchParams: findUsersData.testUserDataPhone.searchParameters,
        expectedUsers: findUsersData.testUserDataPhone.expectedUsers,
        testDescription: 'findUsersData.testUserDataPhone.searchParameters',
      },
      {
        searchParams: findUsersData.testUserDataWebsite.searchParameters,
        expectedUsers: findUsersData.testUserDataWebsite.expectedUsers,
        testDescription: 'findUsersData.testUserDataWebsite.searchParameters',
      },
      // {
      //   searchParams: findUsersData.testUserDataCompany.searchParameters,
      //   expectedUsers: findUsersData.testUserDataCompany.expectedUsers,
      //   testDescription: 'findUsersData.testUserDataCompany.searchParameters',
      // },
      {
        searchParams: findUsersData.testUserDataEmailAndWebsite.searchParameters,
        expectedUsers: findUsersData.testUserDataEmailAndWebsite.expectedUsers,
        testDescription: 'findUsersData.testUserDataEmailAndWebsite.searchParameters',
      },
      {
        searchParams: findUsersData.testUserDataIDAndNameAndPhone.searchParameters,
        expectedUsers: findUsersData.testUserDataIDAndNameAndPhone.expectedUsers,
        testDescription: 'findUsersData.testUserDataIDAndNameAndPhone.searchParameters',
      },
      // {
      //   searchParams: findUsersData.testUserDataIDAndNameAndPhoneAndAddress.searchParameters,
      //   expectedUsers: findUsersData.testUserDataIDAndNameAndPhoneAndAddress.expectedUsers,
      //   testDescription: 'findUsersData.testUserDataIDAndNameAndPhoneAndAddress.searchParameters',
      // },
    ])(
      'findUsers() returns the list of users correctly for serach parameters: %s',
      async ({ searchParams, expectedUsers }) => {
        await userDataHadlerObject.loadUsers();
        const actualUsers = userDataHadlerObject.findUsers(searchParams);
        expect(actualUsers).toEqual(expectedUsers, `findUsers() fails for "${searchParams}"`);
      },
    );

    test('findUsers() throws appropriate error if users were not loaded', async () => {
      const expectedErrorMessage = 'No users loaded!';
      function expectError() {
        userDataHadlerObject.findUsers({
          id: 1,
        });
      }

      expect(expectError).toThrow();
      expect(expectError).toThrowError(expectedErrorMessage);
    });

    test('findUsers() throws appropriate error if no search parameters were passed', async () => {
      const expectedErrorMessage = 'No search parameters provoded!';
      function expectError() {
        userDataHadlerObject.findUsers();
      }
      expect(expectError).toThrow();
      expect(expectError).toThrowError(expectedErrorMessage);
    });
    test('findUsers() throws appropriate error if no users were found', async () => {
      await userDataHadlerObject.loadUsers();
      const expectedErrorMessage = 'No matching users found!';
      function expectError() {
        userDataHadlerObject.findUsers({
          id: '',
        });
      }
      expect(expectError).toThrow();
      expect(expectError).toThrowError(expectedErrorMessage);
    });
  });
});
