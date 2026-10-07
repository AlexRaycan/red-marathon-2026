import * as Haptics from 'expo-haptics'

export const HAPTIC_TRIGGERS = {
  selection: () => Haptics.selectionAsync(),
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  impact: (style?: keyof typeof Haptics.ImpactFeedbackStyle) =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style ?? 'Medium'])
}

export type HapticTrigger = keyof typeof HAPTIC_TRIGGERS
