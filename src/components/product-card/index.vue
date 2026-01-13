<script setup lang="ts">
import type { PropType } from 'vue'
import {
  AddIcon,
  CalendarIcon,
  LaptopIcon,
  MoreIcon,
  ServiceIcon,
  ShopIcon,
  UserAvatarIcon,
} from 'tdesign-icons-vue-next'

import { t } from '@/locales'

export interface CardProductType {
  type: number
  isSetup: boolean
  description: string
  name: string
}

const props = defineProps({
  product: {
    type: Object as PropType<CardProductType>,
    default: undefined,
  },
})

const emit = defineEmits(['manage-product', 'delete-item'])

const typeMap = ['A', 'B', 'C', 'D', 'E']

const handleClickManage = (product: CardProductType) => {
  emit('manage-product', product)
}

const handleClickDelete = (product: CardProductType) => {
  emit('delete-item', product)
}
</script>

<template>
  <t-card theme="poster2" :bordered="false">
    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          <ShopIcon v-if="props.product.type === 1" />
          <CalendarIcon v-if="props.product.type === 2" />
          <ServiceIcon v-if="props.product.type === 3" />
          <UserAvatarIcon v-if="props.product.type === 4" />
          <LaptopIcon v-if="props.product.type === 5" />
        </template>
      </t-avatar>
    </template>
    <template #status>
      <t-tag :theme="props.product.isSetup ? 'success' : 'default'" :disabled="!props.product.isSetup">
        {{ props.product.isSetup ? t('components.isSetup.on') : t('components.isSetup.off') }}
      </t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">
        {{ props.product.name }}
      </p>
      <p class="list-card-item_detail--desc">
        {{ props.product.description }}
      </p>
    </template>
    <template #footer>
      <t-avatar-group cascading="left-up" :max="2">
        <t-avatar>{{ typeMap[product.type - 1] }}</t-avatar>
        <t-avatar>
          <template #icon>
            <AddIcon />
          </template>
        </t-avatar>
      </t-avatar-group>
    </template>
    <template #actions>
      <t-dropdown
        :disabled="!props.product.isSetup"
        trigger="click"
        :options="[
          {
            content: t('components.manage'),
            value: 'manage',
            onClick: () => handleClickManage(props.product),
          },
          {
            content: t('components.delete'),
            value: 'delete',
            onClick: () => handleClickDelete(props.product),
          },
        ]"
      >
        <t-button theme="default" :disabled="!props.product.isSetup" shape="square" variant="text">
          <MoreIcon />
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>

<style lang="less" scoped>
.list-card-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &_detail {
    min-height: 140px;

    &--name {
      margin-bottom: var(--td-comp-margin-s);
      font: var(--td-font-title-medium);
      color: var(--td-text-color-primary);
    }

    &--desc {
      color: var(--td-text-color-secondary);
      font: var(--td-font-body-small);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
