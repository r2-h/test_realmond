type Props = {
  email: string
  phone: string
  username: string
  cardHandler: (username: string) => void
  className: string
}
export const Card = ({ email, phone, username, className , cardHandler}: Props) => {
  return (
    <button
      className={`border border-slate-400 rounded-xl max-w-[400px] w-full h-[200px] p-5 flex flex-col justify-center items-center ${className}`}
      onClick={() => cardHandler(username)}
    >
      <h3 className="font-bold text-gray-900">{username}</h3>
      <p className="text-gray-700">email: {email}</p>
      <p className="text-gray-700">phone: {phone}</p>
    </button>
  )
}
