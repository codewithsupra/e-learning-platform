import EnrolledCourses from "./_components/EnrolledCourses"
import ExploreMore from "./_components/ExploreMore"
import InviteFriends from "./_components/InviteFriends"
import Upgrade from "./_components/Upgrade"
import UserStatus from "./_components/UserStatus"
import WelcomeBanner from "./_components/WelcomeBanner"


function Dashboard() {
  return (
    <div className="p-10 md:px-20 lg:px-36 xl:px-48">
       <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
       <WelcomeBanner />
       <EnrolledCourses />
       <ExploreMore />
       <InviteFriends />
       
        </div>
        <div>
          <UserStatus />
          <Upgrade />

        </div>

       </div>
      
    </div>
  )
}

export default Dashboard
