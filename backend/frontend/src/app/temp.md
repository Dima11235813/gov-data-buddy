We should follow best practices for playwright as documented in 
@https://www.learninternetgrow.com/create-test-suites-with-playwright/ 
for example each page should have a class associated to it so it can be reused in the e2e tests
export class LoginPage {
  constructor(private page) {}
  async navigate() {
    await this.page.goto('https://example.com/login');
  }
  async loginAs(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }
}