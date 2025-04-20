const NoChatSelectedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">No chat selected</h1>
            <p className="text-muted-foreground">Please select a chat to start messaging.</p>
            </div>
        </div>
    )
}

export default NoChatSelectedPage
