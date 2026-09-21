

export type RolUsuario = 'USER' | 'ADMIN'
export type EstadoUsuario = 'ACTIVE' | 'INACTIVE'


export interface UsuarioListado {
  userId: number              
  username: string            
  firstName: string            
  middleName: string | null    
  firstSurname: string         
  secondSurname: string | null 
  birthDate: string           
  email: string               
  role: RolUsuario            
  status: EstadoUsuario        
  createdAt: string          
}


export interface PerfilUsuario {
  username: string             
  firstName: string           
  middleName: string | null   
  firstSurname: string        
  secondSurname: string | null 
  birthDate: string           
  email: string               
}


export interface RespuestaMensaje {
  message: string             
}




export interface CrearAdminFormData {
  username: string            
  firstName: string            
  middleName: string | null    
  firstSurname: string         
  secondSurname: string | null 
  birthDate: string            
  email: string               
  password: string             
}


export interface ActualizarUsuarioFormData {
  username?: string
  firstName?: string
  middleName?: string | null
  firstSurname?: string
  secondSurname?: string | null
  birthDate?: string
  email?: string
}