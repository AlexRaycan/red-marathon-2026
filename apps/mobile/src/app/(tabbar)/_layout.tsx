import { MAIN_MENU } from '@app/constants'
import { COLORS } from '@app/tokens'
import { NativeTabs } from 'expo-router/build/native-tabs'

export default function TabBarLayout() {
  return (
    <NativeTabs
      // minimizeBehavior='onScrollDown'
      tintColor={COLORS.primary}
      iconColor={{
        default: COLORS.text['little-muted'],
        selected: COLORS.text.primary
      }}
      labelStyle={{
        color: COLORS.text.primary
      }}
    >
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'house',
            selected: 'house.fill'
          }}
          md='home'
        />
        <NativeTabs.Trigger.Label>{MAIN_MENU.index}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='library'>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'heart',
            selected: 'heart.fill'
          }}
          md='favorite'
        />
        <NativeTabs.Trigger.Label>{MAIN_MENU.library}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='account'>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'person.circle',
            selected: 'person.circle.fill'
          }}
          md='account_circle'
        />
        <NativeTabs.Trigger.Label>{MAIN_MENU.account}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name='search'
        role='search'
      >
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'magnifyingglass',
            selected: 'magnifyingglass'
          }}
          md='search'
        />
        <NativeTabs.Trigger.Label>{MAIN_MENU.search}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
