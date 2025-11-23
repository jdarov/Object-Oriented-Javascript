
const greeter = {
  name : 'Naveed',
  greeting : 'Hello',
  message() {
    return `${this.greeting} ${this.name}`;
  },
  sayGreetings() {
    console.log(this.message());
  }
};

greeter.sayGreetings();