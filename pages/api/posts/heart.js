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

      case 'PUT':
        const {postId, sectionId, isHeart} = req.body
        const updatePost = await prisma.post.updateMany({
          where:{
            id:postId,
            sectionId,
            userId
          },
          data:{
            isHeart
          }
        })
        res.status(200).json(updatePost)
        break
      case 'PATCH':
        
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}