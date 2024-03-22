class Store {
  public loggedUsers: string[] = [];
  constructor() {}

  public addUser(user: string) {
    this.loggedUsers.push(user);
  }

  public removeUser(user: string) {
    this.loggedUsers = this.loggedUsers.filter((username) => username !== user);
  }
}

export const store = new Store();
