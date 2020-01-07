import aixos from 'axios'

const http = aixos.create({
    baseURL:"http://localhost:3000/admin/api"
})

export default http