export type ClassType = "DAY" | "NIGHT"

export interface AcademicYear {
  id: string
  name: string
}

export interface CreateClassInput {
  academicYearId: string
  type: ClassType
  name: string
  section: string | null
  capacity: number | null
  roomNumber: string | null
}

export interface Class extends CreateClassInput {
  id: string
  status: string
  createdAt: Date
  updatedAt: Date
}
