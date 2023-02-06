import Head from "next/head"
import { useRouter } from "next/router"


export default function Page() {

    const router = useRouter()

    const username = router.query.username

    // get profile from server

    return (
        <>
            <Head>
                <title>{username} &#x2022; Mnstagram</title>
                <meta name="description" content="Mnstagram" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div>User Page</div>
                <div>{username}</div>
            </div>
        </>
    )

}