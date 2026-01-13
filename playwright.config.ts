import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright 配置文件
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 测试目录
  testDir: './tests/e2e',

  // 并行运行测试
  fullyParallel: true,

  // 在 CI 环境中禁止重试，本地开发环境重试失败的测试
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // 并行 worker 数量
  workers: process.env.CI ? 1 : undefined,

  // 报告配置
  reporter: [
    ['html'],
    ['list'],
  ],

  // 共享配置
  use: {
    // 基础 URL
    baseURL: 'http://localhost:3002',

    // 收集失败测试的追踪信息
    trace: 'on-first-retry',

    // 截图配置
    screenshot: 'only-on-failure',

    // 视频录制
    video: 'retain-on-failure',
  },

  // 配置多个测试项目（不同浏览器）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // 可选：添加更多浏览器
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // 移动端测试
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  // Web Server 配置 - 在测试前启动开发服务器
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
