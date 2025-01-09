'use client'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Page non trouvée</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        La page que vous recherchez n'existe pas
                    </p>
                </div>
            </div>
        </div>
    )
}