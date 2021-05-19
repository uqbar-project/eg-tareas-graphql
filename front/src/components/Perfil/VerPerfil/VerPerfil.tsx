import './VerPerfil.css'

export default function VerPerfil({perfil}: {perfil: any}) {
  return (
    <div className="container-center">
      <h1>{perfil.name}</h1>
      <h2>{perfil.email}</h2>
    </div>
  )
}
