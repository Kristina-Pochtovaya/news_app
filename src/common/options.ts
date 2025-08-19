export const lifeTimeOptionsKeys = {
  newest: 'newest',
  oldest: 'oldest',
} as const

export const updateTimeOptionsKeys = {
  freshData: 'freshData',
  oldData: 'oldData',
} as const

export type SelectLifeTimeOptionType = {
  value: keyof typeof lifeTimeOptionsKeys
  label: string
}

export type SelectUpdateTimeOptionType = {
  value: keyof typeof updateTimeOptionsKeys
  label: string
}

export const lifeTimeOptions: SelectLifeTimeOptionType[] = [
  { value: lifeTimeOptionsKeys.newest, label: 'Сначала новые' },
  { value: lifeTimeOptionsKeys.oldest, label: 'Сначала старые' },
]

export const updateTimeOptions: SelectUpdateTimeOptionType[] = [
  { value: updateTimeOptionsKeys.freshData, label: 'Недавно обновленные' },
  { value: updateTimeOptionsKeys.oldData, label: 'Давно обновлялись' },
]
