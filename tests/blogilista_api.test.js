const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

/*
beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })
*/

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

test('id-field is called id', async() => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    expect(ids).toBeDefined()
})

test('a valid blog can be added', async() => {
    const newBlog = {
        title: 'Jokin blogi',
        author: 'Joku',
        url: 'http://vivivinna.blogspot.com/',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
        'Jokin blogi'
    )
})

test('if likes are null, likes = 0', async () => {
    const newBlog = {
        title: 'Not liked',
        author: 'Joku',
        url: 'http://vivivinna.blogspot.com/',
        likes: null
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDB()
const index = blogsAtEnd.length - 1
expect(blogsAtEnd[index].likes).toBe(0)
})

test('bad request if no title or url', async () => {
    const newBlog = {
        title: null,
        author: 'Joku',
        url: null,
        likes: 2
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})