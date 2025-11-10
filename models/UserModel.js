export class UserModel {
  constructor(rawData) {
    this.id = rawData.id;
    this.username = rawData.username;
    this.email = rawData.email;
    this.firstName = rawData.firstName;
    this.lastName = rawData.lastName;
    this.gender = rawData.gender;
    this.image = rawData.image;
    this.accessToken = rawData.accessToken || null;
    this.refreshToken = rawData.refreshToken || null;
  }

}
