

import ProfileHeader from "@/components/shared/ProfileHeader"
import { profileTabs } from "@/constants"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import ThreadsTab from "@/components/shared/ThreadsTab"
import UserCard from "@/components/cards/UserCard"

const Page = async () => {
    const user = await currentUser()
    // console.log(user);

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect('/onboarding')
    // fetch users 
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    })

    return (
        <section>
            <h1 className="head-text mb-10"> Search</h1>

            {/* search bar */}
            <div className="mt-14 flex flex-col gap-9">
                {
                    result.users.length === 0 ? (
                        <p className="no-result"> No users</p>
                    ) : (
                        <>
                            {result.users.map((user) => (<UserCard
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                username={user.username}
                                imgUrl={user.image}
                                personType='User'
                            />
                            ))
                            }
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default Page