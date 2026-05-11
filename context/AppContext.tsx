"use client";

import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type AppContextType = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;

    isPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;

    currentLanguage: string;
    setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("en");

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const value = useMemo(
        () => ({
            sidebarOpen,
            setSidebarOpen,
            toggleSidebar,
            closeSidebar,
            openSidebar,
            isPageLoading,
            setIsPageLoading,
            currentLanguage,
            setCurrentLanguage,
        }),
        [sidebarOpen, isPageLoading, currentLanguage]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
}
