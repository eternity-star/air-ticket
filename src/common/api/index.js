import axios from "axios";

export const getUser = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"))
  const params = {
    id: user.id
  }
  axios.post('/api/Air/getUser', params).then(({ data }) => {
    console.log('%c [ data.data[0] ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', data.data[0])
    return data.data[0]
  })
}