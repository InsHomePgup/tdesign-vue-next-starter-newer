#!/usr/bin/env node

/**
 * 清理临时文件脚本
 * 自动删除项目根目录的 Claude Code 临时文件
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 项目根目录
const rootDir = path.resolve(__dirname, '..')

// 要清理的文件模式
const patterns = [
  /^tmpclaude-.*-cwd$/, // tmpclaude-*-cwd 文件
  /^CLAUDE\.md$/, // CLAUDE.md 文件
]

function cleanTempFiles() {
  try {
    // 读取根目录的所有文件
    const files = fs.readdirSync(rootDir)

    let deletedCount = 0
    const deletedFiles = []

    // 遍历文件并匹配模式
    for (const file of files) {
      const shouldDelete = patterns.some(pattern => pattern.test(file))

      if (shouldDelete) {
        const filePath = path.join(rootDir, file)
        try {
          fs.unlinkSync(filePath)
          deletedCount++
          deletedFiles.push(file)
        }
        catch (err) {
          console.error(`删除 ${file} 失败:`, err.message)
        }
      }
    }

    if (deletedCount > 0) {
      console.log(`✅ 已清理 ${deletedCount} 个临时文件:`)
      deletedFiles.forEach(file => console.log(`  - ${file}`))
    }
    else {
      console.log('✨ 没有需要清理的临时文件')
    }
  }
  catch (err) {
    console.error('清理失败:', err.message)
    process.exit(1)
  }
}

// 执行清理
cleanTempFiles()
