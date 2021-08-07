import React from 'react'

const Filter = ({filter, onChange}) => {
  return (
    <form>
      <div>
        filter shown: <input value={filter} onChange={onChange} />
      </div>
    </form>
  )
}

export default Filter