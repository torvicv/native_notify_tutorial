import 'server-only'
import { getUser } from '@/app/lib/dal'
 
function canSeeUsername(viewer) {
  return true
}
 
function canSeePhoneNumber(viewer, team) {
  return viewer.isAdmin || team === viewer.team
}
 
export async function getProfileDTO(slug) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
    // Return specific columns here
  })
  const user = data[0]
 
  const currentUser = await getUser(user.id)
 
  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team)
      ? user.phonenumber
      : null,
  }
}