import axios from "axios"

const baseUrl = '/api/notes'

export const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    const data = await res.data.data

    return data
  } catch(err:unknown) {
    console.error(err)
  }
}

export const create = async (content:string) => {
  try {
    const res = await axios.post(baseUrl, content)
    console.log(res.data)
  } catch(err:unknown) {
    console.error(err)
  }
}

//const update = () => {}
//const delete = () => {}
