import React from 'react'

function Table({rows,columns}) {
  return (
    <div>
      <div>
      {columns.map((col=>{
        return (
          <div className={`w-[${col.width}]`}>
             {col.name}
          </div>
        )
      }))}
      </div>
    
    </div>
  )
}

export default Table
