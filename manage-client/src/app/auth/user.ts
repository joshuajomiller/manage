export class User {
  token: string;
  user: {
    email: string,
    profile: {
      details: {
        firstName: string,
        lastName: string,
        phone: string,
        position: string,
        birthDate: Date,
        dietaryRestrictions: string,
        location: string,
        picture: string
      },
      organisation: {
        organisationId: string,
        managerId: string
      },
      taskManagementId: string,
      taskManagementUsername: string
    }
  }
}
