export class CurrentUser {
  token: string;
  user: User
}
export class User {
  email: string;
  profile: {
    details: UserDetails,
    organisation: OrganisationDetails,
    managerId: string,
    taskManagementId: string,
    taskManagementUsername: string
  }
}

export class UserDetails{
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
  birthDate: Date;
  dietaryRestrictions: string;
  location: string;
  picture: string;
}

export class OrganisationDetails{
  name: string;
  url: string;
  code: string;
  id: string;
}
