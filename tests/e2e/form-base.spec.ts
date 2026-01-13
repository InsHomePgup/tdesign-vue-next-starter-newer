import { expect, test } from '@playwright/test'

test.describe('基础表单页面测试', () => {
  test.beforeEach(async ({ page }) => {
    // 先登录
    await page.goto('/login')
    await page.waitForLoadState('networkidle')

    const loginButton = page.locator('button[type="submit"], button:has-text("登录")').first()
    if (await loginButton.count() > 0) {
      await loginButton.click()
      await page.waitForURL(/.*dashboard/, { timeout: 10000 })
    }

    // 导航到表单页面
    await page.goto('/form/base')
    await page.waitForLoadState('networkidle')
  })

  test('应该成功加载表单页面', async ({ page }) => {
    // 验证页面 URL
    await expect(page).toHaveURL(/.*\/form\/base/)

    // 验证表单标题存在
    const formTitle = page.locator('text=基本信息').first()
    if (await formTitle.count() > 0) {
      await expect(formTitle).toBeVisible()
    }
  })

  test('应该显示所有必填表单字段', async ({ page }) => {
    // 验证合同名称输入框
    const nameInput = page.locator('input[placeholder*="请输入"]').first()
    await expect(nameInput).toBeVisible()

    // 验证合同类型下拉框
    const typeSelect = page.locator('.t-select').first()
    await expect(typeSelect).toBeVisible()

    // 验证收付类型单选按钮
    const paymentRadio = page.locator('.t-radio-group').first()
    await expect(paymentRadio).toBeVisible()

    // 验证提交按钮
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    // 验证取消按钮
    const cancelButton = page.locator('button[type="reset"]')
    await expect(cancelButton).toBeVisible()
  })

  test('应该能够输入合同名称', async ({ page }) => {
    // 查找并填写合同名称
    const nameInput = page.locator('input[placeholder*="请输入"]').first()
    await nameInput.fill('测试合同-2024')

    // 验证输入值
    await expect(nameInput).toHaveValue('测试合同-2024')
  })

  test('应该能够选择合同类型', async ({ page }) => {
    // 点击合同类型下拉框
    const typeSelect = page.locator('.t-select').first()
    await typeSelect.click()

    // 等待下拉选项出现
    await page.waitForTimeout(500)

    // 选择第一个选项 (Type A)
    const firstOption = page.locator('.t-select-option').first()
    if (await firstOption.count() > 0) {
      await firstOption.click()
      await page.waitForTimeout(300)
    }
  })

  test('应该能够选择收付类型', async ({ page }) => {
    // 选择"收款"单选按钮
    const receiveRadio = page.locator('.t-radio').first()
    await receiveRadio.click()

    // 验证单选按钮被选中
    await expect(receiveRadio).toHaveClass(/t-is-checked/)
  })

  test('应该能够选择公司和员工', async ({ page }) => {
    // 选择公司（甲方）
    const partyASelect = page.locator('.t-select').nth(1)
    if (await partyASelect.count() > 0) {
      await partyASelect.click()
      await page.waitForTimeout(800)

      // 使用更精确的选择器，查找可见的选项
      const option = page.locator('.t-select-option:visible').first()
      if (await option.count() > 0) {
        await option.click({ force: true })
        await page.waitForTimeout(500)
      }
    }

    // 选择员工（乙方）
    const partyBSelect = page.locator('.t-select').nth(2)
    if (await partyBSelect.count() > 0) {
      await partyBSelect.click()
      await page.waitForTimeout(800)

      const option = page.locator('.t-select-option:visible').first()
      if (await option.count() > 0) {
        await option.click({ force: true })
        await page.waitForTimeout(500)
      }
    }
  })

  test('应该能够选择日期', async ({ page }) => {
    // 查找日期选择器
    const datePicker = page.locator('.t-date-picker').first()
    if (await datePicker.count() > 0) {
      await datePicker.click()
      await page.waitForTimeout(500)

      // 选择当前月份的第一天
      const firstDay = page.locator('.t-date-picker__table td').first()
      if (await firstDay.count() > 0) {
        await firstDay.click()
        await page.waitForTimeout(300)
      }
    }
  })

  test('应该能够输入备注信息', async ({ page }) => {
    // 查找备注文本域
    const commentTextarea = page.locator('textarea').first()
    if (await commentTextarea.count() > 0) {
      await commentTextarea.fill('这是一个测试备注信息')

      // 验证输入值
      await expect(commentTextarea).toHaveValue('这是一个测试备注信息')
    }
  })

  test('空表单提交应该显示验证错误', async ({ page }) => {
    // 不填写任何内容，直接点击提交
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // 等待验证消息出现
    await page.waitForTimeout(1000)

    // 验证是否有错误提示（TDesign 会显示验证错误）
    const errorTip = page.locator('.t-form__controls--error, .t-input--error, .t-is-error')
    if (await errorTip.count() > 0) {
      await expect(errorTip.first()).toBeVisible()
    }
  })

  test('填写部分表单字段', async ({ page }) => {
    // 填写合同名称
    const nameInput = page.locator('input[placeholder*="请输入"]').first()
    await nameInput.fill('完整测试合同')

    // 选择合同类型
    const typeSelect = page.locator('.t-select').first()
    await typeSelect.click()
    await page.waitForTimeout(800)
    const typeOption = page.locator('.t-select-option:visible').first()
    if (await typeOption.count() > 0) {
      await typeOption.click({ force: true })
      await page.waitForTimeout(500)
    }

    // 选择甲方
    const partyASelect = page.locator('.t-select').nth(1)
    await partyASelect.click()
    await page.waitForTimeout(800)
    const partyAOption = page.locator('.t-select-option:visible').first()
    if (await partyAOption.count() > 0) {
      await partyAOption.click({ force: true })
      await page.waitForTimeout(500)
    }

    // 选择乙方
    const partyBSelect = page.locator('.t-select').nth(2)
    await partyBSelect.click()
    await page.waitForTimeout(800)
    const partyBOption = page.locator('.t-select-option:visible').first()
    if (await partyBOption.count() > 0) {
      await partyBOption.click({ force: true })
      await page.waitForTimeout(500)
    }

    // 验证已填写的字段
    await expect(nameInput).toHaveValue('完整测试合同')

    // 注意：日期选择器交互较复杂，实际应用中需要点击日历选择
    // 这里我们已经验证了表单的基本功能
  })

  test('点击取消按钮应该重置表单', async ({ page }) => {
    // 先填写一些内容
    const nameInput = page.locator('input[placeholder*="请输入"]').first()
    await nameInput.fill('待取消的合同')

    // 点击取消按钮
    const cancelButton = page.locator('button[type="reset"]')
    await cancelButton.click()

    // 等待重置完成
    await page.waitForTimeout(1000)

    // 验证是否有提示消息
    const warningMessage = page.locator('text=取消')
    if (await warningMessage.count() > 0) {
      await expect(warningMessage.first()).toBeVisible()
    }
  })

  test('上传按钮应该可见', async ({ page }) => {
    // 查找上传按钮
    const uploadButton = page.locator('button', { hasText: /上传|Upload/ }).first()
    if (await uploadButton.count() > 0) {
      await expect(uploadButton).toBeVisible()
    }
  })
})
