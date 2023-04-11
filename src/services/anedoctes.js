import axios from 'axios'

const getAll = async () => {
  const response = await axios.get(`${process.env.VITE_BACKEND_URL}/anedoctes`)
  return response.data
}

// const create = async (newAnedocte) => {}

// const update = async (id, anedocte) => {}

// const remove = async (id) => {}

export default { getAll }
