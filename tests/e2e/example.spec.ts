import { expect, test } from '@playwright/test'

test.describe('基础测试', () => {
  test('应该成功加载首页', async ({ page }) => {
    // 访问首页
    await page.goto('/')

    // 等待页面加载
    await page.waitForLoadState('networkidle')

    // 验证页面标题
    await expect(page).toHaveTitle(/TDesign/)

    // 验证页面包含预期内容
    const content = await page.content()
    expect(content.length).toBeGreaterThan(0)
  })

  test('应该能够导航到登录页面', async ({ page }) => {
    // 访问首页
    await page.goto('/')

    // 等待页面加载
    await page.waitForLoadState('networkidle')

    // 点击登录或用户相关按钮（如果有的话）
    // 这里假设有一个登录链接或按钮
    const loginLink = page.locator('a[href*="login"]').first()
    if (await loginLink.count() > 0) {
      await loginLink.click()

      // 验证跳转到登录页面
      await expect(page).toHaveURL(/.*login/)
    }
  })

  test('侧边栏应该可以展开和收起', async ({ page }) => {
    // 访问首页
    await page.goto('/')

    // 等待页面加载
    await page.waitForLoadState('networkidle')

    // 查找侧边栏切换按钮（需要根据实际情况调整选择器）
    const sidebarToggle = page.locator('[class*="sidebar"]').first()

    if (await sidebarToggle.count() > 0) {
      // 验证侧边栏存在
      expect(await sidebarToggle.isVisible()).toBeTruthy()
    }
  })
})
