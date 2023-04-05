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
  switch (method) {

    case 'POST':
      const { sectionName } = req.body
      // use prisma to create a new section using that data
      const addNewPost = await prisma.section.create({
        data: {
          name:sectionName,
          userId
        }
      })
      res.status(201).json(addNewPost)
      break

    case 'GET':
      const getSections = await prisma.section.findMany({
        where:{
          userId
        },
        select:{
          id:true,
          name:true,
          createdAt:true
        },
        orderBy:{
          createdAt:"desc"
        }
      })
      res.status(200).json(getSections)
      break

      case 'DELETE':
        const { sectionId } = req.body
        // use prisma to create a new section using that data
        const deletePost = await prisma.section.deleteMany({
          where:{
              id:sectionId,
              userId
          }
        })
        res.status(201).json(deletePost)
        break
      case 'PATCH':
        console.log(userId)
        const {sectionId:updateId, sectionName:updateName } = req.body
        const updateSection = await prisma.section.updateMany({
          where:{
            id:updateId,
            userId
          },
          data:{
            name:updateName,
          }
        })
        res.status(200).json(updateSection)
        break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}