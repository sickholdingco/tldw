export const InitialView = () => {
  return (
    <div className="grid gap-6 justify-center align-center">
      <p className="font-bold text-l text-center" >Consume and learn YouTube content in a text based format 👀</p>

      <div>🔍 Search exactly like you would for a YouTube video</div>

      <ul className="list-disc list-inside">
        <p>Some dos ✅</p>
        <li className="text-dimmed-200">history of the ottoman empire</li>
        <li className="text-dimmed-200">how to make holiday cookies</li>
        <li className="text-dimmed-200">mike o&apos;hearn natty or not</li>
      </ul>

      <ul className="list-disc list-inside">
        <p>Some don&apos;ts ❌</p>
        <li className="text-dimmed-200">milk carton</li>
        <li className="text-dimmed-200">cars</li>
      </ul>
    </div>
  )
}