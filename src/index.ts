
// Here’s a quick breakdown of the code:
// #1 You import PrismaClient and express from the respective npm packages.
// #2 You instantiate PrismaClient by calling the constructor and obtain an instance called prisma.
// #3 You create your Express app by calling express().
// #4 You add the express.json() middleware to ensure JSON data can be processed properly by Express.
// #5 You implement your routes by adding the api endpoints between the calls to app.use and app.listen.
// #6 You start the server on port 3000.

// #1
import { PrismaClient } from '@prisma/client'
import express from 'express'

// #2
const prisma = new PrismaClient()

// #3
const app = express()

// #4
app.use(express.json())


// #5.1 Fetches all released songs.
app.get('/playlist', async (req, res) => {
    const songs = await prisma.song.findMany({
        where: { released: true },
        include: { singer: true }
    })
    res.json({
        success: true,
        payload: songs,
    })
})

// #5.2 Fetches a specific song by its ID.
app.get(`/song/:id`, async (req, res) => {
    const { id } = req.params
    const song = await prisma.song.findFirst({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: song,
    })
})

// #5.3 Fetches all artists.
app.get('/artists', async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json({
    success: true,
    payload: artists,
    message: "Operation Successful",
  })
})

app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
  });

// #6
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)