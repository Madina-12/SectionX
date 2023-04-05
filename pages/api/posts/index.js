import { prisma } from "../../../server/db/client"
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'


export default async function handle(req, res) {
  const { method } = req

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!prismaUser) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const userId = prismaUser.id
  const {sectionId} = req.query
  // console.log(sectionId , 'g bhai');
  switch (method) {

    case 'POST':
      const { title:newTitle, content:newContent } = req.body
      
      const addNewPost = await prisma.post.create({
        data: {
          title:newTitle,
          content:newContent,
          sectionId:sectionId,
          userId
        }
      })
      res.status(201).json(addNewPost)
      break

    case 'GET':

      const getPosts = await prisma.post.findMany({
        where:{
          userId,
          sectionId:sectionId
        },
        orderBy: [
          {isPinned:"desc"},
          {createdAt: "desc"},
        ],
      })
      res.status(200).json(getPosts)
      break

      case 'DELETE':
        const { id:deleteId } = req.body
        // use prisma to create a new post using that data
        const deletePost = await prisma.post.deleteMany({
          where:{
              id:deleteId,
              sectionId,
              userId
          }
        })
        res.status(201).json(deletePost)
        break
      case 'PUT':
        const {id:updateId,title:updateTitle, content:updateContent } = req.body
        const updatePost = await prisma.post.updateMany({
          where:{
            id:updateId,
            sectionId,
            userId
          },
          data:{
            title:updateTitle,
            content:updateContent
          }
        })
        res.status(200).json(updatePost)
        break
      case 'PATCH':
        const {postId, isPinned } = req.body
        const updatePinned = await prisma.post.updateMany({
          where:{
            id:postId,
            sectionId,
            userId
          },
          data:{
            isPinned
          }
        })
        res.status(200).json(updatePinned)
        break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}