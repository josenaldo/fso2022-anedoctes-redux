import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div className="filter">
      <label htmlFor="filter">Filter</label>
      <input
        type="text"
        name="filter"
        role="textbox"
        onChange={handleChange}
        value={filter}
      />
    </div>
  )
}

export default Filter
