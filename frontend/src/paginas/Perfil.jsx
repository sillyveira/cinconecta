import React from 'react'
import AuditCard from '../componentes/AuditCard'

function Perfil() {
  return (
    <AuditCard
    titulo={"O produto 'Nome do produto' foi adicionado ao estoque"}
    horario={"18:30"}
    data={"18/02/2025"}
    funcaoClique={()=>{}}
    ></AuditCard>
  )
}

export default Perfil