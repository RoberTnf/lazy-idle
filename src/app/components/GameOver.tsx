import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export default function GameOver({ handleReset, className }: { handleReset: () => void, className: string }) {
    return <div className={`boxed flex-auto m-2 content-center ${className}`} >
        <div className='flex items-center gap-4'>
            <div className='flex-auto' />
            <ExclamationTriangleIcon className=" w-12 h-12 text-red-600" aria-hidden="true" />
            <h1 className=' '>Game Over!</h1>
            <div className='flex-auto' />
        </div>
        <div className='flex items-center'>
            <div className='m-auto bg-green-500 hover:bg-green-700'><button onClick={() => {
                handleReset()
            }}>Reset</button></div>
        </div>
    </div >
}
