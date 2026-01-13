# E2E 测试指南

本项目使用 [Playwright](https://playwright.dev/) 进行端到端测试。

## 快速开始

### 运行所有测试

```bash
pnpm run test
```

### 使用 UI 模式运行测试

UI 模式提供了一个交互式界面，可以查看测试执行过程：

```bash
pnpm run test:ui
```

### 调试模式

在调试模式下逐步执行测试：

```bash
pnpm run test:debug
```

### 查看测试报告

运行测试后，可以查看详细的 HTML 报告：

```bash
pnpm run test:report
```

### 代码生成器

使用 Playwright 的代码生成器录制用户操作并生成测试代码：

```bash
pnpm run test:codegen
```

## 测试文件结构

```
tests/
  └── e2e/              # E2E 测试文件
      ├── example.spec.ts   # 基础示例测试
      └── login.spec.ts     # 登录功能测试
```

## 编写测试

### 基础测试示例

```typescript
import { test, expect } from '@playwright/test'

test('示例测试', async ({ page }) => {
  // 访问页面
  await page.goto('/')

  // 等待页面加载
  await page.waitForLoadState('networkidle')

  // 断言
  await expect(page).toHaveTitle(/TDesign/)
})
```

### 常用 API

- `page.goto(url)` - 导航到指定 URL
- `page.locator(selector)` - 选择元素
- `page.click(selector)` - 点击元素
- `page.fill(selector, value)` - 填充输入框
- `expect(locator).toBeVisible()` - 断言元素可见
- `expect(locator).toHaveText(text)` - 断言元素文本
- `expect(page).toHaveURL(url)` - 断言页面 URL

## 配置

测试配置文件位于根目录的 `playwright.config.ts`。

主要配置项：
- `testDir` - 测试文件目录
- `baseURL` - 基础 URL
- `projects` - 测试项目（浏览器配置）
- `webServer` - 开发服务器配置

## CI/CD 集成

在 CI 环境中运行测试：

```bash
# CI 环境会自动检测并使用优化的配置
pnpm run test
```

## 更多资源

- [Playwright 官方文档](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)
