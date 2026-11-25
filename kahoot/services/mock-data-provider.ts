export type Screen = 'student' | 'teacher-login' | 'teacher-panel' | 'lobby' | 'game' | 'podium'

export const students = [
  { id: 's1', name: 'Alonso, Sofía', pin: '1842' }, { id: 's2', name: 'Benítez, Mateo', pin: '3921' },
  { id: 's3', name: 'Castillo, Valentina', pin: '5028' }, { id: 's4', name: 'Díaz, Lucía', pin: '6731' },
  { id: 's5', name: 'Fernández, Tomás', pin: '2284' }, { id: 's6', name: 'Gómez, Martina', pin: '9042' },
  { id: 's7', name: 'Herrera, Santiago', pin: '3217' }, { id: 's8', name: 'Ibarra, Camila', pin: '7450' },
  { id: 's9', name: 'Juárez, Benjamín', pin: '6173' }, { id: 's10', name: 'López, Emilia', pin: '8391' },
  { id: 's11', name: 'Martínez, Joaquín', pin: '1205' }, { id: 's12', name: 'Navarro, Pilar', pin: '4386' },
  { id: 's13', name: 'Ortega, Bautista', pin: '9514' }, { id: 's14', name: 'Pérez, Renata', pin: '3067' },
  { id: 's15', name: 'Quiroga, Thiago', pin: '5620' }, { id: 's16', name: 'Ruiz, Delfina', pin: '7813' },
  { id: 's17', name: 'Sosa, Felipe', pin: '2479' }, { id: 's18', name: 'Torres, Abril', pin: '6902' },
  { id: 's19', name: 'Vega, Nicolás', pin: '1358' }, { id: 's20', name: 'Acosta, Malena', pin: '8641' },
  { id: 's21', name: 'Aguirre, Franco', pin: '4162' }, { id: 's22', name: 'Alvarez, Zoe', pin: '7534' },
  { id: 's23', name: 'Benítez, Lucía', pin: '2916' }, { id: 's24', name: 'Bravo, Julián', pin: '6473' },
  { id: 's25', name: 'Cabrera, Mía', pin: '8705' }, { id: 's26', name: 'Domínguez, Pedro', pin: '3094' },
  { id: 's27', name: 'Escobar, Alma', pin: '1582' }, { id: 's28', name: 'Figueroa, Simón', pin: '7246' },
  { id: 's29', name: 'Gutiérrez, Nina', pin: '5821' }, { id: 's30', name: 'Luna, Salvador', pin: '9436' },
  { id: 's31', name: 'Molina, Olivia', pin: '2308' }, { id: 's32', name: 'Rojas, Bautista', pin: '6815' },
]

export const teachers = [
  { name: 'María García', email: 'maria.garcia@etec.uba.ar' },
  { name: 'Pablo Fernández', email: 'pablo.fernandez@etec.uba.ar' },
  { name: 'Carolina Méndez', email: 'carolina.mendez@etec.uba.ar' },
]

const quizzes = [
  { title: 'Electricidad básica', subject: 'FÍSICA', questions: 12, updated: 'Editado hoy' },
  { title: 'Circuitos en serie y paralelo', subject: 'ELECTRÓNICA', questions: 10, updated: 'Editado ayer' },
  { title: 'Seguridad en el taller', subject: 'TALLER', questions: 8, updated: 'Editado hace 3 días' },
]

export interface QuizRepository { getQuizzes(): typeof quizzes }
export interface StudentRosterRepository { getStudents(): typeof students }
export interface GameSessionAdapter { authenticateStudent(name: string, pin: string, room: string): { ok: boolean; message: string } }

export const mockDataProvider = {
  getQuizzes: () => quizzes,
  getStudents: () => students,
  getTeachers: () => teachers,
  authenticateTeacher(email: string, password: string) {
    const teacher = teachers.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase())
    if (!teacher) return { ok: false as const, message: 'Esta cuenta no está habilitada como docente. Pedile a un administrador que la agregue en “Docentes habilitados”.' }
    if (password !== 'etec2025') return { ok: false as const, message: 'La contraseña ingresada no es correcta.' }
    return { ok: true as const, teacher }
  },
  authenticateStudent(name: string, pin: string, room: string) {
    if (room !== '482916') return { ok: false, message: 'No encontramos esa sala. Revisá el código de 6 dígitos.' }
    const student = students.find((entry) => entry.name === name && entry.pin === pin)
    if (!student) return { ok: false, message: 'Elegí tu nombre del padrón e ingresá tu PIN personal para continuar.' }
    return { ok: true, student }
  },
}
