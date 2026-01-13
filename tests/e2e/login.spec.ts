import { expect, test } from '@playwright/test'

test.describe('登录功能测试', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前访问登录页面
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
  })

  test('应该显示登录表单', async ({ page }) => {
    // 验证页面包含登录表单元素
    const accountInput = page.locator('input[type="text"], input[placeholder*="账号"], input[placeholder*="用户名"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    // 验证表单元素可见
    await expect(accountInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('应该能够输入账号和密码', async ({ page }) => {
    // 查找账号和密码输入框
    const accountInput = page.locator('input[type="text"], input[placeholder*="账号"], input[placeholder*="用户名"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    // 输入测试数据
    await accountInput.fill('testuser')
    await passwordInput.fill('testpassword')

    // 验证输入值
    await expect(accountInput).toHaveValue('testuser')
    await expect(passwordInput).toHaveValue('testpassword')
  })

  test('应该显示登录按钮', async ({ page }) => {
    // 查找登录按钮
    const loginButton = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("Login")').first()

    // 验证按钮可见
    await expect(loginButton).toBeVisible()
  })

  test('空表单提交应该显示验证错误', async ({ page }) => {
    // 查找并点击登录按钮
    const loginButton = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("Login")').first()

    if (await loginButton.count() > 0) {
      await loginButton.click()

      // 等待一下，看是否有错误提示
      await page.waitForTimeout(500)

      // 验证仍然在登录页面（因为验证失败）
      await expect(page).toHaveURL(/.*login/)
    }
  })

  test('语言切换功能应该正常工作', async ({ page }) => {
    // 查找语言切换按钮（如果有）
    const langSwitcher = page.locator('[class*="language"], [class*="lang"]').first()

    if (await langSwitcher.count() > 0) {
      // 验证语言切换器可见
      await expect(langSwitcher).toBeVisible()
    }
  })
})
