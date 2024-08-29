const Header = () => {
  return (
    <header className="flex justify-between border-b px-6 py-3">
      <div className="flex flex-col">
        <h1 className="text-md font-bold">InfluxUI</h1>
      </div>
      <div className="flex divide-x-2 rounded-md border">
        <button className="px-4 py-2 font-bold text-black">
          <span className="text-sm font-bold">Diagram view</span>
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="rounded-md border px-4 py-2 font-bold text-black/50">
          <span className="text-sm">Reset</span>
        </button>
        <button className="rounded-md border border-black bg-black px-4 py-2 font-bold text-white">
          <span className="text-sm">Publish</span>
        </button>
      </div>
    </header>
  )
}

export default Header
