import React from 'react'

const NoChatSelectedPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <h1 className="text-2xl font-bold">No chat selected</h1>
                <p className="text-muted-foreground">Please select a chat to start messaging.</p>
            </div>
        </div>
    )
}

export default NoChatSelectedPage
