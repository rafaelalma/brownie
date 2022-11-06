export type Step = {
  medication: string | null
  description: string | null
}

export type Part = {
  name: string
  steps: Step[]
}

export interface Treatment {
  id: string
  createTime: Date
  updateTime: Date | null
  parts: Part[]
  dogId: string
}

export type NewTreatment = Omit<Treatment, 'id' | 'createTime' | 'updateTime'>

export type TreatmentFields = {
  parts: unknown[]
  dogId: unknown
}
