import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import Spinner from "../../components/Spinner/Spinner"

export interface IGlobalContext {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext)

interface GlobalProviderProps {
    children: ReactNode
}

export function GlobalProvider(props: GlobalProviderProps) {
    const { children } = props
    const [isLoading, setIsLoading] = useState(false)

    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            <Spinner isLoading={isLoading} />
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobal() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}
