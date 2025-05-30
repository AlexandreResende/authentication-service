class User {
  constructor(userData) {
    this.id = userData.id;
    this.fullName = userData.fullName;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.scopes = userData.scopes === '' ? [] : userData.scopes.split(',');
    this.refreshToken = userData.refreshToken;
    this.createdAt = Number(userData.createdAt);
    this.updatedAt = Number(userData.updatedAt);
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
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  addScopes = (scopes) => {
    this.scopes = this.scopes.concat(scopes);

    return this.scopes;
  }

  removeScopes = (scopes) => {
    for (let scope of scopes) {
      const index = this.scopes.indexOf(scope);

      if (index !== -1) this.scopes.splice(index, 1);
    }

    return this.scopes;
  }

  getPassword = () => {
    return this.password;
  }

  matchRefreshToken(refreshToken) {
    return this.refreshToken === refreshToken;
  }
}

module.exports = User;
