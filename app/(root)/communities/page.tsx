

import ProfileHeader from "@/components/shared/ProfileHeader"
import { profileTabs } from "@/constants"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import ThreadsTab from "@/components/shared/ThreadsTab"

const page = async () => {
    const user = await currentUser()
    // console.log(user);

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect('/onboarding')
    return (
        <section>
            <h1 className="head-text mb-10"> Communities</h1>
        </section>
    )
}

export default Page