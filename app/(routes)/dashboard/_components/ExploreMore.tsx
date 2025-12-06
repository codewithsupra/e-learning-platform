
const ExplorMoreOptions = [
    {
        id: 1,
        title: 'Quizz Pack',
        desc: 'Practice what you learned with bite-sized code challenges.',
        icon: '/tree.png'
    },
    {
        id: 2,
        title: 'Video Courses',
        desc: 'Learn with structured video lessons taught step-by-step.',
        icon: '/game.png'
    },
    {
        id: 3,
        title: 'Community Project',
        desc: 'Build real-world apps by collaborating with the community.',
        icon: '/growth.png'
    },
    {
        id: 4,
        title: 'Explore Apps',
        desc: 'Explore prebuilt applications and tools.',
        icon: '/start-up.png'
    }
];



function ExploreMore() {
  return (
    <div className='mt-4'>
        <h2 className=" text-3xl font-sans font-bold  underline mb-6">Explore More</h2>
        <div className='grid md:grid-cols-2 gap-6'>
            {ExplorMoreOptions.map((option)=>(
                <div key={option.id} className='flex  gap-4 border-4 rounded-2xl p-5 bg-zinc-800 hover:scale-[1.02] hover:bg-zinc-700 transition-transform duration-200  shadow-2xl cursor-pointer'>
                    <div className='w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center'>
                        <img src={option.icon} alt={option.title} className='w-6 h-6'/>
                    </div>
                    <div>
                        <h3 className='text-xl font-pixelify-sans font-bold mb-1'>{option.title}</h3>
                        <p className='text-sm text-gray-400'>{option.desc}</p>
                    </div>
                </div>
            ))}
        </div>

      
    </div>
  )
}

export default ExploreMore
