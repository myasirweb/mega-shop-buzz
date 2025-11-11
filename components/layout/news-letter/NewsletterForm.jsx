"use client"

export default function NewsletterForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // You can add toast or API logic here later
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your Email"
        className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium">
        Subscribe
      </button>
    </form>
  )
}
