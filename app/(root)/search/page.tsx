

import ProfileHeader from "@/components/shared/ProfileHeader"
import { profileTabs } from "@/constants"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import ThreadsTab from "@/components/shared/ThreadsTab"
import UserCard from "@/components/cards/UserCard"
import Searchbar from "@/components/shared/SearchBar"

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const user = await currentUser()
    // console.log(user);

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect('/onboarding')
    console.log(searchParams);

    // fetch users 
    const result = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    })

    return (
        <section>
            <h1 className="head-text mb-10"> Search</h1>

            {/* search bar */}
            <Searchbar routeType='search' />
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