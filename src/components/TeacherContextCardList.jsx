import TeacherContextCard from "./TeacherContextCard"

export default function TeacherContextCardList({ contexts }) {
  return (
    <div className="flex flex-row flex-wrap gap-6">
        {
            contexts.map(context => (
                <TeacherContextCard 
                  key={ context.id } 
                  context={ context } 
                />
            ))
        }
    </div>
  )
}
