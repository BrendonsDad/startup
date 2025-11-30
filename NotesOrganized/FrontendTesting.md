# Frontend Testing
Test driven development (TDD) is a proven methodology for accelerated application creation, protecting against regression bugs, and demonstrating correctness. TDD for console based applications and server based code is fairly straight forward. Web app frontend code is significantly more complex to test, and using automated tests to drive your UI development is even more difficult. 

The problem is that a browser is required to execute UI code. That means you have to actually test the app in the browser. Additionally, every one of the major browsers behaves slightly differently, viewport size makes a big difference, all the code executes asynchronously, network dirupstions are coommon, and then there is the human factor. A human will interact with the browser in very unexpecrted ways. Clicking where they shouldnt, clicking rappidly, randomly refreshing the browser, flushing cache, not flushing cache, leaving the app up for days on end, swithing between tabs, opening the app multiple times, logging off on different tabs, logging out of one tab while still using the app on another tab, or ... on and on. And we havent even talked ahbout running all the different browsers on all the possible devices.

Of course the alternative to not test your code doesn't work either. That only means that you have to manually test everything everyt time you make any change, or you let your users test everuthing. That is not a good recipe for long term success. 


Fortunatly this is a problem that many strong players have been working on for decades now, and the solutions, while not perfect, are getting better and better. We will look at two of theses solutions. One is for executing automated tests in the browser, and the other is for testing on diffrent browser and devides. 

### Automating the browser = Playwrite
No one understands the difficulty of testing apps in the browser better than the companies that build web browsers. They have to test every possible use of html, css, and javascript that a user could think of. There is now way that manual testing is going to work and so early on they started putting hooks into their browser that allowed them to be driven from automated external processes. Selenium was introduced in 2004 as the first popular tool to automate the browser. However, selenium is generally considered to be flaky and slow. Flakieness means that a test fails in unpredictable, unreproducibe ways. When you need thousands of tests to pass before you can deploy a new feature, even a little flakiness becomes a big problem. If those tests take hours to run then you have an even bigger problem. 

The market now has lots of alternative when considering which automated browser framework to use. State of JS includes statistics on how popular these frameworks are. With frameworks coming and going all of the time, one telling statistic is the frameworks ability to retain users. 

### Demonstration application 
For the purposes of this instruction, we could pick any of the top contenders. However, we are going to pick a newcomer, Playwright. Playwright has some major advantages. It is backed by microsoft, it integrates really well with vs code, and it runs as a node.js process. It is also considered one of the least flaky of the testing frameworks. 

As a domonstration of using playwright, we will use the login app that we used to demonstrate backend testing. The jsx for the application allows fo the ability to provide an email and password for login or registration. 

```html
<div>
  <h1>Login</h1>
  <div>
    <label>Email:</label>
    <input type='text' onChange={(e) => setEmail(e.target.value)} required />
  </div>
  <div>
    <label>Password:</label>
    <input type='password' onChange={(e) => setPassword(e.target.value)} required />
  </div>
  <button type='submit' disabled={!(email && password)} onClick={handleLogin}>
    Login
  </button>
  <button type='button' disabled={!(email && password)} onClick={handleRegister}>
    Register
  </button>
</div>
```

### Installing Playwright
With our demo app created we are ready to install playwright. When going through the installation steps, choose TypeScript, tests for the test directory, ignore the github actions workflow for nowand do not install any playright browsers. 

```bash
npm init playwright@latest
```
This will update packages.json with the playwright package, cerate a playwright.config.ts file and create some sample tests in the test and test-examples directories. This will also update your .gitignore file so that you dont accidentally check in test coverage or report information. 

#### Install a testing browser
Now replace the contents of the playwright ocnfiguration file playwright.config.ts witht e following:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 5000,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 800, height: 600 } },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 5000,
  },
});
```

This simplifies the configuration to only use the chromium browser driver and launches the login app when the tests run.

Next, you need ot install the playwright chromium driver withthe following command.

```bash
npx playwright install --with-deps chromium
```

Finally modify package.json to include a script for running playright for your tests.

### Running your first test
The easiest way to run your first playwright test is to start with the example s that came withthe playwright installation

Playwright will run any test found in the testing directory as defined by the testDir property in the playwright.config.ts file. You chose tests to be the testing directory during the installation. Playwright follows the common convention of including .spec. in the test names. You can also use .test.  if you want to be consistent with your jest tests.

After reviewing the provided tests, replace the tests found in tests/example.spec.ts with the following:
```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading')).toContainText('Login');
});
```
This test navigates to the loginwebsite and checks to make sure the resulting page has the tile Login. You can run the test from your project directory with the following console command.

### Complete test
Now that we are confident that we can use playwrite to run a test, let's write a more complex one that goes throught ehwhole register/logout/login flow **Important: dont forget to start your backend running (by running node service.js in the service directory) so that the endpoint calls from the front end will work; otherwise, your tests will fail, even if your frontend is perfect.

```ts
import { test, expect } from '@playwright/test';

function getRandomName(prefix) {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

test('complete flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading')).toContainText('Login');

  const userName = getRandomName('user');

  // Register
  await page.locator('input[type="text"]').fill(userName);
  await page.locator('input[type="password"]').fill('toomanysecrets');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByRole('heading')).toContainText('Profile');
  await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('heading')).toContainText('Login');

  // Duplicate registration
  await page.locator('input[type="text"]').fill(userName);
  await page.locator('input[type="password"]').fill('toomanysecrets');

  page.once('dialog', async (dialog) => {
    await expect(dialog.message()).toContain('Authentication failed');
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Register' }).click();

  // Login
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('heading')).toContainText('Profile');
  await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);
});
```

This is just a simple example of the powerful functionality of playwright. You are encouraged to esxplore its functionality and even add some tests to your projects. Once you have gained some competency with playwright you will find that you can write your code faster and feel more confident when changing things around. 

There is a vscode browser extention

### Testing Various devices = BrowserStack
With the ability to run automated UI tests, we now turn our attention to testing on the multitude of various devices. There are several services our there that help with this. One of these is BrowswerStack. BrowserStack lets you pick from a long list of physical devices that you can run interactivly or use them when driving automated tests with selenium. 

When you launch a device it connects the browser interface to a physical device hosted in a data center. You can then use the device to reproduce  user reported problems, or validate that your implementation works on the specific device. 

BrowserStack offers free trials if you would like to see how yoru startup app works on a specific device. 