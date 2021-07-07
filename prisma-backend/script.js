const { PrismaClient } = require('@prisma/client')
const { getPrismaClient } = require('@prisma/client/runtime')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

  const allUsers = await prisma.cart.findMany({
    where:{user:2147483647}
  })
  console.log(allUsers)


}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
