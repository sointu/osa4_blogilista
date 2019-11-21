let _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (arr) => {
    let initialValue = 0
    const reducer = (accumulator, currentValue) => {
        // console.log(accumulator)
        return (accumulator + currentValue.likes)
    }
    return arr.reduce(reducer, initialValue)
}

const favouriteBlog = (arr) => {
    //let arrLikes = arr.map(a => a.likes)
    //console.log(arrLikes)
    //let maxLike = Math.max(...arrLikes)
    //console.log(maxLike)
    //return maxLike
    let initialValue = 0
    const maxLike = arr.reduce((prev, current) => {
        return (prev.likes > current.likes ? prev : current)
    }, initialValue)
    //console.log(maxLike)
    return maxLike
}

const mostBlogs = (arr) => {
    // authors erilleen
    let arrAuthors = arr.map(a => a.author)
    //console.log(arrAuthors)

    // authoreista objekti, jossa määrät
    let authorSizes = _.countBy(arrAuthors)

    // suurin määrä 
    let initialValue = 0
    var max = Object.values(authorSizes).reduce((a, b) => Math.max(a, b), initialValue)
    // console.log(max)

    // objektista iterable
    let entries = Object.entries(authorSizes)
    //console.log(entries)

    //iteroidaan oikea author esiin
    let result = {}
    entries.forEach((entry) => {
        let key = entry[0];
        let value = entry[1];
        if(value === max){
            result = {'Author': key, 'blogs': value}   
        }
    })
    return result
}

const mostLikes = (arr) => {

    // https://stackoverflow.com/questions/54431923/destructuring-objects-from-an-array-using-map
    
    //let arrAuthors = arr.map(a => [ a.author, a.likes ])
    /*
    ({ a, c }) => ({ a, c })
    arr.forEach(a => {
        let {a[author] a[likes]} = authorLikes
    )
    
    console.log('tulostus', arrAuthors2)
    

    // authoreista objekti, jossa määrät
    let authorSizes = _.countBy(arrAuthors[[0]])
    //console.log('määrät', authorSizes)
    //let result = _.maxBy(arr, o => o.likes);
    //return result
    */
}

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

const emptyList = []
//favouriteBlog(blogs)
//console.log(blogs[2])
//console.log(mostLikes(blogs))

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}

