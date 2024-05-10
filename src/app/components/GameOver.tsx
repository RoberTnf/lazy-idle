import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export default function GameOver({ handleReset, className }: { handleReset: () => void, className: string }) {
    return <div className={`boxed m-2 content-center ${className}`} >
        <div className='flex items-center gap-4 justify-center'>
            <ExclamationTriangleIcon className=" w-12 h-12 text-red-600" aria-hidden="true" />
            <h1 className=' '>Game Over!</h1>
        </div>
        <p className='text-center'>You have run out of money,<br /> don&apos;t let your costs outgrow your revenue!</p>
        <div className='flex items-center'>
            <div className='m-auto bg-green-500 hover:bg-green-700 my-2 rounded'><button onClick={() => {
                handleReset()
            }}>Reset</button></div>
        </div>
    </div >
}
