import { useRouter } from 'next/router'

export default function Content() {
    const router = useRouter()
    const { content_id } = router.query

    return <p>Content: {content_id}</p>
}