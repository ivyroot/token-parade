export default function Instructions() {
  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm bg-gray-900 shadow-xl pointer-events-none select-none md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2'
      style={{
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <div className='tracking-wider'>

        Step 2 - <span className='text-green-200'>update:</span>
        <span className='text-red-200'>@/components/canvas/Shader/Shader</span>
        <br />
        Step 3 - <span className='text-green-200'>delete:</span>
        <span className='text-red-200'> @/pages/box </span>
        <br />
        Step 4 - <span className='text-green-200'>update header:</span>
        <span className='text-red-200'> @/config </span>
      </div>
    </div>
  )
}
