class User {
  constructor(userData) {
    this.id = userData.id;
    this.fullName = userData.fullName;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

module.exports = User;
