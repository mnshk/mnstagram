import { useRouter } from "next/router"

export default function Reels() {

    const router = useRouter()

    return (

        <div>
            <div>Reels</div>
            <div>{router.query.username}</div>
        </div>

    )
}