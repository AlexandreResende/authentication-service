class User {
  constructor(userData) {
    this.id = userData.id;
    this.fullName = userData.fullName;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.scopes = userData.scopes.split(',');
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }

  static toEntity = (userData) => {
    return new User(userData);
  }

  toJson = () => {
    return {
      id: this.id,
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      scopes: this.scopes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  getPassword = () => {
    return this.password;
  }
}

module.exports = User;
