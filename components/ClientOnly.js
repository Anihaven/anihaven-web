// https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
import { useEffect, useState } from "react"

export default function ClientOnly({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null
    }

    return <div {...delegated}>{children}</div>
}

export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    return hasMounted
}
