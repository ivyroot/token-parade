export default function Instructions() {
  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm bg-gray-900 shadow-xl pointer-events-none select-none md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2'
      style={{
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <div className='tracking-wider'>

        Enter Address: &nbsp;
        <span className='text-red-200'>chd.eth</span>
        <br />
        <span className='text-green-200'>Load</span>      </div>
    </div>
  )
}
