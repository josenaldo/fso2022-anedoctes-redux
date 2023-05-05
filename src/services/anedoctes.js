import axios from 'axios'

const getAll = async () => {
  const response = await axios.get(`${process.env.VITE_BACKEND_URL}/anedoctes`)
  return response.data
}

const create = async (content) => {
  const newAnedocte = {
    content,
    votes: 0,
  }

  const response = await axios.post(
    `${process.env.VITE_BACKEND_URL}/anedoctes`,
    newAnedocte
  )
  return response.data
}

const vote = async (id) => {
  const anedocteToVote = await axios.get(
    `${process.env.VITE_BACKEND_URL}/anedoctes/${id}`
  )

  const votedAnedocte = {
    ...anedocteToVote.data,
    votes: anedocteToVote.data.votes + 1,
  }

  const response = await axios.put(
    `${process.env.VITE_BACKEND_URL}/anedoctes/${id}`,
    votedAnedocte
  )

  return response.data
}

// const update = async (id, anedocte) => {}

// const remove = async (id) => {}

export default { getAll, create, vote }
