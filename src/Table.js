import React from 'react'
import "./Table.css"
function Table({data}) {
    return (
        
        <div className="table">
            {
                data.map(({country,cases})=>(
                    
                    <tr>

                        <td>{country}</td>
                        <td><strong>{cases}</strong></td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
