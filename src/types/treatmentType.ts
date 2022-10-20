export type Stage = {
  medication: string | null
  description: string | null
}

export interface Treatment {
  id: string
  createTime: Date
  updateTime: Date | null
  name: string
  stages: Stage[]
  dogId: string
}

export type NewTreatment = Omit<Treatment, 'id' | 'createTime' | 'updateTime'>

export type TreatmentFields = {
  name: unknown
  stages: unknown[]
  dogId: unknown
}
