import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const rajPassword = await bcrypt.hash('raj', 10)
  const vishalPassword = await bcrypt.hash('vishal', 10)

  // Create raj user and balance together to satisfy the required 'user' relation
  const raj = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      name: 'raj',
      password: rajPassword,
      Balance: {
        create: {
          amount: 1000000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Success',
          amount: 1000000,
          token: 'token__1',
          provider: 'HDFC Bank',
        },
      },
    },
    include: { Balance: true }
  })

  // Create vishal user and balance together to satisfy the required 'user' relation
  const vishal = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      name: 'vishal',
      password: vishalPassword,
      Balance: {
        create: {
          amount: 1000000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Failure',
          amount: 1000000,
          token: 'token__2',
          provider: 'HDFC Bank',
        },
      },
    },
    include: { Balance: true }
  })

  console.log({ raj, vishal })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
