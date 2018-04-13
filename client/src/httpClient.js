import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = function() {
    return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
    localStorage.setItem('token', token)
    return token 
}

httpClient.getCurrentUser = function() {
    const token = this.getToken()
    if(token) return jwtDecode(token)
    return null 
}

httpClient.logIn = function(fields) {
    return this({method: 'post', url: '/api/users/authenticate', data: fields})
    .then((serverResponse) => {
        console.log(serverResponse.data)
        const {token} = serverResponse.data 
        if(token) {
            this.defaults.headers.common.token =this.setToken(token)
            return jwtDecode(token)
        } else {
            return false 
        }
    })
}

httpClient.signUp = function(userInfo) {
    return this({method: 'post', url: '/api/users', data: userInfo})
    .then((serverResponse) => {
        console.log(serverResponse.data)
        const {token} = serverResponse.data 
        if(token) {
            this.defaults.headers.common.token =this.setToken(token)
            return jwtDecode(token)
        } else {
            return false 
        }
    })
}

httpClient.logOut = function() {
    // clear token
    localStorage.removeItem('token')
    // tell axios to stop using the token in requests
    delete this.defaults.headers.common.token 
    return true 
}

httpClient.getAllQuestions = function(){
    return this({method: 'get', url: '/api/questions'})
}

httpClient.getAQuestion = function(id){
    return this({method: 'get', url: `/api/questions/${id}`})
}

httpClient.newQuestion = function(questionInput) {
    return this({method: 'post', url: '/api/questions', data: questionInput})
}

httpClient.deleteAQuestion = function(id){
    return this({method: 'delete', url: `/api/questions/${id}`})
}

httpClient.addAnswer = function(questionId, fields) {
    return this({ method: 'post', url: `/api/questions/${questionId}/answers`, data: fields })
}

httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient