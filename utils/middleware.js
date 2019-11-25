

const tokenExtractor = (request, response, next, error) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log(authorization.substring(7))
      return request.token = request.authorization.substring(7)
    }
   //return error // <-- toimii myös
   next(error)
  }

  

  module.exports = {
    tokenExtractor
  }